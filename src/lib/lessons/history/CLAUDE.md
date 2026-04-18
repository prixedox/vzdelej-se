# src/lib/lessons/history/

History chapter content. One folder per leaf topic from `src/lib/topics/history-tree.ts`; one file per chapter inside.

All topics are currently marked `comingSoon: true` — no chapter files required. When ready:

1. Flip `comingSoon: false` in `history-tree.ts`
2. `pnpm new-chapter history/<topic>/intro "<Czech title>"`
3. Fill in the lesson content
4. `pnpm build:registry && pnpm validate:content`

History lessons work well with the existing step types — `text-input` for dates, `multiple-choice` for events/people, `sort-order` for chronology, `prediction` for "what happened next?". All user-facing text in Czech.
