# Lesson System

Lessons are static TS objects stored in `src/lib/lessons/data.ts`. No database, no API calls.

## Content Flow

1. User picks topic + difficulty on topic page
2. Navigates to `/lessons/${topicSlug}?difficulty=${difficulty}&subject=${subjectSlug}`
3. Lesson page imports content from `src/lib/lessons/data.ts`
4. `LessonShell` builds slides, manages answer state locally
5. On completion: shows score (no persistence)

## Key Files

- Lesson data: `src/lib/lessons/data.ts` — `Record<string, LessonContent>` keyed by `${topicSlug}-${difficulty}`
- Slide builder: `src/lib/lesson/build-slides.ts`
- Answer evaluator: `src/lib/lesson/answer-evaluator.ts`
- Types: `src/types/lesson.ts`, `src/types/slide.ts`
- Lesson page: `src/app/(app)/lessons/[lessonId]/page.tsx`
- Topic page: `src/app/(app)/topics/[subjectSlug]/[topicSlug]/page.tsx`

## Adding New Lessons

Add content to `src/lib/lessons/data.ts`:
```ts
import { registerLesson } from "@/lib/lessons/data";
registerLesson("topic-slug", "beginner", { conceptExplanation: ..., ... });
```

Or directly add to the `lessons` record object.

## Lesson Content Structure (LessonContent)

```
conceptExplanation: { title, sections[]: { heading, body (markdown+LaTeX), visual?, examples[] } }
walkthroughProblem: { problemStatement, steps[]: { instruction, math?, explanation, visual? }, finalAnswer }
practiceProblems[]: { id, problemStatement, expectedAnswer, acceptableAnswers[], numericTolerance?, hints[3], solutionExplanation, difficulty }
summary: { keyTakeaways[], nextTopicSuggestion? }
```

## Slide Sequence (built by buildSlides())

Section Title "Teorie" → Concept sections → Section Title "Ukázka" → Walkthrough intro → Steps → Result → Section Title "Procvičení" → Practice problems → Section Title "Shrnutí" → Summary → Complete prompt

## Answer Validation (checkAnswer)

Client-side only. Normalizes both strings (trim, lowercase, Czech comma→dot, strip LaTeX). Checks: exact match → acceptable variants → numeric tolerance.

## Czech Math Conventions

- Decimal comma: 3,14 not 3.14
- Functions: tg (not tan), cotg, ln, log
- Intervals: ⟨a; b⟩ closed, (a; b) open
- LaTeX: `$...$` inline, `$$...$$` block

## Gotchas

- Visual props are `Record<string, unknown>` — type safety only at component level
- Practice problems must have exactly 3 hints
- No persistence — answers/progress are lost on page reload
