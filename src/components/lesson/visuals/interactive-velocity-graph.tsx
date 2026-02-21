"use client";

import { useState, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveVelocityGraphProps {
  mode: "kinematics" | "function-explorer";
  // kinematics
  defaultV0?: number;
  defaultA?: number;
  tMax?: number;
  // function-explorer
  defaultExponent?: number;
  xRange?: [number, number];
}

export function InteractiveVelocityGraph({
  mode,
  defaultV0 = 0,
  defaultA = 3,
  tMax = 6,
  defaultExponent = 2,
  xRange = [0, 5],
}: InteractiveVelocityGraphProps) {
  const [v0, setV0] = useState(defaultV0);
  const [a, setA] = useState(defaultA);
  const [exponent, setExponent] = useState(defaultExponent);

  const w = 420;
  const h = 280;
  const padL = 55;
  const padR = 20;
  const padT = 20;
  const padB = 45;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  const graphData = useMemo(() => {
    if (mode === "kinematics") {
      // v(t) = v0 + a*t
      const vMax = Math.max(Math.abs(v0), Math.abs(v0 + a * tMax), 1);
      const vMin = Math.min(0, v0, v0 + a * tMax);
      const range = Math.max(vMax - vMin, 1);
      const distance = v0 * tMax + 0.5 * a * tMax * tMax;

      function xPos(t: number) { return padL + (t / tMax) * plotW; }
      function yPos(v: number) { return padT + plotH - ((v - vMin) / range) * plotH; }

      const steps = 40;
      const points: string[] = [];
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * tMax;
        const v = v0 + a * t;
        points.push(`${i === 0 ? "M" : "L"} ${xPos(t)} ${yPos(v)}`);
      }

      // Area path (fill under curve to v=0 line)
      const zeroY = yPos(0);
      const areaPath = points.join(" ") + ` L ${xPos(tMax)} ${zeroY} L ${xPos(0)} ${zeroY} Z`;

      // Grid
      const tStep = tMax <= 6 ? 1 : 2;
      const gridT: number[] = [];
      for (let t = tStep; t <= tMax; t += tStep) gridT.push(t);

      const vStep = range <= 10 ? 2 : range <= 30 ? 5 : 10;
      const gridV: number[] = [];
      for (let v = Math.ceil(vMin / vStep) * vStep; v <= vMax; v += vStep) {
        if (Math.abs(v) > 0.001) gridV.push(v);
      }

      return {
        pathData: points.join(" "),
        areaPath,
        xPos,
        yPos,
        gridT,
        gridV,
        zeroY,
        xLabel: "t (s)",
        yLabel: "v (m/s)",
        distance,
        vMin,
        vMax: vMax,
        range,
      };
    }

    // function-explorer: y = x^n
    const [xMin, xMax] = xRange;
    const yMax = Math.pow(xMax, exponent);
    const yRange = Math.max(yMax, 1);

    function xPos(x: number) { return padL + ((x - xMin) / (xMax - xMin)) * plotW; }
    function yPos(y: number) { return padT + plotH - (y / yRange) * plotH; }

    const steps = 60;
    const points: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const y = Math.pow(Math.max(x, 0), exponent);
      points.push(`${i === 0 ? "M" : "L"} ${xPos(x)} ${yPos(y)}`);
    }

    const xStep = (xMax - xMin) <= 5 ? 1 : 2;
    const gridT: number[] = [];
    for (let x = xMin + xStep; x <= xMax; x += xStep) gridT.push(x);

    const vStep = yRange <= 10 ? 2 : yRange <= 50 ? 10 : 25;
    const gridV: number[] = [];
    for (let y = vStep; y <= yRange; y += vStep) gridV.push(y);

    return {
      pathData: points.join(" "),
      areaPath: "",
      xPos,
      yPos,
      gridT,
      gridV,
      zeroY: padT + plotH,
      xLabel: "x",
      yLabel: "y",
      distance: 0,
      vMin: 0,
      vMax: yRange,
      range: yRange,
    };
  }, [mode, v0, a, tMax, exponent, xRange, plotW, plotH]);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Computed values */}
      {mode === "kinematics" && (
        <div className="flex flex-wrap justify-center gap-3 text-xs font-medium">
          <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`v(${tMax}) = ${(v0 + a * tMax).toFixed(1)} \\text{ m/s}`} />
          </span>
          <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`s = ${graphData.distance.toFixed(1)} \\text{ m}`} />
          </span>
        </div>
      )}
      {mode === "function-explorer" && (
        <div className="text-center">
          <MathDisplay
            math={`y = x^{${exponent % 1 === 0 ? exponent : exponent.toFixed(1)}}${exponent === 0.5 ? " = \\sqrt{x}" : ""}`}
          />
        </div>
      )}

      {/* SVG Graph */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md" aria-label="Interaktivní graf">
          {/* Grid */}
          {graphData.gridT.map((t) => (
            <g key={`gt-${t}`}>
              <line x1={graphData.xPos(t)} y1={padT} x2={graphData.xPos(t)} y2={padT + plotH} stroke="#e5e7eb" strokeWidth="1" />
              <text x={graphData.xPos(t)} y={padT + plotH + 18} textAnchor="middle" fill="#94a3b8" fontSize="10">
                {t}
              </text>
            </g>
          ))}
          {graphData.gridV.map((v) => (
            <g key={`gv-${v}`}>
              <line x1={padL} y1={graphData.yPos(v)} x2={padL + plotW} y2={graphData.yPos(v)} stroke="#e5e7eb" strokeWidth="1" />
              <text x={padL - 8} y={graphData.yPos(v) + 4} textAnchor="end" fill="#94a3b8" fontSize="10">
                {v}
              </text>
            </g>
          ))}

          {/* Axes */}
          <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#374151" strokeWidth="2" />
          <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#374151" strokeWidth="2" />

          {/* Zero line for kinematics (if v can go negative) */}
          {mode === "kinematics" && graphData.zeroY < padT + plotH - 2 && (
            <line
              x1={padL}
              y1={graphData.zeroY}
              x2={padL + plotW}
              y2={graphData.zeroY}
              stroke="#94a3b8"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
          )}

          {/* Axis labels */}
          <text x={padL + plotW / 2} y={h - 5} textAnchor="middle" fill="#64748b" fontSize="11">
            {graphData.xLabel}
          </text>
          <text
            x={14}
            y={padT + plotH / 2}
            textAnchor="middle"
            fill="#64748b"
            fontSize="11"
            transform={`rotate(-90, 14, ${padT + plotH / 2})`}
          >
            {graphData.yLabel}
          </text>

          {/* Area (kinematics only) */}
          {mode === "kinematics" && graphData.areaPath && (
            <path d={graphData.areaPath} fill="#3b82f620" />
          )}

          {/* Line */}
          <path
            d={graphData.pathData}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Zero label */}
          <text x={padL - 8} y={padT + plotH + 4} textAnchor="end" fill="#94a3b8" fontSize="10">
            0
          </text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        {mode === "kinematics" && (
          <>
            <SliderControl
              label="v₀"
              value={v0}
              min={0}
              max={30}
              step={1}
              unit="m/s"
              onChange={setV0}
              color="#3b82f6"
            />
            <SliderControl
              label="a"
              value={a}
              min={-5}
              max={10}
              step={0.5}
              unit="m/s²"
              onChange={setA}
              color="#f97316"
            />
          </>
        )}
        {mode === "function-explorer" && (
          <SliderControl
            label="n"
            value={exponent}
            min={0.5}
            max={4}
            step={0.5}
            onChange={setExponent}
            color="#8b5cf6"
          />
        )}
      </div>
    </div>
  );
}
