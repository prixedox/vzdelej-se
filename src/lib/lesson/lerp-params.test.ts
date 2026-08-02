import { describe, it, expect } from "vitest";
import { lerpParams } from "./lerp-params";

describe("lerpParams", () => {
  it("returns the start values at k = 0", () => {
    expect(lerpParams({ c: -4 }, { c: 2 }, 0)).toEqual({ c: -4 });
  });

  it("returns the target values at k = 1", () => {
    expect(lerpParams({ c: -4 }, { c: 2 }, 1)).toEqual({ c: 2 });
  });

  it("interpolates linearly in between", () => {
    expect(lerpParams({ c: 0 }, { c: 10 }, 0.5).c).toBeCloseTo(5, 10);
  });

  it("interpolates every shared key", () => {
    const out = lerpParams({ a: 0, c: 0 }, { a: 2, c: 10 }, 0.5);
    expect(out.a).toBeCloseTo(1, 10);
    expect(out.c).toBeCloseTo(5, 10);
  });

  it("keeps start-only keys untouched", () => {
    expect(lerpParams({ a: 1, c: 0 }, { c: 10 }, 1)).toEqual({ a: 1, c: 10 });
  });

  it("adopts target-only keys immediately", () => {
    expect(lerpParams({ c: 0 }, { b: 3 }, 0.5).b).toBe(3);
  });

  it("clamps k outside the unit interval", () => {
    expect(lerpParams({ c: 0 }, { c: 10 }, -1).c).toBe(0);
    expect(lerpParams({ c: 0 }, { c: 10 }, 5).c).toBe(10);
  });
});
