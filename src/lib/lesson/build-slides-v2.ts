import type { LessonStep, LessonV2 } from "@/types/lesson-v2";
import type { SlideV2 } from "@/types/slide-v2";

// Typed factory — keeps the tagged-union correlation between step.type
// and slide.type. Adding a new step variant forces updating this switch.
function stepToSlide(
  step: LessonStep,
  id: string,
  stepIndex: number,
  totalSteps: number
): SlideV2 {
  const base = { id, stepIndex, totalSteps };
  switch (step.type) {
    case "explain":
      return { ...base, type: "explain-v2", step };
    case "multiple-choice":
      return { ...base, type: "multiple-choice-v2", step };
    case "text-input":
      return { ...base, type: "text-input-v2", step };
    case "explore":
      return { ...base, type: "explore-v2", step };
    case "reveal":
      return { ...base, type: "reveal-v2", step };
    case "sort-order":
      return { ...base, type: "sort-order-v2", step };
    case "prediction":
      return { ...base, type: "prediction-v2", step };
  }
}

export function buildSlidesV2(lesson: LessonV2): SlideV2[] {
  const narrativeSlides: SlideV2[] = lesson.narrative
    ? [
        stepToSlide(
          {
            type: "explain",
            body: lesson.narrative,
            callout: "Příběh",
          },
          "v2-narrative",
          -1,
          0 // recalculated below
        ),
      ]
    : [];

  const stepSlides: SlideV2[] = lesson.steps.map((step, i) =>
    stepToSlide(step, `v2-${i}`, i, 0)
  );

  const allContentSlides: SlideV2[] = [...narrativeSlides, ...stepSlides];
  const totalSteps = allContentSlides.length + 2; // +summary +complete

  allContentSlides.forEach((slide, i) => {
    slide.stepIndex = i;
    slide.totalSteps = totalSteps;
  });

  const summaryIndex = allContentSlides.length;
  const summarySlide: SlideV2 = {
    id: `v2-${summaryIndex}`,
    stepIndex: summaryIndex,
    totalSteps,
    type: "summary-v2",
    keyTakeaways: lesson.summary.keyTakeaways,
    nextTopicSuggestion: lesson.nextTopicSuggestion,
  };
  allContentSlides.push(summarySlide);

  const completeSlide: SlideV2 = {
    id: `v2-${summaryIndex + 1}`,
    stepIndex: summaryIndex + 1,
    totalSteps,
    type: "complete-v2",
  };
  allContentSlides.push(completeSlide);

  return allContentSlides;
}
