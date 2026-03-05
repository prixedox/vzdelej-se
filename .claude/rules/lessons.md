# Lesson System

## Generation Flow

1. `POST /api/lessons/generate` with `{ topicId/topicSlug, subjectSlug, difficulty, variant }`
2. Auth check → daily limit check → `getOrGenerateLesson()` in `src/lib/ai/lesson-generator.ts`
3. Cache lookup by `(topicId, difficulty, variant)` in `lessonCache` table
4. If miss: call Claude API → parse JSON → validate Zod → store in cache
5. Create/update `userLessonProgress` → increment daily usage → return content

## Key Files

- API route: `src/app/api/lessons/generate/route.ts`
- Generator: `src/lib/ai/lesson-generator.ts`
- System prompt: `src/lib/ai/prompts/system.ts`
- Lesson template: `src/lib/ai/prompts/lesson-template.ts`
- Zod schema: `src/lib/ai/schemas/lesson.ts`
- Types: `src/types/lesson.ts` (extended with visual support), `src/types/slide.ts`
- Slide builder: `src/lib/lesson/build-slides.ts`
- Answer evaluator: `src/lib/ai/answer-evaluator.ts`

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

## Czech Math Conventions (in AI prompts)

- Decimal comma: 3,14 not 3.14
- Functions: tg (not tan), cotg, ln, log
- Intervals: ⟨a; b⟩ closed, (a; b) open
- LaTeX: `$...$` inline, `$$...$$` block

## Gotchas

- Cache has no invalidation — changing prompts won't regenerate existing cached lessons
- `promptVersion` field exists in cache but isn't used for cache busting
- Visual props are `Record<string, unknown>` — type safety only at component level
- Practice problems must have exactly 3 hints
- Model is hardcoded: `claude-sonnet-4-5-20250929`
