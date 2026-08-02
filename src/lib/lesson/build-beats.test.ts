import { describe, it, expect } from "vitest";
import { buildBeats } from "./build-beats";
import type { StageLesson } from "@/types/stage";

const lesson: StageLesson = {
  stage: { type: "parabola-roots", initial: { a: 1, b: 0, c: -4 }, readouts: ["rootGap"] },
  beats: [
    { kind: "observe", prompt: "Táhni parabolu nahoru a dolů." },
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
  apply: [
    {
      type: "multiple-choice",
      question: "Kolik kořenů má rovnice s $D < 0$?",
      choices: [
        { label: "Žádný", isCorrect: true, feedback: "Správně." },
        { label: "Dva", isCorrect: false, feedback: "Dva jsou při $D > 0$." },
      ],
      explanation: "Záporný diskriminant znamená žádný reálný kořen.",
    },
  ],
  summary: { keyTakeaways: ["Diskriminant měří vzdálenost od dotyku."] },
};

describe("buildBeats", () => {
  it("emits beats, then naming, then apply, then summary, then complete", () => {
    const screens = buildBeats(lesson);
    expect(screens.map((s) => s.kind)).toEqual([
      "beat",
      "beat",
      "naming",
      "apply",
      "summary",
      "complete",
    ]);
  });

  it("places naming after every beat", () => {
    const screens = buildBeats(lesson);
    const namingIndex = screens.findIndex((s) => s.kind === "naming");
    const lastBeatIndex = screens.map((s) => s.kind).lastIndexOf("beat");
    expect(namingIndex).toBeGreaterThan(lastBeatIndex);
  });

  it("numbers screens consecutively from zero with a consistent total", () => {
    const screens = buildBeats(lesson);
    screens.forEach((s, i) => {
      expect(s.index).toBe(i);
      expect(s.total).toBe(screens.length);
    });
  });

  it("gives every screen a unique id", () => {
    const ids = buildBeats(lesson).map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("wraps apply steps as reusable Slides", () => {
    const screens = buildBeats(lesson);
    const apply = screens.find((s) => s.kind === "apply");
    expect(apply?.kind).toBe("apply");
    if (apply?.kind === "apply") {
      expect(apply.slide.type).toBe("multiple-choice");
    }
  });

  it("works with no apply steps at all", () => {
    const screens = buildBeats({ ...lesson, apply: undefined });
    expect(screens.map((s) => s.kind)).toEqual(["beat", "beat", "naming", "summary", "complete"]);
  });

  it("carries the beat payload through untouched", () => {
    const first = buildBeats(lesson)[0];
    expect(first.kind).toBe("beat");
    if (first.kind === "beat") {
      expect(first.beat.prompt).toBe("Táhni parabolu nahoru a dolů.");
    }
  });
});
