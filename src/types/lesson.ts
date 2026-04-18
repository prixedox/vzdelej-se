// ── Visual block types (shared across lesson system) ──
export type VisualType =
  | "balance-scale"
  | "number-line"
  | "motion-diagram"
  | "velocity-graph"
  | "trajectory"
  | "graph-st"
  | "comparison-table"
  | "interactive-balance-scale"
  | "interactive-number-line"
  | "interactive-trajectory"
  | "interactive-velocity-graph"
  | "interactive-motion"
  | "interactive-roller-coaster"
  | "interactive-inclined-plane"
  | "interactive-collision"
  | "interactive-pendulum"
  | "interactive-spring-oscillator"
  | "interactive-orbit"
  | "interactive-pv-diagram"
  | "interactive-electric-field"
  | "interactive-circuit"
  | "interactive-wave"
  | "interactive-optics"
  | "interactive-atom"
  | "interactive-function-graph"
  | "interactive-unit-circle"
  | "interactive-triangle"
  | "interactive-probability"
  | "interactive-derivative"
  | "animated-equation-solver";

export interface VisualBlock {
  type: VisualType;
  props: Record<string, unknown>;
  caption?: string;
}

// ── Step types (each step = one screen) ──

export interface ExplainStep {
  type: "explain";
  body: string;
  visual?: VisualBlock;
  callout?: string;
  misconception?: string;
}

export interface MultipleChoiceChoice {
  label: string;
  isCorrect: boolean;
  feedback: string;
}

export interface MultipleChoiceStep {
  type: "multiple-choice";
  question: string;
  visual?: VisualBlock;
  choices: MultipleChoiceChoice[];
  explanation: string;
  hints?: string[];
}

export interface TextInputStep {
  type: "text-input";
  question: string;
  visual?: VisualBlock;
  expectedAnswer: string;
  acceptableAnswers?: string[];
  numericTolerance?: number;
  wrongAnswerFeedback?: Record<string, string>;
  explanation: string;
  hints?: string[];
}

export interface ExploreStep {
  type: "explore";
  prompt: string;
  visual: VisualBlock;
  followUpQuestion?: string;
}

export interface RevealStep {
  type: "reveal";
  question: string;
  visual?: VisualBlock;
  revealedContent: string;
}

export interface SortOrderStep {
  type: "sort-order";
  question: string;
  items: string[];
  explanation: string;
}

export interface PredictionStep {
  type: "prediction";
  scenario: string;
  question: string;
  options: PredictionOption[];
  reveal: string;
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

// ── Lesson root ──

export interface Lesson {
  title?: string;
  narrative?: string;
  steps: LessonStep[];
  summary: { keyTakeaways: string[] };
  nextTopicSuggestion?: string;
}
