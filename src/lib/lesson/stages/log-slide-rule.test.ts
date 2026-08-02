import { describe, it, expect } from "vitest";
import { readouts, LOG_SLIDE_RULE_PARAMS, LOG_SLIDE_RULE_READOUTS } from "./log-slide-rule";

describe("log-slide-rule readouts", () => {
  it("reads 1 when the rulers are aligned", () => {
    expect(readouts({ offset: 0 }).alignedValue).toBeCloseTo(1, 6);
  });

  it("reads 3 when shifted by log10(3)", () => {
    expect(readouts({ offset: Math.log10(3) }).alignedValue).toBeCloseTo(3, 6);
  });

  it("echoes the offset in log units", () => {
    expect(readouts({ offset: 0.5 }).offsetLog).toBeCloseTo(0.5, 10);
  });

  it("makes sliding multiply: alignment 3 puts 12 above the bottom 4", () => {
    const aligned = readouts({ offset: Math.log10(3) }).alignedValue;
    expect(aligned * 4).toBeCloseTo(12, 5);
  });

  it("never returns a non-finite readout", () => {
    for (const key of LOG_SLIDE_RULE_READOUTS) {
      expect(Number.isFinite(readouts({})[key]), key).toBe(true);
    }
  });

  it("declares params and readouts used by the registry", () => {
    expect(LOG_SLIDE_RULE_PARAMS).toEqual(["offset"]);
    expect(LOG_SLIDE_RULE_READOUTS).toEqual(["alignedValue", "offsetLog"]);
  });
});
