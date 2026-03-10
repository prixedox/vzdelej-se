import type { VisualBlock } from "./lesson";

// ── Step types (each step = one screen) ──

export interface ExplainStep {
  type: "explain";
  body: string; // Markdown + LaTeX, 2-3 sentences
  visual?: VisualBlock;
  callout?: string; // Short callout badge text
  misconception?: string; // Common wrong belief to challenge first
}

export interface MultipleChoiceChoice {
  label: string;
  isCorrect: boolean;
  feedback: string; // Shown inline when selected
}

export interface MultipleChoiceStep {
  type: "multiple-choice";
  question: string;
  visual?: VisualBlock;
  choices: MultipleChoiceChoice[];
  explanation: string; // Shown after answering
  hints?: string[]; // max 2
}

export interface TextInputStep {
  type: "text-input";
  question: string;
  visual?: VisualBlock;
  expectedAnswer: string;
  acceptableAnswers?: string[];
  numericTolerance?: number;
  wrongAnswerFeedback?: Record<string, string>; // specific wrong answer → message
  explanation: string;
  hints?: string[]; // max 2
}

export interface ExploreStep {
  type: "explore";
  prompt: string;
  visual: VisualBlock; // required
  followUpQuestion?: string;
}

export interface RevealStep {
  type: "reveal";
  question: string;
  visual?: VisualBlock;
  revealedContent: string; // Markdown + LaTeX
}

export interface SortOrderStep {
  type: "sort-order";
  question: string;
  items: string[]; // Correct order; shuffled at render
  explanation: string;
}

export interface PredictionStep {
  type: "prediction";
  scenario: string; // Situation description
  question: string; // "What do you think will happen?"
  options: PredictionOption[];
  reveal: string; // Markdown + LaTeX explanation of the correct answer
  visual?: VisualBlock;
}

export interface PredictionOption {
  label: string;
  isCorrect: boolean;
}

export type LessonStep =
  | ExplainStep
  | MultipleChoiceStep
  | TextInputStep
  | ExploreStep
  | RevealStep
  | SortOrderStep
  | PredictionStep;

// ── Lesson V2 root ──

export interface LessonV2 {
  title: string;
  narrative?: string; // 2-3 sentence story context before theory
  steps: LessonStep[];
  summary: { keyTakeaways: string[] };
  nextTopicSuggestion?: string;
}
