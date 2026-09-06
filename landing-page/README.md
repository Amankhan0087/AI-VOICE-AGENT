# Voxa — AI Voice Agent Landing Page

Marketing landing page for **Voxa**, a VAPI-powered AI receptionist that answers calls,
books/cancels/reschedules appointments in natural language, and syncs everything to a
live dashboard. This is the frontend/marketing site only — the actual voice agent and
appointment system live in the [AI-VOICE-AGENT backend](https://github.com/Amankhan0087/AI-VOICE-AGENT)
(FastAPI + SQLAlchemy + Streamlit + VAPI).

## Tech stack

- **Next.js 15+ (App Router)** + TypeScript
- **Tailwind CSS v4** (CSS-based theme tokens in `app/globals.css`, no `tailwind.config.js`)
- **Framer Motion** for scroll reveals, hero motion, and hover states
- **lucide-react** for icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # eslint
```

## Project structure

```
app/
  page.tsx           # assembles all landing page sections, in order
  layout.tsx          # root layout: fonts, metadata, JSON-LD, theme init script
  globals.css          # Tailwind v4 theme tokens (colors, dark mode) — edit brand color here
  sitemap.ts / robots.ts
  api/leads/route.ts   # demo-request intake endpoint (see BACKEND.md)
components/
  Navbar.tsx, Hero.tsx, TrustBar.tsx, ProblemSolution.tsx, HowItWorks.tsx,
  DemoVideo.tsx, Features.tsx, DashboardPreview.tsx, Pricing.tsx,
  Testimonials.tsx, FAQ.tsx, ContactForm.tsx, Footer.tsx
  motion/              # FadeIn / FadeInStagger scroll-reveal helpers, Waveform animation
  ui/                  # Logo, ThemeToggle, social icons
lib/
  site-config.ts        # ALL editable copy: nav links, stats, pricing tiers, features,
                         # testimonials, FAQs — edit this file to change page content
  utils.ts
```

## Editing content

Nearly all copy (pricing, features, FAQs, testimonials, stats) lives in
[`lib/site-config.ts`](./lib/site-config.ts). Edit that file rather than the components
themselves for day-to-day content changes.

- **Brand color / theme**: [`app/globals.css`](./app/globals.css) — the `--brand-*` CSS
  variables under `:root` and `.dark`.
- **Demo video**: [`components/DemoVideo.tsx`](./components/DemoVideo.tsx) — replace
  `YOUTUBE_ID`, or swap the `<iframe>` for a self-hosted `<video>` tag.
- **Dashboard preview**: [`components/DashboardPreview.tsx`](./components/DashboardPreview.tsx)
  is a CSS/HTML mockup. Swap it for a real `next/image` screenshot of the Streamlit
  dashboard once one is available (see comment at the top of the file).
- **OG/social preview image**: add `public/images/og-cover.png` (1200×630) — referenced
  in `app/layout.tsx` metadata but not included in this repo.

## Environment variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the FastAPI backend, once deployed. Not yet used by any component — see `BACKEND.md`. |

## Backend & deployment

- [`BACKEND.md`](./BACKEND.md) — how this frontend's lead form relates to the
  FastAPI/VAPI backend, and the plan for connecting them.
- [`DEPLOY.md`](./DEPLOY.md) — deploying this Next.js app on Hostinger Business
  hosting, and where the Python backend needs to live instead.
