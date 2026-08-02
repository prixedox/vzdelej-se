import { describe, it, expect } from "vitest";
import { solveGoal } from "./solve-goal";
import { isGoalMet } from "./goal";
import type { StageModule } from "./stages/registry";
import {
  readouts,
  PARABOLA_ROOTS_PARAMS,
  PARABOLA_ROOTS_READOUTS,
} from "./stages/parabola-roots";

const mod: StageModule = {
  params: PARABOLA_ROOTS_PARAMS,
  ranges: { a: [-3, 3], b: [-6, 6], c: [-8, 6] },
  readouts_declared: PARABOLA_ROOTS_READOUTS,
  readouts,
};

describe("solveGoal", () => {
  const goal = { readout: "rootGap", target: 0, within: 0.15 };

  it("finds params satisfying the goal", () => {
    const solved = solveGoal(goal, mod, { a: 1, b: 0, c: -4 });
    expect(solved).not.toBeNull();
    expect(isGoalMet(goal, mod.readouts(solved!))).toBe(true);
  });

  it("changes only one parameter, leaving the rest as they were", () => {
    const solved = solveGoal(goal, mod, { a: 1, b: 0, c: -4 })!;
    const changed = PARABOLA_ROOTS_PARAMS.filter((p) => solved[p] !== ({ a: 1, b: 0, c: -4 } as Record<string, number>)[p]);
    expect(changed.length).toBe(1);
  });

  it("returns null when no value in range satisfies the goal", () => {
    const impossible = { readout: "rootGap", target: 999, within: 0.001 };
    expect(solveGoal(impossible, mod, { a: 1, b: 0, c: -4 })).toBeNull();
  });

  it("returns the current params untouched when the goal already holds", () => {
    const current = { a: 1, b: 0, c: 0 };
    expect(solveGoal(goal, mod, current)).toEqual(current);
  });

  it("never throws on a goal referencing an unknown readout", () => {
    const bad = { readout: "nope", target: 0, within: 0.1 };
    expect(() => solveGoal(bad, mod, { a: 1, b: 0, c: -4 })).not.toThrow();
    expect(solveGoal(bad, mod, { a: 1, b: 0, c: -4 })).toBeNull();
  });

  // A flat single-resolution sweep would need to zoom in on a target sitting
  // just past a declared boundary; caught via mutation testing that an
  // unclamped zoom window can walk the search past the registry-declared
  // range. `readouts` here throws if that ever happens, so any regression
  // surfaces as a thrown error rather than a silently wrong value.
  it("never samples a parameter value outside its declared range while zooming toward an unreachable boundary target", () => {
    const guardedMod: StageModule = {
      params: ["x"],
      ranges: { x: [0, 10] },
      readouts_declared: ["y"],
      readouts: (p) => {
        if (p.x < 0 || p.x > 10) {
          throw new Error(`solveGoal probed x=${p.x}, outside declared range [0, 10]`);
        }
        return { y: p.x };
      },
    };
    // Just past the reachable maximum, with a tolerance tight enough that the
    // exact boundary sample (x = 10) does not satisfy it — this forces the
    // search into its zoom rounds rather than returning on the first pass.
    const goal = { readout: "y", target: 10.00002, within: 0.00001 };
    expect(() => solveGoal(goal, guardedMod, { x: 0 })).not.toThrow();
    expect(solveGoal(goal, guardedMod, { x: 0 })).toBeNull();
  });

  // Pins the fix for a live bug: the discriminant chapter's manipulate beat
  // ("bring the parabola to a tangent") used to accept the FIRST sample
  // encountered along the sweep that satisfied the tolerance, landing at
  // c ≈ -0.01 (rootCount 2) while the "onReached" message claims the two
  // roots merged into one — a self-contradicting screen at the pedagogical
  // climax. The true touching point for this exact setup is c = 0 exactly
  // (rootGap 0, rootCount 1). solveGoal must now return the BEST candidate
  // (closest to the target) rather than the first acceptable one.
  it("returns the closest candidate to the touching point, not the first acceptable one (regression pin)", () => {
    const solved = solveGoal(goal, mod, { a: 1, b: 0, c: -4 })!;
    expect(solved).not.toBeNull();

    const oldFirstHitC = -0.01;
    expect(Math.abs(solved.c)).toBeLessThan(Math.abs(oldFirstHitC) / 10);

    const ro = readouts(solved);
    expect(isGoalMet(goal, ro)).toBe(true);
    expect(Math.abs(ro.rootGap)).toBeLessThan(0.001);
    expect(ro.rootCount).toBe(1);
  });
});
