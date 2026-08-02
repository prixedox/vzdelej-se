import { describe, it, expect } from "vitest";
import { stageRegistry, getStageModule } from "./registry";

describe("stage registry", () => {
  it("resolves a registered stage", () => {
    const mod = getStageModule("parabola-roots");
    expect(mod).not.toBeNull();
    expect(mod?.params).toEqual(["a", "b", "c"]);
  });

  it("returns null for an unregistered stage", () => {
    expect(getStageModule("does-not-exist")).toBeNull();
  });

  it("declares a range for every param, low before high", () => {
    for (const [type, mod] of Object.entries(stageRegistry)) {
      for (const p of mod.params) {
        const range = mod.ranges[p];
        expect(range, `${type}.${p}`).toBeDefined();
        expect(range[0], `${type}.${p}`).toBeLessThan(range[1]);
      }
    }
  });

  it("every registered stage produces exactly the readouts it declares", () => {
    for (const [type, mod] of Object.entries(stageRegistry)) {
      const seed = Object.fromEntries(mod.params.map((p) => [p, 1]));
      const produced = Object.keys(mod.readouts(seed)).sort();
      expect(produced, type).toEqual([...mod.readouts_declared].sort());
    }
  });

  it("every registered stage declares at least one param and one readout", () => {
    for (const [type, mod] of Object.entries(stageRegistry)) {
      expect(mod.params.length, type).toBeGreaterThan(0);
      expect(mod.readouts_declared.length, type).toBeGreaterThan(0);
    }
  });
});
