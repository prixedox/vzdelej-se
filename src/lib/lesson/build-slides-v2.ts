import type { LessonV2 } from "@/types/lesson-v2";
import type { SlideV2 } from "@/types/slide-v2";

const stepTypeToSlideType = {
  explain: "explain-v2",
  "multiple-choice": "multiple-choice-v2",
  "text-input": "text-input-v2",
  explore: "explore-v2",
  reveal: "reveal-v2",
  "sort-order": "sort-order-v2",
} as const;

export function buildSlidesV2(lesson: LessonV2): SlideV2[] {
  const totalSteps = lesson.steps.length + 2; // +summary +complete
  const slides: SlideV2[] = [];

  lesson.steps.forEach((step, i) => {
    slides.push({
      id: `v2-${i}`,
      stepIndex: i,
      totalSteps,
      type: stepTypeToSlideType[step.type],
      step,
    } as SlideV2);
  });

  const summaryIndex = lesson.steps.length;
  slides.push({
    id: `v2-${summaryIndex}`,
    stepIndex: summaryIndex,
    totalSteps,
    type: "summary-v2",
    keyTakeaways: lesson.summary.keyTakeaways,
    nextTopicSuggestion: lesson.nextTopicSuggestion,
  });

  slides.push({
    id: `v2-${summaryIndex + 1}`,
    stepIndex: summaryIndex + 1,
    totalSteps,
    type: "complete-v2",
  });

  return slides;
}
