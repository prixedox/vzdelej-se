import { z } from "zod";

const slugShape = z.string().regex(/^[a-z0-9-]+$/, "slug must be lowercase alphanumeric with dashes");

const visualBlockSchema = z.object({
  type: z.string(),
  props: z.record(z.string(), z.unknown()),
  caption: z.string().optional(),
});

const explainStep = z.object({
  type: z.literal("explain"),
  body: z.string().min(1),
  visual: visualBlockSchema.optional(),
  callout: z.string().optional(),
  misconception: z.string().optional(),
});

const mcStep = z.object({
  type: z.literal("multiple-choice"),
  question: z.string().min(1),
  visual: visualBlockSchema.optional(),
  choices: z
    .array(
      z.object({
        label: z.string().min(1),
        isCorrect: z.boolean(),
        feedback: z.string(),
      })
    )
    .min(2)
    .refine(
      (choices) => choices.filter((c) => c.isCorrect).length === 1,
      "multiple-choice must have exactly one correct choice"
    ),
  explanation: z.string(),
  hints: z.array(z.string()).max(2).optional(),
});

/**
 * Parse a lesson-answer string as a number.
 * Handles:
 *   - Czech decimal comma: "3,14" → 3.14
 *   - Fractions: "1/9" → 0.1111
 *   - Scientific notation with `·`/`*`/`e`: "3,34·10^-7" → 3.34e-7
 */
function tryParseAnswerNumber(raw: string): number | null {
  let s = raw.trim().replace(/\s+/g, "").replace(",", ".");
  const fracMatch = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if (fracMatch) {
    const num = Number(fracMatch[1]);
    const den = Number(fracMatch[2]);
    if (den !== 0 && !Number.isNaN(num) && !Number.isNaN(den)) return num / den;
  }
  // Normalize scientific notation: "3.34·10^-7" or "3.34*10^-7" → "3.34e-7"
  s = s.replace(/(·|\*)10\^(-?\d+)/, "e$2");
  const n = Number(s);
  return Number.isNaN(n) ? null : n;
}

const textInputStep = z
  .object({
    type: z.literal("text-input"),
    question: z.string().min(1),
    visual: visualBlockSchema.optional(),
    expectedAnswer: z.string().min(1),
    acceptableAnswers: z.array(z.string()).optional(),
    numericTolerance: z.number().positive().optional(),
    wrongAnswerFeedback: z.record(z.string(), z.string()).optional(),
    explanation: z.string(),
    hints: z.array(z.string()).max(2).optional(),
  })
  .refine(
    (s) => {
      if (s.numericTolerance === undefined) return true;
      // Pass if expectedAnswer OR any acceptableAnswer parses as a number
      // (fractions and scientific notation count).
      const candidates = [s.expectedAnswer, ...(s.acceptableAnswers ?? [])];
      return candidates.some((c) => tryParseAnswerNumber(c) !== null);
    },
    { message: "numericTolerance requires a numeric expectedAnswer or acceptableAnswer" }
  );

const exploreStep = z.object({
  type: z.literal("explore"),
  prompt: z.string().min(1),
  visual: visualBlockSchema,
  followUpQuestion: z.string().optional(),
});

const revealStep = z.object({
  type: z.literal("reveal"),
  question: z.string().min(1),
  visual: visualBlockSchema.optional(),
  revealedContent: z.string().min(1),
});

const sortOrderStep = z.object({
  type: z.literal("sort-order"),
  question: z.string().min(1),
  items: z.array(z.string().min(1)).min(2),
  explanation: z.string(),
});

const predictionStep = z.object({
  type: z.literal("prediction"),
  scenario: z.string().min(1),
  question: z.string().min(1),
  options: z
    .array(
      z.object({
        label: z.string().min(1),
        isCorrect: z.boolean(),
      })
    )
    .min(2)
    .refine(
      (opts) => opts.filter((o) => o.isCorrect).length === 1,
      "prediction must have exactly one correct option"
    ),
  reveal: z.string().min(1),
  visual: visualBlockSchema.optional(),
});

export const lessonStepSchema = z.discriminatedUnion("type", [
  explainStep,
  mcStep,
  textInputStep,
  exploreStep,
  revealStep,
  sortOrderStep,
  predictionStep,
]);

export const lessonSchema = z.object({
  title: z.string().min(1).optional(),
  narrative: z.string().optional(),
  steps: z.array(lessonStepSchema).min(1),
  summary: z.object({ keyTakeaways: z.array(z.string().min(1)).min(1) }),
  nextTopicSuggestion: z.string().optional(),
});

export const chapterSchema = z.object({
  slug: slugShape,
  topicSlug: slugShape,
  order: z.number().int().nonnegative(),
  title: z.string().min(1),
  lesson: lessonSchema,
});

export type ChapterSchema = z.infer<typeof chapterSchema>;
