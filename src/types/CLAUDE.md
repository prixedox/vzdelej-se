# src/types/

Shared TypeScript interfaces. Imported by both `components/` and `lib/`.

## Files

| File | Purpose |
|------|---------|
| `chapter.ts` | `ChapterDefinition` — `{slug, topicSlug, order, title, lesson}` |
| `lesson.ts` | `Lesson`, `LessonStep` (discriminated union: `explain`, `multiple-choice`, `text-input`, `explore`, `reveal`, `sort-order`, `prediction`), `VisualBlock`, `VisualType` |
| `slide.ts` | `Slide` discriminated union — one variant per step type + `summary` + `complete` |
| `topic.ts` | `TopicNode`, `TopicTreeData` for topic trees |

## Rules

- All step/slide unions use `type` field as discriminant — no string-suffix versioning (`-v2` etc.)
- `VisualBlock.props` is `Record<string, unknown>` — typed only at component level
- Keep types here only if shared across 2+ directories; component-local types stay with the component
