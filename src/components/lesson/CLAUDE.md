# src/components/lesson/

Lesson player — the core interactive experience. One format only.

## Component Flow

```
LessonShell (builds slides, tracks answers, records chapter completion)
  └─ SlideDeck (nav: ← → keys + buttons, blocks advancing past unanswered)
       └─ SlideRenderer (slide.type → component dispatch)
            └─ slides/* (one component per slide type)
                 └─ visuals/* (interactive widgets inside slides)
```

## Key Files

| File | Role |
|------|------|
| `lesson-shell.tsx` | Receives `ChapterDefinition`, builds slides, calls `recordChapterCompletion(topicSlug, chapterSlug, result)` on finish |
| `slide-deck.tsx` | Keyboard + button nav, gates advance on unanswered |
| `slide-renderer.tsx` | Discriminated-union switch on `slide.type` |
| `math-display.tsx` | `MathDisplay` = single LaTeX, `MathText` = markdown+LaTeX. Callouts: `> [!tip]`, `> [!info]`, `> [!warning]`, `> [!key]` |
| `lesson-complete.tsx` | End screen with score |
| `lesson-progress-bar.tsx` | Progress indicator along the deck |

## Keyboard Navigation

- `ArrowLeft`/`ArrowRight` for slide nav — skipped when focus is on `input`/`textarea`/`select`
- Cannot advance past unanswered questions
