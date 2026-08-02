"use client";

import type { StageType } from "@/types/stage";
import { ParabolaRootsStage } from "./parabola-roots-stage";
import { LogSlideRuleStage } from "./log-slide-rule-stage";
import { MotionTimelineStage } from "./motion-timeline-stage";

export interface StageProps {
  params: Record<string, number>;
  onParamsChange: (next: Record<string, number>) => void;
  /** Stage part ids to spotlight for the current beat. */
  highlight?: string[];
  /** False during predict reveal and naming — the student watches, cannot drag. */
  interactive: boolean;
}

/**
 * Compile-time exhaustiveness guard: only typechecks if every `StageType`
 * member was narrowed away by an earlier `case`. Add a `StageType` without a
 * matching case here and this line fails to compile — the registry is no
 * longer the only place that catches a declared-but-unimplemented stage.
 */
function assertUnreachable(x: never): void {
  void x;
}

export function StageCanvas({ type, ...props }: StageProps & { type: StageType }) {
  switch (type) {
    case "parabola-roots":
      return <ParabolaRootsStage {...props} />;
    case "log-slide-rule":
      return <LogSlideRuleStage {...props} />;
    case "motion-timeline":
      return <MotionTimelineStage {...props} />;
    default:
      assertUnreachable(type);
      // A stage is the whole lesson, so failing silently would render a blank
      // page. Block visuals fail silently because they are decoration.
      return (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Tuto interaktivní scénu se nepodařilo načíst.
        </div>
      );
  }
}
