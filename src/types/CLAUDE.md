# src/types/

Shared TypeScript interfaces. Imported by both `components/` and `lib/`.

## Files

| File | Purpose |
|------|---------|
| `lesson.ts` | `LessonContent`, `PracticeProblem`, `VisualBlock`, `VisualType`, `Difficulty` (V1 + shared visual types) |
| `lesson-v2.ts` | `LessonV2`, `LessonStep` and its 6 variants (V2) |
| `slide.ts` | `Slide` discriminated union — 10 V1 variants |
| `slide-v2.ts` | `SlideV2` discriminated union — 8 V2 variants |
| `topic.ts` | `TopicNode` for topic trees |

## Rules

- All slide/step unions use `type` field as discriminant
- `VisualBlock.props` is `Record<string, unknown>` — typed only at component level
- Keep types here only if shared across 2+ directories; component-local types stay with the component
