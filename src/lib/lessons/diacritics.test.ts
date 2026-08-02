import { describe, it, expect } from "vitest";
import {
  collectProse,
  diacriticRatio,
  checkDiacritics,
  DIACRITIC_EXEMPT,
  MIN_LETTERS,
  MIN_DIACRITIC_RATIO,
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

  it("descends into wrongAnswerFeedback maps (Record<string, string>), collecting the prose values but not the answer keys", () => {
    const found = collectProse({
      steps: [
        {
          type: "text-input",
          question: "Kolik je 4 + 4?",
          wrongAnswerFeedback: {
            "7": "Skoro, zkus to znovu.",
            "9": "Přepočítej sčítání.",
          },
        },
      ],
    });
    expect(found.sort()).toEqual([
      "Kolik je 4 + 4?",
      "Přepočítej sčítání.",
      "Skoro, zkus to znovu.",
    ]);
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
    // Deliberately bypasses makeChapter: its fixed "Testovací kapitola" title
    // and "Shrnutí." takeaway are themselves accented and long enough to
    // clear MIN_DIACRITIC_RATIO on their own, which would make this pass
    // regardless of the MIN_LETTERS floor. Here the *entire* collected prose
    // (title + body + takeaways) must stay under MIN_LETTERS and, since it is
    // diacritic-free, would fail the ratio gate if the floor did not short-circuit first.
    const shortStripped: ChapterDefinition = {
      slug: "fresh",
      topicSlug: "linear-equations",
      order: 99,
      title: "",
      lesson: {
        steps: [{ type: "explain", body: "Ano ano ano zadny hacek tady." }],
        summary: { keyTakeaways: [] },
      },
    };
    const { letters, ratio } = diacriticRatio(collectProse(shortStripped).join(" "));
    expect(letters).toBeLessThan(MIN_LETTERS);
    expect(ratio).toBeLessThan(MIN_DIACRITIC_RATIO);
    expect(checkDiacritics("linear-equations/fresh", shortStripped)).toEqual([]);
  });

  it("treats a ratio exactly at MIN_DIACRITIC_RATIO as passing (inclusive boundary)", () => {
    // Synthetic, not real prose: precisely 200 letters (== MIN_LETTERS, so the
    // letters floor does not fire) with exactly 8 marked, pinning the ratio to
    // exactly 0.04 == MIN_DIACRITIC_RATIO. This exercises the `>=` boundary in
    // checkDiacritics directly, rather than comfortably clearing it.
    const boundaryText = "a".repeat(192) + "á".repeat(8);
    const { letters, ratio } = diacriticRatio(boundaryText);
    expect(letters).toBe(200);
    expect(ratio).toBeCloseTo(MIN_DIACRITIC_RATIO, 10);

    const chapter: ChapterDefinition = {
      slug: "boundary",
      topicSlug: "linear-equations",
      order: 99,
      title: "",
      lesson: {
        steps: [{ type: "explain", body: boundaryText }],
        summary: { keyTakeaways: [] },
      },
    };
    expect(checkDiacritics("linear-equations/boundary", chapter)).toEqual([]);
  });
});
