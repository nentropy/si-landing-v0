# Shaivra Landing (Pre‑Launch)

Minimal, mystical landing page + SSO portal using **Next.js, Tailwind, Framer Motion, NextAuth (GCP OAuth)**.

## Quickstart (local)
```bash
pnpm i
cp .env.example .env.local
pnpm dev
```

## Deploy (Vercel + v0)
1. Push to GitHub and import in Vercel.
2. Set env vars (Vercel Project Settings → Environment Variables):
   - NEXTAUTH_URL=https://{DOMAIN}
   - NEXTAUTH_SECRET=(random 32+ chars)
   - DATABASE_URL=postgres://...
   - GCP_CLIENT_ID / GCP_CLIENT_SECRET from GCP OAuth app
3. Add a DNS record `sso.{DOMAIN}` → Vercel project (or dedicated SSO host later).
4. (Optional) Enable GitHub provider for dev convenience.
5. Restrict sign‑ups: only `@shaivraintel.com` emails are allowed by default.

### GCP OAuth notes
- Create an OAuth 2.0 Client ID (type: Web Application)
- Authorized redirect URIs: `https://{DOMAIN}/api/auth/callback/google`

## Structure
- `/` — public landing (logo, mantra, SSO button)
- `/portal` — SSO‑protected portal with collapsible sidebar
- `/api/auth/[...nextauth].ts` — NextAuth config (GCP + GitHub optional)

## Security
- HTTPS only (HSTS via Vercel)
- Secrets in env vars
- Minimal PII; store only user email + role in Postgres
- Domain‑gated admin signups (`@shaivraintel.com`)

## Theming
- Obsidian `#0D0D0D`, Spectral white `#F5F5F5`, Aura blue `#4FC3F7`
- Logo aura glow via utility classes
