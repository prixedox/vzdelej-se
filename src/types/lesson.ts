// ── Visual block types ──
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
  | "interactive-motion";

export interface VisualBlock {
  type: VisualType;
  props: Record<string, unknown>;
  caption?: string;
}

// ── Lesson content types ──
export interface LessonSection {
  heading: string;
  body: string; // Markdown with LaTeX
  visual?: VisualBlock;
  examples?: LessonExample[];
}

export interface LessonExample {
  problem: string;
  solution: string;
}

export interface ConceptExplanation {
  title: string;
  sections: LessonSection[];
}

export interface WalkthroughStep {
  instruction: string;
  math?: string;
  explanation: string;
  visual?: VisualBlock;
}

export interface WalkthroughProblem {
  problemStatement: string;
  steps: WalkthroughStep[];
  finalAnswer: string;
}

export interface PracticeProblem {
  id: string;
  problemStatement: string;
  expectedAnswer: string;
  acceptableAnswers: string[];
  numericTolerance?: number;
  hints: string[];
  solutionExplanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface LessonSummary {
  keyTakeaways: string[];
  nextTopicSuggestion?: string;
}

export interface LessonContent {
  conceptExplanation: ConceptExplanation;
  walkthroughProblem: WalkthroughProblem;
  practiceProblems: PracticeProblem[];
  summary: LessonSummary;
}

export type LessonStatus = "not_started" | "in_progress" | "completed";
export type Difficulty = "začátečník" | "středně pokročilý" | "pokročilý";
