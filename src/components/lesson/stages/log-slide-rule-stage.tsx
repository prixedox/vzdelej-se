"use client";

import { useRef } from "react";
import { readouts } from "@/lib/lesson/stages/log-slide-rule";
import { SliderControl } from "@/components/lesson/visuals/slider-control";
import { cn } from "@/lib/utils";
import type { StageProps } from "./stage-canvas";

/**
 * A real slide rule's fixed scale must cover the PRODUCTS, not just the
 * factors — so the bottom (fixed) ruler spans two decades (1..100) while the
 * top (sliding) ruler spans one (1..10). Both use the same pixels-per-decade
 * constant `D`, which is what makes the alignment exact:
 *
 *   top tick `b`'s screen x at offset = log10(a)
 *     = MARGIN + log10(b)*D + log10(a)*D
 *     = MARGIN + log10(a*b)*D
 *     = bottom tick `a*b`'s screen x
 *
 * MARGIN=24, D=216 keeps the viewBox at the original 480 wide
 * (MARGIN + 2*D + MARGIN = 24 + 432 + 24 = 480) and reuses the original
 * bottom-ruler rect pixel-for-pixel (2*D = 432 = the old single-decade
 * SPAN) — only its tick range and labels change, from 1..10 to 1..100.
 * The top ruler's rect narrows to D (one decade) instead of 2*D.
 *
 * Across the whole offset range [0, 1] the top ruler's ticks stay within
 * [MARGIN, MARGIN + 2*D] (verified: at offset=0 it spans
 * [MARGIN, MARGIN+D]; at offset=1, [MARGIN+D, MARGIN+2*D]) — so nothing
 * clips at any point of the interaction.
 */
const MARGIN = 24;
const D = 216;
const VB = { w: MARGIN + 2 * D + MARGIN, h: 200 };

const TOP_TICKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** Labeled ticks on the fixed two-decade ruler. */
const BOTTOM_MAJOR_TICKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 50, 100];
/** Short, unlabeled ticks — texture between the labeled ones. */
const BOTTOM_MINOR_TICKS = [40, 60, 70, 80, 90];
/**
 * The two products this lesson's beats explicitly ask the student to read
 * off (3×4 and 5×6). Styled distinctly from the routine major ticks so they
 * are findable on sight, not just inferable from a round number nearby.
 */
const BOTTOM_CALLOUT_TICKS = [12, 30];

/** Screen x for a value on the shared log10 decade scale. */
function decadeX(value: number): number {
  return MARGIN + Math.log10(value) * D;
}

/** Live cross-reads shown under a handful of fixed top ticks. */
const CROSS_READ_TICKS = [2, 4, 6, 8];

export function LogSlideRuleStage({
  params,
  onParamsChange,
  highlight,
  interactive,
}: StageProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const offset = params.offset ?? 0;
  const shiftPx = offset * D;
  const r = readouts({ offset });
  const alignHighlighted = highlight?.includes("aligned") ?? false;

  function setOffset(next: number) {
    onParamsChange({ ...params, offset: Math.min(1, Math.max(0, next)) });
  }

  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!interactive || e.buttons !== 1 || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const xInVb = ((e.clientX - rect.left) / rect.width) * VB.w;
    setOffset((xInVb - MARGIN) / D);
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
        {/* Top ruler — the one that slides. One decade (1..10), width D. */}
        <g transform={`translate(${shiftPx}, 0)`}>
          <rect x={MARGIN} y={50} width={D} height={34} rx={4} className="fill-amber-100 dark:fill-amber-950" />
          {TOP_TICKS.map((t) => (
            <g key={`top-${t}`}>
              <line x1={decadeX(t)} y1={50} x2={decadeX(t)} y2={68} className="stroke-amber-600" strokeWidth={1.5} />
              <text x={decadeX(t)} y={80} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300 text-[11px]">
                {t}
              </text>
            </g>
          ))}
        </g>

        {/* Bottom ruler — fixed. Two decades (1..100), width 2D, so it can show products. */}
        <rect x={MARGIN} y={110} width={2 * D} height={34} rx={4} className="fill-blue-100 dark:fill-blue-950" />
        {BOTTOM_MINOR_TICKS.map((t) => (
          <line
            key={`bottom-minor-${t}`}
            x1={decadeX(t)}
            y1={128}
            x2={decadeX(t)}
            y2={142}
            className="stroke-blue-400 dark:stroke-blue-700"
            strokeWidth={1}
          />
        ))}
        {BOTTOM_MAJOR_TICKS.map((t) => (
          <g key={`bottom-major-${t}`}>
            <line x1={decadeX(t)} y1={126} x2={decadeX(t)} y2={144} className="stroke-blue-600" strokeWidth={1.5} />
            <text x={decadeX(t)} y={158} textAnchor="middle" className="fill-blue-700 dark:fill-blue-300 text-[11px]">
              {t}
            </text>
          </g>
        ))}
        {BOTTOM_CALLOUT_TICKS.map((t) => (
          <g key={`bottom-callout-${t}`}>
            <line x1={decadeX(t)} y1={122} x2={decadeX(t)} y2={148} className="stroke-rose-500" strokeWidth={2} />
            <circle cx={decadeX(t)} cy={127} r={2.5} className="fill-rose-500" />
            <text
              x={decadeX(t)}
              y={172}
              textAnchor="middle"
              className="fill-rose-600 dark:fill-rose-400 text-[11px] font-bold"
            >
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

      {/*
        Second live readout: shows the product under several fixed top ticks
        at once, not just the one the current beat happens to highlight —
        reinforces that the multiplication holds everywhere along the ruler,
        not only at the two moments the script calls out.
      */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground tabular-nums">
        {CROSS_READ_TICKS.map((t) => (
          <span key={t}>
            pod horní <strong>{t}</strong>: {(r.alignedValue * t).toFixed(1).replace(".", ",")}
          </span>
        ))}
      </div>
    </div>
  );
}
