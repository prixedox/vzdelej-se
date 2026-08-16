# src/lib/lessons/

Static chapter content. One file per chapter.

## Structure

```
data.ts                      ← Thin query API: getChapter, hasChapter, getChaptersForTopic
data.generated.ts            ← AUTO-GENERATED registry (committed) — never hand-edit
schema.ts                    ← Zod `deckChapterSchema` / `stageChapterSchema` (per-format), used by scripts/validate-content.ts
validate-stage.ts            ← Stage-only cross-checks: unknown params/readouts, formula-leak-before-naming
diacritics.ts                ← Czech diacritic gate over every prose field (see PROSE_KEYS)
{subject}/                   ← one dir per subject; only math/ and physics/ hold chapters today
  {topic-slug}/              ← English topic slug (e.g. linear-equations)
    {chapter-slug}.ts        ← English chapter slug (e.g. intro)
```

The other five subject dirs (chemistry, biology, informatics, history, geography) are empty on purpose — every leaf in their trees is `comingSoon`, which the validator skips. See each subject's own `CLAUDE.md` before adding the first chapter there.

Each chapter file exports `export const chapter: ChapterDefinition` — a `DeckChapter | StageChapter`
union discriminated on `format`. Deck chapters (`format` omitted or `"deck"`) have `lesson: Lesson`;
stage chapters (`format: "stage"`, required) have `lesson: StageLesson`. Both share
`{slug, topicSlug, order, title}`. Title and lesson content are Czech; slugs/identifiers are English.

## Adding a New Chapter

```bash
pnpm new-chapter math/linear-equations/two-step-equations "Dvoukrokové rovnice"
```

Then edit the generated file and run `pnpm build:registry` (or just `pnpm dev` — `predev` regenerates).

Manual steps if you'd rather:

1. Create `src/lib/lessons/{subject}/{topic-slug}/{chapter-slug}.ts`
2. Export `export const chapter: ChapterDefinition = { slug, topicSlug, order, title, lesson }`
3. `pnpm build:registry` to refresh `data.generated.ts`

```ts
// src/lib/lessons/math/linear-equations/two-step-equations.ts
import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Dvoukrokové rovnice",
  steps: [
    { type: "explain", body: "Rovnice typu $2x + 3 = 11$ řešíme ve dvou krocích..." },
  ],
  summary: { keyTakeaways: ["Nejdřív odečítáme/přičítáme, pak násobíme/dělíme."] },
};

export const chapter: ChapterDefinition = {
  slug: "two-step-equations",
  topicSlug: "linear-equations",
  order: 2,
  title: "Dvoukrokové rovnice",
  lesson,
};
```

## Step Types

`explain` (2–3 sentences + optional visual) · `multiple-choice` (per-choice feedback, exactly one
correct) · `text-input` (free text, optional `wrongAnswerFeedback` + `numericTolerance`) ·
`explore` (interactive visual + prompt) · `reveal` (click-to-show) · `sort-order` (drag to
reorder) · `prediction` (guess-then-reveal).

Stage chapters use beats instead (`observe`, `manipulate`, `predict` — see `@/types/stage`), and
may reuse these step types only in their `apply` screens.

## Validation

`pnpm validate:content` (runs on `prebuild`) branches on `chapter.format` and parses each
chapter against `deckChapterSchema` or `stageChapterSchema`, then enforces:

- Slug shape `^[a-z0-9-]+$` on `slug` + `topicSlug`
- `multiple-choice` steps have exactly one `isCorrect: true`
- `text-input` with `numericTolerance` must have a numeric `expectedAnswer` / `acceptableAnswer`
- Registry key `${topicSlug}/${slug}` matches file location
- `topicSlug` exists as a leaf in the topic tree
- No two chapters in a topic share the same `order`
- Every leaf topic has at least one chapter
- Every chapter's prose passes the Czech diacritic gate (`diacritics.ts`) — below a minimum
  háček/čárka ratio over enough letters, the build fails. The legacy `DIACRITIC_EXEMPT` list is
  now empty and the gate covers every chapter; keep it that way and fix the prose instead

Stage chapters only, via `validate-stage.ts`:

- `stage.type` must be a registered `StageType`; every param set in `stage.initial`, a beat's
  `preset`, or a `predict` beat's `then` must be one the stage module declares
- every readout `stage.readouts` lists (and every `manipulate` beat's `goal.readout`) must be
  one the stage module actually produces
- the naming formula's token must not leak into any beat's prompt/onReached/nudge/question/reveal/option
  text — the formula's first appearance must be in `naming`

## Content Rules

- All user-facing text in Czech, LaTeX for math (`$...$` inline, `$$...$$` block)
- `explain` steps: 2–3 sentences max, use visuals liberally
- Multiple-choice: every choice needs `feedback` explaining why it is right/wrong
