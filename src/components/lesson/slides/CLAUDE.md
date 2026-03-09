# src/components/lesson/slides/

One component per slide type. Each renders a single "screen" of a lesson.

## V1 Slides

concept-slide · practice-slide · walkthrough-intro/step/result-slide · summary-slide · section-title-slide · exploration-slide · knowledge-check-slide

## V2 Slides

explain-slide-v2 · mc-slide-v2 · text-input-slide-v2 · explore-slide-v2 · reveal-slide-v2 · sort-order-slide-v2 · summary-slide-v2

## Conventions

- Receives slide data as props — no data fetching inside
- Answer callbacks (`onAnswer`, `onCorrect`) passed down from LessonShell
- Use `MathText` for body text with mixed markdown + LaTeX
- All visible text in Czech
