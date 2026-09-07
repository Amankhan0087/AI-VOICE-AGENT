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
- **@vapi-ai/web** for the in-browser "Try it live" voice demo

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
  DemoVideo.tsx, LiveDemo.tsx, Features.tsx, DashboardPreview.tsx, Pricing.tsx,
  Testimonials.tsx, FAQ.tsx, ContactForm.tsx, Footer.tsx
  FloatingDemoButton.tsx  # bottom-right floating "Talk to AI" button
  motion/              # FadeIn / FadeInStagger scroll-reveal helpers, Waveform,
                        # CallWaveform (live mic/assistant audio level bars)
  ui/                  # Logo, ThemeToggle, social icons
lib/
  site-config.ts        # ALL editable copy: nav links, stats, pricing tiers, features,
                         # testimonials, FAQs — edit this file to change page content
  vapi-context.tsx       # VapiCallProvider/useVapiCall — shared call state for
                         # LiveDemo.tsx and FloatingDemoButton.tsx
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

## Live voice demo (VAPI)

The "Try it live" section ([`components/LiveDemo.tsx`](./components/LiveDemo.tsx)) and the
floating bottom-right button ([`components/FloatingDemoButton.tsx`](./components/FloatingDemoButton.tsx))
let a visitor have a real voice conversation with your VAPI assistant directly in the
browser — mic access, no phone call. Both share one call session via
[`lib/vapi-context.tsx`](./lib/vapi-context.tsx).

**To turn it on**, paste your real values into `.env.local`:

```bash
NEXT_PUBLIC_VAPI_PUBLIC_KEY=<your VAPI public key>
NEXT_PUBLIC_VAPI_ASSISTANT_ID=<your VAPI assistant id>
```

Find both in your [VAPI dashboard](https://dashboard.vapi.ai): the public key under
**API Keys**, the assistant ID on your assistant's page. The public key is meant to be
exposed client-side — VAPI's access control lives on the assistant's own configuration,
not on keeping this key secret.

Until both variables are set, the widget renders a disabled "being configured" state
instead of a broken button — safe to deploy without them and wire up later. The
floating button only renders once both are set.

Mic-permission handling is built in: if a visitor denies microphone access (or has none),
the widget shows a plain-language error state with a retry button instead of failing
silently.

## Environment variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the FastAPI backend, once deployed. Not yet used by any component — see `BACKEND.md`. |
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | VAPI public API key, powers the live voice demo widget. See "Live voice demo" above. |
| `NEXT_PUBLIC_VAPI_ASSISTANT_ID` | ID of the VAPI assistant the live demo widget calls. |

## Backend & deployment

- [`BACKEND.md`](./BACKEND.md) — how this frontend's lead form relates to the
  FastAPI/VAPI backend, and the plan for connecting them.
- [`DEPLOY.md`](./DEPLOY.md) — deploying this Next.js app on Hostinger Business
  hosting, and where the Python backend needs to live instead.
