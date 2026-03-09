# src/components/lesson/

Lesson player — the core interactive experience.

## Component Flow

```
LessonShell (detects V1/V2, builds slides, tracks answers)
  └─ SlideDeck / SlideDeckV2 (nav: ← → keys + buttons, blocks unanswered)
       └─ SlideRenderer / SlideRendererV2 (type → component dispatch)
            └─ slides/* (one component per slide type)
                 └─ visuals/* (interactive widgets inside slides)
```

## Key Components

| Component | Role |
|-----------|------|
| `math-display.tsx` | `MathDisplay` = single LaTeX, `MathText` = markdown+LaTeX. Callouts: `> [!tip]`, `> [!info]`, `> [!warning]`, `> [!key]` |
| `practice-problem.tsx` | Answer input + 3-hint progressive reveal + feedback |
| `lesson-complete.tsx` | End screen with score + confetti |
| `confetti-burst.tsx` | Celebration particles on completion |

## Keyboard Navigation

- `ArrowLeft`/`ArrowRight` for slide nav — skipped when focus is on `input`/`textarea`/`select`
- Cannot advance past unanswered questions
