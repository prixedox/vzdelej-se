---
paths:
  - "src/lib/topics/**"
  - "src/components/topic/**"
  - "src/types/topic.ts"
  - "src/app/(app)/topics/**"
---

# Topics & Subjects

Static topic trees defined in TypeScript. No database.

## Files

- `src/lib/topics/index.ts` — exports `subjectTrees`, `subjects`, `getLeafTopics()`, `findTopic()`, slug union types
- `src/lib/topics/math-tree.ts` — 21 leaf topics across Algebra, Functions, Geometry, Combinatorics, Analysis
- `src/lib/topics/physics-tree.ts` — 14 leaf topics across Mechanics, Thermodynamics, E&M, Waves/Optics, Modern

## Structure

```typescript
TopicNode { slug, name, description?, icon?, aiContext?, children?: TopicNode[] }
```

- `slug` — English URL-safe identifier (e.g. `linear-equations`, `quantum-physics`)
- `name`, `description`, `aiContext` — Czech display text

Hierarchical: Subject → Category → Topic (leaf). Only leaf nodes (no `children`) link to chapters.

## Adding a New Topic

Prefer the scaffolder — it inserts the node + creates an `intro.ts` chapter:

```bash
pnpm new-topic math/algebra/polynomials "Polynomy"
```

Manual steps:

1. Add `TopicNode` (English slug, Czech name) under the right category in `math-tree.ts` or `physics-tree.ts`
2. Create `src/lib/lessons/{subject}/{slug}/intro.ts` exporting a `ChapterDefinition` whose `topicSlug` matches
3. `pnpm build:registry && pnpm validate:content`

## Routing

`/topics` → subject cards → `/topics/[subjectSlug]` → topic tree → `/topics/[subjectSlug]/[topicSlug]` → chapter list → `/topics/[subjectSlug]/[topicSlug]/[chapterSlug]` → lesson player
