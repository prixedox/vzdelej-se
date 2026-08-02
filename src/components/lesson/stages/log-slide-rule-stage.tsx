"use client";

import { useRef } from "react";
import { readouts } from "@/lib/lesson/stages/log-slide-rule";
import { SliderControl } from "@/components/lesson/visuals/slider-control";
import { cn } from "@/lib/utils";
import type { StageProps } from "./stage-canvas";

const VB = { w: 480, h: 200 };
const MARGIN = 24;
const SPAN = VB.w - MARGIN * 2;
const TICKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** Position of a value on a log10 ruler covering 1..10. */
function tickX(value: number): number {
  return MARGIN + Math.log10(value) * SPAN;
}

export function LogSlideRuleStage({
  params,
  onParamsChange,
  highlight,
  interactive,
}: StageProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const offset = params.offset ?? 0;
  const shiftPx = offset * SPAN;
  const r = readouts({ offset });
  const alignHighlighted = highlight?.includes("aligned") ?? false;

  function setOffset(next: number) {
    onParamsChange({ ...params, offset: Math.min(1, Math.max(0, next)) });
  }

  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!interactive || e.buttons !== 1 || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const xInVb = ((e.clientX - rect.left) / rect.width) * VB.w;
    setOffset((xInVb - MARGIN) / SPAN);
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
          interactive ? "cursor-ew-resize touch-none" : "cursor-default"
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        role="img"
        aria-label="Logaritmické posuvné pravítko"
      >
        {/* Top ruler — the one that slides */}
        <g transform={`translate(${shiftPx}, 0)`}>
          <rect x={MARGIN} y={50} width={SPAN} height={34} rx={4} className="fill-amber-100 dark:fill-amber-950" />
          {TICKS.map((t) => (
            <g key={`top-${t}`}>
              <line x1={tickX(t)} y1={50} x2={tickX(t)} y2={68} className="stroke-amber-600" strokeWidth={1.5} />
              <text x={tickX(t)} y={80} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300 text-[11px]">
                {t}
              </text>
            </g>
          ))}
        </g>

        {/* Bottom ruler — fixed */}
        <rect x={MARGIN} y={110} width={SPAN} height={34} rx={4} className="fill-blue-100 dark:fill-blue-950" />
        {TICKS.map((t) => (
          <g key={`bottom-${t}`}>
            <line x1={tickX(t)} y1={126} x2={tickX(t)} y2={144} className="stroke-blue-600" strokeWidth={1.5} />
            <text x={tickX(t)} y={158} textAnchor="middle" className="fill-blue-700 dark:fill-blue-300 text-[11px]">
              {t}
            </text>
          </g>
        ))}

        {/* The alignment line: top ruler's 1 against the bottom scale */}
        <line
          x1={MARGIN + shiftPx}
          y1={44}
          x2={MARGIN + shiftPx}
          y2={150}
          className={cn("stroke-red-500", alignHighlighted && "stroke-[3]")}
          strokeWidth={alignHighlighted ? 3 : 2}
          strokeDasharray="4 3"
        />
      </svg>

      <SliderControl
        label="posun"
        value={Number(offset.toFixed(3))}
        min={0}
        max={1}
        step={0.001}
        onChange={setOffset}
        color="#f59e0b"
      />

      <p className="text-center text-sm text-muted-foreground tabular-nums">
        Nad jedničkou horního pravítka je <strong>{r.alignedValue.toFixed(2).replace(".", ",")}</strong>
      </p>
    </div>
  );
}
