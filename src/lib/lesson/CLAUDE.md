# src/lib/lesson/

Lesson engine — builds slides, validates answers, persists per-chapter progress. No React.

## Files

| File | Purpose |
|------|---------|
| `build-slides.ts` | `Lesson` → `Slide[]` — 1:1 step-to-slide map, then summary + complete |
| `answer-evaluator.ts` | `checkAnswer()` — normalize, exact match → acceptable list → numeric tolerance |
| `progress-store.ts` | `localStorage`-backed chapter progress, streak, spaced retrieval |
| `math-colors.ts` | Shared LaTeX color tokens for consistent math styling |

## Answer Evaluation

1. Normalize: trim, lowercase, Czech comma→dot, strip LaTeX wrappers
2. Exact match with `expectedAnswer`
3. Match against `acceptableAnswers[]`
4. Numeric tolerance: `|userNum - expectedNum| <= numericTolerance` (supports fractions `1/9` and `3,34·10^-7`)

Always returns boolean, never throws.

## Progress Store

STORAGE_KEY is `"vzdelej-se-progress-v2"`. Chapter keys are `${topicSlug}/${chapterSlug}`.

Public API: `loadProgress`, `recordChapterCompletion(topicSlug, chapterSlug, result)`, `getChapterProgress`, `getTopicAggregateProgress(topicSlug, chapterSlugs)` (returns `{completedChapters, totalChapters, overallTier}` — `overallTier` is the worst tier across all chapters, non-null only when every chapter is complete), `updateStreak`, `getStreak`, `getChaptersForReview`, `getCompletedChapterKeys`.

Tier thresholds: `gold` ≥ 1, `silver` ≥ 0.8, `bronze` > 0.
