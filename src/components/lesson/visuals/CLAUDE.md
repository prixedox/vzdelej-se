# src/components/lesson/visuals/

Interactive and static visual widgets embedded in slides. 27 types.

## Router

`visual-block.tsx` — switch on `VisualBlock.type`, renders the matching component. All are `"use client"`.

## Shared

`slider-control.tsx` — reusable slider with label + value. Use for all parameter controls.

## Design Patterns

- **Self-contained state** — each visual owns its own interactive state. Nothing leaks to parent
- **Derive, don't sync** — compute physics/math results from slider values in render. No separate state for computed values
- **Clean up effects** — `requestAnimationFrame`, `ResizeObserver`, event listeners must return cleanup in useEffect
- **Responsive** — use `width: 100%` and compute from container size, not hardcoded pixels
- **Pure drawing** — extract Canvas 2D / SVG path math into pure helper functions outside the component

## Props

Props arrive as `Record<string, unknown>` from the router. Define a typed interface inside your component and cast immediately.
