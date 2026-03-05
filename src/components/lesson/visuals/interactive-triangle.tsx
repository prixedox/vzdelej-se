"use client";

import { useState, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveTriangleProps {
  mode?: "pythagorean" | "area" | "angles";
  defaultSides?: [number, number];
  showHeight?: boolean;
  showAngles?: boolean;
  showArea?: boolean;
}

const SVG_W = 460;
const SVG_H = 300;
const MARGIN = 60;
const MAX_DRAW = 340;

function formatNum(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

function describeAngleArc(
  cx: number, cy: number, r: number,
  startAngle: number, endAngle: number,
): string {
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy - r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy - r * Math.sin(endAngle);
  const large = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 0 ${x2} ${y2}`;
}

export function InteractiveTriangle({
  mode = "pythagorean",
  defaultSides = [5, 4],
  showHeight = true,
  showAngles = true,
  showArea = true,
}: InteractiveTriangleProps) {
  const [sideA, setSideA] = useState(defaultSides[0]);
  const [sideB, setSideB] = useState(defaultSides[1]);

  const geometry = useMemo(() => {
    const scale = MAX_DRAW / 15; // max side = 15
    const baseY = SVG_H - MARGIN;

    if (mode === "pythagorean") {
      const c = Math.sqrt(sideA * sideA + sideB * sideB);
      const drawA = sideA * scale;
      const drawB = sideB * scale;
      // Right triangle: A horizontal, B vertical
      const ax = MARGIN;
      const ay = baseY;
      const bx = MARGIN + drawA;
      const by = baseY;
      const cx2 = MARGIN + drawA;
      const cy2 = baseY - drawB;
      const area = (sideA * sideB) / 2;
      const angleA = toDeg(Math.atan2(sideB, sideA)); // angle at A (bottom-left)
      const angleB = 90 - angleA; // angle at C (top-right)
      return {
        points: [
          { x: ax, y: ay },
          { x: bx, y: by },
          { x: cx2, y: cy2 },
        ],
        c,
        area,
        height: sideB,
        angles: [angleA, 90, angleB],
      };
    }

    if (mode === "area") {
      const drawA = sideA * scale;
      const drawB = sideB * scale;
      const ax = MARGIN;
      const ay = baseY;
      const bx = MARGIN + drawA;
      const by = baseY;
      // Apex offset for visual interest
      const cx2 = MARGIN + drawA * 0.4;
      const cy2 = baseY - drawB;
      const area = (sideA * sideB) / 2;
      return {
        points: [
          { x: ax, y: ay },
          { x: bx, y: by },
          { x: cx2, y: cy2 },
        ],
        c: 0,
        area,
        height: sideB,
        angles: [0, 0, 0],
      };
    }

    // angles mode: triangle with sides a, b, and third side fixed
    const sideC = Math.sqrt(sideA * sideA + sideB * sideB - sideA * sideB); // cosine rule with 60 deg
    const cosAlpha = (sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC);
    const cosBeta = (sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC);
    const cosGamma = (sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB);
    const alpha = toDeg(Math.acos(Math.max(-1, Math.min(1, cosAlpha))));
    const beta = toDeg(Math.acos(Math.max(-1, Math.min(1, cosBeta))));
    const gamma = toDeg(Math.acos(Math.max(-1, Math.min(1, cosGamma))));

    const drawA = sideA * scale;
    const drawB = sideB * scale;
    const ax = MARGIN;
    const ay = baseY;
    const bx = MARGIN + drawA;
    const by = baseY;
    const gammaRad = Math.acos(Math.max(-1, Math.min(1, cosGamma)));
    const cx2 = ax + drawB * Math.cos(gammaRad);
    const cy2 = ay - drawB * Math.sin(gammaRad);
    const s = (sideA + sideB + sideC) / 2;
    const area = Math.sqrt(Math.max(0, s * (s - sideA) * (s - sideB) * (s - sideC)));

    return {
      points: [
        { x: ax, y: ay },
        { x: bx, y: by },
        { x: cx2, y: cy2 },
      ],
      c: sideC,
      area,
      height: (2 * area) / sideA,
      angles: [alpha, beta, gamma],
    };
  }, [sideA, sideB, mode]);

  const { points, c, area, height, angles } = geometry;
  const [pA, pB, pC] = points;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Formula display */}
      <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
        {mode === "pythagorean" && (
          <>
            <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
              <MathDisplay math={`a^2 + b^2 = c^2`} />
            </span>
            <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
              <MathDisplay math={`${sideA}^2 + ${sideB}^2 = ${formatNum(c)}^2`} />
            </span>
            <span className="bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded-full">
              <MathDisplay math={`c = ${formatNum(c)}`} />
            </span>
          </>
        )}
        {mode === "area" && showArea && (
          <>
            <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
              <MathDisplay math={`S = \\frac{1}{2} \\cdot a \\cdot v_a`} />
            </span>
            <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
              <MathDisplay math={`S = \\frac{1}{2} \\cdot ${sideA} \\cdot ${sideB} = ${formatNum(area)}`} />
            </span>
          </>
        )}
        {mode === "angles" && (
          <>
            <span className="bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
              <MathDisplay math={`\\alpha = ${formatNum(angles[2])}°`} />
            </span>
            <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
              <MathDisplay math={`\\beta = ${formatNum(angles[1])}°`} />
            </span>
            <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
              <MathDisplay math={`\\gamma = ${formatNum(angles[0])}°`} />
            </span>
          </>
        )}
      </div>

      {/* SVG */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full max-w-lg" aria-label="Trojuhelnik">
          <defs>
            <radialGradient id="triBg" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </radialGradient>
          </defs>
          <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="url(#triBg)" rx={8} />

          {/* Triangle fill */}
          <polygon
            points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y}`}
            fill="rgba(59,130,246,0.08)"
            stroke="none"
          />

          {/* Side a (bottom): A to B */}
          <line x1={pA.x} y1={pA.y} x2={pB.x} y2={pB.y} stroke="#3b82f6" strokeWidth={2.5} strokeLinecap="round" />
          <text
            x={(pA.x + pB.x) / 2}
            y={(pA.y + pB.y) / 2 + 20}
            textAnchor="middle"
            fill="#3b82f6"
            fontSize={13}
            fontWeight="bold"
          >
            a = {sideA}
          </text>

          {/* Side b: A to C (or B to C depending on mode) */}
          {mode === "pythagorean" ? (
            <>
              {/* b is vertical: B to C */}
              <line x1={pB.x} y1={pB.y} x2={pC.x} y2={pC.y} stroke="#ef4444" strokeWidth={2.5} strokeLinecap="round" />
              <text
                x={pB.x + 16}
                y={(pB.y + pC.y) / 2 + 4}
                fill="#ef4444"
                fontSize={13}
                fontWeight="bold"
              >
                b = {sideB}
              </text>
              {/* Hypotenuse c: A to C */}
              <line x1={pA.x} y1={pA.y} x2={pC.x} y2={pC.y} stroke="#22c55e" strokeWidth={2.5} strokeLinecap="round" />
              <text
                x={(pA.x + pC.x) / 2 - 18}
                y={(pA.y + pC.y) / 2}
                fill="#22c55e"
                fontSize={13}
                fontWeight="bold"
              >
                c = {formatNum(c)}
              </text>
              {/* Right angle marker at B */}
              <rect x={pB.x - 10} y={pB.y - 10} width={10} height={10} fill="none" stroke="#94a3b8" strokeWidth={1} />
            </>
          ) : (
            <>
              {/* Side from A to C */}
              <line x1={pA.x} y1={pA.y} x2={pC.x} y2={pC.y} stroke="#ef4444" strokeWidth={2.5} strokeLinecap="round" />
              <text
                x={(pA.x + pC.x) / 2 - 18}
                y={(pA.y + pC.y) / 2}
                fill="#ef4444"
                fontSize={13}
                fontWeight="bold"
              >
                b = {sideB}
              </text>
              {/* Side from B to C */}
              <line x1={pB.x} y1={pB.y} x2={pC.x} y2={pC.y} stroke="#22c55e" strokeWidth={2.5} strokeLinecap="round" />
              {mode === "angles" && (
                <text
                  x={(pB.x + pC.x) / 2 + 10}
                  y={(pB.y + pC.y) / 2}
                  fill="#22c55e"
                  fontSize={13}
                  fontWeight="bold"
                >
                  c = {formatNum(c)}
                </text>
              )}
            </>
          )}

          {/* Height line for area mode */}
          {mode === "area" && showHeight && (
            <>
              <line
                x1={pC.x}
                y1={pC.y}
                x2={pC.x}
                y2={pA.y}
                stroke="#f97316"
                strokeWidth={1.5}
                strokeDasharray="6 3"
              />
              <text x={pC.x - 24} y={(pC.y + pA.y) / 2} fill="#f97316" fontSize={11} fontWeight="bold">
                v = {sideB}
              </text>
            </>
          )}

          {/* Angle arcs */}
          {showAngles && mode === "pythagorean" && (
            <>
              {/* Angle at A */}
              <path
                d={describeAngleArc(pA.x, pA.y, 20, 0, Math.atan2(sideB, sideA))}
                fill="none"
                stroke="#f97316"
                strokeWidth={1.5}
              />
              <text x={pA.x + 26} y={pA.y - 8} fill="#f97316" fontSize={10} fontWeight="bold">
                {formatNum(angles[0])}°
              </text>
            </>
          )}

          {showAngles && mode === "angles" && (
            <>
              {/* Angle alpha at A */}
              {(() => {
                const toB = Math.atan2(pA.y - pB.y, pB.x - pA.x);
                const toC = Math.atan2(pA.y - pC.y, pC.x - pA.x);
                const start = Math.min(toB, toC);
                const end = Math.max(toB, toC);
                return (
                  <path d={describeAngleArc(pA.x, pA.y, 18, start, end)} fill="none" stroke="#ef4444" strokeWidth={1.5} />
                );
              })()}
              <text x={pA.x + 22} y={pA.y - 10} fill="#ef4444" fontSize={10} fontWeight="bold">
                {formatNum(angles[2])}°
              </text>
              {/* Angle beta at B */}
              <text x={pB.x - 30} y={pB.y - 10} fill="#3b82f6" fontSize={10} fontWeight="bold">
                {formatNum(angles[1])}°
              </text>
              {/* Angle gamma at C */}
              <text x={pC.x - 10} y={pC.y - 14} fill="#22c55e" fontSize={10} fontWeight="bold">
                {formatNum(angles[0])}°
              </text>
            </>
          )}

          {/* Area display inside triangle */}
          {showArea && (
            <text
              x={(pA.x + pB.x + pC.x) / 3}
              y={(pA.y + pB.y + pC.y) / 3 + 4}
              textAnchor="middle"
              fill="#64748b"
              fontSize={11}
              fontWeight="bold"
            >
              S = {formatNum(area)}
            </text>
          )}

          {/* Vertices */}
          <circle cx={pA.x} cy={pA.y} r={4} fill="#1e293b" stroke="white" strokeWidth={2} />
          <circle cx={pB.x} cy={pB.y} r={4} fill="#1e293b" stroke="white" strokeWidth={2} />
          <circle cx={pC.x} cy={pC.y} r={4} fill="#1e293b" stroke="white" strokeWidth={2} />
          <text x={pA.x - 14} y={pA.y + 16} fill="#1e293b" fontSize={12} fontWeight="bold">A</text>
          <text x={pB.x + 8} y={pB.y + 16} fill="#1e293b" fontSize={12} fontWeight="bold">B</text>
          <text x={pC.x - 4} y={pC.y - 10} fill="#1e293b" fontSize={12} fontWeight="bold">C</text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl label="a" value={sideA} min={1} max={15} step={1} onChange={setSideA} color="#3b82f6" />
        <SliderControl label="b" value={sideB} min={1} max={15} step={1} onChange={setSideB} color="#ef4444" />
      </div>
    </div>
  );
}
