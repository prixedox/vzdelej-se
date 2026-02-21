"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveCollisionProps {
  collisionType?: "elastic" | "inelastic" | "choosable";
  defaultM1?: number;
  defaultM2?: number;
  defaultV1?: number;
  defaultV2?: number;
  showEnergyBars?: boolean;
  showMomentumBars?: boolean;
}

type Phase = "ready" | "approaching" | "done";

export function InteractiveCollision({
  collisionType = "choosable",
  defaultM1 = 4,
  defaultM2 = 2,
  defaultV1 = 8,
  defaultV2 = 0,
  showEnergyBars = true,
  showMomentumBars = true,
}: InteractiveCollisionProps) {
  const [m1, setM1] = useState(defaultM1);
  const [m2, setM2] = useState(defaultM2);
  const [v1, setV1] = useState(defaultV1);
  const [v2, setV2] = useState(defaultV2);
  const [elastic, setElastic] = useState(true);
  const [phase, setPhase] = useState<Phase>("ready");
  const [animProgress, setAnimProgress] = useState(0); // 0 to 1

  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(0);

  // Post-collision velocities
  const v1After = elastic
    ? ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2)
    : (m1 * v1 + m2 * v2) / (m1 + m2);
  const v2After = elastic
    ? ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2)
    : (m1 * v1 + m2 * v2) / (m1 + m2);

  // Momentum
  const pBefore = m1 * v1 + m2 * v2;
  const pAfter = m1 * v1After + m2 * v2After;

  // Kinetic energy
  const ekBefore = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
  const ekAfter = 0.5 * m1 * v1After * v1After + 0.5 * m2 * v2After * v2After;
  const ekLoss = ekBefore - ekAfter;

  const svgW = 500;
  const svgH = 300;
  const trackY = 120;
  const trackL = 40;
  const trackR = 460;
  const centerX = 250;

  // Block dimensions (scale with mass)
  const blockW1 = 30 + m1 * 3;
  const blockH1 = 30 + m1 * 2;
  const blockW2 = 30 + m2 * 3;
  const blockH2 = 30 + m2 * 2;

  // Positions
  const getPositions = useCallback(
    (progress: number) => {
      if (progress <= 0) {
        // Ready: blocks apart
        return {
          x1: centerX - 80 - blockW1 / 2,
          x2: centerX + 80 + blockW2 / 2,
        };
      }
      if (progress < 0.4) {
        // Approaching
        const t = progress / 0.4;
        const ease = t * t * (3 - 2 * t); // smoothstep
        return {
          x1: centerX - 80 - blockW1 / 2 + ease * (80 - blockW1 / 2),
          x2: centerX + 80 + blockW2 / 2 - ease * (80 - blockW2 / 2),
        };
      }
      if (progress < 0.5) {
        // Impact flash
        return {
          x1: centerX - blockW1 / 2,
          x2: centerX + blockW2 / 2,
        };
      }
      // Separating (or stuck together for inelastic)
      const t = (progress - 0.5) / 0.5;
      const ease = t * t * (3 - 2 * t);
      if (!elastic) {
        // Move together
        const vCombined = v1After;
        const dir = vCombined >= 0 ? 1 : -1;
        return {
          x1: centerX - blockW1 / 2 + ease * dir * 60,
          x2: centerX + blockW2 / 2 + ease * dir * 60,
        };
      }
      // Elastic: separate
      const dir1 = v1After >= 0 ? 1 : -1;
      const dir2 = v2After >= 0 ? 1 : -1;
      const speed1 = Math.abs(v1After) / Math.max(Math.abs(v1), 1);
      const speed2 = Math.abs(v2After) / Math.max(Math.abs(v1), 1);
      return {
        x1: centerX - blockW1 / 2 + ease * dir1 * speed1 * 80,
        x2: centerX + blockW2 / 2 + ease * dir2 * speed2 * 80,
      };
    },
    [centerX, blockW1, blockW2, elastic, v1, v1After, v2After]
  );

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const duration = 2000; // 2 seconds total
      const progress = Math.min(elapsed / duration, 1);

      setAnimProgress(progress);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setPhase("done");
      }
    },
    []
  );

  const handleCollide = useCallback(() => {
    setPhase("approaching");
    setAnimProgress(0);
    startTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const handleReset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPhase("ready");
    setAnimProgress(0);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Reset when params change
  useEffect(() => {
    handleReset();
  }, [m1, m2, v1, v2, elastic, handleReset]);

  const pos = getPositions(phase === "ready" ? 0 : animProgress);
  const isImpact = animProgress >= 0.4 && animProgress < 0.55;

  // Bar chart area
  const barY = 170;
  const barMaxH = 80;
  const maxP = Math.max(Math.abs(pBefore), Math.abs(pAfter), 1);
  const maxEk = Math.max(ekBefore, ekAfter, 1);

  const showAfter = phase === "done";

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Equation */}
      <div className="text-center text-xs">
        <MathDisplay
          math={`p = m_1 v_1 + m_2 v_2 = ${m1} \\cdot ${v1} + ${m2} \\cdot (${v2}) = ${pBefore.toFixed(0)} \\text{ kg·m/s}`}
        />
      </div>

      {/* SVG */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-lg" aria-label="Srážka těles">
          {/* Track */}
          <rect x={trackL} y={trackY} width={trackR - trackL} height={4} rx={2} fill="#e2e8f0" />

          {/* Impact flash */}
          {isImpact && (
            <circle cx={centerX} cy={trackY - 20} r={20} fill="#fbbf24" opacity="0.6">
              <animate attributeName="r" from="5" to="25" dur="0.3s" fill="freeze" />
              <animate attributeName="opacity" from="0.8" to="0" dur="0.3s" fill="freeze" />
            </circle>
          )}

          {/* Block 1 */}
          <rect
            x={pos.x1 - blockW1 / 2}
            y={trackY - blockH1}
            width={blockW1}
            height={blockH1}
            rx={4}
            fill="#3b82f6"
            stroke="#2563eb"
            strokeWidth="1.5"
          />
          <text x={pos.x1} y={trackY - blockH1 / 2 + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
            {m1} kg
          </text>

          {/* Velocity arrow block 1 */}
          {phase === "ready" && v1 !== 0 && (
            <g>
              <line
                x1={pos.x1 + blockW1 / 2 + 5}
                y1={trackY - blockH1 / 2}
                x2={pos.x1 + blockW1 / 2 + 5 + Math.min(v1 * 3, 50)}
                y2={trackY - blockH1 / 2}
                stroke="#3b82f6"
                strokeWidth="3"
                markerEnd="url(#arrowBlue)"
              />
              <text
                x={pos.x1 + blockW1 / 2 + 10}
                y={trackY - blockH1 / 2 - 8}
                fill="#3b82f6"
                fontSize="10"
                fontWeight="bold"
              >
                {v1} m/s
              </text>
            </g>
          )}

          {/* Block 2 */}
          <rect
            x={pos.x2 - blockW2 / 2}
            y={trackY - blockH2}
            width={blockW2}
            height={blockH2}
            rx={4}
            fill="#ef4444"
            stroke="#dc2626"
            strokeWidth="1.5"
          />
          <text x={pos.x2} y={trackY - blockH2 / 2 + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
            {m2} kg
          </text>

          {/* Velocity arrow block 2 */}
          {phase === "ready" && v2 !== 0 && (
            <g>
              <line
                x1={pos.x2 - blockW2 / 2 - 5}
                y1={trackY - blockH2 / 2}
                x2={pos.x2 - blockW2 / 2 - 5 + v2 * 3}
                y2={trackY - blockH2 / 2}
                stroke="#ef4444"
                strokeWidth="3"
              />
              <text
                x={pos.x2 - blockW2 / 2 - 15}
                y={trackY - blockH2 / 2 - 8}
                fill="#ef4444"
                fontSize="10"
                fontWeight="bold"
                textAnchor="end"
              >
                {v2} m/s
              </text>
            </g>
          )}

          {/* Post-collision velocities */}
          {phase === "done" && (
            <>
              <text x={pos.x1} y={trackY - blockH1 - 8} textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">
                v₁&apos; = {v1After.toFixed(1)} m/s
              </text>
              <text x={pos.x2} y={trackY - blockH2 - 8} textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">
                v₂&apos; = {v2After.toFixed(1)} m/s
              </text>
            </>
          )}

          {/* Arrow marker */}
          <defs>
            <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0,0 8,3 0,6" fill="#3b82f6" />
            </marker>
          </defs>

          {/* Bar charts */}
          {showMomentumBars && (
            <g transform={`translate(50, ${barY})`}>
              <text x={40} y={-5} textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">Hybnost (p)</text>
              {/* Before */}
              <rect x={10} y={barMaxH - (Math.abs(pBefore) / maxP) * barMaxH} width={24} height={(Math.abs(pBefore) / maxP) * barMaxH} rx={3} fill="#8b5cf6" />
              <text x={22} y={barMaxH + 14} textAnchor="middle" fill="#64748b" fontSize="8">před</text>
              {/* After */}
              <rect
                x={44}
                y={barMaxH - (showAfter ? (Math.abs(pAfter) / maxP) * barMaxH : 0)}
                width={24}
                height={showAfter ? (Math.abs(pAfter) / maxP) * barMaxH : 0}
                rx={3}
                fill="#a78bfa"
                style={{ transition: "height 0.5s, y 0.5s" }}
              />
              <text x={56} y={barMaxH + 14} textAnchor="middle" fill="#64748b" fontSize="8">po</text>
            </g>
          )}

          {showEnergyBars && (
            <g transform={`translate(200, ${barY})`}>
              <text x={40} y={-5} textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">Energie (Ek)</text>
              {/* Before */}
              <rect x={10} y={barMaxH - (ekBefore / maxEk) * barMaxH} width={24} height={(ekBefore / maxEk) * barMaxH} rx={3} fill="#f97316" />
              <text x={22} y={barMaxH + 14} textAnchor="middle" fill="#64748b" fontSize="8">před</text>
              {/* After */}
              <rect
                x={44}
                y={barMaxH - (showAfter ? (ekAfter / maxEk) * barMaxH : 0)}
                width={24}
                height={showAfter ? (ekAfter / maxEk) * barMaxH : 0}
                rx={3}
                fill="#fb923c"
                style={{ transition: "height 0.5s, y 0.5s" }}
              />
              <text x={56} y={barMaxH + 14} textAnchor="middle" fill="#64748b" fontSize="8">po</text>
              {/* Loss */}
              {showAfter && ekLoss > 0.1 && (
                <rect
                  x={44}
                  y={barMaxH - (ekAfter / maxEk) * barMaxH - (ekLoss / maxEk) * barMaxH}
                  width={24}
                  height={(ekLoss / maxEk) * barMaxH}
                  rx={3}
                  fill="#fca5a5"
                  opacity="0.5"
                  style={{ transition: "height 0.5s, y 0.5s" }}
                />
              )}
            </g>
          )}

          {/* Result summary */}
          {phase === "done" && (
            <g transform={`translate(350, ${barY})`}>
              <text x={0} y={10} fill="#64748b" fontSize="9">p: {pBefore.toFixed(0)} → {pAfter.toFixed(0)}</text>
              <text x={0} y={25} fill={ekLoss < 0.1 ? "#22c55e" : "#ef4444"} fontSize="9" fontWeight="bold">
                Ek: {ekBefore.toFixed(0)} → {ekAfter.toFixed(0)} J
              </text>
              {ekLoss > 0.1 && (
                <text x={0} y={40} fill="#ef4444" fontSize="9">
                  Ztráta: {ekLoss.toFixed(0)} J ({((ekLoss / ekBefore) * 100).toFixed(0)}%)
                </text>
              )}
              <text x={0} y={60} fill="#22c55e" fontSize="10" fontWeight="bold">
                {elastic ? "Pružná srážka ✓" : "Nepružná srážka"}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Controls */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl label="m₁" value={m1} min={1} max={10} step={1} unit="kg" onChange={setM1} color="#3b82f6" />
        <SliderControl label="m₂" value={m2} min={1} max={10} step={1} unit="kg" onChange={setM2} color="#ef4444" />
        <SliderControl label="v₁" value={v1} min={1} max={20} step={1} unit="m/s" onChange={setV1} color="#3b82f6" />
        <SliderControl label="v₂" value={v2} min={-10} max={0} step={1} unit="m/s" onChange={setV2} color="#ef4444" />
      </div>

      {/* Type toggle + Collide button */}
      <div className="flex items-center gap-3">
        {(collisionType === "choosable") && (
          <button
            onClick={() => setElastic(!elastic)}
            className="px-3 py-1.5 text-xs font-medium rounded-full border transition-colors"
            style={{
              backgroundColor: elastic ? "#dbeafe" : "#fee2e2",
              borderColor: elastic ? "#3b82f6" : "#ef4444",
              color: elastic ? "#2563eb" : "#dc2626",
            }}
          >
            {elastic ? "Pružná" : "Nepružná"}
          </button>
        )}
        <button
          onClick={phase === "ready" ? handleCollide : handleReset}
          className="px-4 py-1.5 text-sm font-bold rounded-full text-white transition-colors"
          style={{ backgroundColor: phase === "ready" ? "#22c55e" : "#64748b" }}
        >
          {phase === "ready" ? "Srazit! 💥" : "Reset ↺"}
        </button>
      </div>
    </div>
  );
}
