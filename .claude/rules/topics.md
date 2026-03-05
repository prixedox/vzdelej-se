# Topics & Subjects

## Key Files

- Index: `src/lib/topics/index.ts` — exports `subjectTrees`, `subjects`, `getLeafTopics()`, `findTopic()`
- Math tree: `src/lib/topics/math-tree.ts` (21 leaf topics)
- Physics tree: `src/lib/topics/physics-tree.ts` (14 leaf topics)
- Types: `src/types/topic.ts`

## Structure

Hierarchical tree: Subject → Category → Topic (leaf)

```typescript
TopicNode { slug, name, description?, icon?, aiContext?, children?: TopicNode[] }
```

Only leaf nodes (`isLeaf: true` in DB) are actual lesson topics. Parent nodes are categories.

## Subjects

- **math** — Algebra (6), Funkce, Geometrie, Kombinatorika, Analýza
- **physics** — Mechanika (5), Termodynamika (3), Elektřina a magnetismus (3+), Vlnění a optika, Moderní fyzika

## DB Topics Table

Seeded via `pnpm seed:topics`. Each topic has: slug (unique per subject), name (Czech), parentId (self-join), order, isLeaf, difficulty, aiContext.

The `aiContext` field stores additional topic context (e.g., specific concepts to cover) used when authoring lesson content.

## Routing

`/topics` → subject cards → `/topics/[subjectSlug]` → topic tree → `/topics/[subjectSlug]/[topicSlug]` → lesson picker
