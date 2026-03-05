import type {
  ExplainStep,
  MultipleChoiceStep,
  TextInputStep,
  ExploreStep,
  RevealStep,
  SortOrderStep,
} from "./lesson-v2";

// ── Base ──
interface SlideV2Base {
  id: string;
  stepIndex: number;
  totalSteps: number;
}

// ── Step slides (1:1 with LessonStep) ──

export interface ExplainSlideV2 extends SlideV2Base {
  type: "explain-v2";
  step: ExplainStep;
}

export interface MultipleChoiceSlideV2 extends SlideV2Base {
  type: "multiple-choice-v2";
  step: MultipleChoiceStep;
}

export interface TextInputSlideV2 extends SlideV2Base {
  type: "text-input-v2";
  step: TextInputStep;
}

export interface ExploreSlideV2 extends SlideV2Base {
  type: "explore-v2";
  step: ExploreStep;
}

export interface RevealSlideV2 extends SlideV2Base {
  type: "reveal-v2";
  step: RevealStep;
}

export interface SortOrderSlideV2 extends SlideV2Base {
  type: "sort-order-v2";
  step: SortOrderStep;
}

// ── Terminal slides ──

export interface SummarySlideV2 extends SlideV2Base {
  type: "summary-v2";
  keyTakeaways: string[];
  nextTopicSuggestion?: string;
}

export interface CompleteSlideV2 extends SlideV2Base {
  type: "complete-v2";
}

export type SlideV2 =
  | ExplainSlideV2
  | MultipleChoiceSlideV2
  | TextInputSlideV2
  | ExploreSlideV2
  | RevealSlideV2
  | SortOrderSlideV2
  | SummarySlideV2
  | CompleteSlideV2;
