import type {
  LessonSection,
  WalkthroughStep,
  PracticeProblem,
} from "./lesson";

// ── Base ──
interface SlideBase {
  id: string;
  sectionLabel: string;
  sectionIndex: number; // 0-3 for progress coloring
}

// ── Slide variants ──

export interface SectionTitleSlide extends SlideBase {
  type: "section-title";
  title: string;
  subtitle: string;
  icon: "book" | "lightbulb" | "pen" | "check";
}

export interface ConceptSectionSlide extends SlideBase {
  type: "concept-section";
  section: LessonSection;
  sectionNumber: number;
  totalSections: number;
}

export interface WalkthroughIntroSlide extends SlideBase {
  type: "walkthrough-intro";
  problemStatement: string;
}

export interface WalkthroughStepSlide extends SlideBase {
  type: "walkthrough-step";
  step: WalkthroughStep;
  stepNumber: number;
  totalSteps: number;
}

export interface WalkthroughResultSlide extends SlideBase {
  type: "walkthrough-result";
  finalAnswer: string;
}

export interface PracticeProblemSlide extends SlideBase {
  type: "practice-problem";
  problem: PracticeProblem;
  problemIndex: number;
  totalProblems: number;
}

export interface SummarySlide extends SlideBase {
  type: "summary";
  keyTakeaways: string[];
  nextTopicSuggestion?: string;
}

export interface CompletePromptSlide extends SlideBase {
  type: "complete-prompt";
}

export type Slide =
  | SectionTitleSlide
  | ConceptSectionSlide
  | WalkthroughIntroSlide
  | WalkthroughStepSlide
  | WalkthroughResultSlide
  | PracticeProblemSlide
  | SummarySlide
  | CompletePromptSlide;
