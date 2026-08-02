import type { Goal } from "@/types/stage";
import type { StageModule } from "./stages/registry";
import { isGoalMet } from "./goal";

const SAMPLES = 200;
const ZOOM_ROUNDS = 5;

/**
 * Find parameters that satisfy `goal`, by sweeping one of the stage's
 * declared SOLVABLE params at a time across its registry-declared range.
 * Generic across stages — no stage's parameter names appear here. Restricted
 * to `solvableParams` (not all of `params`) so the search can never propose
 * changing a param the student has no control over: that would demonstrate a
 * motion they cannot reproduce with the one control they actually have.
 *
 * A single flat sweep is not enough: some readouts (e.g. a root gap through a
 * touching point) behave like `sqrt` near their target, so the interesting
 * band can be far narrower than a uniform grid's spacing and a fixed sample
 * count would silently walk right past it. Each round instead keeps the
 * closest candidate found so far and re-samples a narrower window around it,
 * which converges geometrically toward any such cusp regardless of stage or
 * tolerance, without assuming the readout is monotonic in the param.
 *
 * Returns the candidate that MINIMISES |readout - target| across the whole
 * search — never the first sample that merely happens to satisfy the
 * tolerance. A first-hit return can land anywhere inside the tolerance band,
 * including right at its edge: for a readout derived from the same params by
 * exact equality (e.g. a discriminant's root count), that visibly
 * contradicts an "exactly touching" message shown alongside it. After the
 * zoom, the result is opportunistically polished onto a grid a thousand
 * times finer than the goal's own tolerance — far too fine to change whether
 * the goal holds, but coarse enough to absorb the zoom's leftover
 * floating-point noise, so a true answer that is itself a clean number (like
 * exactly 0) comes back as exactly that number instead of an
 * arbitrarily-signed, vanishingly small neighbour of it. If polishing would
 * ever push the candidate back out of tolerance, the unpolished (already
 * verified) candidate is returned instead.
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

  for (const param of mod.solvableParams) {
    const range = mod.ranges[param];
    if (!range) continue;
    const [rangeMin, rangeMax] = range;

    let lo = rangeMin;
    let hi = rangeMax;
    let bestValue = lo;
    let bestDiff = Infinity;

    for (let round = 0; round < ZOOM_ROUNDS; round++) {
      let roundBestValue = lo;
      let roundBestDiff = Infinity;

      for (let i = 0; i <= SAMPLES; i++) {
        const value = lo + ((hi - lo) * i) / SAMPLES;
        const candidate = { ...current, [param]: value };
        const ro = mod.readouts(candidate);
        const observed = ro[goal.readout];
        if (typeof observed === "number" && Number.isFinite(observed)) {
          const diff = Math.abs(observed - goal.target);
          if (diff < roundBestDiff) {
            roundBestDiff = diff;
            roundBestValue = value;
          }
        }
      }

      if (roundBestDiff < bestDiff) {
        bestDiff = roundBestDiff;
        bestValue = roundBestValue;
      }

      const step = (hi - lo) / SAMPLES;
      lo = Math.max(rangeMin, roundBestValue - step);
      hi = Math.min(rangeMax, roundBestValue + step);
    }

    const best = { ...current, [param]: bestValue };
    if (!isGoalMet(goal, mod.readouts(best))) continue;

    if (goal.within > 0) {
      const grain = goal.within / 1000;
      const snapped = Math.max(rangeMin, Math.min(rangeMax, Math.round(bestValue / grain) * grain));
      const polished = { ...current, [param]: snapped };
      if (isGoalMet(goal, mod.readouts(polished))) return polished;
    }

    return best;
  }
  return null;
}
