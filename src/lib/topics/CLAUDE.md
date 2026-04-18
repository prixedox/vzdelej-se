# src/lib/topics/

Topic tree definitions. Hierarchical: Subject → Category → Topic (leaf).

## Files

| File | Purpose |
|------|---------|
| `index.ts` | Exports `subjectTrees`, `subjects`, `getLeafTopics()`, `findTopic()`, slug union types |
| `math-tree.ts` | Math topic tree: 21 leaf topics across Algebra, Functions, Geometry, Combinatorics, Analysis |
| `physics-tree.ts` | Physics topic tree: 14 leaf topics across Mechanics, Thermodynamics, E&M, Waves/Optics, Modern |

## TopicNode Structure

```typescript
TopicNode {
  slug: string;        // URL-safe English identifier (e.g. "linear-equations"), unique per subject
  name: string;        // Czech display name (e.g. "Lineární rovnice")
  description?: string; // Czech
  icon?: string;
  aiContext?: string;   // Czech — extra hints for content authoring
  children?: TopicNode[];  // Absent on leaf nodes
}
```

Only **leaf nodes** (no `children`) are actual lesson topics. Each leaf must have at least one chapter file under `src/lib/lessons/{subject}/{slug}/`, or `pnpm validate:content` fails.

## Adding a New Topic

Prefer the scaffolder — it inserts the node + creates an `intro.ts` chapter:

```bash
pnpm new-topic math/algebra/polynomials "Polynomy"
```

Manual steps if you'd rather:

1. Add a `TopicNode` (English slug, Czech name) under the right category in `math-tree.ts` or `physics-tree.ts`
2. Create `src/lib/lessons/{subject}/{slug}/intro.ts` with a `ChapterDefinition`
3. `pnpm build:registry && pnpm validate:content`
