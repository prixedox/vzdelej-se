import { describe, it, expect } from "vitest";
import { buildSlidesV2 } from "./build-slides-v2";
import type { LessonV2 } from "@/types/lesson-v2";

const baseLesson: LessonV2 = {
  title: "Test",
  steps: [
    { type: "explain", body: "intro" },
    {
      type: "multiple-choice",
      question: "Q?",
      choices: [
        { label: "A", isCorrect: true, feedback: "right" },
        { label: "B", isCorrect: false, feedback: "wrong" },
      ],
      explanation: "because",
    },
  ],
  summary: { keyTakeaways: ["k1"] },
};

describe("buildSlidesV2", () => {
  it("produces steps + summary + complete", () => {
    const slides = buildSlidesV2(baseLesson);
    expect(slides).toHaveLength(4);
    expect(slides[0].type).toBe("explain-v2");
    expect(slides[1].type).toBe("multiple-choice-v2");
    expect(slides[2].type).toBe("summary-v2");
    expect(slides[3].type).toBe("complete-v2");
  });

  it("prepends narrative when present", () => {
    const slides = buildSlidesV2({ ...baseLesson, narrative: "Once upon a time…" });
    expect(slides).toHaveLength(5);
    expect(slides[0].type).toBe("explain-v2");
    if (slides[0].type === "explain-v2") {
      expect(slides[0].step.body).toBe("Once upon a time…");
      expect(slides[0].step.callout).toBe("Příběh");
    }
  });

  it("assigns monotonic stepIndex and consistent totalSteps", () => {
    const slides = buildSlidesV2(baseLesson);
    slides.forEach((s, i) => expect(s.stepIndex).toBe(i));
    const total = slides[0].totalSteps;
    slides.forEach((s) => expect(s.totalSteps).toBe(total));
    expect(total).toBe(4);
  });

  it("maps every step variant correctly", () => {
    const allVariants: LessonV2 = {
      title: "t",
      steps: [
        { type: "explain", body: "b" },
        { type: "multiple-choice", question: "q", choices: [{ label: "a", isCorrect: true, feedback: "" }, { label: "b", isCorrect: false, feedback: "" }], explanation: "" },
        { type: "text-input", question: "q", expectedAnswer: "a", explanation: "" },
        { type: "explore", prompt: "p", visual: { type: "balance-scale", props: {} } },
        { type: "reveal", question: "q", revealedContent: "r" },
        { type: "sort-order", question: "q", items: ["a", "b"], explanation: "" },
        {
          type: "prediction",
          scenario: "s",
          question: "q",
          options: [{ label: "a", isCorrect: true }, { label: "b", isCorrect: false }],
          reveal: "r",
        },
      ],
      summary: { keyTakeaways: ["k"] },
    };
    const slides = buildSlidesV2(allVariants);
    const types = slides.slice(0, -2).map((s) => s.type);
    expect(types).toEqual([
      "explain-v2",
      "multiple-choice-v2",
      "text-input-v2",
      "explore-v2",
      "reveal-v2",
      "sort-order-v2",
      "prediction-v2",
    ]);
  });
});
