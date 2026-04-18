# Vzdělej.se

Czech educational platform for math & physics. Static interactive lessons — no database, no auth, no server calls. Pure static site.

## Commands

```bash
pnpm dev              # Dev server (Turbopack) — http://localhost:3000 (predev rebuilds registry)
pnpm build            # Production build — prebuild rebuilds registry + validates content
pnpm lint             # ESLint
pnpm test             # Vitest in watch mode
pnpm test:run         # Vitest one-shot (CI)
pnpm build:registry   # Regenerate src/lib/lessons/data.generated.ts
pnpm validate:content # Zod validation over every chapter + tree cross-check
pnpm new-chapter <subject>/<topic>/<chapter> [title]   # Scaffold a chapter
pnpm new-topic   <subject>/<category>/<topic>  [name]  # Scaffold topic + intro chapter
```

## Code Style

- TypeScript strict — no `any`, no `@ts-ignore`
- Imports: `@/` alias (maps to `src/`), order: React → external libs → internal
- PascalCase component files, `"use client"` only when hooks/browser APIs are used
- All user-facing text is **Czech** — code comments, identifiers, and slugs are English
- `cn()` from `@/lib/utils` for conditional Tailwind classes
- Animations: import from `motion/react` (NOT `framer-motion`)

## Architecture

```
src/app/          → Next.js App Router: (app)/ with sidebar, (marketing)/ public pages
src/components/   → ui/ (shadcn), layout/, lesson/ (slide deck + slides + visuals), topic/
src/lib/          → lessons/ (chapter content), lesson/ (engine), topics/ (trees), utils/
src/types/        → Shared interfaces: chapter, lesson, slide, topic
scripts/          → Node-only codegen + validation + scaffolders
```

**Data flow:** `types/` ← `lib/` ← `components/` ← `app/`. Never import backwards.

**Chapter flow:** a topic is a folder of chapter files. `/topics/{subject}` lists topics → `/topics/{subject}/{topic}` lists chapters → `/topics/{subject}/{topic}/{chapter}` plays the lesson. Each chapter file at `src/lib/lessons/{subject}/{topic-slug}/{chapter-slug}.ts` exports `export const chapter: ChapterDefinition`. `scripts/build-registry.ts` stitches them into `src/lib/lessons/data.generated.ts` (committed); `data.ts` exposes `getChapter`, `getChaptersForTopic`, `hasChapter`.

## Czech Math Conventions

- Decimal comma: `3,14` not `3.14`
- Functions: `tg` (not `tan`), `cotg`, `ln`, `log`
- Intervals: `⟨a; b⟩` closed, `(a; b)` open
- LaTeX: `$...$` inline, `$$...$$` block

## Styling

- Tailwind CSS 4 with `@tailwindcss/postcss`
- Responsive: mobile-first. Breakpoints: `md:` (768px — sidebar shows), `lg:` (1024px — wider padding)
- Dark mode: uses `next-themes`, respect `dark:` variants in all new UI
- Spacing: use Tailwind scale (`p-4`, `gap-6`), avoid arbitrary values
- shadcn/ui "new-york" style — add new components via `pnpm dlx shadcn@latest add <name>`, never edit `ui/` files manually

## Error Handling

- Missing chapter → show "Kapitola nenalezena" fallback with back link (see `[chapterSlug]/page.tsx`)
- Visual component gets unknown type → render nothing (silent fail in `visual-block.tsx` switch)
- Answer evaluation never throws — always returns boolean
- Content validation runs on `prebuild` — bad chapters fail the build loudly

## Accessibility

- Interactive visuals must have descriptive `aria-label` on the container
- Keyboard navigation: Arrow keys for slides, Tab for interactive controls
- All form inputs need associated `<Label>` components
- Use semantic HTML (`<main>`, `<nav>`, `<section>`) in layouts
- Color alone should not convey meaning — pair with icons or text

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · Radix UI · KaTeX · Zod · Motion · Vitest
