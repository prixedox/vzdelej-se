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
import { AnimatedEquationSolver } from "./animated-equation-solver";
import type { VisualBlock as VisualBlockType } from "@/types/lesson";

/**
 * Authored visual props reach the router as `Record<string, unknown>` — chapter
 * content is checked by Zod at build time, not by the compiler. Each visual owns
 * the real prop interface, so the target type is inferred from the JSX spread and
 * asserted once here, at the single trust boundary. Spreading `any` instead would
 * also drop type checking on the sibling props passed next to it.
 */
function visualProps<T>(props: Record<string, unknown>): T {
  return props as unknown as T;
}

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
      content = <BalanceScale {...visualProps(props)} animated={animated} />;
      break;
    case "number-line":
      content = <NumberLine {...visualProps(props)} animated={animated} />;
      break;
    case "motion-diagram":
      content = <MotionDiagram {...visualProps(props)} animated={animated} />;
      break;
    case "velocity-graph":
      content = <VelocityGraph {...visualProps(props)} animated={animated} />;
      break;
    case "trajectory":
      content = <Trajectory {...visualProps(props)} animated={animated} />;
      break;
    case "graph-st":
      content = (
        <VelocityGraph
          {...visualProps(props)}
          yLabel="s (m)"
          animated={animated}
        />
      );
      break;
    case "interactive-balance-scale":
      content = <InteractiveBalanceScale {...visualProps(props)} />;
      break;
    case "interactive-number-line":
      content = <InteractiveNumberLine {...visualProps(props)} />;
      break;
    case "interactive-trajectory":
      content = <InteractiveTrajectory {...visualProps(props)} />;
      break;
    case "interactive-velocity-graph":
      content = <InteractiveVelocityGraph {...visualProps(props)} />;
      break;
    case "interactive-motion":
      content = <InteractiveMotion {...visualProps(props)} />;
      break;
    case "interactive-roller-coaster":
      content = <InteractiveRollerCoaster {...visualProps(props)} />;
      break;
    case "interactive-inclined-plane":
      content = <InteractiveInclinedPlane {...visualProps(props)} />;
      break;
    case "interactive-collision":
      content = <InteractiveCollision {...visualProps(props)} />;
      break;
    case "interactive-pendulum":
      content = <InteractivePendulum {...visualProps(props)} />;
      break;
    case "interactive-spring-oscillator":
      content = <InteractiveSpringOscillator {...visualProps(props)} />;
      break;
    case "interactive-orbit":
      content = <InteractiveOrbit {...visualProps(props)} />;
      break;
    case "interactive-pv-diagram":
      content = <InteractivePVDiagram {...visualProps(props)} />;
      break;
    case "interactive-electric-field":
      content = <InteractiveElectricField {...visualProps(props)} />;
      break;
    case "interactive-circuit":
      content = <InteractiveCircuit {...visualProps(props)} />;
      break;
    case "interactive-wave":
      content = <InteractiveWave {...visualProps(props)} />;
      break;
    case "interactive-optics":
      content = <InteractiveOptics {...visualProps(props)} />;
      break;
    case "interactive-atom":
      content = <InteractiveAtom {...visualProps(props)} />;
      break;
    case "interactive-function-graph":
      content = <InteractiveFunctionGraph {...visualProps(props)} />;
      break;
    case "interactive-unit-circle":
      content = <InteractiveUnitCircle {...visualProps(props)} />;
      break;
    case "interactive-triangle":
      content = <InteractiveTriangle {...visualProps(props)} />;
      break;
    case "interactive-probability":
      content = <InteractiveProbability {...visualProps(props)} />;
      break;
    case "interactive-derivative":
      content = <InteractiveDerivative {...visualProps(props)} />;
      break;
    case "animated-equation-solver":
      content = <AnimatedEquationSolver {...props} />;
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
