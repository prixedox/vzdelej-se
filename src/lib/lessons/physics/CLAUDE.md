# src/lib/lessons/physics/

Physics chapter content. One folder per leaf topic from `src/lib/topics/physics-tree.ts`; one file per chapter inside.

```
physics/
  kinematics/
    intro.ts
    velocity-as-slope.ts
    projectile-motion.ts
  quantum-physics/
    intro.ts
  electric-circuits/
    intro.ts
```

14 of the tree's 19 leaves have a folder here; the other 5 are `comingSoon` and need none.

- Folder name = topic `slug` (English, matches a leaf in the tree)
- File name (sans `.ts`) = chapter `slug` (English)
- `chapter.topicSlug` must equal the folder name; `chapter.slug` must equal the file name; `chapter.order` must be unique within the folder
- All user-facing text (`title`, `narrative`, step bodies, summary) is Czech; use physics SI units consistently

See the parent `../CLAUDE.md` for the schema, validation rules, and scaffolder commands.
