# Vzdělej.se

Czech educational platform for math & physics. Static interactive lessons — no database, no auth, no server calls. Pure static site.

## Commands

```bash
pnpm dev              # Dev server (Turbopack) — http://localhost:3000
pnpm build            # Production build — run before pushing to catch errors
pnpm lint             # ESLint
```

## Code Style

- TypeScript strict — no `any`, no `@ts-ignore`
- Imports: `@/` alias (maps to `src/`), order: React → external libs → internal
- PascalCase component files, `"use client"` only when hooks/browser APIs are used
- All user-facing text is **Czech** — code comments can be English
- `cn()` from `@/lib/utils` for conditional Tailwind classes
- Animations: import from `motion/react` (NOT `framer-motion`)

## Architecture

```
src/app/          → Next.js App Router: (app)/ with sidebar layout, (marketing)/ public pages
src/components/   → ui/ (shadcn), layout/, lesson/ (slides + visuals), topic/
src/lib/          → lessons/ (content data), lesson/ (slide builder + evaluator), topics/ (trees), utils/
src/types/        → Shared interfaces: lesson, lesson-v2, slide, slide-v2, topic
```

**Data flow:** `types/` ← `lib/` ← `components/` ← `app/`. Never import backwards.

## Two Lesson Formats

- **V1** (`LessonContent`) — structured: concept → walkthrough → practice → summary. Builder: `build-slides.ts`
- **V2** (`LessonV2`) — flat step sequence (explain, mc, text-input, explore, reveal, sort-order). Builder: `build-slides-v2.ts`

**New lessons use V2.** V1 exists for older content.

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

- Missing lesson content → show "Lekce nenalezena" fallback with back link (see `lessons/[lessonId]/page.tsx`)
- Visual component gets unknown type → render nothing (silent fail in `visual-block.tsx` switch)
- Answer evaluation never throws — always returns boolean

## Accessibility

- Interactive visuals must have descriptive `aria-label` on the container
- Keyboard navigation: Arrow keys for slides, Tab for interactive controls
- All form inputs need associated `<Label>` components
- Use semantic HTML (`<main>`, `<nav>`, `<section>`) in layouts
- Color alone should not convey meaning — pair with icons or text

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · Radix UI · KaTeX · Zod · Motion
