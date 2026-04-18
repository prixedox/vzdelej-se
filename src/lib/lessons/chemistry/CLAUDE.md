# src/lib/lessons/chemistry/

Chemistry chapter content. One folder per leaf topic from `src/lib/topics/chemistry-tree.ts`; one file per chapter inside.

All topics are currently marked `comingSoon: true` in the tree — no chapter files required. When a topic is ready to launch:

1. Flip `comingSoon: false` (or remove the field) in `chemistry-tree.ts`
2. `pnpm new-chapter chemistry/<topic>/intro "<Czech title>"`
3. Fill in the lesson content
4. `pnpm build:registry && pnpm validate:content`

See `../CLAUDE.md` for the schema, validation rules, and conventions. All user-facing text is Czech; SI units.
