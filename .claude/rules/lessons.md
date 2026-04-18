---
paths:
  - "src/lib/lesson/**"
  - "src/lib/lessons/**"
  - "src/types/chapter.ts"
  - "src/types/lesson.ts"
  - "src/types/slide.ts"
---

# Lesson System

Lessons are static TS chapter files under `src/lib/lessons/{subject}/{topic}/{chapter}.ts`. A codegen script stitches them into `src/lib/lessons/data.generated.ts`; `data.ts` exposes a tiny query API on top. No database, no API calls.

## Content Flow

1. User picks a chapter → `/topics/${subjectSlug}/${topicSlug}/${chapterSlug}`
2. Page calls `getChapter(topicSlug, chapterSlug)` from `@/lib/lessons/data`
3. `LessonShell` builds slides, manages answer state locally
4. On completion: `recordChapterCompletion(topicSlug, chapterSlug, result)` writes tier/score to `localStorage`

## Key Files

- Chapter files: `src/lib/lessons/{subject}/{topic-slug}/{chapter-slug}.ts` — each exports `export const chapter: ChapterDefinition`
- Query API: `src/lib/lessons/data.ts` — `getChapter`, `hasChapter`, `getChaptersForTopic`
- Generated registry: `src/lib/lessons/data.generated.ts` — DO NOT hand-edit (committed, rebuilt by `pnpm build:registry`)
- Schema: `src/lib/lessons/schema.ts` — Zod `chapterSchema` (run via `pnpm validate:content`)
- Builder: `src/lib/lesson/build-slides.ts` — `Lesson` → `Slide[]`
- Evaluator: `src/lib/lesson/answer-evaluator.ts` — client-side, never throws
- Progress: `src/lib/lesson/progress-store.ts` — per-chapter tier, streak, spaced review
- Types: `src/types/chapter.ts`, `src/types/lesson.ts`, `src/types/slide.ts`

## Adding a New Chapter

```bash
pnpm new-chapter math/linear-equations/two-step-equations "Dvoukrokové rovnice"
```

Or by hand:

```ts
// src/lib/lessons/math/linear-equations/two-step-equations.ts
import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Dvoukrokové rovnice",
  steps: [
    { type: "explain", body: "Rovnice typu $2x + 3 = 11$ řešíme ve dvou krocích..." },
  ],
  summary: { keyTakeaways: ["Nejdřív odečítáme/přičítáme, pak násobíme/dělíme."] },
};

export const chapter: ChapterDefinition = {
  slug: "two-step-equations",
  topicSlug: "linear-equations",
  order: 2,
  title: "Dvoukrokové rovnice",
  lesson,
};
```

Then `pnpm build:registry` (or just `pnpm dev` — `predev` regenerates).

## Step Types

`explain` (2–3 sentences + optional visual) · `multiple-choice` (per-choice feedback, exactly one correct) · `text-input` (free text, optional `wrongAnswerFeedback` + `numericTolerance`) · `explore` (interactive visual + prompt) · `reveal` (click-to-show) · `sort-order` (drag to reorder) · `prediction` (guess-then-reveal).

## Answer Evaluation

Normalizes both strings (trim, lowercase, Czech comma→dot, strip LaTeX). Checks: exact match → acceptable variants → numeric tolerance (`|user - expected| <= tolerance`). Fractions (`1/9`) and scientific notation (`3,34·10^-7`) are supported.

## Gotchas

- User-facing text is Czech; slugs, filenames and identifiers are English
- `text-input` with `numericTolerance` must have a numeric `expectedAnswer` or `acceptableAnswer`
- `multiple-choice` must have exactly one `isCorrect: true`
- Chapter filename (minus `.ts`) must equal `chapter.slug`. `topicSlug` must be a leaf in the topic tree
- `order` must be unique within a topic
