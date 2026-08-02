import { describe, it, expect } from "vitest";
import { chapterSchema, stageChapterSchema } from "./schema";

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

const validStageChapter = {
  slug: "discriminant",
  topicSlug: "quadratic-equations",
  order: 2,
  format: "stage" as const,
  title: "Diskriminant",
  lesson: {
    stage: {
      type: "parabola-roots",
      initial: { a: 1, b: 0, c: -4 },
      readouts: ["rootCount", "rootGap", "vertexY"],
    },
    beats: [
      { kind: "observe", prompt: "Táhni parabolou nahoru a dolů." },
      {
        kind: "manipulate",
        prompt: "Posuň ji tak, aby se osy jen dotýkala.",
        goal: { readout: "rootGap", target: 0, within: 0.15 },
        onReached: "Teď se oba kořeny slily v jeden.",
      },
    ],
    naming: {
      observation: "Existuje přesná hranice.",
      formula: "D = b^2 - 4ac",
      mapping: "$D$ měří vzdálenost od té hranice.",
    },
    summary: { keyTakeaways: ["Diskriminant měří vzdálenost od dotyku."] },
  },
};

describe("stageChapterSchema", () => {
  it("accepts a well-formed stage chapter", () => {
    expect(stageChapterSchema.safeParse(validStageChapter).success).toBe(true);
  });

  it("rejects a stage chapter with no beats", () => {
    const bad = { ...validStageChapter, lesson: { ...validStageChapter.lesson, beats: [] } };
    expect(stageChapterSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects a missing naming block", () => {
    const lesson = { ...validStageChapter.lesson } as Record<string, unknown>;
    delete lesson.naming;
    expect(stageChapterSchema.safeParse({ ...validStageChapter, lesson }).success).toBe(false);
  });

  it("rejects an empty naming formula", () => {
    const bad = {
      ...validStageChapter,
      lesson: {
        ...validStageChapter.lesson,
        naming: { ...validStageChapter.lesson.naming, formula: "" },
      },
    };
    expect(stageChapterSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects a predict beat without exactly one correct option", () => {
    const bad = {
      ...validStageChapter,
      lesson: {
        ...validStageChapter.lesson,
        beats: [
          {
            kind: "predict",
            prompt: "A když ji zvedneš ještě výš?",
            question: "Kolik bude kořenů?",
            options: [
              { label: "Dva", isCorrect: true },
              { label: "Žádný", isCorrect: true },
            ],
            then: { c: 2 },
            reveal: "Žádný.",
          },
        ],
      },
    };
    expect(stageChapterSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects a negative goal tolerance", () => {
    const bad = {
      ...validStageChapter,
      lesson: {
        ...validStageChapter.lesson,
        beats: [
          {
            kind: "manipulate",
            prompt: "Posuň.",
            goal: { readout: "rootGap", target: 0, within: -1 },
            onReached: "Hotovo.",
          },
        ],
      },
    };
    expect(stageChapterSchema.safeParse(bad).success).toBe(false);
  });
});
