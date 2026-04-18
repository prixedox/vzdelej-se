# src/lib/lessons/geography/

Geography chapter content. One folder per leaf topic from `src/lib/topics/geography-tree.ts`; one file per chapter inside.

All topics are currently marked `comingSoon: true` — no chapter files required. When ready:

1. Flip `comingSoon: false` in `geography-tree.ts`
2. `pnpm new-chapter geography/<topic>/intro "<Czech title>"`
3. Fill in the lesson content
4. `pnpm build:registry && pnpm validate:content`

Geography fits the existing step types well — `multiple-choice` for places/capitals, `text-input` for numeric data (area, population), `sort-order` for ranking, `prediction` for climate/region associations. All user-facing text in Czech.
