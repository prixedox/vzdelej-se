"use client";

import { useState, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

type FunctionType =
  | "linear"
  | "quadratic"
  | "exponential"
  | "logarithmic"
  | "sine"
  | "absolute-value";

interface InteractiveFunctionGraphProps {
  functionType?: FunctionType;
  defaultParams?: Record<string, number>;
  xRange?: [number, number];
  yRange?: [number, number];
  showGrid?: boolean;
  showVertex?: boolean;
  showRoots?: boolean;
  showAsymptote?: boolean;
  compareFunction?: string;
}

const COLORS = {
  primary: "#3b82f6",
  secondary: "#f59e0b",
  vertex: "#22c55e",
  root: "#ef4444",
  asymptote: "#a855f7",
  grid: "#e2e8f0",
  axis: "#475569",
  label: "#64748b",
};

const W = 460;
const H = 320;
const PAD = { top: 20, right: 20, bottom: 30, left: 40 };

function getDefaults(ft: FunctionType): Record<string, number> {
  switch (ft) {
    case "linear":
      return { k: 2, q: -1 };
    case "quadratic":
      return { a: 1, b: 0, c: 0 };
    case "exponential":
      return { a: 2, k: 1 };
    case "logarithmic":
      return { a: 1, base: 2 };
    case "sine":
      return { a: 1, b: 1, c: 0 };
    case "absolute-value":
      return { a: 1, h: 0, k: 0 };
  }
}

function getDefaultRange(ft: FunctionType): { x: [number, number]; y: [number, number] } {
  switch (ft) {
    case "linear":
      return { x: [-6, 6], y: [-8, 8] };
    case "quadratic":
      return { x: [-5, 5], y: [-4, 10] };
    case "exponential":
      return { x: [-3, 4], y: [-1, 10] };
    case "logarithmic":
      return { x: [-1, 10], y: [-4, 4] };
    case "sine":
      return { x: [-7, 7], y: [-3, 3] };
    case "absolute-value":
      return { x: [-6, 6], y: [-2, 8] };
  }
}

function evalFn(ft: FunctionType, params: Record<string, number>, x: number): number | null {
  switch (ft) {
    case "linear":
      return params.k * x + params.q;
    case "quadratic":
      return params.a * x * x + params.b * x + params.c;
    case "exponential":
      return params.k * Math.pow(params.a, x);
    case "logarithmic": {
      if (x <= 0) return null;
      return params.a * (Math.log(x) / Math.log(params.base));
    }
    case "sine":
      return params.a * Math.sin(params.b * x + params.c);
    case "absolute-value":
      return params.a * Math.abs(x - params.h) + params.k;
  }
}

function formatFormula(ft: FunctionType, p: Record<string, number>): string {
  switch (ft) {
    case "linear":
      return `f(x) = \\color{${COLORS.primary}}{${p.k}}x ${p.q >= 0 ? "+" : "-"} \\color{${COLORS.secondary}}{${Math.abs(p.q)}}`;
    case "quadratic":
      return `f(x) = \\color{${COLORS.primary}}{${p.a}}x^2 ${p.b >= 0 ? "+" : "-"} \\color{${COLORS.secondary}}{${Math.abs(p.b)}}x ${p.c >= 0 ? "+" : "-"} \\color{${COLORS.vertex}}{${Math.abs(p.c)}}`;
    case "exponential":
      return `f(x) = ${p.k !== 1 ? `${p.k} \\cdot ` : ""}\\color{${COLORS.primary}}{${p.a}}^x`;
    case "logarithmic":
      return `f(x) = ${p.a !== 1 ? `${p.a} \\cdot ` : ""}\\log_{\\color{${COLORS.primary}}{${p.base}}} x`;
    case "sine":
      return `f(x) = \\color{${COLORS.primary}}{${p.a}}\\sin(\\color{${COLORS.secondary}}{${p.b}}x ${p.c >= 0 ? "+" : "-"} \\color{${COLORS.vertex}}{${Math.abs(p.c).toFixed(1)}})`;
    case "absolute-value":
      return `f(x) = \\color{${COLORS.primary}}{${p.a}}|x ${p.h >= 0 ? `-` : `+`} \\color{${COLORS.secondary}}{${Math.abs(p.h)}}| ${p.k >= 0 ? "+" : "-"} \\color{${COLORS.vertex}}{${Math.abs(p.k)}}`;
  }
}

function getSliders(ft: FunctionType): Array<{ key: string; label: string; min: number; max: number; step: number; color: string }> {
  switch (ft) {
    case "linear":
      return [
        { key: "k", label: "k", min: -5, max: 5, step: 0.5, color: COLORS.primary },
        { key: "q", label: "q", min: -8, max: 8, step: 1, color: COLORS.secondary },
      ];
    case "quadratic":
      return [
        { key: "a", label: "a", min: -3, max: 3, step: 0.5, color: COLORS.primary },
        { key: "b", label: "b", min: -5, max: 5, step: 1, color: COLORS.secondary },
        { key: "c", label: "c", min: -5, max: 5, step: 1, color: COLORS.vertex },
      ];
    case "exponential":
      return [
        { key: "a", label: "základ", min: 0.25, max: 4, step: 0.25, color: COLORS.primary },
        { key: "k", label: "k", min: -3, max: 3, step: 0.5, color: COLORS.secondary },
      ];
    case "logarithmic":
      return [
        { key: "base", label: "základ", min: 1.5, max: 10, step: 0.5, color: COLORS.primary },
        { key: "a", label: "a", min: -3, max: 3, step: 0.5, color: COLORS.secondary },
      ];
    case "sine":
      return [
        { key: "a", label: "A", min: -3, max: 3, step: 0.5, color: COLORS.primary },
        { key: "b", label: "ω", min: 0.5, max: 4, step: 0.5, color: COLORS.secondary },
        { key: "c", label: "φ", min: -3.14, max: 3.14, step: 0.31, color: COLORS.vertex },
      ];
    case "absolute-value":
      return [
        { key: "a", label: "a", min: -3, max: 3, step: 0.5, color: COLORS.primary },
        { key: "h", label: "h", min: -5, max: 5, step: 1, color: COLORS.secondary },
        { key: "k", label: "k", min: -5, max: 5, step: 1, color: COLORS.vertex },
      ];
  }
}

export function InteractiveFunctionGraph({
  functionType = "quadratic",
  defaultParams,
  xRange,
  yRange,
  showGrid = true,
  showVertex = false,
  showRoots = false,
  showAsymptote = false,
}: InteractiveFunctionGraphProps) {
  const defaults = { ...getDefaults(functionType), ...defaultParams };
  const range = getDefaultRange(functionType);
  const [xMin, xMax] = xRange ?? range.x;
  const [yMin, yMax] = yRange ?? range.y;
  const [params, setParams] = useState(defaults);

  const sliders = getSliders(functionType);

  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  function toSvgX(x: number) {
    return PAD.left + ((x - xMin) / (xMax - xMin)) * plotW;
  }
  function toSvgY(y: number) {
    return PAD.top + ((yMax - y) / (yMax - yMin)) * plotH;
  }

  // Generate curve path
  const { path, points } = useMemo(() => {
    const pts: Array<{ x: number; svgX: number; svgY: number; y: number }> = [];
    const n = 300;
    for (let i = 0; i <= n; i++) {
      const x = xMin + (i / n) * (xMax - xMin);
      const y = evalFn(functionType, params, x);
      if (y === null || !isFinite(y)) continue;
      pts.push({ x, y, svgX: toSvgX(x), svgY: toSvgY(y) });
    }
    // Build path, skipping points far out of view
    const segments: string[] = [];
    let drawing = false;
    for (const p of pts) {
      const inView = p.svgY > PAD.top - 50 && p.svgY < H - PAD.bottom + 50;
      if (inView) {
        segments.push(drawing ? `L${p.svgX},${p.svgY}` : `M${p.svgX},${p.svgY}`);
        drawing = true;
      } else {
        drawing = false;
      }
    }
    return { path: segments.join(""), points: pts };
  }, [functionType, params, xMin, xMax, yMin, yMax]);

  // Special points
  const special = useMemo(() => {
    const result: { vertex?: { x: number; y: number }; roots: Array<{ x: number }> } = { roots: [] };
    if (functionType === "quadratic") {
      const { a, b, c } = params;
      if (Math.abs(a) > 0.01) {
        const vx = -b / (2 * a);
        const vy = a * vx * vx + b * vx + c;
        result.vertex = { x: vx, y: vy };
        const D = b * b - 4 * a * c;
        if (D >= 0) {
          result.roots.push({ x: (-b + Math.sqrt(D)) / (2 * a) });
          if (D > 0) result.roots.push({ x: (-b - Math.sqrt(D)) / (2 * a) });
        }
      }
    }
    if (functionType === "absolute-value") {
      const { a, h, k } = params;
      result.vertex = { x: h, y: k };
      if (Math.abs(a) > 0.01) {
        const r = -k / a;
        if (r >= 0) {
          result.roots.push({ x: h + r });
          if (r > 0) result.roots.push({ x: h - r });
        }
      }
    }
    if (functionType === "linear") {
      const { k, q } = params;
      if (Math.abs(k) > 0.01) {
        result.roots.push({ x: -q / k });
      }
    }
    return result;
  }, [functionType, params]);

  // Grid lines
  const gridLines = useMemo(() => {
    if (!showGrid) return { x: [] as number[], y: [] as number[] };
    const xStep = (xMax - xMin) <= 10 ? 1 : (xMax - xMin) <= 20 ? 2 : 5;
    const yStep = (yMax - yMin) <= 10 ? 1 : (yMax - yMin) <= 20 ? 2 : 5;
    const xs: number[] = [];
    const ys: number[] = [];
    for (let v = Math.ceil(xMin / xStep) * xStep; v <= xMax; v += xStep) xs.push(v);
    for (let v = Math.ceil(yMin / yStep) * yStep; v <= yMax; v += yStep) ys.push(v);
    return { x: xs, y: ys };
  }, [xMin, xMax, yMin, yMax, showGrid]);

  const originX = toSvgX(0);
  const originY = toSvgY(0);
  const showXAxis = yMin <= 0 && yMax >= 0;
  const showYAxis = xMin <= 0 && xMax >= 0;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-center">
        <MathDisplay math={formatFormula(functionType, params)} />
      </div>

      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-lg" aria-label="Graf funkce">
          {/* Grid */}
          {showGrid && (
            <g opacity={0.5}>
              {gridLines.x.map((v) => (
                <line key={`gx${v}`} x1={toSvgX(v)} y1={PAD.top} x2={toSvgX(v)} y2={H - PAD.bottom} stroke={COLORS.grid} strokeWidth={v === 0 ? 0 : 0.5} />
              ))}
              {gridLines.y.map((v) => (
                <line key={`gy${v}`} x1={PAD.left} y1={toSvgY(v)} x2={W - PAD.right} y2={toSvgY(v)} stroke={COLORS.grid} strokeWidth={v === 0 ? 0 : 0.5} />
              ))}
            </g>
          )}

          {/* Axes */}
          {showXAxis && (
            <g>
              <line x1={PAD.left} y1={originY} x2={W - PAD.right} y2={originY} stroke={COLORS.axis} strokeWidth={1.5} />
              {gridLines.x.filter((v) => v !== 0).map((v) => (
                <text key={`lx${v}`} x={toSvgX(v)} y={originY + 14} textAnchor="middle" fill={COLORS.label} fontSize="9">{v}</text>
              ))}
              <text x={W - PAD.right + 5} y={originY - 4} fill={COLORS.label} fontSize="10">x</text>
            </g>
          )}
          {showYAxis && (
            <g>
              <line x1={originX} y1={PAD.top} x2={originX} y2={H - PAD.bottom} stroke={COLORS.axis} strokeWidth={1.5} />
              {gridLines.y.filter((v) => v !== 0).map((v) => (
                <text key={`ly${v}`} x={originX - 8} y={toSvgY(v) + 3} textAnchor="end" fill={COLORS.label} fontSize="9">{v}</text>
              ))}
              <text x={originX + 6} y={PAD.top - 4} fill={COLORS.label} fontSize="10">y</text>
            </g>
          )}

          {/* Asymptotes */}
          {showAsymptote && functionType === "logarithmic" && (
            <line x1={toSvgX(0)} y1={PAD.top} x2={toSvgX(0)} y2={H - PAD.bottom} stroke={COLORS.asymptote} strokeWidth={1.5} strokeDasharray="6 4" />
          )}
          {showAsymptote && functionType === "exponential" && (
            <line x1={PAD.left} y1={toSvgY(0)} x2={W - PAD.right} y2={toSvgY(0)} stroke={COLORS.asymptote} strokeWidth={1.5} strokeDasharray="6 4" />
          )}

          {/* Function curve */}
          <path d={path} fill="none" stroke={COLORS.primary} strokeWidth={2.5} strokeLinecap="round" />

          {/* Vertex */}
          {showVertex && special.vertex && (
            <g>
              <circle cx={toSvgX(special.vertex.x)} cy={toSvgY(special.vertex.y)} r={5} fill={COLORS.vertex} stroke="white" strokeWidth={2} style={{ transition: "all 0.3s ease" }} />
              <text x={toSvgX(special.vertex.x)} y={toSvgY(special.vertex.y) - 10} textAnchor="middle" fill={COLORS.vertex} fontSize="10" fontWeight="bold" style={{ transition: "all 0.3s ease" }}>
                [{special.vertex.x.toFixed(1)}; {special.vertex.y.toFixed(1)}]
              </text>
            </g>
          )}

          {/* Roots */}
          {showRoots && special.roots.map((r, i) => {
            const sx = toSvgX(r.x);
            const sy = showXAxis ? originY : toSvgY(0);
            if (sx < PAD.left || sx > W - PAD.right) return null;
            return (
              <g key={i}>
                <circle cx={sx} cy={sy} r={4} fill={COLORS.root} stroke="white" strokeWidth={2} style={{ transition: "all 0.3s ease" }} />
                <text x={sx} y={sy + 16} textAnchor="middle" fill={COLORS.root} fontSize="9" fontWeight="bold" style={{ transition: "all 0.3s ease" }}>
                  {r.x.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Plot border */}
          <rect x={PAD.left} y={PAD.top} width={plotW} height={plotH} fill="none" stroke={COLORS.grid} strokeWidth={1} />
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        {sliders.map((s) => (
          <SliderControl
            key={s.key}
            label={s.label}
            value={params[s.key]}
            min={s.min}
            max={s.max}
            step={s.step}
            onChange={(v) => setParams((prev) => ({ ...prev, [s.key]: v }))}
            color={s.color}
          />
        ))}
      </div>
    </div>
  );
}
