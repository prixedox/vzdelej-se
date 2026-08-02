# src/lib/lesson/

Lesson engine — builds slides/beats, validates answers, solves stage goals, persists
per-chapter progress. No React.

## Files

| File | Purpose |
|------|---------|
| `build-slides.ts` | `Lesson` → `Slide[]` — 1:1 step-to-slide map, then summary + complete |
| `build-beats.ts` | `StageLesson` → `StageScreen[]` — one screen per beat, then naming, `apply`, summary, complete |
| `answer-evaluator.ts` | `checkAnswer()` — normalize, exact match → acceptable list → numeric tolerance |
| `goal.ts` | `isGoalMet(goal, readouts)` — declarative, never throws |
| `solve-goal.ts` | `solveGoal(goal, mod, current)` — backs "Ukaž mi to". Sweeps only `mod.solvableParams`, never all of `mod.params`: proposing a change to a param the student cannot touch would demonstrate a motion they cannot reproduce |
| `lerp-params.ts` | Linear interpolation between two param maps — makes a beat preset travel instead of teleport |
| `progress-store.ts` | `localStorage`-backed chapter progress, streak, spaced retrieval |
| `math-colors.ts` | Shared LaTeX color tokens for consistent math styling |
| `stages/` | One pure readout module + registry entry per `StageType` — see `stages/registry.ts` |

## Answer Evaluation

1. Normalize: trim, lowercase, Czech comma→dot, strip LaTeX wrappers
2. Exact match with `expectedAnswer`
3. Match against `acceptableAnswers[]`
4. Numeric tolerance: `|userNum - expectedNum| <= numericTolerance` (supports fractions `1/9` and `3,34·10^-7`)

Always returns boolean, never throws.

## Progress Store

STORAGE_KEY is `"vzdelej-se-progress-v2"`. Chapter keys are `${topicSlug}/${chapterSlug}`.

Public API: `loadProgress`, `recordChapterCompletion(topicSlug, chapterSlug, result)` (deck — scored), `recordChapterDerived(topicSlug, chapterSlug)` (stage — marks completion with `tier: null`, `derived: true`, never a score), `getChapterProgress`, `getTopicAggregateProgress(topicSlug, chapterSlugs)` (returns `{completedChapters, totalChapters, overallTier}` — `overallTier` ranks only SCORED (non-derived) chapters, worst tier among them; stage chapters count toward `completedChapters` but never drag `overallTier` down for merely existing; non-null only once every chapter is complete AND at least one is scored), `updateStreak`, `getStreak`, `getChaptersForReview`, `getCompletedChapterKeys`.

Tier thresholds: `gold` ≥ 1, `silver` ≥ 0.8, `bronze` > 0.
