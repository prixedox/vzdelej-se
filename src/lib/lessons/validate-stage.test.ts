import { describe, it, expect } from "vitest";
import { formulaToken, validateStageChapter } from "./validate-stage";
import type { StageChapter } from "@/types/chapter";

function chapter(overrides: Partial<StageChapter["lesson"]> = {}): StageChapter {
  return {
    slug: "discriminant",
    topicSlug: "quadratic-equations",
    order: 2,
    format: "stage",
    title: "Diskriminant",
    lesson: {
      stage: {
        type: "parabola-roots",
        initial: { a: 1, b: 0, c: -4 },
        readouts: ["rootCount", "rootGap", "vertexY"],
      },
      beats: [
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
      ...overrides,
    },
  };
}

describe("formulaToken", () => {
  it("takes the longest side of an equation, whitespace stripped", () => {
    expect(formulaToken("D = b^2 - 4ac")).toBe("b^2-4ac");
    expect(formulaToken("E = mc^2")).toBe("mc^2");
  });

  it("handles a multi-term right-hand side", () => {
    expect(formulaToken("\\log(ab) = \\log a + \\log b")).toBe("\\loga+\\logb");
  });

  it("returns the whole string when there is no equals sign", () => {
    expect(formulaToken("a^2 + b^2")).toBe("a^2+b^2");
  });
});

describe("validateStageChapter", () => {
  it("accepts a well-formed chapter", () => {
    expect(validateStageChapter("quadratic-equations/discriminant", chapter())).toEqual([]);
  });

  it("rejects a goal referencing an undeclared readout", () => {
    const bad = chapter({
      beats: [
        {
          kind: "manipulate",
          prompt: "Posuň.",
          goal: { readout: "notAThing", target: 0, within: 0.1 },
          onReached: "Hotovo.",
        },
      ],
    });
    const errors = validateStageChapter("k", bad);
    expect(errors.some((e) => e.includes("notAThing"))).toBe(true);
  });

  it("rejects a preset key the stage does not declare", () => {
    const bad = chapter({
      beats: [{ kind: "observe", prompt: "Sleduj.", preset: { zzz: 1 } }],
    });
    expect(validateStageChapter("k", bad).some((e) => e.includes("zzz"))).toBe(true);
  });

  it("rejects an unregistered stage type", () => {
    const bad = chapter({
      stage: { type: "no-such-stage", initial: {}, readouts: ["x"] },
    } as unknown as Partial<StageChapter["lesson"]>);
    expect(validateStageChapter("k", bad).some((e) => e.includes("no-such-stage"))).toBe(true);
  });

  it("rejects readouts the stage module does not produce", () => {
    const bad = chapter({
      stage: { type: "parabola-roots", initial: { a: 1 }, readouts: ["madeUp"] },
    } as Partial<StageChapter["lesson"]>);
    expect(validateStageChapter("k", bad).some((e) => e.includes("madeUp"))).toBe(true);
  });

  it("rejects the naming formula leaking into a beat prompt", () => {
    const bad = chapter({
      beats: [{ kind: "observe", prompt: "Vzorec je $b^2 - 4ac$, zapamatuj si ho." }],
    });
    expect(validateStageChapter("k", bad).some((e) => e.includes("formula-leak"))).toBe(true);
  });

  it("rejects the formula leaking into onReached", () => {
    const bad = chapter({
      beats: [
        {
          kind: "manipulate",
          prompt: "Posuň.",
          goal: { readout: "rootGap", target: 0, within: 0.1 },
          onReached: "Tady je b^2-4ac rovno nule.",
        },
      ],
    });
    expect(validateStageChapter("k", bad).some((e) => e.includes("formula-leak"))).toBe(true);
  });

  it("allows the formula in the naming block itself", () => {
    expect(validateStageChapter("k", chapter())).toEqual([]);
  });

  it("does not flag a short formula token embedded inside an unrelated word (regression)", () => {
    // formulaToken("F = ma") === "ma"; "matematice" contains "ma" twice but
    // never as a standalone occurrence — must not be treated as a leak.
    const ok = chapter({
      beats: [
        {
          kind: "observe",
          prompt: "Zkus si to spočítat jako v matematice, uvidíš, co se stane.",
        },
      ],
      naming: {
        observation: "Síla je úměrná hmotnosti a zrychlení.",
        formula: "F = ma",
        mapping: "$F$ je síla, $m$ je hmotnost, $a$ je zrychlení.",
      },
    });
    expect(validateStageChapter("k", ok)).toEqual([]);
  });

  it("still flags a standalone short formula token", () => {
    const bad = chapter({
      beats: [{ kind: "observe", prompt: "výsledek je ma" }],
      naming: {
        observation: "Síla je úměrná hmotnosti a zrychlení.",
        formula: "F = ma",
        mapping: "$F$ je síla, $m$ je hmotnost, $a$ je zrychlení.",
      },
    });
    expect(validateStageChapter("k", bad).some((e) => e.includes("formula-leak"))).toBe(true);
  });
});
