import { promises as fs } from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "src", "data", "content");

export type Collection = "faculty" | "news" | "projects" | "announcements";

/** Read a JSON collection from the local filesystem. */
export async function readCollection<T>(name: Collection): Promise<T[]> {
  const file = path.join(CONTENT_DIR, `${name}.json`);
  const raw = await fs.readFile(file, "utf-8");
  return JSON.parse(raw) as T[];
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
  return commitToGitHub(`content/${name}.json`, json, message);
}

/** Upload a binary file (e.g. faculty photo) to /public in the repo. */
export async function uploadAsset(
  filename: string,
  base64: string,
  message: string,
): Promise<{ committed: boolean; path?: string; error?: string }> {
  const localPath = path.join(process.cwd(), "public", "images", "faculty", filename);
  await fs.mkdir(path.dirname(localPath), { recursive: true });
  await fs.writeFile(localPath, Buffer.from(base64, "base64"));

  const res = await commitToGitHub(
    `public/images/faculty/${filename}`,
    base64,
    message,
    { binary: true },
  );
  return {
    committed: res.committed,
    path: `/images/faculty/${filename}`,
    error: res.error,
  };
}

async function commitToGitHub(
  repoPath: string,
  content: string,
  message: string,
  opts: { binary?: boolean } = {},
): Promise<{ committed: boolean; error?: string }> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  // Graceful degradation: if no token/repo configured, the local write above is enough.
  if (!token || !repo || token.startsWith("replace_")) {
    return { committed: false };
  }

  try {
    // Fetch the existing file's SHA (required to update via Contents API).
    const apiUrl = `https://api.github.com/repos/${repo}/contents/${repoPath}?ref=${branch}`;
    const head = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });
    let sha: string | undefined;
    if (head.ok) {
      const data = await head.json();
      sha = data.sha;
    }

    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: opts.binary ? content : btoa(unescape(encodeURIComponent(content))),
        sha,
        branch,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { committed: false, error: err.message || `GitHub API ${res.status}` };
    }
    return { committed: true };
  } catch (e) {
    return { committed: false, error: e instanceof Error ? e.message : "unknown error" };
  }
}
