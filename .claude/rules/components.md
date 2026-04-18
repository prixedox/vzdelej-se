---
paths:
  - "src/components/**"
---

# Components

## Core Flow: Lesson Player

```
LessonShell → SlideDeck → SlideRenderer → slides/* → visuals/*
```

- `lesson-shell.tsx` — Receives a `ChapterDefinition`, builds slides, tracks answers, records completion via `recordChapterCompletion(topicSlug, chapterSlug, result)`
- `slide-deck.tsx` — Navigation (← → keys + buttons), blocks advancing past unanswered questions
- `slide-renderer.tsx` — Routes `slide.type` to the correct component
- `math-display.tsx` — `MathDisplay` for single LaTeX, `MathText` for markdown+LaTeX. Callouts: `> [!tip]`, `> [!info]`, `> [!warning]`, `> [!key]`

## Adding New Components

**New visual type:**
1. Add type string to `VisualType` in `src/types/lesson.ts`
2. Create component in `src/components/lesson/visuals/` (`"use client"`)
3. Add case in `visual-block.tsx`

**New slide/step type:**
1. Add step variant to `LessonStep` union in `src/types/lesson.ts`
2. Add slide variant to `Slide` union in `src/types/slide.ts`
3. Create the slide component in `src/components/lesson/slides/`
4. Add cases in `slide-renderer.tsx` and `src/lib/lesson/build-slides.ts`
5. If answers are involved, extend `src/lib/lesson/answer-evaluator.ts`

## Design Rules

- **Props down, callbacks up** — parent owns state, child signals via `onAnswer`, `onInteracted`, `onNext` etc.
- **Visual props are `Record<string, unknown>`** — always cast to a typed interface inside the component
- **Keyboard nav** skips capture when focus is on `input`/`textarea`/`select`
- Use `slider-control.tsx` for all parameter sliders in visuals
- Canvas/animation effects must clean up in useEffect return (requestAnimationFrame, ResizeObserver)
- All user-visible text is Czech
