# Authentication

## Architecture (3-file split)

1. **`src/lib/auth/auth.config.ts`** — Edge-safe config (NO DB imports). Used by middleware. Defines providers, JWT strategy, page routes.
2. **`src/lib/auth/config.ts`** — Full server config with DB. Extends authConfig, overrides Credentials provider with real authorize. Exports: `auth`, `signIn`, `signOut`, `handlers`.
3. **`src/middleware.ts`** — Edge middleware, uses authConfig only. Protects: /dashboard, /topics, /lessons, /profile, /subscription. Redirects to `/login?callbackUrl=...`.

## Providers

- **Google OAuth** — conditional on AUTH_GOOGLE_ID/SECRET env vars
- **Credentials** — email-based. Auto-creates user on first login (name = email prefix). No explicit signup needed.

## Session Enrichment

JWT callback sets `token.id = user.id`. Session callback (runs on EVERY `auth()` call) fetches fresh user from DB and enriches session with: `subscriptionStatus`, `xp`, `level`, `streak`, `dailyLessonsUsed`, `role`. DB errors silently caught — returns minimal session.

## Gotchas

- NEVER import DB or schema in `auth.config.ts` — it runs on Edge
- Schema is lazy-loaded in `config.ts` with fallback logic for local dev
- Session callback hits DB on every call — this is intentional for fresh gamification data
- Credentials provider returns null in authConfig (real logic in config.ts override)
