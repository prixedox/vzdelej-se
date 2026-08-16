# src/lib/topics/

Topic tree definitions. Hierarchical: Subject → Category → Topic (leaf).

## Files

| File | Purpose |
|------|---------|
| `index.ts` | Exports `subjectTrees`, `subjects`, `getLeafTopics()`, `findTopic()`, slug union types |
| `math-tree.ts` | 26 leaf topics across Algebra, Funkce, Geometrie, Kombinatorika, Základy analýzy (21 with chapters, 5 `comingSoon`) |
| `physics-tree.ts` | 19 leaf topics across Mechanika, Termodynamika, Elektřina a magnetismus, Vlnění a optika, Moderní fyzika (14 with chapters, 5 `comingSoon`) |
| `chemistry-tree.ts` | 28 leaf topics — all `comingSoon` |
| `biology-tree.ts` | 28 leaf topics — all `comingSoon` |
| `informatics-tree.ts` | 29 leaf topics — all `comingSoon` |
| `history-tree.ts` | 21 leaf topics — all `comingSoon` |
| `geography-tree.ts` | 20 leaf topics — all `comingSoon` |

Every tree is registered in `subjectTrees` and mirrored by a card in `subjects` (slug, Czech name, icon, gradient, `leafCount`). Adding a tree means touching both.

## TopicNode Structure

```typescript
TopicNode {
  slug: string;        // URL-safe English identifier (e.g. "linear-equations"), unique per subject
  name: string;        // Czech display name (e.g. "Lineární rovnice")
  description?: string; // Czech
  icon?: string;
  aiContext?: string;   // Czech — extra hints for content authoring
  comingSoon?: boolean; // Content being prepared — no chapters required, UI shows a placeholder
  children?: TopicNode[];  // Absent on leaf nodes
}
```

Only **leaf nodes** (no `children`) are actual lesson topics. Each leaf must have at least one chapter file under `src/lib/lessons/{subject}/{slug}/`, or `pnpm validate:content` fails — unless the leaf is marked `comingSoon: true`, which the validator skips.

## Adding a New Topic

Prefer the scaffolder — it inserts the node + creates an `intro.ts` chapter:

```bash
pnpm new-topic math/algebra/polynomials "Polynomy"
```

Manual steps if you'd rather:

1. Add a `TopicNode` (English slug, Czech name) under the right category in that subject's `{subject}-tree.ts`
2. Create `src/lib/lessons/{subject}/{slug}/intro.ts` with a `ChapterDefinition` — or mark the node `comingSoon: true` and skip this
3. Bump that subject's `leafCount` in `index.ts`
4. `pnpm build:registry && pnpm validate:content`
