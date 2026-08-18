<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repo notes (OpenHands agent memory)

## Architecture
- Content-driven site: all editable content lives in `src/data/content/*.json`, typed and exported from `src/data/department.ts` (site) and re-exported from `src/data/admin-data.ts` (admin counts).
- `src/lib/content-store.ts` has `readCollection`/`writeCollection` (arrays), `readSetting`/`writeSetting` (single objects like site.json / vision.json), and `uploadAsset` (binary image upload to public/images/faculty with rate-limit + path-traversal guards). Writes commit to GitHub via Contents API when GITHUB_TOKEN/GITHUB_REPO are set.
- Collection type union in content-store.ts lists every editable JSON file — extend it when adding a collection.
- Admin pages: `makeStringListPage` (string[] collections) and `makeObjectListPage` (object-array collections) factories in `src/components/admin/`. Both use `adminSlug()` from StringListPage.tsx to map collection → admin route slug. Single-object collections (club, vision, site) get hand-written pages using readSetting/writeSetting or readCollection with [0].

## Adding a new editable section (checklist)
1. Create `src/data/content/<name>.json`.
2. Import + type + export it in `src/data/department.ts`; re-export in `src/data/admin-data.ts`.
3. Add the name to the `Collection` union in `src/lib/content-store.ts` and to `adminSlug()` map in StringListPage.tsx.
4. Build the section component in `src/components/`, matching the neo-futurism design tokens in globals.css (void/mist/cyan/violet/magenta/lime, glass-panel, card-accent, text-gradient-*).
5. Register it in `src/app/(site)/page.tsx`, `navLinks` in department.ts, AdminNav links, and the admin dashboard cards.
6. `npm run build` + `npm run lint` before pushing.

## Design system
- Section pattern: `py-24`, `mx-auto max-w-7xl px-6`, mono uppercase kicker with `›`, display font h2 with a `text-gradient-*` span, Reveal/RevealStagger for scroll animations.
- Association branding: AION (Artificial Intelligence and Operation Network), tagline "Connecting Intelligence, Empowering the Future". Vector logo recreated in `src/components/AionLogo.tsx`.

## Gotchas
- next.config.ts needs `allowedDevOrigins` for the work-* proxy hosts, otherwise the page is blank.
- Dev server: `PORT=12000 npm run dev` (work-1) or 12001 (work-2).
- `git rebase --continue` fails without an editor — use `GIT_EDITOR=true git rebase --continue`.
- Remote repo (mathan0310E/AIDS-MODER-PAGE) is actively developed by others — always `git pull --rebase` before pushing.
