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
import { InteractiveRollerCoaster } from "./interactive-roller-coaster";
import { InteractiveInclinedPlane } from "./interactive-inclined-plane";
import { InteractiveCollision } from "./interactive-collision";
import { InteractivePendulum } from "./interactive-pendulum";
import { InteractiveSpringOscillator } from "./interactive-spring-oscillator";
import { InteractiveOrbit } from "./interactive-orbit";
import { InteractivePVDiagram } from "./interactive-pv-diagram";
import { InteractiveElectricField } from "./interactive-electric-field";
import { InteractiveCircuit } from "./interactive-circuit";
import { InteractiveWave } from "./interactive-wave";
import { InteractiveOptics } from "./interactive-optics";
import { InteractiveAtom } from "./interactive-atom";
import { InteractiveFunctionGraph } from "./interactive-function-graph";
import { InteractiveUnitCircle } from "./interactive-unit-circle";
import { InteractiveTriangle } from "./interactive-triangle";
import { InteractiveProbability } from "./interactive-probability";
import { InteractiveDerivative } from "./interactive-derivative";
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
    case "interactive-roller-coaster":
      content = <InteractiveRollerCoaster {...(props as any)} />;
      break;
    case "interactive-inclined-plane":
      content = <InteractiveInclinedPlane {...(props as any)} />;
      break;
    case "interactive-collision":
      content = <InteractiveCollision {...(props as any)} />;
      break;
    case "interactive-pendulum":
      content = <InteractivePendulum {...(props as any)} />;
      break;
    case "interactive-spring-oscillator":
      content = <InteractiveSpringOscillator {...(props as any)} />;
      break;
    case "interactive-orbit":
      content = <InteractiveOrbit {...(props as any)} />;
      break;
    case "interactive-pv-diagram":
      content = <InteractivePVDiagram {...(props as any)} />;
      break;
    case "interactive-electric-field":
      content = <InteractiveElectricField {...(props as any)} />;
      break;
    case "interactive-circuit":
      content = <InteractiveCircuit {...(props as any)} />;
      break;
    case "interactive-wave":
      content = <InteractiveWave {...(props as any)} />;
      break;
    case "interactive-optics":
      content = <InteractiveOptics {...(props as any)} />;
      break;
    case "interactive-atom":
      content = <InteractiveAtom {...(props as any)} />;
      break;
    case "interactive-function-graph":
      content = <InteractiveFunctionGraph {...(props as any)} />;
      break;
    case "interactive-unit-circle":
      content = <InteractiveUnitCircle {...(props as any)} />;
      break;
    case "interactive-triangle":
      content = <InteractiveTriangle {...(props as any)} />;
      break;
    case "interactive-probability":
      content = <InteractiveProbability {...(props as any)} />;
      break;
    case "interactive-derivative":
      content = <InteractiveDerivative {...(props as any)} />;
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
