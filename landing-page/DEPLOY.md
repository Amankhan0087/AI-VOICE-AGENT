# Deployment guide

This repo (the Next.js marketing site) and the FastAPI/VAPI backend deploy
**separately**, to different kinds of hosting. This document covers both, and is
explicit about which parts of Hostinger's product lineup are actually suitable for each.

## 1. Frontend (this repo) → Hostinger Business Web Hosting

Hostinger's **Business Web Hosting** plan supports Node.js apps (GitHub-connected,
auto-deploy on push, runs `npm install` + `npm run build` + `npm run start`). This
Next.js app is built to be compatible with that:

- Standard `npm run build` / `npm run start` — no custom server, no unsupported native
  binaries.
- No filesystem writes at runtime (the leads API route only logs; see `BACKEND.md`).

### Steps

1. Push this repo to GitHub.
2. In hPanel, create a **Node.js** application under Business Web Hosting and connect
   it to the GitHub repo/branch.
3. Set the **build command** to `npm run build` and the **start command** to
   `npm run start` (or the Node.js app equivalents Hostinger's UI exposes).
4. Add environment variables (see below) in the hosting panel — **never** commit
   `.env.local`.
5. Point your domain / subdomain at the Node.js app per Hostinger's instructions.
6. Once the backend is live (see below), set `NEXT_PUBLIC_API_URL` to its URL and
   redeploy.

### Environment variables to set in Hostinger

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | `https://api.<your-domain>` once the backend is deployed |

## 2. Backend (AI-VOICE-AGENT) → NOT Business Web Hosting

Hostinger Business shared hosting does **not** run Python/FastAPI applications — it's
a Node.js/PHP-oriented shared hosting product. The FastAPI backend needs one of:

- **Hostinger VPS with CloudPanel** — gives you a real Linux box where you can run
  FastAPI (via `uvicorn`/`gunicorn` behind Caddy/Nginx, managed with systemd or a
  process manager), plus PostgreSQL for the production database (see `BACKEND.md`).
- **An external Python host** — Railway or Render are both a fast path for a FastAPI +
  Postgres app if you'd rather not manage a VPS.

Either way, the backend should end up reachable at a stable URL, ideally
`api.<your-domain>`, with:

- HTTPS
- PostgreSQL/MySQL instead of SQLite (see `BACKEND.md` for the migration plan)
- CORS configured to allow the marketing site's domain

### DNS

Point `api.<your-domain>` at wherever the backend actually runs (VPS IP, or the
CNAME your Python host gives you). The frontend on Business hosting and the backend
on the VPS/external host are two separate deployments under the same domain.

## 3. Secrets

Never hardcode secrets. On the frontend, the only environment variable in use today is
`NEXT_PUBLIC_API_URL`, which is not sensitive (it's a public URL, hence the
`NEXT_PUBLIC_` prefix required by Next.js to expose it to the browser). Anything
sensitive (VAPI API keys, database credentials) belongs only in the backend's
environment, on the VPS/Railway/Render side — never in this repo or its `.env.local`.

## 4. Rollout order

1. Deploy the frontend to Business Web Hosting first (it works standalone — the
   contact form just logs submissions until the backend is connected).
2. Stand up the backend (VPS+CloudPanel, or Railway/Render) with PostgreSQL.
3. Update `NEXT_PUBLIC_API_URL` on the frontend and wire up the `/api/leads` forward
   described in `BACKEND.md`.
4. Point DNS for both the main domain and `api.` subdomain.
