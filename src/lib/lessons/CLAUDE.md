# src/lib/lessons/

Static chapter content. One file per chapter.

## Structure

```
data.ts                      ← Thin query API: getChapter, hasChapter, getChaptersForTopic
data.generated.ts            ← AUTO-GENERATED registry (committed) — never hand-edit
schema.ts                    ← Zod `chapterSchema` used by scripts/validate-content.ts
{subject}/                   ← math/ or physics/
  {topic-slug}/              ← English topic slug (e.g. linear-equations)
    {chapter-slug}.ts        ← English chapter slug (e.g. intro)
```

Each chapter file exports `export const chapter: ChapterDefinition` with `{slug, topicSlug, order, title, lesson}`. Title and lesson content are Czech; slugs/identifiers are English.

## Adding a New Chapter

```bash
pnpm new-chapter math/linear-equations/two-step-equations "Dvoukrokové rovnice"
```

Then edit the generated file and run `pnpm build:registry` (or just `pnpm dev` — `predev` regenerates).

Manual steps if you'd rather:

1. Create `src/lib/lessons/{subject}/{topic-slug}/{chapter-slug}.ts`
2. Export `export const chapter: ChapterDefinition = { slug, topicSlug, order, title, lesson }`
3. `pnpm build:registry` to refresh `data.generated.ts`

## Validation

`pnpm validate:content` (runs on `prebuild`) enforces via Zod:

- Slug shape `^[a-z0-9-]+$` on `slug` + `topicSlug`
- `multiple-choice` steps have exactly one `isCorrect: true`
- `text-input` with `numericTolerance` must have a numeric `expectedAnswer` / `acceptableAnswer`
- Registry key `${topicSlug}/${slug}` matches file location
- `topicSlug` exists as a leaf in the topic tree
- No two chapters in a topic share the same `order`
- Every leaf topic has at least one chapter

## Content Rules

- All user-facing text in Czech, LaTeX for math (`$...$` inline, `$$...$$` block)
- `explain` steps: 2–3 sentences max, use visuals liberally
- Multiple-choice: every choice needs `feedback` explaining why it is right/wrong
