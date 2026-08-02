import type { StageType } from "@/types/stage";
import {
  readouts as parabolaRootsReadouts,
  PARABOLA_ROOTS_PARAMS,
  PARABOLA_ROOTS_READOUTS,
} from "./parabola-roots";
import {
  readouts as logSlideRuleReadouts,
  LOG_SLIDE_RULE_PARAMS,
  LOG_SLIDE_RULE_READOUTS,
} from "./log-slide-rule";
import {
  readouts as motionTimelineReadouts,
  MOTION_TIMELINE_PARAMS,
  MOTION_TIMELINE_READOUTS,
} from "./motion-timeline";

export interface StageModule {
  /** Parameter keys this stage accepts in `initial`, `preset`, and `then`. */
  params: string[];
  /**
   * Inclusive [min, max] per param. Drives the generic "ukaž mi to" search
   * and lets validation reject out-of-range authored values.
   */
  ranges: Record<string, [number, number]>;
  /** Readout keys this stage produces. Beat goals may only reference these. */
  readouts_declared: string[];
  /** Pure. Must return exactly the declared readout keys, all finite. */
  readouts: (p: Record<string, number>) => Record<string, number>;
}

/**
 * Exhaustive: every `StageType` member must have an entry here, or this is a
 * compile error. That guarantee is what makes a declared-but-unimplemented
 * stage type impossible to ship.
 */
export const stageRegistry: Record<StageType, StageModule> = {
  "parabola-roots": {
    params: PARABOLA_ROOTS_PARAMS,
    ranges: { a: [-3, 3], b: [-6, 6], c: [-8, 6] },
    readouts_declared: PARABOLA_ROOTS_READOUTS,
    readouts: parabolaRootsReadouts,
  },
  "log-slide-rule": {
    params: LOG_SLIDE_RULE_PARAMS,
    ranges: { offset: [0, 1] },
    readouts_declared: LOG_SLIDE_RULE_READOUTS,
    readouts: logSlideRuleReadouts,
  },
  "motion-timeline": {
    params: MOTION_TIMELINE_PARAMS,
    ranges: { t: [0.2, 4], h: [0.05, 2], v0: [0, 10], a: [-5, 5] },
    readouts_declared: MOTION_TIMELINE_READOUTS,
    readouts: motionTimelineReadouts,
  },
};

export function getStageModule(type: string): StageModule | null {
  return (stageRegistry as Record<string, StageModule>)[type] ?? null;
}
