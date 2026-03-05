# Vzdělej.se

Czech educational platform for math & physics. Static interactive lessons with file-based content. No database, no auth — pure static site.

## Commands

```bash
pnpm dev              # Dev server (Turbopack)
pnpm build            # Production build
pnpm lint             # ESLint
```

## Code Style

- TypeScript strict — no `any` types
- Imports: `@/` alias (maps to `src/`), order: React → external → internal
- PascalCase component files, `"use client"` only when needed
- All user-facing text is **Czech** (UI, lessons)
- `cn()` from `@/lib/utils` for conditional Tailwind classes

## Architecture

```
src/app/          → Next.js App Router: (app)/ main pages, (marketing)/ public pages
src/components/   → ui/ (shadcn), layout/, lesson/ (slides + 26 visual types)
src/lib/          → lessons/ (static content data), lesson/ (loader + answer eval + slides), topics/ (topic trees), utils/
src/types/        → lesson.ts, slide.ts, topic.ts
```

## How Lessons Work

- Lesson content stored as TS objects in `src/lib/lessons/data.ts`
- Keyed by `${topicSlug}-${difficulty}` (e.g., `linearni-rovnice-beginner`)
- Topic page navigates to `/lessons/${topicSlug}?difficulty=${difficulty}&subject=${subjectSlug}`
- Lesson page loads content from TS file, passes to `LessonShell`
- Answer validation is client-side only (`src/lib/lesson/answer-evaluator.ts`)
- No server calls, no progress persistence — all in-session only

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · Radix UI · KaTeX · Zod · Motion
