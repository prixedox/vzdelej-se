"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { readouts, safeA } from "@/lib/lesson/stages/parabola-roots";
import { SliderControl } from "@/components/lesson/visuals/slider-control";
import { cn } from "@/lib/utils";
import type { StageProps } from "./stage-canvas";

const VB = { w: 480, h: 320 };
const X_RANGE: [number, number] = [-5, 5];
const C_RANGE: [number, number] = [-8, 6];
// At the default a=1, b=0, vertexY = c - b²/(4a) = c, so the vertex tracks
// the `c` slider 1:1. Y_RANGE's lower bound must therefore be <= C_RANGE's
// lower bound (-8), or the vertex clips out of view before the slider hits
// its own minimum. Upper bound just needs to clear C_RANGE's max (6).
const Y_RANGE: [number, number] = [-8, 10];

function toSvgX(x: number): number {
  return ((x - X_RANGE[0]) / (X_RANGE[1] - X_RANGE[0])) * VB.w;
}

function toSvgY(y: number): number {
  return VB.h - ((y - Y_RANGE[0]) / (Y_RANGE[1] - Y_RANGE[0])) * VB.h;
}

function curvePath(a: number, b: number, c: number): string {
  const steps = 120;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = X_RANGE[0] + ((X_RANGE[1] - X_RANGE[0]) * i) / steps;
    pts.push(`${toSvgX(x).toFixed(2)},${toSvgY(a * x * x + b * x + c).toFixed(2)}`);
  }
  return `M ${pts.join(" L ")}`;
}

export function ParabolaRootsStage({
  params,
  onParamsChange,
  highlight,
  interactive,
}: StageProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const a = params.a ?? 1;
  const b = params.b ?? 0;
  const c = params.c ?? 0;

  const r = readouts({ a, b, c });
  const rootsHighlighted = highlight?.includes("roots") ?? false;

  // Zero-guarded `a`, shared with readouts() so the markers and the drag
  // handler below never divide by an authored a ≈ 0.
  const aSafe = safeA(a);

  // Real x-intercepts for the marker circles. disc >= 0 covers both two
  // distinct roots and the exactly-touching case (disc === 0, one repeated root).
  const disc = b * b - 4 * aSafe * c;
  const roots =
    disc >= 0
      ? [(-b - Math.sqrt(disc)) / (2 * aSafe), (-b + Math.sqrt(disc)) / (2 * aSafe)]
      : [];

  function setC(next: number) {
    onParamsChange({ ...params, c: Math.min(C_RANGE[1], Math.max(C_RANGE[0], next)) });
  }

  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!interactive || e.buttons !== 1 || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const ratio = (e.clientY - rect.top) / rect.height;
    const yValue = Y_RANGE[1] - ratio * (Y_RANGE[1] - Y_RANGE[0]);
    // Dragging moves the vertex to the pointer: c = yTarget + b²/4a.
    setC(yValue + (b * b) / (4 * aSafe));
  }

  function handlePointerDown(e: React.PointerEvent<SVGSVGElement>) {
    if (!interactive) return;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerEnd(e: React.PointerEvent<SVGSVGElement>) {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  return (
    <div className="w-full space-y-3">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        preserveAspectRatio="xMidYMid meet"
        className={cn(
          "w-full h-auto rounded-lg bg-slate-50 dark:bg-slate-900",
          interactive ? "cursor-ns-resize touch-none" : "cursor-default"
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        role="img"
        aria-label="Parabola a její kořeny"
      >
        <line
          x1={0}
          y1={toSvgY(0)}
          x2={VB.w}
          y2={toSvgY(0)}
          className="stroke-slate-400 dark:stroke-slate-600"
          strokeWidth={1.5}
        />
        <line
          x1={toSvgX(0)}
          y1={0}
          x2={toSvgX(0)}
          y2={VB.h}
          className="stroke-slate-400 dark:stroke-slate-600"
          strokeWidth={1.5}
        />
        {/* Draws itself once on mount, then tracks params directly. */}
        <motion.path
          d={curvePath(a, b, c)}
          fill="none"
          className="stroke-blue-500"
          strokeWidth={2.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        {roots.map((x, i) => (
          <circle
            key={i}
            cx={toSvgX(x)}
            cy={toSvgY(0)}
            r={rootsHighlighted ? 8 : 5}
            className={cn(
              "fill-red-500 transition-all",
              rootsHighlighted && "stroke-red-300 stroke-[3]"
            )}
          />
        ))}
      </svg>

      <SliderControl
        label="c"
        value={Number(c.toFixed(2))}
        min={C_RANGE[0]}
        max={C_RANGE[1]}
        step={0.1}
        onChange={setC}
        color="#22c55e"
      />

      <p className="text-center text-sm text-muted-foreground tabular-nums">
        Počet průsečíků s osou: <strong>{r.rootCount}</strong>
      </p>
    </div>
  );
}
