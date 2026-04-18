# src/lib/

Pure logic and data. No React imports — components belong in `src/components/`.

| Directory | Purpose |
|-----------|---------|
| `lesson/` | Slide builder, answer evaluator, progress store, math colors |
| `lessons/` | Static chapter content: `data.ts` shim + `data.generated.ts` (generated) + `{subject}/{topic}/{chapter}.ts` files + Zod schema |
| `topics/` | Topic tree definitions (math-tree, physics-tree, index) |
| `utils/` | Czech pluralization, constants, general helpers |

Root: `utils.ts` exports `cn()` (clsx + tailwind-merge).

## Design

- All functions are pure: input → output, no side effects (progress-store is the single exception — scoped to `localStorage`)
- Single source of truth: chapters on disk → `data.generated.ts` via codegen → `data.ts` query API
- Discriminated unions (`type` field) drive all branching — adding a variant forces handling everywhere
