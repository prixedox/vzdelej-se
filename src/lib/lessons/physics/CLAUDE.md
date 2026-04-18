# src/lib/lessons/physics/

Physics chapter content. One folder per leaf topic from `src/lib/topics/physics-tree.ts`; one file per chapter inside.

```
physics/
  mechanics/
    intro.ts
  quantum-physics/
    intro.ts
  electric-circuits/
    intro.ts
```

- Folder name = topic `slug` (English, matches a leaf in the tree)
- File name (sans `.ts`) = chapter `slug` (English)
- `chapter.topicSlug` must equal the folder name; `chapter.slug` must equal the file name; `chapter.order` must be unique within the folder
- All user-facing text (`title`, `narrative`, step bodies, summary) is Czech; use physics SI units consistently

See the parent `../CLAUDE.md` for the schema, validation rules, and scaffolder commands.
