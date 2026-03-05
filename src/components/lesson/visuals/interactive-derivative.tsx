"use client";

import { useState, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveDerivativeProps {
  functionExpr?: "x^2" | "x^3" | "sin(x)" | "e^x";
  showTangent?: boolean;
  showSecant?: boolean;
  showDerivativeGraph?: boolean;
}

const SVG_W = 460;
const SVG_H = 320;
const CX = SVG_W / 2;
const CY = SVG_H / 2;
const SCALE = 35; // pixels per unit
const X_MIN = -5;
const X_MAX = 5;
const Y_MIN = -4;
const Y_MAX = 4.5;

type FnDef = {
  f: (x: number) => number;
  df: (x: number) => number;
  label: string;
  dLabel: string;
};

const FUNCTIONS: Record<string, FnDef> = {
  "x^2": {
    f: (x) => x * x,
    df: (x) => 2 * x,
    label: "f(x) = x^2",
    dLabel: "f'(x) = 2x",
  },
  "x^3": {
    f: (x) => x * x * x,
    df: (x) => 3 * x * x,
    label: "f(x) = x^3",
    dLabel: "f'(x) = 3x^2",
  },
  "sin(x)": {
    f: (x) => Math.sin(x),
    df: (x) => Math.cos(x),
    label: "f(x) = \\sin(x)",
    dLabel: "f'(x) = \\cos(x)",
  },
  "e^x": {
    f: (x) => Math.exp(x),
    df: (x) => Math.exp(x),
    label: "f(x) = e^x",
    dLabel: "f'(x) = e^x",
  },
};

function toSvgX(x: number): number {
  return CX + x * SCALE;
}

function toSvgY(y: number): number {
  return CY - y * SCALE;
}

function formatNum(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

function buildCurvePath(fn: (x: number) => number): string {
  const parts: string[] = [];
  const steps = 300;
  const dx = (X_MAX - X_MIN) / steps;
  let started = false;

  for (let i = 0; i <= steps; i++) {
    const x = X_MIN + i * dx;
    const y = fn(x);
    if (y < Y_MIN - 2 || y > Y_MAX + 2) {
      started = false;
      continue;
    }
    const sx = toSvgX(x);
    const sy = toSvgY(y);
    if (!started) {
      parts.push(`M ${sx.toFixed(1)} ${sy.toFixed(1)}`);
      started = true;
    } else {
      parts.push(`L ${sx.toFixed(1)} ${sy.toFixed(1)}`);
    }
  }
  return parts.join(" ");
}

export function InteractiveDerivative({
  functionExpr = "x^2",
  showTangent = true,
  showSecant = false,
  showDerivativeGraph = false,
}: InteractiveDerivativeProps) {
  const [xPos, setXPos] = useState(1);
  const [h, setH] = useState(1);

  const fnDef = FUNCTIONS[functionExpr] ?? FUNCTIONS["x^2"];

  const curvePath = useMemo(() => buildCurvePath(fnDef.f), [fnDef]);
  const derivPath = useMemo(
    () => (showDerivativeGraph ? buildCurvePath(fnDef.df) : ""),
    [fnDef, showDerivativeGraph],
  );

  const pointY = fnDef.f(xPos);
  const derivAtX = fnDef.df(xPos);
  const secantSlope = (fnDef.f(xPos + h) - fnDef.f(xPos)) / h;

  // Tangent line: y - f(x0) = f'(x0)(x - x0)
  const tangentLine = useMemo(() => {
    if (!showTangent) return null;
    const slope = derivAtX;
    const x1 = X_MIN;
    const x2 = X_MAX;
    const y1 = pointY + slope * (x1 - xPos);
    const y2 = pointY + slope * (x2 - xPos);
    return { x1: toSvgX(x1), y1: toSvgY(y1), x2: toSvgX(x2), y2: toSvgY(y2) };
  }, [showTangent, derivAtX, pointY, xPos]);

  // Secant line: through (xPos, f(xPos)) and (xPos+h, f(xPos+h))
  const secantLine = useMemo(() => {
    if (!showSecant) return null;
    const slope = secantSlope;
    const x1 = X_MIN;
    const x2 = X_MAX;
    const y1 = pointY + slope * (x1 - xPos);
    const y2 = pointY + slope * (x2 - xPos);
    return { x1: toSvgX(x1), y1: toSvgY(y1), x2: toSvgX(x2), y2: toSvgY(y2) };
  }, [showSecant, secantSlope, pointY, xPos]);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Math display */}
      <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
        <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={fnDef.label} />
        </span>
        {showTangent && (
          <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`f'(${formatNum(xPos)}) = ${formatNum(derivAtX)}`} />
          </span>
        )}
        {showSecant && (
          <span className="bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`\\frac{\\Delta y}{\\Delta x} = ${formatNum(secantSlope)}`} />
          </span>
        )}
        {showDerivativeGraph && (
          <span className="bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={fnDef.dLabel} />
          </span>
        )}
      </div>

      {/* SVG */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full max-w-lg" aria-label="Graf derivace">
          <defs>
            <radialGradient id="derivBg" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </radialGradient>
            <clipPath id="chartClip">
              <rect x={toSvgX(X_MIN)} y={toSvgY(Y_MAX)} width={toSvgX(X_MAX) - toSvgX(X_MIN)} height={toSvgY(Y_MIN) - toSvgY(Y_MAX)} />
            </clipPath>
          </defs>
          <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="url(#derivBg)" rx={8} />

          {/* Grid lines */}
          {Array.from({ length: Math.floor(X_MAX - X_MIN) + 1 }, (_, i) => X_MIN + i).map((x) => (
            <line
              key={`gx-${x}`}
              x1={toSvgX(x)}
              y1={toSvgY(Y_MAX)}
              x2={toSvgX(x)}
              y2={toSvgY(Y_MIN)}
              stroke="#e2e8f0"
              strokeWidth={x === 0 ? 0 : 0.5}
            />
          ))}
          {Array.from({ length: Math.floor(Y_MAX - Y_MIN) + 1 }, (_, i) => Math.floor(Y_MIN) + i).map((y) => (
            <line
              key={`gy-${y}`}
              x1={toSvgX(X_MIN)}
              y1={toSvgY(y)}
              x2={toSvgX(X_MAX)}
              y2={toSvgY(y)}
              stroke="#e2e8f0"
              strokeWidth={y === 0 ? 0 : 0.5}
            />
          ))}

          {/* Axes */}
          <line x1={toSvgX(X_MIN)} y1={CY} x2={toSvgX(X_MAX)} y2={CY} stroke="#94a3b8" strokeWidth={1.5} />
          <line x1={CX} y1={toSvgY(Y_MAX)} x2={CX} y2={toSvgY(Y_MIN)} stroke="#94a3b8" strokeWidth={1.5} />

          {/* Axis tick labels */}
          {[-4, -3, -2, -1, 1, 2, 3, 4].map((x) => (
            <text key={`lx-${x}`} x={toSvgX(x)} y={CY + 16} textAnchor="middle" fill="#64748b" fontSize={9}>
              {x}
            </text>
          ))}
          {[-3, -2, -1, 1, 2, 3, 4].map((y) => (
            <text key={`ly-${y}`} x={CX - 10} y={toSvgY(y) + 4} textAnchor="end" fill="#64748b" fontSize={9}>
              {y}
            </text>
          ))}

          <text x={toSvgX(X_MAX) + 8} y={CY + 4} fill="#64748b" fontSize={11} fontWeight="bold">x</text>
          <text x={CX + 8} y={toSvgY(Y_MAX) - 4} fill="#64748b" fontSize={11} fontWeight="bold">y</text>

          <g clipPath="url(#chartClip)">
            {/* Derivative graph (dashed red) */}
            {showDerivativeGraph && derivPath && (
              <path d={derivPath} fill="none" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="6 3" />
            )}

            {/* Secant line */}
            {secantLine && (
              <line
                x1={secantLine.x1}
                y1={secantLine.y1}
                x2={secantLine.x2}
                y2={secantLine.y2}
                stroke="#f97316"
                strokeWidth={1.5}
                opacity={0.8}
              />
            )}

            {/* Tangent line */}
            {tangentLine && (
              <line
                x1={tangentLine.x1}
                y1={tangentLine.y1}
                x2={tangentLine.x2}
                y2={tangentLine.y2}
                stroke="#22c55e"
                strokeWidth={2}
                opacity={0.8}
              />
            )}

            {/* Function curve */}
            <path d={curvePath} fill="none" stroke="#3b82f6" strokeWidth={2.5} strokeLinecap="round" />
          </g>

          {/* Secant second point */}
          {showSecant && (
            <circle
              cx={toSvgX(xPos + h)}
              cy={toSvgY(fnDef.f(xPos + h))}
              r={4}
              fill="#f97316"
              stroke="white"
              strokeWidth={2}
            />
          )}

          {/* Point on curve */}
          <circle
            cx={toSvgX(xPos)}
            cy={toSvgY(pointY)}
            r={6}
            fill="#22c55e"
            stroke="white"
            strokeWidth={2}
          />

          {/* Legend */}
          <g>
            <line x1={14} y1={18} x2={34} y2={18} stroke="#3b82f6" strokeWidth={2.5} />
            <text x={38} y={22} fill="#3b82f6" fontSize={9} fontWeight="bold">f(x)</text>
            {showTangent && (
              <>
                <line x1={14} y1={32} x2={34} y2={32} stroke="#22c55e" strokeWidth={2} />
                <text x={38} y={36} fill="#22c55e" fontSize={9} fontWeight="bold">tecna</text>
              </>
            )}
            {showSecant && (
              <>
                <line x1={14} y1={46} x2={34} y2={46} stroke="#f97316" strokeWidth={1.5} />
                <text x={38} y={50} fill="#f97316" fontSize={9} fontWeight="bold">secna</text>
              </>
            )}
            {showDerivativeGraph && (
              <>
                <line x1={14} y1={60} x2={34} y2={60} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="6 3" />
                <text x={38} y={64} fill="#ef4444" fontSize={9} fontWeight="bold">f&apos;(x)</text>
              </>
            )}
          </g>
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl
          label="x"
          value={xPos}
          min={-4}
          max={4}
          step={0.1}
          onChange={setXPos}
          color="#22c55e"
        />
        {showSecant && (
          <SliderControl
            label="h"
            value={h}
            min={0.05}
            max={3}
            step={0.05}
            onChange={setH}
            color="#f97316"
          />
        )}
      </div>

      {/* Formulas */}
      <div className="text-center text-xs text-muted-foreground space-y-1">
        <MathDisplay math={`f(${formatNum(xPos)}) = ${formatNum(pointY)}`} />
        {showSecant && (
          <>
            <br />
            <MathDisplay
              math={`\\frac{f(x+h) - f(x)}{h} = \\frac{${formatNum(fnDef.f(xPos + h))} - ${formatNum(pointY)}}{${formatNum(h)}} = ${formatNum(secantSlope)}`}
            />
          </>
        )}
      </div>
    </div>
  );
}
