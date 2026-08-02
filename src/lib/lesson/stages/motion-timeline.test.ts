import { describe, it, expect } from "vitest";
import { readouts, MOTION_TIMELINE_PARAMS, MOTION_TIMELINE_READOUTS } from "./motion-timeline";

describe("motion-timeline readouts", () => {
  it("computes position from uniformly accelerated motion", () => {
    // s = v0*t + a*t²/2 with v0 = 0, a = 2, t = 3 → 9
    expect(readouts({ t: 3, h: 1, v0: 0, a: 2 }).position).toBeCloseTo(9, 6);
  });

  it("computes instantaneous velocity", () => {
    // v = v0 + a*t = 1 + 2*3 = 7
    expect(readouts({ t: 3, h: 1, v0: 1, a: 2 }).instantVelocity).toBeCloseTo(7, 6);
  });

  it("computes the secant slope over the interval h", () => {
    // v0 = 0, a = 2, t = 3, h = 1 → (s(4)-s(3))/1 = 16 - 9 = 7
    expect(readouts({ t: 3, h: 1, v0: 0, a: 2 }).secantSlope).toBeCloseTo(7, 6);
  });

  it("closes the gap between secant and tangent as h shrinks", () => {
    const wide = Math.abs(readouts({ t: 3, h: 1, v0: 0, a: 2 }).gapToInstant);
    const narrow = Math.abs(readouts({ t: 3, h: 0.05, v0: 0, a: 2 }).gapToInstant);
    expect(narrow).toBeLessThan(wide);
    expect(narrow).toBeLessThan(0.1);
  });

  it("never divides by zero when h collapses", () => {
    for (const key of MOTION_TIMELINE_READOUTS) {
      expect(Number.isFinite(readouts({ t: 1, h: 0, v0: 0, a: 2 })[key]), key).toBe(true);
    }
  });

  it("declares params and readouts used by the registry", () => {
    expect(MOTION_TIMELINE_PARAMS).toEqual(["t", "h", "v0", "a"]);
    expect(MOTION_TIMELINE_READOUTS).toEqual([
      "position",
      "instantVelocity",
      "secantSlope",
      "gapToInstant",
    ]);
  });
});
