# src/components/lesson/stages/

One component per `StageType` — the persistent manipulable a stage lesson is built around.

## Files

| File | Role |
|------|------|
| `stage-canvas.tsx` | `StageType` → component dispatch. Exhaustive via `assertUnreachable`, so an unhandled `StageType` fails `tsc` here, not at runtime. Also exports `StageProps` |
| `parabola-roots-stage.tsx` | `y = ax² + bx + c` — student drags/slides `c` only |
| `log-slide-rule-stage.tsx` | Two log rulers — student drags `offset` only |
| `motion-timeline-stage.tsx` | Motion strip — student moves `t` and `h` only |

## Controlled, Not Self-Contained

These invert the rule in `../visuals/CLAUDE.md`. Visuals own their state; stages own **none**:

- `params` come down, `onParamsChange` goes up — no internal state for stage values
- `StageShell` is the single owner, because a beat has to *read* stage state to detect a goal
  and *write* it to spring a preset
- `interactive: false` during predict-reveal and naming — the student watches, cannot drag.
  Every drag handler and slider `onChange` must be gated on it
- `highlight?: string[]` spotlights the stage parts the current beat is about

## Matching the Registry

`src/lib/lesson/stages/registry.ts` declares `solvableParams` per stage — the params
`solveGoal` is allowed to move for "Ukaž mi to". That list must match what the component
actually exposes as a control. Adding a slider here without updating `solvableParams`
(or the reverse) makes "Ukaž mi to" demonstrate a motion the student cannot reproduce.

## Rules

- `"use client"` — all of them handle pointer input
- Pure SVG/coordinate math (`toSvgX`, `curvePath`, …) lives at module scope, not in the component
- Import the readout module from `@/lib/lesson/stages/*` rather than recomputing its math;
  shared guards like `safeA` exist so both sides clamp identically
- Descriptive `aria-label` on the SVG container
- Czech for all visible text
