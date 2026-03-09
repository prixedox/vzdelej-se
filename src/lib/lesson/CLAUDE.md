# src/lib/lesson/

Lesson engine — builds slides and validates answers. Pure functions, no React.

## Files

| File | Purpose |
|------|---------|
| `build-slides.ts` | `LessonContent` → `Slide[]` (V1: Teorie → Ukázka → Procvičení → Shrnutí) |
| `build-slides-v2.ts` | `LessonV2` → `SlideV2[]` (V2: steps 1:1 → summary → complete) |
| `answer-evaluator.ts` | `checkAnswer()` — normalize, exact match → acceptable list → numeric tolerance |
| `lesson-loader.ts` | Helpers for resolving lesson content from registry |

## Answer Evaluation Details

1. Normalize: trim, lowercase, Czech comma→dot, strip LaTeX wrappers
2. Exact match with expected answer
3. Match against `acceptableAnswers[]`
4. Numeric tolerance: `|userNum - expectedNum| <= tolerance`

Always returns boolean, never throws.
