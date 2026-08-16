import { describe, it, expect } from "vitest";
import { validateContent } from "./validate-content";
import { chapters } from "@/lib/lessons/data";

/**
 * `validateContent` reads the committed registry, so this suite is a regression
 * test over the real content: `pnpm test` now fails on a broken chapter instead
 * of leaving it for `prebuild`.
 */
describe("validateContent", () => {
  const report = validateContent();

  it("reports no violations for the shipped content", () => {
    expect(report.errors).toEqual([]);
  });

  it("counts every registered chapter", () => {
    expect(report.totalChapters).toBe(Object.keys(chapters).length);
    expect(report.totalChapters).toBeGreaterThan(0);
  });

  it("reports a non-empty set of shipped topics", () => {
    expect(report.shippedTopics).toBeGreaterThan(0);
  });

  it("counts comingSoon topics separately from shipped ones", () => {
    expect(report.comingSoonTopics).toBeGreaterThanOrEqual(0);
    expect(report.shippedTopics).not.toBe(report.comingSoonTopics);
  });
});
