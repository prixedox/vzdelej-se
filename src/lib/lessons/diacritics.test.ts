import { describe, it, expect } from "vitest";
import {
  collectProse,
  diacriticRatio,
  checkDiacritics,
  DIACRITIC_EXEMPT,
  MIN_LETTERS,
} from "./diacritics";
import type { ChapterDefinition } from "@/types/chapter";

describe("collectProse", () => {
  it("picks up prose-bearing keys only", () => {
    const found = collectProse({
      slug: "should-not-appear",
      body: "Rovnice má dvě řešení.",
      expectedAnswer: "42",
    });
    expect(found).toEqual(["Rovnice má dvě řešení."]);
  });

  it("descends into arrays and nested objects", () => {
    const found = collectProse({
      summary: { keyTakeaways: ["První.", "Druhé."] },
      steps: [{ question: "Kolik?" }],
    });
    expect(found.sort()).toEqual(["Druhé.", "Kolik?", "První."]);
  });
});

describe("diacriticRatio", () => {
  it("ignores LaTeX spans when counting", () => {
    // Without stripping, the ASCII-only LaTeX would drag the ratio down.
    const withMath = diacriticRatio("Řešení je $$x^{2} + bx + c = 0$$ a je přesné.");
    const withoutMath = diacriticRatio("Řešení je  a je přesné.");
    expect(withMath.letters).toBe(withoutMath.letters);
    expect(withMath.ratio).toBeCloseTo(withoutMath.ratio, 10);
  });

  it("reports a healthy ratio for real Czech prose", () => {
    const text =
      "Kvadratická rovnice má dvě řešení, jedno řešení, nebo žádné reálné řešení. " +
      "Záleží na diskriminantu, který měří vzdálenost od dotyku s osou.";
    expect(diacriticRatio(text).ratio).toBeGreaterThan(0.04);
  });

  it("reports a near-zero ratio for diacritic-stripped prose", () => {
    const text =
      "Kvadraticka rovnice ma dve reseni, jedno reseni, nebo zadne realne reseni. " +
      "Zalezi na diskriminantu, ktery meri vzdalenost od dotyku s osou.";
    expect(diacriticRatio(text).ratio).toBeLessThan(0.04);
  });

  it("returns a zero ratio rather than dividing by zero on empty input", () => {
    expect(diacriticRatio("").ratio).toBe(0);
    expect(diacriticRatio("$x^2$").ratio).toBe(0);
  });
});

function makeChapter(body: string, slug = "fresh", topicSlug = "linear-equations"): ChapterDefinition {
  return {
    slug,
    topicSlug,
    order: 99,
    title: "Testovací kapitola",
    lesson: {
      steps: [{ type: "explain", body }],
      summary: { keyTakeaways: ["Shrnutí."] },
    },
  };
}

describe("checkDiacritics", () => {
  const longCzech =
    "Kvadratická rovnice má dvě řešení, jedno řešení, nebo žádné reálné řešení. ".repeat(6);
  const longStripped =
    "Kvadraticka rovnice ma dve reseni, jedno reseni, nebo zadne realne reseni. ".repeat(6);

  it("passes healthy Czech prose", () => {
    expect(checkDiacritics("linear-equations/fresh", makeChapter(longCzech))).toEqual([]);
  });

  it("fails prose with stripped diacritics", () => {
    const errors = checkDiacritics("linear-equations/fresh", makeChapter(longStripped));
    expect(errors.length).toBe(1);
    expect(errors[0]).toContain("[diacritics]");
  });

  it("skips chapters on the grandfather list", () => {
    const [exempt] = [...DIACRITIC_EXEMPT];
    const [topicSlug, slug] = exempt.split("/");
    expect(checkDiacritics(exempt, makeChapter(longStripped, slug, topicSlug))).toEqual([]);
  });

  it("skips chapters with too little prose to judge", () => {
    expect(diacriticRatio("Ano.").letters).toBeLessThan(MIN_LETTERS);
    expect(checkDiacritics("linear-equations/fresh", makeChapter("Ano."))).toEqual([]);
  });
});
