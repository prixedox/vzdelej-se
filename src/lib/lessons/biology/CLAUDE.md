# src/lib/lessons/biology/

Biology chapter content. One folder per leaf topic from `src/lib/topics/biology-tree.ts`; one file per chapter inside.

All topics are currently marked `comingSoon: true` in the tree — no chapter files required. When a topic is ready to launch:

1. Flip `comingSoon: false` (or remove the field) in `biology-tree.ts`
2. `pnpm new-chapter biology/<topic>/intro "<Czech title>"`
3. Fill in the lesson content
4. `pnpm build:registry && pnpm validate:content`

See `../CLAUDE.md` for the schema, validation rules, and conventions. All user-facing text is Czech.
