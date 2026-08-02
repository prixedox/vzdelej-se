# src/components/lesson/

Lesson player — the core interactive experience. Two formats: **deck** (scored, gates
on unanswered) and **stage** (persistent manipulable + beats, never scored, never
blocks). `chapter-page.tsx` branches on `chapter.format` to pick `LessonShell` or
`StageShell`.

## Deck Flow

```
LessonShell (builds slides, tracks answers, records chapter completion)
  └─ SlideDeck (nav: ← → keys + buttons, blocks advancing past unanswered)
       └─ SlideRenderer (slide.type → component dispatch)
            └─ slides/* (one component per slide type)
                 └─ visuals/* (interactive widgets inside slides)
```

## Stage Flow

```
StageShell (owns params via useAnimatedParams, derives readouts, tracks beat index)
  ├─ StageCanvas (StageType → component dispatch, exhaustive switch)
  │    └─ stages/* (controlled: params down, onParamsChange up — see visuals/CLAUDE.md)
  ├─ BeatStrip (observe | manipulate | predict; "Ukaž mi to" solves via solveGoal)
  ├─ NamingPanel (the formula's one required appearance)
  ├─ SlideRenderer (apply steps reuse deck slide components; answers discarded)
  └─ StageComplete (end screen — no score, no tier)
```

## Key Files

| File | Role |
|------|------|
| `lesson-shell.tsx` | Receives a deck `ChapterDefinition`, builds slides, calls `recordChapterCompletion(topicSlug, chapterSlug, result)` on finish |
| `slide-deck.tsx` | Keyboard + button nav, gates advance on unanswered |
| `slide-renderer.tsx` | Discriminated-union switch on `slide.type`; also reused by a stage's `apply` screen |
| `math-display.tsx` | `MathDisplay` = single LaTeX, `MathText` = markdown+LaTeX. Callouts: `> [!tip]`, `> [!info]`, `> [!warning]`, `> [!key]` |
| `lesson-complete.tsx` | Deck end screen with score |
| `lesson-progress-bar.tsx` | Progress indicator, shared by both formats |
| `stage-shell.tsx` | Receives a `StageLesson`, owns params + beat index, calls `recordChapterDerived(topicSlug, chapterSlug)` on finish — never a score |
| `stages/stage-canvas.tsx` | `StageType` → component dispatch. Exhaustive: an unhandled `StageType` fails `tsc` here too (`assertUnreachable`), not just in the registry |
| `stages/*-stage.tsx` | One controlled component per `StageType` — read the component to see which params it actually lets the student move (`registry.ts`'s `solvableParams` must match) |
| `beats/beat-strip.tsx` | Renders the current beat and its "Ukaž mi to" escape (`solveGoal`) — nothing ever blocks here |
| `beats/naming-panel.tsx` | Renders the required `naming` field — the formula's first appearance in the lesson |
| `stage-complete.tsx` | Stage end screen — key takeaways only, no score |
| `use-animated-params.ts` | `setNow` for direct drag (instant), `springTo` for beat presets (travels via `lerpParams`, so the student watches the move) |

## Keyboard Navigation

- `ArrowLeft`/`ArrowRight` for slide/beat nav — skipped when focus is on `input`/`textarea`/`select`
- Deck: cannot advance past unanswered questions
- Stage: nothing blocks, ever — a student who is already stuck must never meet a locked door
