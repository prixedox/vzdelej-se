# src/lib/lessons/

Static lesson content. Each file exports a typed lesson object.

## Structure

```
data.ts              ← Central registry: imports all lessons, exports getLesson()
math/{slug}-v2.ts    ← V2 lessons (preferred for new content)
math/{slug}.ts       ← V1 lessons (legacy)
physics/{slug}-v2.ts
physics/{slug}.ts
```

## Adding a New Lesson

1. Create `src/lib/lessons/{math|physics}/{topic-slug}-v2.ts`
2. Export a `LessonV2` typed object
3. Import and register in `data.ts`: `registerLessonV2("topic-slug", "beginner", obj)`
4. Slug must match the topic slug in `src/lib/topics/`

## Content Rules

- All text in Czech, LaTeX for math (`$...$` inline, `$$...$$` block)
- V2 `explain` steps: 2-3 sentences max, use visuals liberally
- Multiple choice: every choice needs `feedback` explaining why it's right/wrong
- Export name convention: `camelCaseSlug` + `V2` + `Difficulty`, e.g., `linearniRovniceV2Beginner`
