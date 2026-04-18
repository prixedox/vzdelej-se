import { describe, it, expect } from "vitest";
import { chapterSchema } from "./schema";

const validLesson = {
  steps: [{ type: "explain" as const, body: "hello" }],
  summary: { keyTakeaways: ["k"] },
};

const validChapter = {
  slug: "intro",
  topicSlug: "linear-equations",
  order: 1,
  title: "Úvod",
  lesson: validLesson,
};

describe("chapterSchema", () => {
  it("accepts a valid chapter", () => {
    expect(chapterSchema.safeParse(validChapter).success).toBe(true);
  });

  it("rejects invalid slug shape", () => {
    expect(chapterSchema.safeParse({ ...validChapter, slug: "Intro" }).success).toBe(false);
    expect(chapterSchema.safeParse({ ...validChapter, slug: "intro with space" }).success).toBe(false);
  });

  it("rejects empty steps", () => {
    expect(chapterSchema.safeParse({
      ...validChapter,
      lesson: { ...validLesson, steps: [] },
    }).success).toBe(false);
  });

  it("rejects MC with zero correct choices", () => {
    const ch = {
      ...validChapter,
      lesson: {
        steps: [{
          type: "multiple-choice",
          question: "q",
          choices: [
            { label: "a", isCorrect: false, feedback: "f" },
            { label: "b", isCorrect: false, feedback: "f" },
          ],
          explanation: "e",
        }],
        summary: { keyTakeaways: ["k"] },
      },
    };
    expect(chapterSchema.safeParse(ch).success).toBe(false);
  });

  it("rejects MC with multiple correct choices", () => {
    const ch = {
      ...validChapter,
      lesson: {
        steps: [{
          type: "multiple-choice",
          question: "q",
          choices: [
            { label: "a", isCorrect: true, feedback: "f" },
            { label: "b", isCorrect: true, feedback: "f" },
          ],
          explanation: "e",
        }],
        summary: { keyTakeaways: ["k"] },
      },
    };
    expect(chapterSchema.safeParse(ch).success).toBe(false);
  });

  it("rejects text-input with numericTolerance but non-numeric expectedAnswer", () => {
    const ch = {
      ...validChapter,
      lesson: {
        steps: [{
          type: "text-input",
          question: "q",
          expectedAnswer: "hello",
          numericTolerance: 0.01,
          explanation: "e",
        }],
        summary: { keyTakeaways: ["k"] },
      },
    };
    expect(chapterSchema.safeParse(ch).success).toBe(false);
  });

  it("accepts text-input with numericTolerance and numeric answer (with Czech comma)", () => {
    const ch = {
      ...validChapter,
      lesson: {
        steps: [{
          type: "text-input",
          question: "q",
          expectedAnswer: "3,14",
          numericTolerance: 0.01,
          explanation: "e",
        }],
        summary: { keyTakeaways: ["k"] },
      },
    };
    expect(chapterSchema.safeParse(ch).success).toBe(true);
  });

  it("rejects prediction with fewer than 2 options", () => {
    const ch = {
      ...validChapter,
      lesson: {
        steps: [{
          type: "prediction",
          scenario: "s",
          question: "q",
          options: [{ label: "a", isCorrect: true }],
          reveal: "r",
        }],
        summary: { keyTakeaways: ["k"] },
      },
    };
    expect(chapterSchema.safeParse(ch).success).toBe(false);
  });

  it("rejects sort-order with fewer than 2 items", () => {
    const ch = {
      ...validChapter,
      lesson: {
        steps: [{
          type: "sort-order",
          question: "q",
          items: ["only"],
          explanation: "e",
        }],
        summary: { keyTakeaways: ["k"] },
      },
    };
    expect(chapterSchema.safeParse(ch).success).toBe(false);
  });

  it("rejects negative order", () => {
    expect(chapterSchema.safeParse({ ...validChapter, order: -1 }).success).toBe(false);
  });
});
