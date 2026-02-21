"use client";

import { useState, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveMotionProps {
  maxV?: number;
  maxT?: number;
  targetDistance?: number;
  unit?: "m" | "km";
}

export function InteractiveMotion({
  maxV = 20,
  maxT = 10,
  targetDistance,
  unit = "m",
}: InteractiveMotionProps) {
  const [v, setV] = useState(Math.round(maxV / 2));
  const [t, setT] = useState(Math.round(maxT / 2));

  const distance = v * t;
  const hitTarget = targetDistance != null && Math.abs(distance - targetDistance) < 0.5;

  const w = 460;
  const h = 140;
  const pad = 30;
  const trackY = 60;
  const trackLen = w - 2 * pad;

  // Scale: max possible distance
  const maxDist = maxV * maxT;

  const carX = useMemo(() => {
    if (maxDist === 0) return pad;
    return pad + (distance / maxDist) * trackLen;
  }, [distance, maxDist, trackLen]);

  // Tick marks on the track
  const tickStep = maxDist <= 50 ? 10 : maxDist <= 200 ? 25 : 50;
  const ticks: number[] = [];
  for (let d = 0; d <= maxDist; d += tickStep) ticks.push(d);

  // Target position
  const targetX = targetDistance != null ? pad + (targetDistance / maxDist) * trackLen : 0;

  const timeUnit = unit === "km" ? "h" : "s";
  const speedUnit = unit === "km" ? "km/h" : "m/s";

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Equation display */}
      <div className="text-center">
        <MathDisplay
          math={`s = v \\cdot t = \\color{#3b82f6}{${v}} \\cdot \\color{#f97316}{${t}} = \\color{${hitTarget ? "#16a34a" : "#374151"}}{${distance} \\text{ ${unit}}}`}
        />
      </div>

      {/* SVG Track */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-lg" aria-label="Interaktivní pohyb">
          {/* Road surface */}
          <rect x={pad - 5} y={trackY - 12} width={trackLen + 10} height={24} rx={4} fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />

          {/* Road dashes */}
          {Array.from({ length: Math.floor(trackLen / 20) }, (_, i) => (
            <rect
              key={i}
              x={pad + i * 20}
              y={trackY - 1}
              width={10}
              height={2}
              fill="#cbd5e1"
              rx={1}
            />
          ))}

          {/* Tick marks */}
          {ticks.map((d) => {
            const x = pad + (d / maxDist) * trackLen;
            return (
              <g key={d}>
                <line x1={x} y1={trackY + 14} x2={x} y2={trackY + 22} stroke="#94a3b8" strokeWidth="1" />
                <text x={x} y={trackY + 34} textAnchor="middle" fill="#94a3b8" fontSize="9">
                  {d}
                </text>
              </g>
            );
          })}

          {/* Target flag */}
          {targetDistance != null && (
            <g>
              <line x1={targetX} y1={trackY - 25} x2={targetX} y2={trackY - 5} stroke={hitTarget ? "#16a34a" : "#ef4444"} strokeWidth="2" />
              <rect x={targetX} y={trackY - 30} width={24} height={12} rx={2} fill={hitTarget ? "#22c55e" : "#ef4444"} />
              <text x={targetX + 12} y={trackY - 22} textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">
                CÍL
              </text>
              <text x={targetX} y={trackY + 50} textAnchor="middle" fill={hitTarget ? "#16a34a" : "#ef4444"} fontSize="9" fontWeight="bold">
                {targetDistance} {unit}
              </text>
            </g>
          )}

          {/* Distance line */}
          {distance > 0 && (
            <line
              x1={pad}
              y1={trackY + 18}
              x2={carX}
              y2={trackY + 18}
              stroke="#3b82f6"
              strokeWidth="2"
              opacity="0.4"
              style={{ transition: "x2 0.3s ease-out" }}
            />
          )}

          {/* Car body */}
          <g style={{ transition: "transform 0.3s ease-out", transform: `translateX(${carX - pad}px)` }}>
            {/* Shadow */}
            <ellipse cx={pad} cy={trackY + 8} rx={14} ry={3} fill="rgba(0,0,0,0.1)" />
            {/* Body */}
            <rect x={pad - 14} y={trackY - 10} width={28} height={14} rx={4} fill="#3b82f6" />
            {/* Roof */}
            <rect x={pad - 8} y={trackY - 16} width={16} height={8} rx={3} fill="#60a5fa" />
            {/* Wheels */}
            <circle cx={pad - 8} cy={trackY + 5} r={4} fill="#1e293b" />
            <circle cx={pad + 8} cy={trackY + 5} r={4} fill="#1e293b" />
            <circle cx={pad - 8} cy={trackY + 5} r={1.5} fill="#94a3b8" />
            <circle cx={pad + 8} cy={trackY + 5} r={1.5} fill="#94a3b8" />
          </g>

          {/* Start flag */}
          <line x1={pad} y1={trackY - 25} x2={pad} y2={trackY - 5} stroke="#64748b" strokeWidth="1.5" />
          <text x={pad} y={trackY - 28} textAnchor="middle" fill="#64748b" fontSize="8">
            START
          </text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl
          label="v"
          value={v}
          min={0}
          max={maxV}
          step={1}
          unit={speedUnit}
          onChange={setV}
          color="#3b82f6"
        />
        <SliderControl
          label="t"
          value={t}
          min={0}
          max={maxT}
          step={1}
          unit={timeUnit}
          onChange={setT}
          color="#f97316"
        />
      </div>

      {/* Target hint */}
      {targetDistance != null && (
        hitTarget ? (
          <p className="text-sm font-semibold text-green-600 dark:text-green-400 text-center">
            Auto dorazilo do cíle!
          </p>
        ) : (
          <p className="text-xs text-muted-foreground text-center">
            Najděte správnou rychlost a čas, aby auto dojelo přesně do cíle ({targetDistance} {unit})
          </p>
        )
      )}
    </div>
  );
}
