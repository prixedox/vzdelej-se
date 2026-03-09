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

- `src/lib/topics/index.ts` — exports `subjectTrees`, `subjects`, `getLeafTopics()`, `findTopic()`
- `src/lib/topics/math-tree.ts` — 21 leaf topics: Algebra (6), Funkce (5), Geometrie (4), Kombinatorika (2), Analýza (3)
- `src/lib/topics/physics-tree.ts` — 14 leaf topics: Mechanika (5), Termodynamika (3), E&M (3), Vlnění a optika (2), Moderní fyzika (1)

## Structure

```typescript
TopicNode { slug, name, description?, icon?, aiContext?, children?: TopicNode[] }
```

Hierarchical: Subject → Category → Topic (leaf). Only leaf nodes (no `children`) link to lessons.

## Adding a New Topic

1. Add `TopicNode` to `math-tree.ts` or `physics-tree.ts` under the right category
2. `slug` must match the lesson key prefix in `src/lib/lessons/data.ts`
3. Create the lesson file in `src/lib/lessons/`

## Routing

`/topics` → subject cards → `/topics/[subjectSlug]` → topic tree → `/topics/[subjectSlug]/[topicSlug]` → start lesson
