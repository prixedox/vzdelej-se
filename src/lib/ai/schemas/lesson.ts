import { z } from "zod";

const lessonExampleSchema = z.object({
  problem: z.string(),
  solution: z.string(),
});

const lessonSectionSchema = z.object({
  heading: z.string(),
  body: z.string(),
  examples: z.array(lessonExampleSchema).optional(),
});

const conceptExplanationSchema = z.object({
  title: z.string(),
  sections: z.array(lessonSectionSchema).min(1),
});

const walkthroughStepSchema = z.object({
  instruction: z.string(),
  math: z.string().optional(),
  explanation: z.string(),
});

const walkthroughProblemSchema = z.object({
  problemStatement: z.string(),
  steps: z.array(walkthroughStepSchema).min(1),
  finalAnswer: z.string(),
});

const practiceProblemSchema = z.object({
  id: z.string(),
  problemStatement: z.string(),
  expectedAnswer: z.string(),
  acceptableAnswers: z.array(z.string()),
  numericTolerance: z.number().optional(),
  hints: z.array(z.string()).min(1),
  solutionExplanation: z.string(),
  difficulty: z.enum(["easy", "medium", "hard"]),
});

const lessonSummarySchema = z.object({
  keyTakeaways: z.array(z.string()).min(1),
  nextTopicSuggestion: z.string().optional(),
});

export const lessonContentSchema = z.object({
  conceptExplanation: conceptExplanationSchema,
  walkthroughProblem: walkthroughProblemSchema,
  practiceProblems: z.array(practiceProblemSchema).min(3).max(5),
  summary: lessonSummarySchema,
});

export type ValidatedLessonContent = z.infer<typeof lessonContentSchema>;
