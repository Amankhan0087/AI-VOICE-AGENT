# Backend integration plan

This Next.js app is a **marketing site**, not the voice agent itself. The real product —
the VAPI voice agent, appointment booking/cancellation/rescheduling logic, and the
operational dashboard — lives in the separate
[AI-VOICE-AGENT repository](https://github.com/Amankhan0087/AI-VOICE-AGENT)
(FastAPI + SQLAlchemy + SQLite + Streamlit).

This document describes how the two are meant to connect, and what changes as the
backend moves toward production.

## What this frontend does today

`app/api/leads/route.ts` is a Next.js API route that:

1. Validates a demo-request form submission (`name`, `businessName`, `phone`, `email`,
   optional `useCase` / `preferredCallTime`).
2. Logs it server-side (`console.log`).
3. Returns `201` on success, `400` with an `error` message on validation failure.

It does **not** talk to the FastAPI backend, and it does not create or touch
appointments. Leads (people who want a demo) are a different concern from appointments
(people an already-onboarded business's AI agent has booked) — the landing page only
ever produces leads.

## Why they're kept separate

- The FastAPI backend is the **source of truth** for appointments, call transcripts,
  and dashboard data. It should not be modified to also handle marketing-site leads.
- The Next.js app is static-ish marketing content that needs to deploy independently
  (see `DEPLOY.md`) on ordinary web hosting, without a Python runtime.
- Keeping lead capture in a Next.js API route means the contact form works (and can be
  demoed) even before any backend integration exists.

## Planned changes, in order

### 1. Database migration: SQLite → PostgreSQL/MySQL

The existing backend uses SQLite, which is fine for local development but not for a
production deployment with concurrent writes (multiple simultaneous calls). Before
going live:

- Stand up a managed PostgreSQL (or MySQL) instance.
- Update the backend's SQLAlchemy connection string / engine config to point at it.
- Run migrations (Alembic, if not already in place) to create the schema.
- No changes are required in this Next.js app for this step — it doesn't talk to the
  database directly.

### 2. Expose the backend on `api.<domain>`

Deploy the FastAPI backend (see `DEPLOY.md` for hosting options) behind a subdomain,
e.g. `api.voxa.ai`, with CORS configured to allow requests from the marketing site's
domain if any client-side calls are ever added.

### 3. Point the frontend at it via `NEXT_PUBLIC_API_URL`

`.env.local.example` already documents this variable:

```
NEXT_PUBLIC_API_URL=https://api.voxa.ai
```

Once the backend exposes a `/leads` (or similar) endpoint for demo requests, update
`app/api/leads/route.ts` to forward validated submissions instead of only logging them:

```ts
await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(lead),
});
```

This keeps the swap to a one-line change (plus removing the `console.log` and `TODO`
comment already left in place in that file) — no component changes needed, since the
form already posts to `/api/leads` on this app, not directly to the backend.

### 4. Dashboard data

The `DashboardPreview` component on the landing page is a static mockup for marketing
purposes only — it is intentionally **not** wired to real data. The actual live
dashboard remains the existing Streamlit app in the AI-VOICE-AGENT repo (or a future
embedded/iframe’d version of it), not something rebuilt inside this Next.js project.
