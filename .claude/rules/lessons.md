# Lesson System

Lessons are static, pre-built content stored in the `lessonCache` table. Content was authored with Claude assistance during development — there is no runtime AI generation.

## Content Delivery Flow

1. `POST /api/lessons/generate` with `{ topicId/topicSlug, subjectSlug, difficulty, variant }`
2. Auth check → daily limit check → lookup `lessonCache` by `(topicId, difficulty, variant)`
3. Create/update `userLessonProgress` → increment daily usage → return content

## Key Files

- API route: `src/app/api/lessons/generate/route.ts`
- Types: `src/types/lesson.ts` (extended with visual support), `src/types/slide.ts`
- Slide builder: `src/lib/lesson/build-slides.ts`
- Lesson loader: `src/lib/lesson/lesson-loader.ts`
- Answer evaluator: `src/lib/lesson/answer-evaluator.ts`
- Zod schema: `src/lib/ai/schemas/lesson.ts` (kept in ai/ for seed script compatibility)

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

Client-side only. Normalizes both strings (trim, lowercase, Czech comma→dot, strip LaTeX). Checks: exact match → acceptable variants → numeric tolerance. No server-side re-validation (trusts client `isCorrect`).

## Czech Math Conventions

- Decimal comma: 3,14 not 3.14
- Functions: tg (not tan), cotg, ln, log
- Intervals: ⟨a; b⟩ closed, (a; b) open
- LaTeX: `$...$` inline, `$$...$$` block

## Gotchas

- Visual props are `Record<string, unknown>` — type safety only at component level
- Practice problems must have exactly 3 hints
- Lesson content is JSONB in `lessonCache` — validated by Zod schema
