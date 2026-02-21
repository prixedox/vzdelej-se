"use client";

import { useState, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveTrajectoryProps {
  trajectoryType: "horizontal-throw" | "vertical-throw" | "free-fall";
  defaultV0?: number;
  defaultHeight?: number;
  g?: number;
}

export function InteractiveTrajectory({
  trajectoryType,
  defaultV0 = 10,
  defaultHeight = 45,
  g = 10,
}: InteractiveTrajectoryProps) {
  const [v0, setV0] = useState(defaultV0);
  const [height, setHeight] = useState(defaultHeight);

  const w = 420;
  const h = 300;
  const pad = 45;

  const computed = useMemo(() => {
    if (trajectoryType === "free-fall") {
      const tFall = Math.sqrt((2 * height) / g);
      const vFinal = g * tFall;
      return { tFall, vFinal, xMax: 0, hMax: height };
    }
    if (trajectoryType === "horizontal-throw") {
      const tFall = Math.sqrt((2 * height) / g);
      const xMax = v0 * tFall;
      const vFinal = Math.sqrt(v0 * v0 + (g * tFall) ** 2);
      return { tFall, xMax, vFinal, hMax: height };
    }
    // vertical-throw
    const tUp = v0 / g;
    const hMax = (v0 * v0) / (2 * g);
    const tTotal = 2 * tUp;
    return { tFall: tTotal, hMax, xMax: 0, vFinal: v0 };
  }, [v0, height, g, trajectoryType]);

  // Build path
  const pathData = useMemo(() => {
    const steps = 40;

    if (trajectoryType === "free-fall") {
      const scaleY = (h - 2 * pad - 20) / Math.max(height, 1);
      const points: string[] = [];
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * computed.tFall;
        const dist = 0.5 * g * t * t;
        const py = pad + dist * scaleY;
        points.push(`${i === 0 ? "M" : "L"} ${w / 2} ${py}`);
      }
      return { path: points.join(" "), groundY: pad + height * scaleY };
    }

    if (trajectoryType === "horizontal-throw") {
      const xMax = computed.xMax || 1;
      const scaleX = (w - 2 * pad) / (xMax * 1.15);
      const scaleY = (h - 2 * pad) / (Math.max(height, 1) * 1.1);
      const points: string[] = [];
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * computed.tFall;
        const px = pad + v0 * t * scaleX;
        const py = pad + 0.5 * g * t * t * scaleY;
        points.push(`${i === 0 ? "M" : "L"} ${px} ${py}`);
      }
      const groundY = pad + height * scaleY;
      return { path: points.join(" "), groundY };
    }

    // vertical-throw
    const hMax = computed.hMax || 1;
    const scaleY = (h - 2 * pad - 20) / (hMax * 1.15);
    const tTotal = computed.tFall;
    const points: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * tTotal;
      const y = v0 * t - 0.5 * g * t * t;
      const px = pad + (t / Math.max(tTotal, 0.01)) * (w - 2 * pad);
      const py = h - pad - y * scaleY;
      points.push(`${i === 0 ? "M" : "L"} ${px} ${py}`);
    }
    return { path: points.join(" "), groundY: h - pad };
  }, [v0, height, g, computed, trajectoryType, w, h, pad]);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Computed values */}
      <div className="flex flex-wrap justify-center gap-3 text-xs font-medium">
        {trajectoryType !== "vertical-throw" && (
          <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`t = ${computed.tFall.toFixed(2)} \\text{ s}`} />
          </span>
        )}
        {trajectoryType === "vertical-throw" && (
          <>
            <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
              <MathDisplay math={`h_{\\max} = ${computed.hMax.toFixed(1)} \\text{ m}`} />
            </span>
            <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
              <MathDisplay math={`T = ${computed.tFall.toFixed(2)} \\text{ s}`} />
            </span>
          </>
        )}
        {trajectoryType === "horizontal-throw" && (
          <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`d = ${computed.xMax.toFixed(1)} \\text{ m}`} />
          </span>
        )}
        <span className="bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`v_{\\text{konec}} = ${computed.vFinal.toFixed(1)} \\text{ m/s}`} />
        </span>
      </div>

      {/* SVG */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md" aria-label="Interaktivní trajektorie">
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((frac) => (
            <line
              key={frac}
              x1={pad}
              y1={pad + frac * (pathData.groundY - pad)}
              x2={w - pad}
              y2={pad + frac * (pathData.groundY - pad)}
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
          ))}

          {/* Ground */}
          <line
            x1={pad - 10}
            y1={pathData.groundY}
            x2={w - pad + 10}
            y2={pathData.groundY}
            stroke="#65a30d"
            strokeWidth="3"
          />

          {/* Trajectory path */}
          <path
            d={pathData.path}
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "d 0.3s ease-out" }}
          />

          {/* Start dot */}
          <circle
            cx={trajectoryType === "horizontal-throw" ? pad : trajectoryType === "free-fall" ? w / 2 : pad}
            cy={pad}
            r={6}
            fill="#f97316"
            stroke="white"
            strokeWidth="2"
          />

          {/* Height label for free-fall / horizontal-throw */}
          {trajectoryType !== "vertical-throw" && (
            <>
              <line
                x1={pad - 25}
                y1={pad}
                x2={pad - 25}
                y2={pathData.groundY}
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text
                x={pad - 30}
                y={(pad + pathData.groundY) / 2 + 4}
                textAnchor="end"
                fill="#6366f1"
                fontSize="11"
                fontWeight="bold"
              >
                {height} m
              </text>
            </>
          )}

          {/* g label */}
          <text x={w - pad} y={pad + 15} textAnchor="end" fill="#475569" fontSize="10">
            g = {g} m/s²
          </text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        {(trajectoryType === "horizontal-throw" || trajectoryType === "vertical-throw") && (
          <SliderControl
            label="v₀"
            value={v0}
            min={1}
            max={30}
            step={1}
            unit="m/s"
            onChange={setV0}
            color="#3b82f6"
          />
        )}
        {trajectoryType !== "vertical-throw" && (
          <SliderControl
            label="h"
            value={height}
            min={5}
            max={80}
            step={5}
            unit="m"
            onChange={setHeight}
            color="#6366f1"
          />
        )}
        {trajectoryType === "vertical-throw" && (
          <SliderControl
            label="v₀"
            value={v0}
            min={1}
            max={30}
            step={1}
            unit="m/s"
            onChange={setV0}
            color="#3b82f6"
          />
        )}
      </div>
    </div>
  );
}
