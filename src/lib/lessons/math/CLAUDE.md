# src/lib/lessons/math/

Math chapter content. One folder per leaf topic from `src/lib/topics/math-tree.ts`; one file per chapter inside.

```
math/
  linear-equations/
    intro.ts              # export const chapter: ChapterDefinition = { ... }
    two-step-equations.ts
  quadratic-equations/
    intro.ts
  functions/
    intro.ts
```

- Folder name = topic `slug` (English, matches a leaf in the tree)
- File name (sans `.ts`) = chapter `slug` (English)
- `chapter.topicSlug` must equal the folder name; `chapter.slug` must equal the file name; `chapter.order` must be unique within the folder
- All user-facing text (`title`, `narrative`, step bodies, summary) is Czech

See the parent `../CLAUDE.md` for the schema, validation rules, and scaffolder commands.
