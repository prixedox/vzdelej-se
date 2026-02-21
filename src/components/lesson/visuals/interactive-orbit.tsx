"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveOrbitProps {
  defaultOrbitalRadius?: number; // in units of planet radii (e.g. 2 = 2R from center)
  defaultCentralMass?: number; // visual scale 1-10
  showForceVector?: boolean;
  showVelocityVector?: boolean;
  showGField?: boolean;
  allowEscape?: boolean; // show escape velocity comparison
  planetLabel?: string;
  g?: number; // surface gravity
}

export function InteractiveOrbit({
  defaultOrbitalRadius = 3,
  defaultCentralMass = 5,
  showForceVector = true,
  showVelocityVector = true,
  showGField = false,
  allowEscape = false,
  planetLabel = "Země",
  g: surfaceG = 10,
}: InteractiveOrbitProps) {
  const [orbRadius, setOrbRadius] = useState(defaultOrbitalRadius);
  const [centralMass, setCentralMass] = useState(defaultCentralMass);
  const [isPlaying, setIsPlaying] = useState(false);

  // Animation state
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const [displayAngle, setDisplayAngle] = useState(0);

  // SVG dimensions
  const svgW = 440;
  const svgH = 380;
  const cx = 200;
  const cy = 190;
  const planetRadius = 18 + centralMass * 2; // visual size
  const pxPerUnit = 38; // pixels per orbital radius unit
  const orbRadiusPx = orbRadius * pxPerUnit;

  // Physics (normalized units where R_planet = 1, surface g = surfaceG)
  // g(r) = g_surface * (R/r)^2
  const gAtOrbit = surfaceG / (orbRadius * orbRadius);
  // Orbital velocity: v = sqrt(g_surface * R^2 / r) = sqrt(g * r) at orbit
  const vOrbital = Math.sqrt(surfaceG * 1 / orbRadius); // v = sqrt(g_s * R²/r), with R=1
  const vEscape = vOrbital * Math.sqrt(2);
  // Period: T = 2πr/v
  const period = (2 * Math.PI * orbRadius) / vOrbital;

  // Satellite position
  const satX = cx + orbRadiusPx * Math.cos(displayAngle);
  const satY = cy - orbRadiusPx * Math.sin(displayAngle);

  // Force vector (pointing toward center)
  const forceLen = Math.min(40, 200 / (orbRadius * orbRadius));
  const fAngle = Math.atan2(cy - satY, cx - satX);
  const forceEndX = satX + forceLen * Math.cos(fAngle);
  const forceEndY = satY + forceLen * Math.sin(fAngle);

  // Velocity vector (tangent to orbit, perpendicular to radius, in direction of motion)
  const velLen = Math.min(50, vOrbital * 15);
  const vAngle = displayAngle + Math.PI / 2; // tangent direction (counter-clockwise)
  const velEndX = satX + velLen * Math.cos(vAngle);
  const velEndY = satY - velLen * Math.sin(vAngle);

  // Gravity field rings
  const gFieldRings = useMemo(() => {
    if (!showGField) return [];
    const rings: { r: number; g: number; opacity: number }[] = [];
    for (let rr = 1.5; rr <= 8; rr += 1) {
      const gVal = surfaceG / (rr * rr);
      rings.push({
        r: rr * pxPerUnit,
        g: gVal,
        opacity: Math.min(0.5, gVal / surfaceG),
      });
    }
    return rings;
  }, [showGField, surfaceG, pxPerUnit]);

  // Animation
  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = timestamp;

      // Angular velocity = v/r (in display units, sped up)
      const omega = (vOrbital / orbRadius) * 2; // speed factor for visibility
      angleRef.current += omega * dt;
      if (angleRef.current > 2 * Math.PI) angleRef.current -= 2 * Math.PI;

      setDisplayAngle(angleRef.current);
      rafRef.current = requestAnimationFrame(animate);
    },
    [vOrbital, orbRadius]
  );

  const startAnimation = useCallback(() => {
    lastTimeRef.current = 0;
    setIsPlaying(true);
  }, []);

  const stopAnimation = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, animate]);

  // Reset on param change
  useEffect(() => {
    stopAnimation();
    angleRef.current = 0;
    setDisplayAngle(0);
  }, [orbRadius, centralMass, stopAnimation]);

  // Arrowhead marker
  const arrowMarker = (id: string, color: string) => (
    <marker id={id} viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
      <polygon points="0 0, 10 3.5, 0 7" fill={color} />
    </marker>
  );

  // Orbit trail (dashed circle)
  const orbitTrailPath = useMemo(() => {
    const pts: string[] = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const a = (2 * Math.PI * i) / steps;
      const x = cx + orbRadiusPx * Math.cos(a);
      const y = cy - orbRadiusPx * Math.sin(a);
      pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(" ") + " Z";
  }, [orbRadiusPx, cx, cy]);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Values */}
      <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
        <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`v_1 = ${vOrbital.toFixed(2)} \\text{ m/s}`} />
        </span>
        <span className="bg-indigo-100 dark:bg-indigo-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`T = ${period.toFixed(2)} \\text{ s}`} />
        </span>
        <span className="bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`g(r) = ${gAtOrbit.toFixed(2)} \\text{ m/s}^2`} />
        </span>
        {allowEscape && (
          <span className="bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`v_2 = ${vEscape.toFixed(2)} \\text{ m/s}`} />
          </span>
        )}
      </div>

      {/* SVG */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-md" aria-label="Oběžná dráha">
          <defs>
            <radialGradient id="spaceBg" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
            <radialGradient id="planetGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="60%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </radialGradient>
            <radialGradient id="satGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
            {arrowMarker("arrowForce", "#ef4444")}
            {arrowMarker("arrowVel", "#22c55e")}
          </defs>

          {/* Space background */}
          <rect x={0} y={0} width={svgW} height={svgH} fill="url(#spaceBg)" rx={8} />

          {/* Stars */}
          {[
            [30, 40], [80, 280], [150, 20], [350, 60], [400, 180],
            [420, 320], [60, 150], [380, 100], [250, 350], [100, 340],
            [320, 30], [200, 360], [50, 220], [410, 250], [280, 15],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={0.8 + (i % 3) * 0.4} fill="white" opacity={0.3 + (i % 4) * 0.15} />
          ))}

          {/* Gravity field rings */}
          {gFieldRings.map((ring, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={ring.r}
              fill="none"
              stroke="#818cf8"
              strokeWidth="0.5"
              opacity={ring.opacity}
              strokeDasharray="4 4"
            />
          ))}

          {/* Orbit trail */}
          <path
            d={orbitTrailPath}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="6 4"
            opacity="0.5"
          />

          {/* Planet */}
          <circle cx={cx} cy={cy} r={planetRadius} fill="url(#planetGrad)" />
          {/* Planet highlight */}
          <circle cx={cx - planetRadius * 0.25} cy={cy - planetRadius * 0.3} r={planetRadius * 0.35} fill="white" opacity="0.15" />
          {/* Planet atmosphere glow */}
          <circle cx={cx} cy={cy} r={planetRadius + 3} fill="none" stroke="#93c5fd" strokeWidth="2" opacity="0.3" />

          {/* Planet label */}
          <text x={cx} y={cy + planetRadius + 14} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">
            {planetLabel}
          </text>

          {/* Radius line (from center to satellite) */}
          <line
            x1={cx}
            y1={cy}
            x2={satX}
            y2={satY}
            stroke="#64748b"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.6"
          />
          <text
            x={(cx + satX) / 2 + 8}
            y={(cy + satY) / 2 - 6}
            fill="#94a3b8"
            fontSize="9"
            fontWeight="bold"
          >
            r = {orbRadius.toFixed(1)}R
          </text>

          {/* Force vector (red, toward center) */}
          {showForceVector && (
            <line
              x1={satX}
              y1={satY}
              x2={forceEndX}
              y2={forceEndY}
              stroke="#ef4444"
              strokeWidth="2.5"
              markerEnd="url(#arrowForce)"
            />
          )}

          {/* Velocity vector (green, tangent) */}
          {showVelocityVector && (
            <line
              x1={satX}
              y1={satY}
              x2={velEndX}
              y2={velEndY}
              stroke="#22c55e"
              strokeWidth="2.5"
              markerEnd="url(#arrowVel)"
            />
          )}

          {/* Satellite */}
          <circle cx={satX} cy={satY} r={6} fill="url(#satGrad)" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Solar panel wings */}
          <rect
            x={satX - 14}
            y={satY - 2}
            width={8}
            height={4}
            rx={1}
            fill="#6366f1"
            stroke="#4f46e5"
            strokeWidth="0.5"
            transform={`rotate(${(-displayAngle * 180) / Math.PI}, ${satX}, ${satY})`}
          />
          <rect
            x={satX + 6}
            y={satY - 2}
            width={8}
            height={4}
            rx={1}
            fill="#6366f1"
            stroke="#4f46e5"
            strokeWidth="0.5"
            transform={`rotate(${(-displayAngle * 180) / Math.PI}, ${satX}, ${satY})`}
          />

          {/* Vector labels */}
          {showForceVector && (
            <text
              x={forceEndX + 5 * Math.cos(fAngle + 0.5)}
              y={forceEndY + 5 * Math.sin(fAngle + 0.5)}
              fill="#ef4444"
              fontSize="10"
              fontWeight="bold"
            >
              Fg
            </text>
          )}
          {showVelocityVector && (
            <text
              x={velEndX + 5 * Math.cos(vAngle)}
              y={velEndY - 5}
              fill="#22c55e"
              fontSize="10"
              fontWeight="bold"
            >
              v
            </text>
          )}

          {/* Escape velocity comparison bar */}
          {allowEscape && (
            <g>
              <rect x={svgW - 70} y={30} width={50} height={barMaxH + 30} rx={5} fill="rgba(255,255,255,0.08)" stroke="#334155" strokeWidth="1" />
              <text x={svgW - 45} y={45} textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="bold">Rychlost</text>

              {/* v1 bar */}
              <rect
                x={svgW - 66}
                y={50 + barMaxH - (vOrbital / maxVRef) * barMaxH}
                width={18}
                height={(vOrbital / maxVRef) * barMaxH}
                rx={2}
                fill="#3b82f6"
              />
              <text x={svgW - 57} y={50 + barMaxH + 12} textAnchor="middle" fill="#3b82f6" fontSize="7" fontWeight="bold">v₁</text>

              {/* v2 bar */}
              <rect
                x={svgW - 42}
                y={50 + barMaxH - (vEscape / maxVRef) * barMaxH}
                width={18}
                height={(vEscape / maxVRef) * barMaxH}
                rx={2}
                fill="#ef4444"
              />
              <text x={svgW - 33} y={50 + barMaxH + 12} textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="bold">v₂</text>
            </g>
          )}
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl label="r" value={orbRadius} min={1.5} max={8} step={0.5} unit="R" onChange={setOrbRadius} color="#6366f1" />
        <SliderControl label="M" value={centralMass} min={1} max={10} step={1} unit="" onChange={setCentralMass} color="#3b82f6" />
      </div>

      {/* Play/Pause */}
      <div className="flex items-center gap-3">
        <button
          onClick={isPlaying ? stopAnimation : startAnimation}
          className="px-4 py-1.5 text-sm font-bold rounded-full text-white transition-colors"
          style={{ backgroundColor: isPlaying ? "#f97316" : "#22c55e" }}
        >
          {isPlaying ? "⏸ Pauza" : "▶ Oběh"}
        </button>
        <button
          onClick={() => {
            stopAnimation();
            angleRef.current = 0;
            setDisplayAngle(0);
          }}
          className="px-3 py-1.5 text-sm font-medium rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
        >
          ↺ Reset
        </button>
      </div>

      {/* Formula */}
      <div className="text-center text-xs text-muted-foreground">
        <MathDisplay math={`v_1 = \\sqrt{\\frac{GM}{r}} = \\sqrt{\\frac{g_0 R^2}{r}} \\quad T = \\frac{2\\pi r}{v_1}`} />
      </div>
    </div>
  );
}

// Constants for escape velocity bar
const barMaxH = 100;
const maxVRef = 6;
