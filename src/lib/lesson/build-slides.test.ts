import { describe, it, expect } from "vitest";
import { buildSlides } from "./build-slides";
import type { Lesson } from "@/types/lesson";

const baseLesson: Lesson = {
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

describe("buildSlides", () => {
  it("produces steps + summary + complete", () => {
    const slides = buildSlides(baseLesson);
    expect(slides).toHaveLength(4);
    expect(slides[0].type).toBe("explain");
    expect(slides[1].type).toBe("multiple-choice");
    expect(slides[2].type).toBe("summary");
    expect(slides[3].type).toBe("complete");
  });

  it("prepends narrative when present", () => {
    const slides = buildSlides({ ...baseLesson, narrative: "Once upon a time…" });
    expect(slides).toHaveLength(5);
    expect(slides[0].type).toBe("explain");
    if (slides[0].type === "explain") {
      expect(slides[0].step.body).toBe("Once upon a time…");
      expect(slides[0].step.callout).toBe("Příběh");
    }
  });

  it("assigns monotonic stepIndex and consistent totalSteps", () => {
    const slides = buildSlides(baseLesson);
    slides.forEach((s, i) => expect(s.stepIndex).toBe(i));
    const total = slides[0].totalSteps;
    slides.forEach((s) => expect(s.totalSteps).toBe(total));
    expect(total).toBe(4);
  });

  it("maps every step variant correctly", () => {
    const allVariants: Lesson = {
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
    const slides = buildSlides(allVariants);
    const types = slides.slice(0, -2).map((s) => s.type);
    expect(types).toEqual([
      "explain",
      "multiple-choice",
      "text-input",
      "explore",
      "reveal",
      "sort-order",
      "prediction",
    ]);
  });
});
