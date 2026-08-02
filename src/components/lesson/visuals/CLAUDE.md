# src/components/lesson/visuals/

Interactive and static visual widgets embedded in slides.

## Router

`visual-block.tsx` — switch on `VisualBlock.type` (see `@/types/lesson` `VisualType`), renders the matching component. Unknown types render nothing (silent fail). All visuals are `"use client"`.

## Shared

`slider-control.tsx` — reusable slider with label + value, rendered with a Czech decimal comma (`3,14`, not `3.14`). Use for all parameter controls.

## Design Patterns

- **Self-contained state** — each visual owns its own interactive state. Nothing leaks to parent
- **Derive, don't sync** — compute physics/math results from slider values in render. No separate state for computed values
- **Clean up effects** — `requestAnimationFrame`, `ResizeObserver`, event listeners must return cleanup in useEffect
- **Responsive** — use `width: 100%` and compute from container size, not hardcoded pixels
- **Pure drawing** — extract Canvas 2D / SVG path math into pure helper functions outside the component

> **Stages invert this.** `src/components/lesson/stages/` (a sibling directory, not part of
> this router) holds one component per `StageType`. Those are deliberately CONTROLLED —
> `params` down, `onParamsChange` up, no internal state of their own — because a beat must
> read stage state to detect a goal and write it to animate a preset. This is the design's
> most surprising decision relative to the rule above; see
> `src/components/lesson/CLAUDE.md` and `docs/superpowers/specs/2026-08-02-stage-lessons-design.md`
> before assuming every interactive widget should be self-contained.

## Props

Props arrive as `Record<string, unknown>` from the router. Define a typed interface inside your component and cast immediately.

## Adding a New Visual

1. Add the type string to `VisualType` in `@/types/lesson`
2. Create the component here (`"use client"`)
3. Add a case in `visual-block.tsx`
