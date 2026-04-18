import type { LessonStep, Lesson } from "@/types/lesson";
import type { Slide } from "@/types/slide";

// Typed factory — keeps the tagged-union correlation between step.type
// and slide.type. Adding a new step variant forces updating this switch.
function stepToSlide(
  step: LessonStep,
  id: string,
  stepIndex: number,
  totalSteps: number
): Slide {
  const base = { id, stepIndex, totalSteps };
  switch (step.type) {
    case "explain":
      return { ...base, type: "explain", step };
    case "multiple-choice":
      return { ...base, type: "multiple-choice", step };
    case "text-input":
      return { ...base, type: "text-input", step };
    case "explore":
      return { ...base, type: "explore", step };
    case "reveal":
      return { ...base, type: "reveal", step };
    case "sort-order":
      return { ...base, type: "sort-order", step };
    case "prediction":
      return { ...base, type: "prediction", step };
  }
}

export function buildSlides(lesson: Lesson): Slide[] {
  const narrativeSlides: Slide[] = lesson.narrative
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

  const stepSlides: Slide[] = lesson.steps.map((step, i) =>
    stepToSlide(step, `v2-${i}`, i, 0)
  );

  const allContentSlides: Slide[] = [...narrativeSlides, ...stepSlides];
  const totalSteps = allContentSlides.length + 2; // +summary +complete

  allContentSlides.forEach((slide, i) => {
    slide.stepIndex = i;
    slide.totalSteps = totalSteps;
  });

  const summaryIndex = allContentSlides.length;
  const summarySlide: Slide = {
    id: `v2-${summaryIndex}`,
    stepIndex: summaryIndex,
    totalSteps,
    type: "summary",
    keyTakeaways: lesson.summary.keyTakeaways,
    nextTopicSuggestion: lesson.nextTopicSuggestion,
  };
  allContentSlides.push(summarySlide);

  const completeSlide: Slide = {
    id: `v2-${summaryIndex + 1}`,
    stepIndex: summaryIndex + 1,
    totalSteps,
    type: "complete",
  };
  allContentSlides.push(completeSlide);

  return allContentSlides;
}
