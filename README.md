# AI&DS Department Website — SKP Engineering College

Official standalone website for the **B.Tech Artificial Intelligence & Data Science** department of **SKP Engineering College**, Tiruvannamalai (approved by AICTE, affiliated to Anna University, Chennai).

## Tech Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- Inter + Poppins via `next/font`

## Getting Started

```bash
npm install
npm run dev      # development server
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

## Project Structure

```
src/
├── app/            # One folder per page (about, academics, faculty, …)
│   ├── layout.tsx  # Root layout: navbar, ticker, footer, SEO metadata
│   ├── sitemap.ts  # Generated sitemap
│   └── robots.ts   # Generated robots.txt
├── components/     # Reusable UI (Navbar, Hero, cards, tabs, calendar, …)
└── data/
    ├── site.ts     # Verified college facts & navigation
    └── content.ts  # CMS-ready typed content collections
```

## Content Management (CMS-Ready)

All department content lives in `src/data/content.ts` as typed collections
(faculty, laboratories, projects, activities, achievements, news, calendar
events, gallery images, downloads). Every entry is a plain object, so these
arrays can later be swapped for a headless CMS or database fetch without
touching the UI.

**Accuracy rule:** only verified facts are published. Anything unconfirmed is
an explicit placeholder marked "Information will be updated by the
department." Never add invented faculty names, placement statistics, awards,
publications or contact details — replace placeholders with officially
verified data only.

Verified facts currently shown: college name/address/trust, AICTE approval,
Anna University affiliation, college established 1999, AI&DS program
established 2023–24 with an initial intake of 60 students.

## Pages

Home, About, Academics (semester-wise curriculum tabs), Faculty (searchable
directory), Laboratories, Research & Innovation, Student Projects, Student
Activities (+ AI & Data Science Club), Achievements, Placements & Careers,
Alumni (with registration form), News & Announcements, Events Calendar,
Gallery (lightbox), Downloads (searchable), Student Resources, Contact
(Google Maps + enquiry forms).

## Accessibility & SEO

Semantic HTML, skip link, ARIA labels, keyboard-navigable lightbox/tabs,
visible focus states, `prefers-reduced-motion` support, per-page metadata,
Open Graph tags, sitemap and robots.txt.

## Backend

- `POST /api/contact` — validates and stores admission/general enquiries with
  in-memory rate limiting (5 requests/minute/IP). The `deliverEnquiry` hook in
  `src/app/api/contact/route.ts` is the single place to wire up real email
  delivery (Resend/SendGrid/SMTP) when ready.
- `GET /api/contact` — lightweight admin preview of stored enquiry count.
  Set `CONTACT_ADMIN_TOKEN` to enable listing.

## Environment

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL for SEO/sitemap/OG tags |
| `CONTACT_DELIVER_TO` | Department email for enquiries |
| `CONTACT_ADMIN_TOKEN` | Optional token to enable enquiry admin preview |
| `RESEND_API_KEY` / `SENDGRID_API_KEY` | Optional, for real email delivery |

## Deployment

### Vercel (recommended)

1. Import the repository at <https://vercel.com/new>.
2. The included `vercel.json` and `next build` are detected automatically.
3. Set the environment variables above in Project Settings → Environment Variables.
4. Deploy. Every push to the default branch redeploys.

### Faculty & content updates

See **[FACULTY_GUIDE.md](./FACULTY_GUIDE.md)** for step-by-step instructions on
adding faculty photos and profiles. All content is plain typed data in
`src/data/content.ts` — edit, build, and redeploy.
