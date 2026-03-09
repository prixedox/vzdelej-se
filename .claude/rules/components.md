---
paths:
  - "src/components/**"
---

# Components

## Core Flow: Lesson Player

```
LessonShell → SlideDeck/V2 → SlideRenderer/V2 → slides/* → visuals/*
```

- `lesson-shell.tsx` — Detects V1 vs V2, builds slides, manages answer state
- `slide-deck.tsx` / `slide-deck-v2.tsx` — Navigation (← → keys + buttons), blocks advancing past unanswered questions
- `slide-renderer.tsx` / `slide-renderer-v2.tsx` — Routes `slide.type` to the correct component
- `math-display.tsx` — `MathDisplay` for LaTeX expressions, `MathText` for markdown+LaTeX. Supports callouts: `> [!tip]`, `> [!info]`, `> [!warning]`, `> [!key]`

## Adding New Components

**New visual type:**
1. Add type string to `VisualType` in `src/types/lesson.ts`
2. Create component in `src/components/lesson/visuals/` (`"use client"`)
3. Add case in `visual-block.tsx`

**New slide type (V2):**
1. Add step type to `src/types/lesson-v2.ts`
2. Add slide interface to `src/types/slide-v2.ts` + union
3. Create component in `src/components/lesson/slides/`
4. Add case in `slide-renderer-v2.tsx` and `build-slides-v2.ts`

## Design Rules

- **Props down, callbacks up** — parent owns state, child signals via `onAnswer`, `onNext` etc.
- **Visual props are `Record<string, unknown>`** — always cast to a typed interface inside the component
- **Keyboard nav** skips capture when focus is on `input`/`textarea`/`select`
- Use `slider-control.tsx` for all parameter sliders in visuals
- Canvas/animation effects must clean up in useEffect return (requestAnimationFrame, ResizeObserver)
