---
paths:
  - "src/lib/lesson/**"
  - "src/lib/lessons/**"
  - "src/types/lesson*.ts"
  - "src/types/slide*.ts"
---

# Lesson System

Lessons are static TS objects in `src/lib/lessons/data.ts`. No database, no API calls.

## Content Flow

1. User picks topic + difficulty → navigates to `/lessons/${topicSlug}?difficulty=${difficulty}&subject=${subjectSlug}`
2. Lesson page calls `getLesson()` from `data.ts`
3. `LessonShell` builds slides, manages answer state locally
4. On completion: shows score (no persistence)

## Key Files

- Registry: `src/lib/lessons/data.ts` — keyed by `${topicSlug}-${difficulty}`
- Builders: `src/lib/lesson/build-slides.ts` (V1), `build-slides-v2.ts` (V2)
- Evaluator: `src/lib/lesson/answer-evaluator.ts` — client-side, never throws
- Types: `src/types/lesson.ts` + `slide.ts` (V1), `lesson-v2.ts` + `slide-v2.ts` (V2)

## Adding a New Lesson (V2)

```ts
// 1. Create src/lib/lessons/math/topic-slug-v2.ts
import type { LessonV2 } from "@/types/lesson-v2";
export const topicSlugV2Beginner: LessonV2 = { title: "...", steps: [...], summary: { keyTakeaways: [...] } };

// 2. Register in src/lib/lessons/data.ts
import { topicSlugV2Beginner } from "./math/topic-slug-v2";
registerLessonV2("topic-slug", "beginner", topicSlugV2Beginner);
```

Slug must match the topic slug in `src/lib/topics/`.

## V2 Step Types

`explain` (2-3 sentences + optional visual) · `multiple-choice` (per-choice feedback) · `text-input` (free text, optional wrong-answer feedback) · `explore` (interactive visual + prompt) · `reveal` (click-to-show) · `sort-order` (drag to reorder)

## V1 Structure (legacy)

`conceptExplanation` → `walkthroughProblem` → `practiceProblems` (exactly 3 hints each) → `summary`

## Answer Evaluation

Normalizes both strings (trim, lowercase, Czech comma→dot, strip LaTeX). Checks: exact match → acceptable variants → numeric tolerance (`|user - expected| <= tolerance`).

## Gotchas

- V1 practice problems must have exactly 3 hints
- No persistence — answers/progress lost on page reload
- File naming: `{topic-slug}-v2.ts` for V2, `{topic-slug}.ts` for V1
