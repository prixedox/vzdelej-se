"use client";

import { useState, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveRollerCoasterProps {
  trackProfile?: "hills" | "loop" | "hills-and-loop";
  loopRadius?: number;
  maxHeight?: number;
  showFriction?: boolean;
  g?: number;
}

// Pre-defined track profiles as (x, y) normalized points [0-1, 0-1] where y=0 is top
function getTrackPoints(profile: string, loopR: number): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  const steps = 200;

  if (profile === "loop") {
    // Start high, drop, loop, exit
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      let x: number, y: number;
      if (t < 0.15) {
        // Initial slope down
        x = t / 0.15 * 0.15;
        y = 1.0 - (1.0 - 0.2) * (t / 0.15); // from 1.0 to 0.2
      } else if (t < 0.25) {
        // Flat approach
        const lt = (t - 0.15) / 0.1;
        x = 0.15 + lt * 0.1;
        y = 0.2;
      } else if (t < 0.65) {
        // Loop (circle)
        const lt = (t - 0.25) / 0.4;
        const angle = -Math.PI / 2 + lt * 2 * Math.PI;
        const cx = 0.4;
        const cy = 0.2 - 0.15; // center above ground
        x = cx + 0.15 * Math.cos(angle);
        y = cy - 0.15 * Math.sin(angle);
      } else if (t < 0.75) {
        // Exit flat
        const lt = (t - 0.65) / 0.1;
        x = 0.55 + lt * 0.1;
        y = 0.2;
      } else {
        // Small hill at end
        const lt = (t - 0.75) / 0.25;
        x = 0.65 + lt * 0.35;
        y = 0.2 - 0.08 * Math.sin(lt * Math.PI);
      }
      pts.push({ x, y });
    }
  } else if (profile === "hills") {
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = t;
      // Start high, two hills
      const base = 0.2;
      const startH = 1.0 - t * 0.1;
      const hill1 = 0.35 * Math.sin(t * Math.PI * 2) * Math.exp(-2 * (t - 0.35) ** 2);
      const hill2 = 0.2 * Math.sin(t * Math.PI * 3) * Math.exp(-3 * (t - 0.7) ** 2);
      const drop = t < 0.15 ? (1.0 - base) * (1 - t / 0.15) : 0;
      const y = base - hill1 - hill2 + drop + (1.0 - base) * (1 - Math.min(t / 0.15, 1));
      pts.push({ x, y: Math.max(0.02, Math.min(0.98, 1 - (drop + base + hill1 + hill2))) });
    }
    // Simpler approach: explicit keypoints
    pts.length = 0;
    const keyY = [1.0, 0.95, 0.8, 0.5, 0.2, 0.15, 0.2, 0.45, 0.35, 0.15, 0.2, 0.35, 0.25, 0.18, 0.2];
    for (let i = 0; i < keyY.length; i++) {
      pts.push({ x: i / (keyY.length - 1), y: keyY[i] });
    }
    // Interpolate to more points
    const smooth: { x: number; y: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const idx = t * (keyY.length - 1);
      const lo = Math.floor(idx);
      const hi = Math.min(lo + 1, keyY.length - 1);
      const frac = idx - lo;
      // Smooth interpolation
      const s = frac * frac * (3 - 2 * frac); // smoothstep
      smooth.push({
        x: t,
        y: pts[lo].y * (1 - s) + pts[hi].y * s,
      });
    }
    pts.length = 0;
    pts.push(...smooth);
  } else {
    // hills-and-loop
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      let x: number, y: number;
      if (t < 0.12) {
        // Drop from top
        x = t;
        const s = t / 0.12;
        y = 1.0 * (1 - s) + 0.15 * s;
      } else if (t < 0.25) {
        // First valley + hill
        const s = (t - 0.12) / 0.13;
        x = t;
        y = 0.15 + 0.25 * Math.sin(s * Math.PI);
      } else if (t < 0.35) {
        // Approach loop
        x = t;
        y = 0.15;
      } else if (t < 0.65) {
        // Loop
        const s = (t - 0.35) / 0.3;
        const angle = -Math.PI / 2 + s * 2 * Math.PI;
        const cx = 0.5;
        const cy = 0.15 - 0.12;
        x = cx + 0.12 * Math.cos(angle);
        y = cy - 0.12 * Math.sin(angle);
      } else if (t < 0.75) {
        // Exit valley
        x = t;
        y = 0.15;
      } else {
        // Final hill
        const s = (t - 0.75) / 0.25;
        x = t;
        y = 0.15 + 0.15 * Math.sin(s * Math.PI);
      }
      pts.push({ x, y });
    }
  }

  return pts;
}

export function InteractiveRollerCoaster({
  trackProfile = "hills",
  loopRadius = 10,
  maxHeight = 50,
  showFriction = false,
  g = 10,
}: InteractiveRollerCoasterProps) {
  const [h0, setH0] = useState(Math.round(maxHeight * 0.7));
  const [position, setPosition] = useState(0);
  const [friction, setFriction] = useState(0);

  const svgW = 520;
  const svgH = 300;
  const trackL = 340;
  const trackT = 30;
  const trackB = 240;
  const trackR = trackL + 10;
  const barX = 380;
  const barW = 24;
  const barH = 180;

  const trackPoints = useMemo(() => getTrackPoints(trackProfile, loopRadius), [trackProfile, loopRadius]);

  // Get track height at normalized position
  const heightAtPos = useMemo(() => {
    return trackPoints.map((p) => p.y); // 0 = bottom, 1 = top
  }, [trackPoints]);

  // Map position (0-100) to track index
  const posIdx = Math.round((position / 100) * (trackPoints.length - 1));
  const currentPoint = trackPoints[Math.min(posIdx, trackPoints.length - 1)];
  const currentH = currentPoint.y * h0; // actual height in meters

  // Energy calculations
  const totalE = mass_times_g_times_h(1, g, h0); // per unit mass
  const Ep = mass_times_g_times_h(1, g, currentH);

  // Energy lost to friction (proportional to distance traveled)
  const distFrac = position / 100;
  const frictionLoss = friction * totalE * distFrac;

  const availableE = Math.max(0, totalE - frictionLoss);
  const Ek = Math.max(0, availableE - Ep);
  const v = Math.sqrt(2 * Ek); // v = sqrt(2*Ek/m) with m=1

  const stalled = Ep > availableE;

  // Scale for SVG
  const maxE = totalE;

  // Build SVG path
  const svgPath = useMemo(() => {
    return trackPoints
      .map((p, i) => {
        const sx = trackL + (trackR - trackL) * 0 + p.x * (trackR - 50);
        const x = 30 + p.x * trackL;
        const y = trackB - p.y * (trackB - trackT);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }, [trackPoints, trackL, trackT, trackB]);

  // Ball position on SVG
  const ballSvgX = 30 + currentPoint.x * trackL;
  const ballSvgY = trackB - currentPoint.y * (trackB - trackT);

  // Energy bar heights
  const ekBarH = maxE > 0 ? (Ek / maxE) * barH : 0;
  const epBarH = maxE > 0 ? (Ep / maxE) * barH : 0;
  const lossBarH = maxE > 0 ? (frictionLoss / maxE) * barH : 0;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Values */}
      <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
        <span className="bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`E_k = ${Ek.toFixed(0)} \\text{ J/kg}`} />
        </span>
        <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`E_p = ${Ep.toFixed(0)} \\text{ J/kg}`} />
        </span>
        <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`v = ${v.toFixed(1)} \\text{ m/s}`} />
        </span>
      </div>

      {/* SVG */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-xl" aria-label="Horská dráha">
          {/* Sky gradient */}
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="100%" stopColor="#f0fdf4" />
            </linearGradient>
          </defs>
          <rect x={0} y={0} width={svgW} height={svgH} fill="url(#sky)" rx={8} />

          {/* Ground */}
          <rect x={0} y={trackB + 5} width={370} height={svgH - trackB - 5} fill="#86efac" opacity="0.3" />

          {/* Track */}
          <path d={svgPath} fill="none" stroke="#475569" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Track rail shadow */}
          <path d={svgPath} fill="none" stroke="#94a3b8" strokeWidth="5" opacity="0.2" />

          {/* Height reference line */}
          <line x1={25} y1={trackT} x2={25} y2={trackB} stroke="#6366f1" strokeWidth="1" strokeDasharray="4 3" />
          <text x={20} y={(trackT + trackB) / 2} textAnchor="end" fill="#6366f1" fontSize="9" transform={`rotate(-90, 20, ${(trackT + trackB) / 2})`}>
            h = {h0} m
          </text>

          {/* Ball */}
          <circle
            cx={ballSvgX}
            cy={ballSvgY - 8}
            r={8}
            fill={stalled ? "#94a3b8" : "#ef4444"}
            stroke="white"
            strokeWidth="2"
            style={{ transition: "cx 0.15s, cy 0.15s, fill 0.3s" }}
          />
          {/* Ball shine */}
          <circle
            cx={ballSvgX - 2}
            cy={ballSvgY - 11}
            r={2.5}
            fill="white"
            opacity="0.6"
            style={{ transition: "cx 0.15s, cy 0.15s" }}
          />

          {stalled && (
            <text x={ballSvgX} y={ballSvgY - 22} textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">
              ✕
            </text>
          )}

          {/* Energy bars */}
          <rect x={barX - 2} y={trackT - 2} width={barW * 3 + 24} height={barH + 24} rx={6} fill="white" stroke="#e2e8f0" strokeWidth="1" />

          {/* Ek bar (red) */}
          <rect x={barX} y={trackT + barH - ekBarH} width={barW} height={ekBarH} rx={3} fill="#ef4444" style={{ transition: "y 0.15s, height 0.15s" }} />
          <text x={barX + barW / 2} y={trackT + barH + 14} textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">Ek</text>

          {/* Ep bar (blue) */}
          <rect x={barX + barW + 6} y={trackT + barH - epBarH} width={barW} height={epBarH} rx={3} fill="#3b82f6" style={{ transition: "y 0.15s, height 0.15s" }} />
          <text x={barX + barW + 6 + barW / 2} y={trackT + barH + 14} textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="bold">Ep</text>

          {/* Loss bar (gray) if friction */}
          {showFriction && (
            <>
              <rect x={barX + (barW + 6) * 2} y={trackT + barH - lossBarH} width={barW} height={lossBarH} rx={3} fill="#94a3b8" style={{ transition: "y 0.15s, height 0.15s" }} />
              <text x={barX + (barW + 6) * 2 + barW / 2} y={trackT + barH + 14} textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">Zt</text>
            </>
          )}

          {/* Total energy line */}
          <line
            x1={barX - 4}
            y1={trackT + barH - (maxE > 0 ? (availableE / maxE) * barH : 0)}
            x2={barX + barW * 3 + 20}
            y2={trackT + barH - (maxE > 0 ? (availableE / maxE) * barH : 0)}
            stroke="#22c55e"
            strokeWidth="2"
            strokeDasharray="4 2"
            style={{ transition: "y1 0.15s, y2 0.15s" }}
          />
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl label="h₀" value={h0} min={5} max={maxHeight} step={1} unit="m" onChange={setH0} color="#6366f1" />
        <SliderControl label="📍" value={position} min={0} max={100} step={1} unit="%" onChange={setPosition} color="#ef4444" />
        {showFriction && (
          <SliderControl label="f" value={friction} min={0} max={0.5} step={0.05} unit="" onChange={setFriction} color="#94a3b8" />
        )}
      </div>

      {stalled && (
        <p className="text-sm font-semibold text-red-600 dark:text-red-400 text-center">
          Nedostatek energie! Kulička se zastaví.
        </p>
      )}
    </div>
  );
}

function mass_times_g_times_h(m: number, g: number, h: number) {
  return m * g * h;
}
