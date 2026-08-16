# src/components/lesson/beats/

The prompt column of a stage lesson — what the student reads next to the stage.

## Files

| File | Role |
|------|------|
| `beat-strip.tsx` | Renders the current `Beat` (`observe` \| `manipulate` \| `predict`) and its escape hatch |
| `naming-panel.tsx` | Renders the `naming` beat — the formula's one required appearance |

## Nothing Blocks

A stage lesson is never scored and never gates. `BeatStrip` reflects progress, it does not
enforce it:

- `manipulate` — `reached` turns true when the goal holds; "Ukaž mi to" (`onShowMe`) springs
  the stage to a solved state for a student who is stuck
- `predict` — picking an option calls `onPredictAnswered`, which springs the stage to `then`.
  A wrong pick still advances; the reveal is the teaching, not the score
- `observe` — prompt only

A student who is already stuck must never meet a locked door.

## Naming Panel

`naming.formula` is the first place the formula may appear. `validate-stage.ts` fails the
build if the formula's token leaks into any earlier beat's prompt, nudge, question, option,
`onReached`, or reveal text — the whole format is derive-then-name.

## Rules

- `"use client"` — both use hooks/animation
- Props down, callbacks up — `StageShell` owns beat index and params
- `MathText` for prompts (markdown + LaTeX), `MathDisplay` for the bare formula
- Czech for all visible text
