# src/types/

Shared TypeScript interfaces. Imported by both `components/` and `lib/`.

## Files

| File | Purpose |
|------|---------|
| `chapter.ts` | `ChapterDefinition` = `DeckChapter \| StageChapter`, discriminated on `format` (`"deck"` — optional, existing files omit it — or `"stage"`). Both share `{slug, topicSlug, order, title}`; `lesson` is a `Lesson` or a `StageLesson` respectively |
| `lesson.ts` | `Lesson`, `LessonStep` (discriminated union: `explain`, `multiple-choice`, `text-input`, `explore`, `reveal`, `sort-order`, `prediction`), `VisualBlock`, `VisualType` |
| `slide.ts` | `Slide` discriminated union — one variant per step type + `summary` + `complete` |
| `stage.ts` | `StageType`, `StageSpec`, `Goal`, `Beat` (discriminated union: `observe`, `manipulate`, `predict`), `NamingBeat`, `StageLesson` — the "derive-then-name" stage format |
| `topic.ts` | `TopicNode`, `TopicTreeData` for topic trees |

## Rules

- All step/slide unions use `type` field as discriminant — no string-suffix versioning (`-v2` etc.)
- `VisualBlock.props` is `Record<string, unknown>` — typed only at component level
- Keep types here only if shared across 2+ directories; component-local types stay with the component
