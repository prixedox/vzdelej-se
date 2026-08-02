import type { StageType } from "@/types/stage";
import {
  readouts as parabolaRootsReadouts,
  PARABOLA_ROOTS_PARAMS,
  PARABOLA_ROOTS_READOUTS,
} from "./parabola-roots";

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
 * `Partial` while only one stage exists — Tasks 13 and 14 add the other two,
 * and Task 14 restores the exhaustive `Record<StageType, StageModule>` so a
 * declared-but-unimplemented stage type becomes a compile error.
 */
export const stageRegistry: Partial<Record<StageType, StageModule>> = {
  "parabola-roots": {
    params: PARABOLA_ROOTS_PARAMS,
    ranges: { a: [-3, 3], b: [-6, 6], c: [-8, 6] },
    readouts_declared: PARABOLA_ROOTS_READOUTS,
    readouts: parabolaRootsReadouts,
  },
};

export function getStageModule(type: string): StageModule | null {
  return (stageRegistry as Record<string, StageModule>)[type] ?? null;
}
