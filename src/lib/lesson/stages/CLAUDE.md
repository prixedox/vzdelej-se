# src/lib/lesson/stages/

One pure readout module per `StageType`, plus the registry that binds them. No React, no DOM.

## Files

| File | Purpose |
|------|---------|
| `registry.ts` | `stageRegistry: Record<StageType, StageModule>` — exhaustive, so a declared-but-unimplemented stage is a `tsc` error. `getStageModule(type)` returns `null` for unknown strings |
| `parabola-roots.ts` | `y = ax² + bx + c` → `rootCount`, `rootGap`, `vertexY`. Exports `safeA` |
| `log-slide-rule.ts` | Two log rulers → readouts from `offset` |
| `motion-timeline.ts` | Motion strip → readouts from `t`, `h`, `v0`, `a` |

## StageModule Contract

| Field | Meaning |
|-------|---------|
| `params` | Every key accepted in `stage.initial`, a beat `preset`, or a `predict` beat's `then` |
| `solvableParams` | The subset the student can actually move in the component. `solveGoal` may propose changes to these only |
| `ranges` | Inclusive `[min, max]` per param — drives the "Ukaž mi to" search and range validation |
| `readouts_declared` | The readout keys beat goals may reference |
| `readouts(p)` | Pure. Must return exactly the declared keys, all finite |

`solvableParams` is the field that gets stale. It is a claim about
`src/components/lesson/stages/*-stage.tsx` — read the component and count its controls rather
than assuming every param is draggable. Proposing a change to a param with no control
demonstrates a motion the student cannot reproduce.

## Rules

- **Pure** — `readouts()` takes a param map and returns numbers. No clock, no randomness, no I/O
- **Total** — never throw and never return `NaN`/`Infinity`; clamp degenerate inputs instead
  (see `safeA`, which guards `a → 0` for everyone, components included)
- Export the param/readout key arrays as named constants and feed the registry from them, so
  the module stays the single source of truth
- Each module has a `*.test.ts` beside it; `registry.test.ts` covers the cross-module invariants
