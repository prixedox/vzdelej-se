import type {
  ExplainStep,
  MultipleChoiceStep,
  TextInputStep,
  ExploreStep,
  RevealStep,
  SortOrderStep,
  PredictionStep,
} from "./lesson";

// ── Base ──
interface SlideBase {
  id: string;
  stepIndex: number;
  totalSteps: number;
}

// ── Step slides (1:1 with LessonStep) ──

export interface ExplainSlide extends SlideBase {
  type: "explain";
  step: ExplainStep;
}

export interface MultipleChoiceSlide extends SlideBase {
  type: "multiple-choice";
  step: MultipleChoiceStep;
}

export interface TextInputSlide extends SlideBase {
  type: "text-input";
  step: TextInputStep;
}

export interface ExploreSlide extends SlideBase {
  type: "explore";
  step: ExploreStep;
}

export interface RevealSlide extends SlideBase {
  type: "reveal";
  step: RevealStep;
}

export interface SortOrderSlide extends SlideBase {
  type: "sort-order";
  step: SortOrderStep;
}

export interface PredictionSlide extends SlideBase {
  type: "prediction";
  step: PredictionStep;
}

// ── Terminal slides ──

export interface SummarySlide extends SlideBase {
  type: "summary";
  keyTakeaways: string[];
  nextTopicSuggestion?: string;
}

export interface CompleteSlide extends SlideBase {
  type: "complete";
}

export type Slide =
  | ExplainSlide
  | MultipleChoiceSlide
  | TextInputSlide
  | ExploreSlide
  | RevealSlide
  | SortOrderSlide
  | PredictionSlide
  | SummarySlide
  | CompleteSlide;
