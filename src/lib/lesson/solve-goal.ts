import type { Goal } from "@/types/stage";
import type { StageModule } from "./stages/registry";
import { isGoalMet } from "./goal";

const SAMPLES = 200;
const ZOOM_ROUNDS = 5;

/**
 * Find parameters that satisfy `goal`, by sweeping one declared param at a
 * time across its registry-declared range. Generic across stages — no stage's
 * parameter names appear here.
 *
 * A single flat sweep is not enough: some readouts (e.g. a root gap through a
 * touching point) behave like `sqrt` near their target, so the interesting
 * band can be far narrower than a uniform grid's spacing and a fixed sample
 * count would silently walk right past it. Each round instead keeps the
 * closest candidate found and re-samples a narrower window around it, which
 * converges geometrically toward any such cusp regardless of stage or
 * tolerance, without assuming the readout is monotonic in the param.
 *
 * Backs the "ukaž mi to" escape, so a student is never trapped by a goal they
 * cannot hit. Returns null when nothing in range works.
 */
export function solveGoal(
  goal: Goal,
  mod: StageModule,
  current: Record<string, number>
): Record<string, number> | null {
  if (isGoalMet(goal, mod.readouts(current))) return current;

  for (const param of mod.params) {
    const range = mod.ranges[param];
    if (!range) continue;
    const [rangeMin, rangeMax] = range;

    let lo = rangeMin;
    let hi = rangeMax;

    for (let round = 0; round < ZOOM_ROUNDS; round++) {
      let bestValue = lo;
      let bestDiff = Infinity;

      for (let i = 0; i <= SAMPLES; i++) {
        const value = lo + ((hi - lo) * i) / SAMPLES;
        const candidate = { ...current, [param]: value };
        const ro = mod.readouts(candidate);
        if (isGoalMet(goal, ro)) return candidate;

        const observed = ro[goal.readout];
        if (typeof observed === "number" && Number.isFinite(observed)) {
          const diff = Math.abs(observed - goal.target);
          if (diff < bestDiff) {
            bestDiff = diff;
            bestValue = value;
          }
        }
      }

      const step = (hi - lo) / SAMPLES;
      lo = Math.max(rangeMin, bestValue - step);
      hi = Math.min(rangeMax, bestValue + step);
    }
  }
  return null;
}
