"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveSpringOscillatorProps {
  defaultK?: number;
  defaultMass?: number;
  defaultDisplacement?: number;
  showGraph?: boolean;
  showEnergyBars?: boolean;
  showForceArrow?: boolean;
}

function springPath(x1: number, x2: number, y: number, coils: number): string {
  const len = x2 - x1;
  if (len < 10) return `M ${x1} ${y} L ${x2} ${y}`;
  const segLen = len / (coils * 2 + 2);
  const amp = 10;
  let d = `M ${x1} ${y} L ${x1 + segLen} ${y}`;
  for (let i = 0; i < coils * 2; i++) {
    const px = x1 + segLen + (i + 1) * segLen;
    const py = y + (i % 2 === 0 ? -amp : amp);
    d += ` L ${px} ${py}`;
  }
  d += ` L ${x2} ${y}`;
  return d;
}

export function InteractiveSpringOscillator({
  defaultK = 100,
  defaultMass = 1,
  defaultDisplacement = 5,
  showGraph = true,
  showEnergyBars = true,
  showForceArrow = true,
}: InteractiveSpringOscillatorProps) {
  const [k, setK] = useState(defaultK);
  const [mass, setMass] = useState(defaultMass);
  const [x0, setX0] = useState(defaultDisplacement); // cm
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const graphPointsRef = useRef<{ t: number; x: number }[]>([]);

  const omega = useMemo(() => Math.sqrt(k / mass), [k, mass]);
  const period = useMemo(() => (2 * Math.PI) / omega, [omega]);

  // Current position (cm)
  const xCurrent = x0 * Math.cos(omega * time);
  // Current velocity (cm/s)
  const vCurrent = -x0 * omega * Math.sin(omega * time);

  // Energies (in mJ scale for display)
  const x_m = xCurrent / 100; // convert cm to m
  const v_m = vCurrent / 100;
  const Ep = 0.5 * k * x_m * x_m;
  const Ek = 0.5 * mass * v_m * v_m;
  const Etotal = 0.5 * k * (x0 / 100) * (x0 / 100);

  // Force (N)
  const force = -k * x_m;

  const svgW = 500;
  const svgH = showGraph ? 360 : 200;
  const springY = 80;
  const wallX = 40;
  const eqX = 250; // equilibrium position
  const pixPerCm = 10; // pixels per cm of displacement
  const blockW = 40 + mass * 8;
  const blockH = 35 + mass * 5;

  const blockX = eqX + xCurrent * pixPerCm;
  const springEndX = blockX - blockW / 2;

  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      setTime((prev) => {
        const newT = prev + dt;
        // Add to graph trail
        const xVal = x0 * Math.cos(omega * newT);
        graphPointsRef.current.push({ t: newT, x: xVal });
        // Keep last 5 seconds
        const cutoff = newT - 5;
        while (graphPointsRef.current.length > 0 && graphPointsRef.current[0].t < cutoff) {
          graphPointsRef.current.shift();
        }
        return newT;
      });

      rafRef.current = requestAnimationFrame(animate);
    },
    [omega, x0]
  );

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(animate);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, animate]);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setTime(0);
    graphPointsRef.current = [];
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  // Reset when params change
  useEffect(() => {
    handleReset();
  }, [k, mass, x0, handleReset]);

  // Build graph path
  const graphPath = useMemo(() => {
    if (!showGraph) return "";
    const graphTop = 210;
    const graphH = 120;
    const graphL = 50;
    const graphR = 460;
    const graphW = graphR - graphL;
    const graphMid = graphTop + graphH / 2;

    const pts = graphPointsRef.current;
    if (pts.length < 2) return "";

    const tMin = pts[0].t;
    const tMax = pts[pts.length - 1].t;
    const tRange = Math.max(tMax - tMin, 0.1);

    return pts
      .map((p, i) => {
        const px = graphL + ((p.t - tMin) / tRange) * graphW;
        const py = graphMid - (p.x / Math.max(x0, 1)) * (graphH / 2 - 5);
        return `${i === 0 ? "M" : "L"} ${px} ${py}`;
      })
      .join(" ");
  }, [time, showGraph, x0]); // time dependency triggers recompute

  // Energy bar dimensions
  const barX = 420;
  const barMaxH = 60;
  const barW = 18;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Values */}
      <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
        <span className="bg-purple-100 dark:bg-purple-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`T = ${period.toFixed(2)} \\text{ s}`} />
        </span>
        <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`x = ${xCurrent.toFixed(1)} \\text{ cm}`} />
        </span>
        {showForceArrow && (
          <span className="bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`F = ${force.toFixed(2)} \\text{ N}`} />
          </span>
        )}
      </div>

      {/* SVG */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-lg" aria-label="Pružinový oscilátor">
          {/* Wall */}
          <rect x={wallX - 10} y={springY - 40} width={10} height={80} fill="#475569" rx={2} />
          {/* Wall hatching */}
          {Array.from({ length: 6 }, (_, i) => (
            <line
              key={i}
              x1={wallX - 10}
              y1={springY - 35 + i * 13}
              x2={wallX - 2}
              y2={springY - 25 + i * 13}
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
          ))}

          {/* Ground line */}
          <line x1={wallX} y1={springY + blockH / 2 + 2} x2={400} y2={springY + blockH / 2 + 2} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />

          {/* Equilibrium marker */}
          <line x1={eqX} y1={springY + blockH / 2 + 2} x2={eqX} y2={springY + blockH / 2 + 15} stroke="#22c55e" strokeWidth="1.5" />
          <text x={eqX} y={springY + blockH / 2 + 24} textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">
            x=0
          </text>

          {/* Spring */}
          <path
            d={springPath(wallX, springEndX, springY, 12)}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Block */}
          <rect
            x={blockX - blockW / 2}
            y={springY - blockH / 2}
            width={blockW}
            height={blockH}
            rx={5}
            fill="#3b82f6"
            stroke="#2563eb"
            strokeWidth="1.5"
          />
          <text x={blockX} y={springY + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
            {mass} kg
          </text>

          {/* Force arrow */}
          {showForceArrow && Math.abs(force) > 0.01 && (
            <g>
              <line
                x1={blockX + blockW / 2 + 5}
                y1={springY}
                x2={blockX + blockW / 2 + 5 + Math.sign(force) * Math.min(Math.abs(force) * 15, 60)}
                y2={springY}
                stroke="#f97316"
                strokeWidth="3"
              />
              <polygon
                points={(() => {
                  const tip = blockX + blockW / 2 + 5 + Math.sign(force) * Math.min(Math.abs(force) * 15, 60);
                  const dir = Math.sign(force);
                  return `${tip},${springY} ${tip - dir * 8},${springY - 5} ${tip - dir * 8},${springY + 5}`;
                })()}
                fill="#f97316"
              />
            </g>
          )}

          {/* Displacement bracket */}
          {Math.abs(xCurrent) > 0.5 && (
            <g>
              <line
                x1={eqX}
                y1={springY - blockH / 2 - 15}
                x2={blockX}
                y2={springY - blockH / 2 - 15}
                stroke="#ef4444"
                strokeWidth="1.5"
              />
              <text
                x={(eqX + blockX) / 2}
                y={springY - blockH / 2 - 20}
                textAnchor="middle"
                fill="#ef4444"
                fontSize="9"
                fontWeight="bold"
              >
                x = {xCurrent.toFixed(1)} cm
              </text>
            </g>
          )}

          {/* Energy bars */}
          {showEnergyBars && Etotal > 0 && (
            <g>
              <rect x={barX - 4} y={springY - barMaxH - 10} width={barW * 2 + 16} height={barMaxH + 20} rx={4} fill="white" stroke="#e2e8f0" strokeWidth="1" />
              {/* Ek bar */}
              <rect
                x={barX}
                y={springY - (Ek / Etotal) * barMaxH}
                width={barW}
                height={(Ek / Etotal) * barMaxH}
                rx={3}
                fill="#ef4444"
              />
              <text x={barX + barW / 2} y={springY + 14} textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="bold">Ek</text>
              {/* Ep bar */}
              <rect
                x={barX + barW + 4}
                y={springY - (Ep / Etotal) * barMaxH}
                width={barW}
                height={(Ep / Etotal) * barMaxH}
                rx={3}
                fill="#3b82f6"
              />
              <text x={barX + barW + 4 + barW / 2} y={springY + 14} textAnchor="middle" fill="#3b82f6" fontSize="7" fontWeight="bold">Ep</text>
              {/* Total line */}
              <line
                x1={barX - 4}
                y1={springY - barMaxH}
                x2={barX + barW * 2 + 12}
                y2={springY - barMaxH}
                stroke="#22c55e"
                strokeWidth="1.5"
                strokeDasharray="3 2"
              />
            </g>
          )}

          {/* x(t) graph */}
          {showGraph && (
            <g>
              {/* Graph frame */}
              <rect x={45} y={200} width={420} height={140} rx={6} fill="white" stroke="#e2e8f0" strokeWidth="1" />
              {/* Center line (x=0) */}
              <line x1={50} y1={270} x2={460} y2={270} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />
              {/* Axes */}
              <line x1={50} y1={210} x2={50} y2={330} stroke="#374151" strokeWidth="1.5" />
              <line x1={50} y1={330} x2={460} y2={330} stroke="#374151" strokeWidth="1.5" />
              <text x={255} y={345} textAnchor="middle" fill="#64748b" fontSize="10">t (s)</text>
              <text x={35} y={270} textAnchor="middle" fill="#64748b" fontSize="10" transform="rotate(-90, 35, 270)">x (cm)</text>
              {/* +x0 / -x0 labels */}
              <text x={46} y={218} textAnchor="end" fill="#94a3b8" fontSize="8">+{x0}</text>
              <text x={46} y={328} textAnchor="end" fill="#94a3b8" fontSize="8">-{x0}</text>
              {/* Graph line */}
              {graphPath && (
                <path d={graphPath} fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
              )}
            </g>
          )}
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl label="k" value={k} min={10} max={400} step={10} unit="N/m" onChange={setK} color="#6366f1" />
        <SliderControl label="m" value={mass} min={0.5} max={5} step={0.5} unit="kg" onChange={setMass} color="#3b82f6" />
        <SliderControl label="x₀" value={x0} min={1} max={10} step={1} unit="cm" onChange={setX0} color="#ef4444" />
      </div>

      {/* Play/Pause/Reset */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-1.5 text-sm font-bold rounded-full text-white transition-colors"
          style={{ backgroundColor: isPlaying ? "#f97316" : "#22c55e" }}
        >
          {isPlaying ? "⏸ Pauza" : "▶ Spustit"}
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 text-sm font-medium rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}
