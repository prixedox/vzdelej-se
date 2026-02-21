"use client";

import { BalanceScale } from "./balance-scale";
import { NumberLine } from "./number-line";
import { MotionDiagram } from "./motion-diagram";
import { VelocityGraph } from "./velocity-graph";
import { Trajectory } from "./trajectory";
import { InteractiveBalanceScale } from "./interactive-balance-scale";
import { InteractiveNumberLine } from "./interactive-number-line";
import { InteractiveTrajectory } from "./interactive-trajectory";
import { InteractiveVelocityGraph } from "./interactive-velocity-graph";
import { InteractiveMotion } from "./interactive-motion";
import type { VisualBlock as VisualBlockType } from "@/types/lesson";

export function VisualBlock({
  visual,
  animated = false,
}: {
  visual: VisualBlockType;
  animated?: boolean;
}) {
  const { type, props, caption } = visual;

  let content: React.ReactNode = null;

  switch (type) {
    case "balance-scale":
      content = <BalanceScale {...(props as any)} animated={animated} />;
      break;
    case "number-line":
      content = <NumberLine {...(props as any)} animated={animated} />;
      break;
    case "motion-diagram":
      content = <MotionDiagram {...(props as any)} animated={animated} />;
      break;
    case "velocity-graph":
      content = <VelocityGraph {...(props as any)} animated={animated} />;
      break;
    case "trajectory":
      content = <Trajectory {...(props as any)} animated={animated} />;
      break;
    case "graph-st":
      content = (
        <VelocityGraph
          {...(props as any)}
          yLabel="s (m)"
          animated={animated}
        />
      );
      break;
    case "interactive-balance-scale":
      content = <InteractiveBalanceScale {...(props as any)} />;
      break;
    case "interactive-number-line":
      content = <InteractiveNumberLine {...(props as any)} />;
      break;
    case "interactive-trajectory":
      content = <InteractiveTrajectory {...(props as any)} />;
      break;
    case "interactive-velocity-graph":
      content = <InteractiveVelocityGraph {...(props as any)} />;
      break;
    case "interactive-motion":
      content = <InteractiveMotion {...(props as any)} />;
      break;
    default:
      return null;
  }

  return (
    <div className="my-4 rounded-xl border bg-card p-4 shadow-sm">
      {content}
      {caption && (
        <p className="text-center text-xs text-muted-foreground mt-2 italic">
          {caption}
        </p>
      )}
    </div>
  );
}
