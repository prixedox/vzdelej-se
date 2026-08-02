import { describe, it, expect } from "vitest";
import { readouts, PARABOLA_ROOTS_PARAMS, PARABOLA_ROOTS_READOUTS } from "./parabola-roots";

describe("parabola-roots readouts", () => {
  it("reports two roots when the discriminant is positive", () => {
    // x^2 - 4 = 0 → roots at ±2, D = 16
    const r = readouts({ a: 1, b: 0, c: -4 });
    expect(r.rootCount).toBe(2);
    expect(r.rootGap).toBeCloseTo(4, 5);
  });

  it("reports one root and zero gap at the touching point", () => {
    // x^2 = 0 → D = 0
    const r = readouts({ a: 1, b: 0, c: 0 });
    expect(r.rootCount).toBe(1);
    expect(r.rootGap).toBeCloseTo(0, 10);
  });

  it("reports no roots and a negative gap once lifted past the axis", () => {
    // x^2 + 2 = 0 → D = -8
    const r = readouts({ a: 1, b: 0, c: 2 });
    expect(r.rootCount).toBe(0);
    expect(r.rootGap).toBeLessThan(0);
  });

  it("passes rootGap continuously through zero so overshoot is distinguishable", () => {
    const just = readouts({ a: 1, b: 0, c: -0.01 }).rootGap;
    const past = readouts({ a: 1, b: 0, c: 0.01 }).rootGap;
    expect(just).toBeGreaterThan(0);
    expect(past).toBeLessThan(0);
    expect(Math.abs(just + past)).toBeLessThan(1e-9);
  });

  it("handles a downward-opening parabola", () => {
    // -x^2 + 4 = 0 → roots at ±2
    const r = readouts({ a: -1, b: 0, c: 4 });
    expect(r.rootCount).toBe(2);
    expect(r.rootGap).toBeCloseTo(4, 5);
  });

  it("computes the vertex y-coordinate", () => {
    // x^2 - 4x + 1 → vertex at x = 2, y = -3
    expect(readouts({ a: 1, b: -4, c: 1 }).vertexY).toBeCloseTo(-3, 5);
  });

  it("never returns a non-finite readout, even for a degenerate a", () => {
    for (const key of PARABOLA_ROOTS_READOUTS) {
      expect(Number.isFinite(readouts({ a: 0, b: 0, c: 0 })[key]), key).toBe(true);
    }
  });

  it("declares params and readouts used by the registry", () => {
    expect(PARABOLA_ROOTS_PARAMS).toEqual(["a", "b", "c"]);
    expect(PARABOLA_ROOTS_READOUTS).toEqual(["rootCount", "rootGap", "vertexY"]);
  });
});
