"use client";

import { useState, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveUnitCircleProps {
  defaultAngleDeg?: number;
  showSin?: boolean;
  showCos?: boolean;
  showTan?: boolean;
  showTriangle?: boolean;
  showRadians?: boolean;
}

const CX = 200;
const CY = 180;
const R = 130;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function formatNum(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  if (Math.abs(endDeg - startDeg) < 0.5) return "";
  const sweepAngle = endDeg - startDeg;
  const largeArc = Math.abs(sweepAngle) > 180 ? 1 : 0;
  const startRad = toRad(startDeg);
  const endRad = toRad(endDeg);
  const x1 = cx + r * Math.cos(-startRad);
  const y1 = cy - r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(-endRad);
  const y2 = cy - r * Math.sin(endRad);
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 0 ${x2} ${y2}`;
}

export function InteractiveUnitCircle({
  defaultAngleDeg = 45,
  showSin = true,
  showCos = true,
  showTan = true,
  showTriangle = true,
  showRadians = true,
}: InteractiveUnitCircleProps) {
  const [angleDeg, setAngleDeg] = useState(defaultAngleDeg);

  const computed = useMemo(() => {
    const rad = toRad(angleDeg);
    const cosVal = Math.cos(rad);
    const sinVal = Math.sin(rad);
    const tanVal = Math.abs(cosVal) < 1e-9 ? null : sinVal / cosVal;

    const px = CX + R * cosVal;
    const py = CY - R * sinVal;
    const projX = CX + R * cosVal;
    const projY = CY;

    return { rad, cosVal, sinVal, tanVal, px, py, projX, projY };
  }, [angleDeg]);

  const { cosVal, sinVal, tanVal, px, py, projX, projY, rad } = computed;

  // Tangent line: from (CX + R, CY) vertically to where the radius extended hits x = CX + R
  const tanLineEnd = useMemo(() => {
    if (tanVal === null) return null;
    const ty = CY - R * tanVal;
    // Clamp for display
    const clampedY = Math.max(CY - 250, Math.min(CY + 250, ty));
    return { x: CX + R, y: clampedY };
  }, [tanVal]);

  const arcPath = useMemo(() => describeArc(CX, CY, 25, 0, angleDeg), [angleDeg]);

  const radiansStr = useMemo(() => {
    const val = rad;
    // Try to show nice fractions of pi
    const ratio = val / Math.PI;
    if (Math.abs(ratio) < 0.01) return "0";
    if (Math.abs(ratio - 1) < 0.01) return "\\pi";
    if (Math.abs(ratio - 2) < 0.01) return "2\\pi";
    if (Math.abs(ratio - 0.5) < 0.01) return "\\frac{\\pi}{2}";
    if (Math.abs(ratio - 1.5) < 0.01) return "\\frac{3\\pi}{2}";
    return `${formatNum(val)} \\text{ rad}`;
  }, [rad]);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Math values display */}
      <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
          <MathDisplay math={`\\alpha = ${angleDeg}°`} />
        </span>
        {showRadians && (
          <span className="bg-purple-100 dark:bg-purple-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={radiansStr} />
          </span>
        )}
        {showSin && (
          <span className="bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`\\sin = ${formatNum(sinVal)}`} />
          </span>
        )}
        {showCos && (
          <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`\\cos = ${formatNum(cosVal)}`} />
          </span>
        )}
        {showTan && tanVal !== null && (
          <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`\\text{tg} = ${formatNum(tanVal)}`} />
          </span>
        )}
        {showTan && tanVal === null && (
          <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`\\text{tg} = \\text{nedef.}`} />
          </span>
        )}
      </div>

      {/* SVG */}
      <div className="flex justify-center w-full">
        <svg viewBox="0 0 400 380" className="w-full max-w-md" aria-label="Jednotková kružnice">
          <defs>
            <radialGradient id="ucBg" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </radialGradient>
          </defs>
          <rect x={0} y={0} width={400} height={380} fill="url(#ucBg)" rx={8} />

          {/* Axes */}
          <line x1={CX - R - 30} y1={CY} x2={CX + R + 30} y2={CY} stroke="#94a3b8" strokeWidth={1} />
          <line x1={CX} y1={CY - R - 30} x2={CX} y2={CY + R + 30} stroke="#94a3b8" strokeWidth={1} />
          <text x={CX + R + 35} y={CY + 4} fill="#64748b" fontSize={12} fontWeight="bold">x</text>
          <text x={CX + 6} y={CY - R - 32} fill="#64748b" fontSize={12} fontWeight="bold">y</text>

          {/* Axis tick marks: -1, 1 */}
          <line x1={CX + R} y1={CY - 4} x2={CX + R} y2={CY + 4} stroke="#64748b" strokeWidth={1} />
          <text x={CX + R} y={CY + 16} textAnchor="middle" fill="#64748b" fontSize={10}>1</text>
          <line x1={CX - R} y1={CY - 4} x2={CX - R} y2={CY + 4} stroke="#64748b" strokeWidth={1} />
          <text x={CX - R} y={CY + 16} textAnchor="middle" fill="#64748b" fontSize={10}>-1</text>
          <line x1={CX - 4} y1={CY - R} x2={CX + 4} y2={CY - R} stroke="#64748b" strokeWidth={1} />
          <text x={CX - 14} y={CY - R + 4} textAnchor="end" fill="#64748b" fontSize={10}>1</text>
          <line x1={CX - 4} y1={CY + R} x2={CX + 4} y2={CY + R} stroke="#64748b" strokeWidth={1} />
          <text x={CX - 14} y={CY + R + 4} textAnchor="end" fill="#64748b" fontSize={10}>-1</text>

          {/* Unit circle */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#334155" strokeWidth={1.5} />

          {/* Angle arc */}
          {arcPath && (
            <path d={arcPath} fill="none" stroke="#a855f7" strokeWidth={2} />
          )}

          {/* Angle label */}
          {angleDeg > 10 && (
            <text
              x={CX + 35 * Math.cos(-toRad(angleDeg / 2))}
              y={CY - 35 * Math.sin(toRad(angleDeg / 2))}
              textAnchor="middle"
              fill="#a855f7"
              fontSize={10}
              fontWeight="bold"
            >
              {angleDeg}°
            </text>
          )}

          {/* Right triangle */}
          {showTriangle && (
            <polygon
              points={`${CX},${CY} ${projX},${projY} ${px},${py}`}
              fill="rgba(148,163,184,0.1)"
              stroke="#94a3b8"
              strokeWidth={1}
              strokeDasharray="4 2"
            />
          )}

          {/* Cos line (horizontal) */}
          {showCos && (
            <line x1={CX} y1={CY} x2={projX} y2={CY} stroke="#3b82f6" strokeWidth={3} strokeLinecap="round" />
          )}

          {/* Sin line (vertical) */}
          {showSin && (
            <line x1={px} y1={CY} x2={px} y2={py} stroke="#ef4444" strokeWidth={3} strokeLinecap="round" />
          )}

          {/* Tangent line */}
          {showTan && tanLineEnd && (
            <>
              {/* Tangent vertical line at x=1 */}
              <line
                x1={CX + R}
                y1={CY}
                x2={tanLineEnd.x}
                y2={tanLineEnd.y}
                stroke="#22c55e"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
              {/* Extended radius line to tangent */}
              <line
                x1={CX}
                y1={CY}
                x2={tanLineEnd.x}
                y2={tanLineEnd.y}
                stroke="#94a3b8"
                strokeWidth={1}
                strokeDasharray="4 3"
              />
            </>
          )}

          {/* Radius line */}
          <line x1={CX} y1={CY} x2={px} y2={py} stroke="#334155" strokeWidth={2} />

          {/* Point on circle */}
          <circle cx={px} cy={py} r={5} fill="#f97316" stroke="white" strokeWidth={2} />

          {/* Labels on lines */}
          {showSin && Math.abs(sinVal) > 0.05 && (
            <text
              x={px + 10}
              y={(CY + py) / 2 + 4}
              fill="#ef4444"
              fontSize={11}
              fontWeight="bold"
            >
              sin
            </text>
          )}
          {showCos && Math.abs(cosVal) > 0.05 && (
            <text
              x={(CX + projX) / 2}
              y={CY + 22}
              textAnchor="middle"
              fill="#3b82f6"
              fontSize={11}
              fontWeight="bold"
            >
              cos
            </text>
          )}
          {showTan && tanLineEnd && Math.abs(tanVal!) < 5 && (
            <text
              x={CX + R + 12}
              y={(CY + tanLineEnd.y) / 2 + 4}
              fill="#22c55e"
              fontSize={11}
              fontWeight="bold"
            >
              tg
            </text>
          )}

          {/* Right angle marker */}
          {showTriangle && Math.abs(cosVal) > 0.05 && Math.abs(sinVal) > 0.05 && (
            <rect
              x={projX - (cosVal > 0 ? 8 : -0)}
              y={CY - 8}
              width={8}
              height={8}
              fill="none"
              stroke="#94a3b8"
              strokeWidth={1}
            />
          )}
        </svg>
      </div>

      {/* Slider */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl
          label="α"
          value={angleDeg}
          min={0}
          max={360}
          step={5}
          unit="°"
          onChange={setAngleDeg}
          color="#a855f7"
        />
      </div>
    </div>
  );
}
