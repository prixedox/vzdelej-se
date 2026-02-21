"use client";

import { useState } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveBalanceScaleProps {
  equation: { a: number; b: number; right: number };
  xRange?: [number, number];
}

export function InteractiveBalanceScale({
  equation,
  xRange = [0, 10],
}: InteractiveBalanceScaleProps) {
  const [x, setX] = useState(Math.floor((xRange[0] + xRange[1]) / 2));

  const leftValue = equation.a * x + equation.b;
  const rightValue = equation.right;
  const diff = leftValue - rightValue;
  const isBalanced = Math.abs(diff) < 0.001;

  // Tilt: positive diff → left heavier → tilt right, negative → tilt left
  const tiltDeg = isBalanced ? 0 : Math.max(-12, Math.min(12, diff * 2));

  const w = 400;
  const h = 240;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Equation display */}
      <div className="text-center">
        <MathDisplay
          math={`${equation.a !== 1 ? `${equation.a} \\cdot ` : ""}\\colorbox{#eef2ff}{\\color{#4f46e5}{${x}}}${equation.b >= 0 ? ` + ${equation.b}` : ` - ${Math.abs(equation.b)}`} = ${leftValue} \\quad ${isBalanced ? "\\color{#16a34a}{=}" : diff > 0 ? "\\color{#ef4444}{>}" : "\\color{#ef4444}{<}"} \\quad ${rightValue}`}
        />
      </div>

      {/* SVG Scale */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md" aria-label="Interaktivní váha">
          {/* Base */}
          <polygon points="170,220 230,220 210,200 190,200" fill="#94a3b8" />
          <rect x="195" y="110" width="10" height="90" fill="#94a3b8" rx="2" />

          {/* Beam group with tilt */}
          <g
            style={{
              transformOrigin: "200px 110px",
              transform: `rotate(${tiltDeg}deg)`,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <rect x="40" y="106" width="320" height="8" fill="#475569" rx="4" />

            {/* Fulcrum triangle */}
            <polygon points="192,106 208,106 200,92" fill="#f59e0b" />

            {/* Left pan */}
            <line x1="80" y1="114" x2="80" y2="150" stroke="#64748b" strokeWidth="2" />
            <ellipse cx="80" cy="152" rx="55" ry="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Left value */}
            <rect
              x="55"
              y="125"
              width="50"
              height="24"
              rx={6}
              fill={isBalanced ? "#22c55e" : "#6366f1"}
              style={{ transition: "fill 0.3s" }}
            />
            <text x="80" y="141" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
              {leftValue}
            </text>

            {/* Right pan */}
            <line x1="320" y1="114" x2="320" y2="150" stroke="#64748b" strokeWidth="2" />
            <ellipse cx="320" cy="152" rx="55" ry="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Right value */}
            <rect
              x="295"
              y="125"
              width="50"
              height="24"
              rx={6}
              fill={isBalanced ? "#22c55e" : "#f1f5f9"}
              stroke={isBalanced ? "#16a34a" : "#cbd5e1"}
              strokeWidth="1.5"
              style={{ transition: "fill 0.3s" }}
            />
            <text
              x="320"
              y="141"
              textAnchor="middle"
              fill={isBalanced ? "white" : "#334155"}
              fontSize="13"
              fontWeight="bold"
            >
              {rightValue}
            </text>
          </g>

          {/* Balanced indicator */}
          {isBalanced && (
            <g>
              <circle cx="200" cy="85" r="14" fill="#22c55e" opacity="0.2" />
              <text x="200" y="90" textAnchor="middle" fill="#16a34a" fontSize="18" fontWeight="bold">
                =
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Slider */}
      <div className="w-full max-w-xs mx-auto">
        <SliderControl
          label="x"
          value={x}
          min={xRange[0]}
          max={xRange[1]}
          step={1}
          onChange={setX}
          color={isBalanced ? "#22c55e" : "#6366f1"}
        />
      </div>

      {/* Hint */}
      {isBalanced && (
        <p className="text-sm font-semibold text-green-600 dark:text-green-400 text-center">
          Rovnováha! x = {x} je řešení rovnice.
        </p>
      )}
    </div>
  );
}
