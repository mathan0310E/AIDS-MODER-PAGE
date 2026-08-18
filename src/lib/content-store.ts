import { promises as fs } from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "src", "data", "content");
const ASSET_DIR = path.join(process.cwd(), "public", "images", "faculty");
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_IMAGE_EXTS = new Set(["jpg", "jpeg", "png", "webp", "gif"]);

/* -------------------------------------------------------------------------- */
/*  Simple in-memory rate limiter — max N commits per minute per process      */
/* -------------------------------------------------------------------------- */

const COMMIT_WINDOW_MS = 60_000;
const MAX_COMMITS_PER_WINDOW = 10;
const commitTimestamps: number[] = [];

function checkRateLimit(): void {
  const now = Date.now();
  while (commitTimestamps.length > 0 && commitTimestamps[0] <= now - COMMIT_WINDOW_MS) {
    commitTimestamps.shift();
  }
  if (commitTimestamps.length >= MAX_COMMITS_PER_WINDOW) {
    throw new Error("RATE_LIMITED: Too many commits. Please wait a minute.");
  }
  commitTimestamps.push(now);
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/** Strip path separators and traversal sequences, allow only safe chars. */
function safeFilename(raw: string): string {
  return path
    .basename(raw)
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_{2,}/g, "_");
}

/** Validate that a resolved path stays inside the expected directory. */
function assertInsideDir(resolved: string, dir: string): void {
  const norm = path.resolve(dir) + path.sep;
  if (!resolved.startsWith(norm)) {
    throw new Error("Path traversal blocked");
  }
}

/* -------------------------------------------------------------------------- */

export type Collection =
  | "faculty"
  | "news"
  | "projects"
  | "announcements"
  | "site"
  | "stats"
  | "whyCards"
  | "semesters"
  | "laboratories"
  | "researchAreas"
  | "careerOpportunities"
  | "placementSupport"
  | "studentResources"
  | "faqs"
  | "academicDocuments";

/** Read a JSON collection from the local filesystem. */
export async function readCollection<T>(name: Collection): Promise<T[]> {
  const file = path.join(CONTENT_DIR, `${name}.json`);
  const raw = await fs.readFile(file, "utf-8");
  return JSON.parse(raw) as T[];
}

/** Read a single-object JSON file (e.g. site.json) from the local filesystem. */
export async function readSetting<T>(name: Collection): Promise<T> {
  const file = path.join(CONTENT_DIR, `${name}.json`);
  const raw = await fs.readFile(file, "utf-8");
  return JSON.parse(raw) as T;
}

/** Write a single-object JSON file locally AND commit it to GitHub. */
export async function writeSetting<T>(
  name: Collection,
  value: T,
  message: string,
): Promise<{ committed: boolean; error?: string }> {
  const file = path.join(CONTENT_DIR, `${name}.json`);
  const json = JSON.stringify(value, null, 2) + "\n";
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, json, "utf-8");
  checkRateLimit();
  return commitToGitHub(`content/${name}.json`, json, message);
}

/** Write a JSON collection locally AND commit it to GitHub (production rebuild). */
export async function writeCollection<T>(
  name: Collection,
  items: T[],
  message: string,
): Promise<{ committed: boolean; error?: string }> {
  const file = path.join(CONTENT_DIR, `${name}.json`);
  const json = JSON.stringify(items, null, 2) + "\n";

  // 1. Always write locally so the running server reflects the change immediately.
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, json, "utf-8");

  // 2. Commit to GitHub so production (Vercel) rebuilds with the new content.
  checkRateLimit();
  return commitToGitHub(`content/${name}.json`, json, message);
}

/** Upload a binary file (e.g. faculty photo) to /public in the repo. */
export async function uploadAsset(
  filename: string,
  base64Content: string,
  message: string,
): Promise<{ committed: boolean; path?: string; error?: string }> {
  // Sanitize filename — strip traversal and unsafe characters
  const safe = safeFilename(filename);
  if (!safe || safe === "." || safe === "..") {
    return { committed: false, error: "Invalid filename" };
  }

  // Enforce file extension whitelist
  const ext = safe.split(".").pop()?.toLowerCase() || "";
  if (!ALLOWED_IMAGE_EXTS.has(ext)) {
    return { committed: false, error: `File type '.${ext}' not allowed. Use: jpg, jpeg, png, webp, gif` };
  }

  // Enforce file size limit (base64 is ~33% larger than raw)
  const rawSize = Math.ceil((base64Content.length * 3) / 4);
  if (rawSize > MAX_FILE_SIZE) {
    return { committed: false, error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB` };
  }

  // Write locally with path traversal guard
  const localPath = path.join(ASSET_DIR, safe);
  assertInsideDir(path.resolve(localPath), ASSET_DIR);
  await fs.mkdir(path.dirname(localPath), { recursive: true });
  await fs.writeFile(localPath, Buffer.from(base64Content, "base64"));

  checkRateLimit();
  const res = await commitToGitHub(
    `public/images/faculty/${safe}`,
    base64Content,
    message,
    { binary: true },
  );
  return {
    committed: res.committed,
    path: `/images/faculty/${safe}`,
    error: res.error,
  };
}

async function commitToGitHub(
  repoPath: string,
  content: string,
  message: string,
  opts: { binary?: boolean } = {},
): Promise<{ committed: boolean; error?: string }> {
  // Guard: reject any path containing traversal sequences after normalization.
  // This prevents a future caller from accidentally passing user-controlled input.
  if (repoPath.split("/").some((seg) => seg === ".." || seg === ".")) {
    return { committed: false, error: "Path traversal detected in repoPath" };
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  // Graceful degradation: if no token/repo configured, the local write above is enough.
  if (!token || !repo || token.startsWith("replace_")) {
    return { committed: false };
  }

  const apiUrl = `https://api.github.com/repos/${repo}/contents/${repoPath}?ref=${branch}`;
  const authHeaders = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
  };

  const maxRetries = 2;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Fetch the existing file's SHA (required to update via Contents API).
      const head = await fetch(apiUrl, { headers: authHeaders });
      let sha: string | undefined;
      if (head.ok) {
        const data = await head.json();
        sha = data.sha;
      }

      const res = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          content: opts.binary ? content : btoa(unescape(encodeURIComponent(content))),
          sha,
          branch,
        }),
      });

      if (res.ok) {
        return { committed: true };
      }

      // 409 = SHA conflict (concurrent edit) — retry with fresh SHA
      if (res.status === 409 && attempt < maxRetries) {
        continue;
      }

      const err = await res.json().catch(() => ({}));
      console.error("[content-store] GitHub commit failed:", { status: res.status, message: err.message, repoPath, branch });
      return { committed: false, error: "Failed to commit content to repository. Please try again." };
    } catch (e) {
      console.error("[content-store] GitHub commit failed:", { error: e, repoPath, branch, attempt });
      if (attempt < maxRetries) continue;
      return { committed: false, error: "Failed to commit content to repository. Please try again." };
    }
  }
  console.error("[content-store] GitHub commit failed: max retries exceeded", { repoPath, branch });
  return { committed: false, error: "Failed to commit content to repository after multiple attempts. Please try again." };
}
