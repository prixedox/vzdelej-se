# src/lib/

Pure logic and data. No React imports — components belong in `src/components/`.

| Directory | Purpose |
|-----------|---------|
| `lesson/` | Engine: slide builder, beat builder, answer evaluator, goal check + solver, progress store, math colors, `stages/` readout modules |
| `lessons/` | Static chapter content: `data.ts` shim + `data.generated.ts` (generated) + `{subject}/{topic}/{chapter}.ts` files + Zod schema, stage cross-checks, diacritic gate |
| `topics/` | One `{subject}-tree.ts` per subject (math, physics, chemistry, biology, informatics, history, geography) + `index.ts` |

Root: `utils.ts` exports `cn()` (clsx + tailwind-merge). `static-params.ts` enumerates every dynamic route for `output: "export"`.

## Design

- All functions are pure: input → output, no side effects (progress-store is the single exception — scoped to `localStorage`)
- Single source of truth: chapters on disk → `data.generated.ts` via codegen → `data.ts` query API
- Discriminated unions (`type` field) drive all branching — adding a variant forces handling everywhere
