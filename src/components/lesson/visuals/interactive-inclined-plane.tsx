"use client";

import { useState, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveInclinedPlaneProps {
  maxAngle?: number;
  defaultAngle?: number;
  maxMass?: number;
  defaultMu?: number;
  g?: number;
  showDecomposition?: boolean;
}

export function InteractiveInclinedPlane({
  maxAngle = 60,
  defaultAngle = 30,
  maxMass = 20,
  defaultMu = 0.3,
  g = 10,
  showDecomposition = true,
}: InteractiveInclinedPlaneProps) {
  const [angle, setAngle] = useState(defaultAngle);
  const [mass, setMass] = useState(5);
  const [mu, setMu] = useState(defaultMu);

  const rad = (angle * Math.PI) / 180;
  const sinA = Math.sin(rad);
  const cosA = Math.cos(rad);

  const forces = useMemo(() => {
    const Fg = mass * g;
    const Fpar = Fg * sinA; // along slope downhill
    const Fperp = Fg * cosA; // into surface
    const N = Fperp;
    const Ft = mu * N;
    const Fnet = Fpar - Ft;
    const isSliding = Fnet > 0.01;
    const accel = isSliding ? Fnet / mass : 0;
    return { Fg, Fpar, Fperp, N, Ft, Fnet, isSliding, accel };
  }, [mass, g, sinA, cosA, mu]);

  const w = 480;
  const h = 340;

  // Ramp geometry
  const rampBase = { x: 60, y: 280 };
  const rampLen = 300;
  const rampTopX = rampBase.x + rampLen * cosA;
  const rampTopY = rampBase.y - rampLen * sinA;

  // Block position (center of block on the slope, 40% up)
  const blockPos = 0.4;
  const bx = rampBase.x + rampLen * blockPos * cosA;
  const by = rampBase.y - rampLen * blockPos * sinA;

  // Slide offset
  const slideOffset = forces.isSliding ? Math.min(forces.accel * 2, 30) : 0;
  const slideX = bx + slideOffset * cosA;
  const slideY = by - slideOffset * (-sinA);
  const actualBx = bx + slideOffset * cosA;
  const actualBy = by + slideOffset * sinA;

  // Arrow scale: 1 N = 0.8 px
  const arrowScale = 0.8;
  const maxArrow = 120;

  function clampLen(force: number) {
    return Math.min(Math.abs(force) * arrowScale, maxArrow) * Math.sign(force);
  }

  // Force arrow helper: draws arrow from (x,y) in direction (dx,dy) with given length
  function arrowPath(x: number, y: number, len: number, dirX: number, dirY: number) {
    const ex = x + dirX * len;
    const ey = y + dirY * len;
    const headLen = 8;
    // perpendicular
    const px = -dirY;
    const py = dirX;
    return {
      line: `M ${x} ${y} L ${ex} ${ey}`,
      head: `M ${ex} ${ey} L ${ex - dirX * headLen + px * 4} ${ey - dirY * headLen + py * 4} L ${ex - dirX * headLen - px * 4} ${ey - dirY * headLen - py * 4} Z`,
      labelX: ex + dirX * 12,
      labelY: ey + dirY * 12,
    };
  }

  // Fg: straight down
  const fgLen = clampLen(forces.Fg);
  const fgArrow = arrowPath(actualBx, actualBy, fgLen, 0, 1);

  // N: perpendicular to surface (pointing away from surface)
  const nLen = clampLen(forces.N);
  const nDirX = sinA; // normal direction (rotate slope 90° outward)
  const nDirY = -cosA;
  const nArrow = arrowPath(actualBx, actualBy, nLen, -nDirX, -nDirY);

  // Fpar: along slope downhill
  const fparLen = clampLen(forces.Fpar);
  const fparArrow = arrowPath(actualBx, actualBy, fparLen, cosA, sinA);

  // Ft: friction along slope uphill (opposing motion)
  const ftLen = clampLen(forces.Ft);
  const ftArrow = arrowPath(actualBx, actualBy, ftLen, -cosA, -sinA);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Equation display */}
      <div className="flex flex-wrap justify-center gap-3 text-xs font-medium">
        <span className="bg-purple-100 dark:bg-purple-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`F_{\\parallel} = ${forces.Fpar.toFixed(1)} \\text{ N}`} />
        </span>
        <span className="bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`F_t = ${forces.Ft.toFixed(1)} \\text{ N}`} />
        </span>
        <span className={`px-2 py-1 rounded-full ${forces.isSliding ? "bg-green-100 dark:bg-green-900/40" : "bg-blue-100 dark:bg-blue-900/40"}`}>
          <MathDisplay math={`a = ${forces.accel.toFixed(2)} \\text{ m/s}^2`} />
        </span>
      </div>

      {/* SVG */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-lg" aria-label="Nakloněná rovina">
          {/* Ground */}
          <line x1={30} y1={rampBase.y} x2={w - 30} y2={rampBase.y} stroke="#65a30d" strokeWidth="3" />

          {/* Ramp surface */}
          <polygon
            points={`${rampBase.x},${rampBase.y} ${rampTopX},${rampTopY} ${rampTopX},${rampBase.y}`}
            fill="#f1f5f9"
            stroke="#94a3b8"
            strokeWidth="2"
          />

          {/* Hatching on ramp */}
          {Array.from({ length: 8 }, (_, i) => {
            const t = (i + 1) / 9;
            const sx = rampBase.x + (rampTopX - rampBase.x) * t;
            const sy = rampBase.y;
            const ex = sx;
            const ey = rampBase.y - (rampBase.y - rampTopY) * t;
            return (
              <line key={i} x1={sx} y1={sy} x2={ex} y2={ey} stroke="#cbd5e1" strokeWidth="0.5" />
            );
          })}

          {/* Angle arc */}
          <path
            d={`M ${rampBase.x + 40} ${rampBase.y} A 40 40 0 0 0 ${rampBase.x + 40 * cosA} ${rampBase.y - 40 * sinA}`}
            fill="none"
            stroke="#6366f1"
            strokeWidth="1.5"
          />
          <text
            x={rampBase.x + 50 * Math.cos(rad / 2)}
            y={rampBase.y - 50 * Math.sin(rad / 2) + 4}
            fill="#6366f1"
            fontSize="12"
            fontWeight="bold"
          >
            {angle}°
          </text>

          {/* Block on slope */}
          <g style={{ transition: "transform 0.3s ease-out" }}>
            <rect
              x={actualBx - 18}
              y={actualBy - 22}
              width={36}
              height={22}
              rx={3}
              fill={forces.isSliding ? "#ef4444" : "#3b82f6"}
              stroke={forces.isSliding ? "#dc2626" : "#2563eb"}
              strokeWidth="1.5"
              transform={`rotate(${-angle}, ${actualBx}, ${actualBy})`}
              style={{ transition: "fill 0.3s" }}
            />
            <text
              x={actualBx}
              y={actualBy - 8}
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="bold"
              transform={`rotate(${-angle}, ${actualBx}, ${actualBy})`}
            >
              {mass} kg
            </text>
          </g>

          {/* Fg arrow (red, down) */}
          <path d={fgArrow.line} fill="none" stroke="#ef4444" strokeWidth="2.5" />
          <path d={fgArrow.head} fill="#ef4444" />
          <text x={fgArrow.labelX + 4} y={fgArrow.labelY} fill="#ef4444" fontSize="11" fontWeight="bold">
            Fg
          </text>

          {/* N arrow (blue, perpendicular out) */}
          <path d={nArrow.line} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
          <path d={nArrow.head} fill="#3b82f6" />
          <text x={nArrow.labelX} y={nArrow.labelY - 4} fill="#3b82f6" fontSize="11" fontWeight="bold" textAnchor="middle">
            N
          </text>

          {/* Fpar arrow (purple, along slope down) */}
          <path d={fparArrow.line} fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="6 3" />
          <path d={fparArrow.head} fill="#8b5cf6" />
          <text x={fparArrow.labelX} y={fparArrow.labelY + 14} fill="#8b5cf6" fontSize="10" fontWeight="bold">
            Fg·sinα
          </text>

          {/* Ft arrow (orange, along slope up) */}
          {forces.Ft > 0.1 && (
            <>
              <path d={ftArrow.line} fill="none" stroke="#f97316" strokeWidth="2" />
              <path d={ftArrow.head} fill="#f97316" />
              <text x={ftArrow.labelX - 10} y={ftArrow.labelY - 8} fill="#f97316" fontSize="10" fontWeight="bold">
                Ft
              </text>
            </>
          )}

          {/* Force decomposition triangle (top right) */}
          {showDecomposition && (
            <g transform="translate(360, 20)">
              <text x={0} y={0} fill="#64748b" fontSize="9" fontWeight="bold">Rozklad sil:</text>
              {/* Mini triangle showing Fg, Fpar, Fperp relationship */}
              <line x1={10} y1={20} x2={10} y2={80} stroke="#ef4444" strokeWidth="2" />
              <line x1={10} y1={80} x2={10 + 50 * sinA} y2={80 - 50 * cosA + 60 * cosA} stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 2" />
              <line x1={10} y1={20} x2={10 + 50 * sinA} y2={20 + 50 * cosA} stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2" />
              <text x={0} y={55} fill="#ef4444" fontSize="8" textAnchor="end">Fg</text>
              <text x={30} y={90} fill="#8b5cf6" fontSize="8">F∥</text>
              <text x={35} y={30} fill="#3b82f6" fontSize="8">F⊥</text>
            </g>
          )}

          {/* Status indicator */}
          <rect
            x={w / 2 - 60}
            y={4}
            width={120}
            height={24}
            rx={12}
            fill={forces.isSliding ? "#22c55e" : "#3b82f6"}
            style={{ transition: "fill 0.3s" }}
          />
          <text x={w / 2} y={20} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
            {forces.isSliding ? "Blok klouže! ↓" : "Blok je v klidu ●"}
          </text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl label="α" value={angle} min={5} max={maxAngle} step={1} unit="°" onChange={setAngle} color="#6366f1" />
        <SliderControl label="m" value={mass} min={1} max={maxMass} step={1} unit="kg" onChange={setMass} color="#ef4444" />
        <SliderControl label="μ" value={mu} min={0} max={1} step={0.05} unit="" onChange={setMu} color="#f97316" />
      </div>

      {/* Condition */}
      <div className="text-center text-xs text-muted-foreground">
        <MathDisplay math={`\\tan ${angle}° = ${Math.tan(rad).toFixed(2)} \\quad ${Math.tan(rad) > mu ? ">" : "\\leq"} \\quad \\mu = ${mu}`} />
      </div>
    </div>
  );
}
