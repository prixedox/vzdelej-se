import type { LessonV2 } from "@/types/lesson-v2";
import type { SlideV2 } from "@/types/slide-v2";

const stepTypeToSlideType = {
  explain: "explain-v2",
  "multiple-choice": "multiple-choice-v2",
  "text-input": "text-input-v2",
  explore: "explore-v2",
  reveal: "reveal-v2",
  "sort-order": "sort-order-v2",
  prediction: "prediction-v2",
} as const;

export function buildSlidesV2(lesson: LessonV2): SlideV2[] {
  // If narrative exists, prepend an explain step for it
  const narrativeStep: SlideV2[] = lesson.narrative
    ? [
        {
          id: "v2-narrative",
          stepIndex: -1,
          totalSteps: 0, // recalculated below
          type: "explain-v2" as const,
          step: {
            type: "explain" as const,
            body: lesson.narrative,
            callout: "Příběh",
          },
        },
      ]
    : [];

  const stepSlides: SlideV2[] = lesson.steps.map((step, i) => ({
    id: `v2-${i}`,
    stepIndex: i,
    totalSteps: 0, // recalculated below
    type: stepTypeToSlideType[step.type],
    step,
  }) as SlideV2);

  const allContentSlides = [...narrativeStep, ...stepSlides];
  const totalSteps = allContentSlides.length + 2; // +summary +complete

  // Fix totalSteps and stepIndex on all slides
  allContentSlides.forEach((slide, i) => {
    slide.stepIndex = i;
    slide.totalSteps = totalSteps;
  });

  const summaryIndex = allContentSlides.length;
  allContentSlides.push({
    id: `v2-${summaryIndex}`,
    stepIndex: summaryIndex,
    totalSteps,
    type: "summary-v2",
    keyTakeaways: lesson.summary.keyTakeaways,
    nextTopicSuggestion: lesson.nextTopicSuggestion,
  } as SlideV2);

  allContentSlides.push({
    id: `v2-${summaryIndex + 1}`,
    stepIndex: summaryIndex + 1,
    totalSteps,
    type: "complete-v2",
  } as SlideV2);

  return allContentSlides;
}
