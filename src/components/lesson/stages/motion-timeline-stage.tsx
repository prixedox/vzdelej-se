"use client";

import { readouts } from "@/lib/lesson/stages/motion-timeline";
import { SliderControl } from "@/components/lesson/visuals/slider-control";
import type { StageProps } from "./stage-canvas";

const VB = { w: 480, h: 260 };
const PAD = { left: 40, right: 20, top: 20, bottom: 34 };
const T_MAX = 5;
const S_MAX = 30;

function toX(t: number): number {
  return PAD.left + (t / T_MAX) * (VB.w - PAD.left - PAD.right);
}

function toY(s: number): number {
  return VB.h - PAD.bottom - (s / S_MAX) * (VB.h - PAD.top - PAD.bottom);
}

export function MotionTimelineStage({ params, onParamsChange, interactive }: StageProps) {
  const t = params.t ?? 2;
  const h = params.h ?? 1.5;
  const v0 = params.v0 ?? 0;
  const a = params.a ?? 2;
  const r = readouts({ t, h, v0, a });

  const curve: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const ti = (T_MAX * i) / 100;
    curve.push(`${toX(ti).toFixed(2)},${toY(v0 * ti + (a * ti * ti) / 2).toFixed(2)}`);
  }

  const sAtT = v0 * t + (a * t * t) / 2;
  const tEnd = Math.min(T_MAX, t + h);
  const sAtEnd = v0 * tEnd + (a * tEnd * tEnd) / 2;

  return (
    <div className="flex h-full w-full min-h-0 flex-1 flex-col gap-3">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full flex-1 min-h-0 rounded-lg bg-slate-50 dark:bg-slate-900"
        role="img"
        aria-label="Dráha v čase a její sečna"
      >
        <line x1={PAD.left} y1={toY(0)} x2={VB.w - PAD.right} y2={toY(0)} className="stroke-slate-400 dark:stroke-slate-600" strokeWidth={1.5} />
        <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={toY(0)} className="stroke-slate-400 dark:stroke-slate-600" strokeWidth={1.5} />
        <text x={VB.w - PAD.right} y={toY(0) + 22} textAnchor="end" className="fill-slate-500 text-[11px]">
          čas (s)
        </text>
        {/*
          Rotated the conventional way for a y-axis label (reads bottom-to-top).
          Anchored at x=16, well inside PAD.left=40, so the text's short
          "thickness" (post-rotation, its horizontal footprint) never reaches
          x=0 on the left or the axis line at x=40 on the right. Verified in a
          real browser via getBBox() + the element's own rotate matrix (getBBox()
          alone excludes the element's own `transform`): the rendered extent
          lands at x ∈ [5.0, 19.2] — the font's ascent/descent are asymmetric
          (~11px vs ~3px), so the rotated footprint isn't centered on the
          anchor x, which is why 16 (not 12) was chosen for a safe margin on
          both sides.
        */}
        <text
          x={16}
          y={(PAD.top + toY(0)) / 2}
          textAnchor="middle"
          transform={`rotate(-90 16 ${(PAD.top + toY(0)) / 2})`}
          className="fill-slate-500 text-[11px]"
        >
          dráha (m)
        </text>

        <path d={`M ${curve.join(" L ")}`} fill="none" className="stroke-blue-500" strokeWidth={2.5} />

        {/* The secant between t and t+h */}
        <line x1={toX(t)} y1={toY(sAtT)} x2={toX(tEnd)} y2={toY(sAtEnd)} className="stroke-orange-500" strokeWidth={2.5} />
        <circle cx={toX(t)} cy={toY(sAtT)} r={5} className="fill-emerald-500" />
        <circle cx={toX(tEnd)} cy={toY(sAtEnd)} r={5} className="fill-orange-500" />
      </svg>

      <SliderControl
        label="t"
        value={Number(t.toFixed(2))}
        min={0.2}
        max={4}
        step={0.1}
        unit="s"
        onChange={(v) => interactive && onParamsChange({ ...params, t: v })}
        color="#22c55e"
      />
      <SliderControl
        label="h"
        value={Number(h.toFixed(2))}
        min={0.05}
        max={2}
        step={0.05}
        unit="s"
        onChange={(v) => interactive && onParamsChange({ ...params, h: v })}
        color="#f97316"
      />

      <p className="text-center text-sm text-muted-foreground tabular-nums">
        Sklon sečny: <strong>{r.secantSlope.toFixed(2).replace(".", ",")}</strong> m/s · okamžitá
        rychlost: <strong>{r.instantVelocity.toFixed(2).replace(".", ",")}</strong> m/s
      </p>
    </div>
  );
}
