import { describe, it, expect } from "vitest";
import { isGoalMet } from "./goal";
import type { Goal } from "@/types/stage";

const goal: Goal = { readout: "rootGap", target: 0, within: 0.15 };

describe("isGoalMet", () => {
  it("is met exactly on target", () => {
    expect(isGoalMet(goal, { rootGap: 0 })).toBe(true);
  });

  it("is met inside the tolerance on both sides", () => {
    expect(isGoalMet(goal, { rootGap: 0.1 })).toBe(true);
    expect(isGoalMet(goal, { rootGap: -0.1 })).toBe(true);
  });

  it("is met exactly at the tolerance boundary", () => {
    expect(isGoalMet(goal, { rootGap: 0.15 })).toBe(true);
  });

  it("is not met outside the tolerance", () => {
    expect(isGoalMet(goal, { rootGap: 0.2 })).toBe(false);
  });

  it("works for a non-zero target", () => {
    const g: Goal = { readout: "alignedValue", target: 3, within: 0.15 };
    expect(isGoalMet(g, { alignedValue: 2.9 })).toBe(true);
    expect(isGoalMet(g, { alignedValue: 3.5 })).toBe(false);
  });

  it("is not met when the readout is missing", () => {
    expect(isGoalMet(goal, {})).toBe(false);
  });

  it("is not met for non-finite readouts", () => {
    expect(isGoalMet(goal, { rootGap: NaN })).toBe(false);
    expect(isGoalMet(goal, { rootGap: Infinity })).toBe(false);
  });

  it("never throws", () => {
    const bad = { readout: "x", target: NaN, within: -1 } as Goal;
    expect(() => isGoalMet(bad, { x: 1 })).not.toThrow();
    expect(isGoalMet(bad, { x: 1 })).toBe(false);
  });
});
