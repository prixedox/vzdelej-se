# Vzdělej.se

Czech educational platform for math & physics. Static interactive lessons with gamification, Stripe subscriptions, and progress tracking. Lesson content is pre-built (authored with Claude assistance during development), not generated at runtime.

## Commands

```bash
pnpm dev              # Dev server (Turbopack)
pnpm build            # Production build
pnpm lint             # ESLint
pnpm db:push          # Push schema to DB (dev)
pnpm db:generate      # Generate Drizzle migrations (prod)
pnpm db:migrate       # Run migrations (prod)
pnpm seed:topics      # Seed topic tree
pnpm seed:lessons     # Pre-generate lesson cache
```

## Code Style

- TypeScript strict — no `any` types
- Imports: `@/` alias (maps to `src/`), order: React → external → internal
- PascalCase component files, `"use client"` only when needed
- All user-facing text is **Czech** (UI, prompts, lessons)
- `cn()` from `@/lib/utils` for conditional Tailwind classes
- Validate inputs with Zod at API boundaries
- Drizzle ORM query builder — never raw SQL

## Critical Rules

- NEVER import DB/schema in `src/lib/auth/auth.config.ts` — it runs on Edge
- After schema changes: always `pnpm db:push`
- Stripe webhook requires signature validation
- Practice problems must have exactly 3 hints
- Answer validation is client-side only (trusts `isCorrect` sent to API)

## Architecture

```
src/app/          → Next.js App Router: (app)/ protected, (auth)/ login, (marketing)/ public, api/
src/components/   → ui/ (shadcn), layout/, lesson/ (slides + 26 visual types), dashboard/, gamification/
src/lib/          → db/ (Drizzle schema), auth/ (NextAuth 3-file split), lesson/ (loader + answer eval + slides), ai/ (prompts & schemas for seed script only), stripe/, rate-limit/
src/types/        → lesson.ts, slide.ts, topic.ts, user.ts
```

## Stack

Next.js 16 · React 19 · TypeScript · PostgreSQL (Neon) · Drizzle ORM · NextAuth.js 5 · Tailwind CSS 4 · shadcn/ui · Stripe · Upstash Redis · KaTeX · Zod · Motion
