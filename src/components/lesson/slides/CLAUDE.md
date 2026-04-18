# src/components/lesson/slides/

One component per slide type. Each renders a single "screen" of a lesson.

## Slides

`explain-slide` · `mc-slide` · `text-input-slide` · `explore-slide` · `reveal-slide` · `sort-order-slide` · `prediction-slide` · `summary-slide`

Each corresponds 1:1 with a `LessonStep` variant (`@/types/lesson`) plus the terminal summary/complete slides. Adding a new slide type:

1. Add step variant to `@/types/lesson` (`LessonStep` union)
2. Add slide variant to `@/types/slide` (`Slide` union)
3. Create the component here
4. Add case in `slide-renderer.tsx` and `build-slides.ts`

## Conventions

- Receives slide data as props — no data fetching inside
- Answer callbacks (`onAnswer`, `onInteracted`) passed down from LessonShell
- Use `MathText` for body text with mixed markdown + LaTeX
- All visible text in Czech
