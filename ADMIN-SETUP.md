# Admin Panel Setup Guide

This guide explains how to enable Google OAuth login for the `/admin` panel so you
can manage website content (faculty, news, projects, announcements) without
touching code.

## How it works

1. You sign in at `/admin` with your Google account.
2. Only the email(s) listed in `ADMIN_EMAILS` are allowed in — everyone else is blocked.
3. You edit content through the admin dashboard (add / edit / delete + photo upload).
4. Each save commits the change to GitHub and the site rebuilds automatically.

---

## Step 1 — Create a Google OAuth client

1. Go to the **[Google Cloud Console](https://console.cloud.google.com/)** and sign in.
2. Create a new project (or pick an existing one), e.g. "SKP AIDS Admin".
3. Open **☰ menu → APIs & Services → OAuth consent screen**:
   - User type: **External**
   - App name: `SKP AIDS Admin`
   - Support email: your email
   - Authorised domains: add your production domain (e.g. `aids.skpec.edu.in`)
   - Save → Add yourself as a **Test user** (your Google email).
4. Open **APIs & Services → Credentials → Create credentials → OAuth client ID**:
   - Application type: **Web application**
   - Name: `SKP AIDS Admin`
   - **Authorised JavaScript origins** — add:
     - `http://localhost:12001`
     - `https://your-production-domain.vercel.app` (after you deploy)
   - **Authorised redirect URIs** — add:
     - `http://localhost:12001/api/auth/callback/google`
     - `https://your-production-domain.vercel.app/api/auth/callback/google`
   - Click **Create**.
5. Copy the **Client ID** and **Client secret**.

## Step 2 — Set environment variables

In your `.env.local` (and on Vercel → Settings → Environment Variables):

```
AUTH_SECRET=<run: openssl rand -base64 33>
AUTH_GOOGLE_ID=<your Google Client ID>
AUTH_GOOGLE_SECRET=<your Google Client Secret>
ADMIN_EMAILS=your.email@gmail.com
GITHUB_TOKEN=<fine-grained PAT, Contents: Read & Write on your repo>
GITHUB_REPO=mathan0310E/AIDS-MODER-PAGE
GITHUB_BRANCH=main
```

### Creating the GitHub token (for content commits)

1. GitHub → Settings → Developer settings → **Fine-grained personal access tokens** → Generate new.
2. Repository access: **Only select repositories** → `mathan0310E/AIDS-MODER-PAGE`.
3. Permissions → Repository permissions → **Contents: Read and write**.
4. Generate, copy the token (starts with `github_pat_`).

## Step 3 — Deploy to Vercel

The admin panel requires a running Next.js server (not static export). Vercel's
free tier works perfectly:

1. Push the repo to GitHub (already done).
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add all the environment variables above (use your production redirect URI in Step 1).
4. Deploy. Visit `https://<your-app>.vercel.app/admin` → sign in with Google.

---

## What the admin can manage

| Section | What you can do |
|---------|-----------------|
| **Faculty** | Add/edit/delete members, upload photos |
| **News** | Add/edit/delete news items (title, date, category, summary) |
| **Projects** | Add/edit/delete student showcase projects |
| **Announcements** | Add/edit/delete the notice ticker |

## Security notes

- Only emails in `ADMIN_EMAILS` can complete login. The `signIn` callback rejects everyone else.
- `AUTH_SECRET` signs the session JWT — keep it secret and never commit `.env.local`.
- The middleware (`src/middleware.ts`) guards every `/admin/*` route server-side.
- In development (when `ADMIN_EMAILS` is empty) a dev bypass lets you preview `/admin` without Google configured. This is **disabled in production**.
