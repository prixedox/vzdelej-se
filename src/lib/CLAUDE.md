# src/lib/

Pure logic and data. No React imports — components belong in `src/components/`.

| Directory | Purpose |
|-----------|---------|
| `lesson/` | Slide builders (V1 + V2), answer evaluator, lesson loader |
| `lessons/` | Static lesson content data: `data.ts` registry + `math/` + `physics/` |
| `topics/` | Topic tree definitions (math-tree, physics-tree) |
| `utils/` | Czech pluralization, constants, general helpers |

Root: `utils.ts` exports `cn()` (clsx + tailwind-merge).

## Design

- All functions are pure: input → output, no side effects, no global state
- Single source of truth: lesson data in `lessons/data.ts`, topics in `topics/`
- Discriminated unions (`type` field) drive all branching — adding a variant forces handling everywhere
