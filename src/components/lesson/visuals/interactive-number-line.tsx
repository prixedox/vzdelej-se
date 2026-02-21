"use client";

import { useState, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveNumberLineProps {
  equationType: "linear";
  defaultA?: number;
  defaultB?: number;
  range?: [number, number];
}

export function InteractiveNumberLine({
  defaultA = 2,
  defaultB = -6,
  range = [-10, 10],
}: InteractiveNumberLineProps) {
  const [a, setA] = useState(defaultA);
  const [b, setB] = useState(defaultB);

  const solution = useMemo(() => {
    if (Math.abs(a) < 0.001) return null;
    return -b / a;
  }, [a, b]);

  const pad = 40;
  const w = 500;
  const h = 100;
  const lineY = 50;
  const [rangeMin, rangeMax] = range;
  const rangeSpan = rangeMax - rangeMin;

  function xPos(val: number) {
    return pad + ((val - rangeMin) / rangeSpan) * (w - 2 * pad);
  }

  // Tick marks
  const step = rangeSpan <= 10 ? 1 : rangeSpan <= 20 ? 2 : 5;
  const ticks: number[] = [];
  for (let v = rangeMin; v <= rangeMax; v += step) ticks.push(v);

  const solutionInRange = solution !== null && solution >= rangeMin && solution <= rangeMax;
  const solutionX = solution !== null ? xPos(solution) : 0;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Equation display */}
      <div className="text-center">
        <MathDisplay
          math={`\\color{#3b82f6}{${a}}x ${b >= 0 ? "+" : "-"} \\color{#ef4444}{${Math.abs(b)}} = 0 \\quad \\Rightarrow \\quad ${solution !== null ? `\\color{#16a34a}{x = ${Number.isInteger(solution) ? solution : solution.toFixed(2)}}` : "\\color{#d97706}{\\text{žádné jednoznačné řešení}}"}`}
        />
      </div>

      {/* SVG Number Line */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-lg" aria-label="Interaktivní číselná osa">
          {/* Main line */}
          <line x1={pad - 10} y1={lineY} x2={w - pad + 10} y2={lineY} stroke="#475569" strokeWidth="2" />

          {/* Arrows */}
          <polygon
            points={`${pad - 15},${lineY} ${pad - 5},${lineY - 5} ${pad - 5},${lineY + 5}`}
            fill="#475569"
          />
          <polygon
            points={`${w - pad + 15},${lineY} ${w - pad + 5},${lineY - 5} ${w - pad + 5},${lineY + 5}`}
            fill="#475569"
          />

          {/* Ticks */}
          {ticks.map((v) => (
            <g key={v}>
              <line x1={xPos(v)} y1={lineY - 6} x2={xPos(v)} y2={lineY + 6} stroke="#475569" strokeWidth="1.5" />
              <text x={xPos(v)} y={lineY + 22} textAnchor="middle" fill="#64748b" fontSize="10">
                {v}
              </text>
            </g>
          ))}

          {/* Zero marker */}
          {rangeMin <= 0 && rangeMax >= 0 && (
            <line
              x1={xPos(0)}
              y1={lineY - 10}
              x2={xPos(0)}
              y2={lineY + 10}
              stroke="#94a3b8"
              strokeWidth="2"
            />
          )}

          {/* Solution point */}
          {solution !== null && solutionInRange && (
            <g
              style={{
                transform: `translateX(0px)`,
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <circle
                cx={solutionX}
                cy={lineY}
                r={8}
                fill="#22c55e"
                stroke="white"
                strokeWidth="2.5"
                style={{ transition: "cx 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              />
              <text
                x={solutionX}
                y={lineY - 16}
                textAnchor="middle"
                fill="#16a34a"
                fontSize="12"
                fontWeight="bold"
                style={{ transition: "x 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                x = {Number.isInteger(solution) ? solution : solution.toFixed(1)}
              </text>
            </g>
          )}

          {/* Out of range indicator */}
          {solution !== null && !solutionInRange && (
            <text x={w / 2} y={lineY - 16} textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">
              x = {solution.toFixed(1)} (mimo rozsah)
            </text>
          )}
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl
          label="a"
          value={a}
          min={-5}
          max={5}
          step={1}
          onChange={setA}
          color="#3b82f6"
        />
        <SliderControl
          label="b"
          value={b}
          min={-10}
          max={10}
          step={1}
          onChange={setB}
          color="#ef4444"
        />
      </div>
    </div>
  );
}
