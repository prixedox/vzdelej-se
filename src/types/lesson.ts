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
  | "interactive-atom";

export interface VisualBlock {
  type: VisualType;
  props: Record<string, unknown>;
  caption?: string;
}

// ── Lesson content types ──
// ── Knowledge check (inline quiz after theory) ──
export interface KnowledgeCheckChoice {
  label: string;
  isCorrect: boolean;
  feedback?: string;
}

export interface KnowledgeCheck {
  question: string;
  choices: KnowledgeCheckChoice[];
  explanation: string;
}

export interface LessonSection {
  heading: string;
  body: string; // Markdown with LaTeX
  visual?: VisualBlock;
  examples?: LessonExample[];
  knowledgeCheck?: KnowledgeCheck;
}

export interface LessonExample {
  problem: string;
  solution: string;
}

export interface ConceptExplanation {
  title: string;
  sections: LessonSection[];
}

// ── Walkthrough challenge (try-it-yourself) ──
export interface WalkthroughChallenge {
  prompt: string;
  expectedAnswer: string;
  acceptableAnswers?: string[];
  numericTolerance?: number;
  choices?: { label: string; isCorrect: boolean }[];
}

export interface WalkthroughStep {
  instruction: string;
  math?: string;
  explanation: string;
  visual?: VisualBlock;
  challenge?: WalkthroughChallenge;
}

export interface WalkthroughProblem {
  problemStatement: string;
  steps: WalkthroughStep[];
  finalAnswer: string;
}

// ── Practice problem types ──
export interface TextInputProblem {
  type?: "text-input";
  id: string;
  problemStatement: string;
  expectedAnswer: string;
  acceptableAnswers: string[];
  numericTolerance?: number;
  hints: string[];
  solutionExplanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface MultipleChoiceProblem {
  type: "multiple-choice";
  id: string;
  problemStatement: string;
  choices: { label: string; isCorrect: boolean }[];
  hints: string[];
  solutionExplanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export type PracticeProblem = TextInputProblem | MultipleChoiceProblem;

export interface LessonSummary {
  keyTakeaways: string[];
  nextTopicSuggestion?: string;
}

// ── Parameter exploration ──
export interface ExplorationTask {
  prompt: string;
  observation: string;
}

export interface ParameterExploration {
  title: string;
  visual: VisualBlock;
  tasks: ExplorationTask[];
}

export interface LessonContent {
  conceptExplanation: ConceptExplanation;
  walkthroughProblem: WalkthroughProblem;
  practiceProblems: PracticeProblem[];
  summary: LessonSummary;
  explorations?: ParameterExploration[];
}

export type LessonStatus = "not_started" | "in_progress" | "completed";
export type Difficulty = "beginner" | "intermediate" | "advanced";
