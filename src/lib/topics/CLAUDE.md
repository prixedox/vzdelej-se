# src/lib/topics/

Topic tree definitions. Hierarchical: Subject → Category → Topic (leaf).

## Files

| File | Purpose |
|------|---------|
| `index.ts` | Exports `subjectTrees`, `subjects`, `getLeafTopics()`, `findTopic()` |
| `math-tree.ts` | Math topic tree: Algebra (6), Funkce (5), Geometrie (4), Kombinatorika (2), Analýza (3) = 21 leaf topics |
| `physics-tree.ts` | Physics topic tree: Mechanika (5), Termodynamika (3), E&M (3), Vlnění a optika (2), Moderní fyzika (1) = 14 leaf topics |

## TopicNode Structure

```typescript
TopicNode {
  slug: string;        // URL-safe identifier, unique per subject
  name: string;        // Czech display name
  description?: string;
  icon?: string;
  aiContext?: string;   // Extra context for content authoring
  children?: TopicNode[];  // Absent on leaf nodes
}
```

Only **leaf nodes** (no `children`) are actual lesson topics that link to content.

## Adding a New Topic

1. Add `TopicNode` to the appropriate tree file (`math-tree.ts` or `physics-tree.ts`)
2. Place it under the correct category parent
3. The `slug` must match the lesson key prefix in `src/lib/lessons/data.ts`
4. Create the corresponding lesson file in `src/lib/lessons/`
