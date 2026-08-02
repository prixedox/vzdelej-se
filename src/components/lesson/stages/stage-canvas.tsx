"use client";

import { ParabolaRootsStage } from "./parabola-roots-stage";
import { LogSlideRuleStage } from "./log-slide-rule-stage";

export interface StageProps {
  params: Record<string, number>;
  onParamsChange: (next: Record<string, number>) => void;
  /** Stage part ids to spotlight for the current beat. */
  highlight?: string[];
  /** False during predict reveal and naming — the student watches, cannot drag. */
  interactive: boolean;
}

export function StageCanvas({ type, ...props }: StageProps & { type: string }) {
  switch (type) {
    case "parabola-roots":
      return <ParabolaRootsStage {...props} />;
    case "log-slide-rule":
      return <LogSlideRuleStage {...props} />;
    default:
      // A stage is the whole lesson, so failing silently would render a blank
      // page. Block visuals fail silently because they are decoration.
      return (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Tuto interaktivní scénu se nepodařilo načíst.
        </div>
      );
  }
}
