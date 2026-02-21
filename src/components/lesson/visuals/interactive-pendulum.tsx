"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractivePendulumProps {
  defaultLength?: number;
  defaultAngle?: number;
  showEnergyBars?: boolean;
  showGSlider?: boolean;
  g?: number;
}

export function InteractivePendulum({
  defaultLength = 1.5,
  defaultAngle = 30,
  showEnergyBars = true,
  showGSlider = false,
  g: defaultG = 10,
}: InteractivePendulumProps) {
  const [length, setLength] = useState(defaultLength);
  const [angle0, setAngle0] = useState(defaultAngle);
  const [grav, setGrav] = useState(defaultG);
  const [isPlaying, setIsPlaying] = useState(false);

  // Physics state (angle in radians, angular velocity)
  const stateRef = useRef({ theta: 0, omega: 0 });
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  const theta0Rad = (angle0 * Math.PI) / 180;
  const period = 2 * Math.PI * Math.sqrt(length / grav);

  // Current display angle
  const [displayTheta, setDisplayTheta] = useState(theta0Rad);

  // SVG dimensions
  const svgW = 400;
  const svgH = 380;
  const pivotX = 200;
  const pivotY = 40;
  const pxPerMeter = 140;
  const stringLen = length * pxPerMeter;

  // Bob position
  const bobX = pivotX + stringLen * Math.sin(displayTheta);
  const bobY = pivotY + stringLen * Math.cos(displayTheta);

  // Energy calculations
  const h = length * (1 - Math.cos(displayTheta)); // height above lowest point
  const hMax = length * (1 - Math.cos(theta0Rad));
  const Ep = grav * h; // per unit mass
  const Etotal = grav * hMax;
  const Ek = Math.max(0, Etotal - Ep);

  // Arc path for swing range
  const arcPath = useMemo(() => {
    const pts: string[] = [];
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      const a = -theta0Rad + (2 * theta0Rad * i) / steps;
      const ax = pivotX + stringLen * Math.sin(a);
      const ay = pivotY + stringLen * Math.cos(a);
      pts.push(`${i === 0 ? "M" : "L"} ${ax} ${ay}`);
    }
    return pts.join(" ");
  }, [theta0Rad, stringLen, pivotX, pivotY]);

  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05); // cap dt
      lastTimeRef.current = timestamp;

      const state = stateRef.current;

      // Euler method for pendulum ODE: d²θ/dt² = -(g/L)sin(θ)
      // With a tiny bit of damping for realism
      const alpha = -(grav / length) * Math.sin(state.theta);
      state.omega += alpha * dt;
      state.omega *= 0.9995; // tiny damping
      state.theta += state.omega * dt;

      setDisplayTheta(state.theta);
      rafRef.current = requestAnimationFrame(animate);
    },
    [grav, length]
  );

  const startAnimation = useCallback(() => {
    stateRef.current = { theta: theta0Rad, omega: 0 };
    lastTimeRef.current = 0;
    setIsPlaying(true);
  }, [theta0Rad]);

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

  // Reset when params change
  useEffect(() => {
    stopAnimation();
    stateRef.current = { theta: theta0Rad, omega: 0 };
    setDisplayTheta(theta0Rad);
  }, [length, angle0, grav, theta0Rad, stopAnimation]);

  const bobRadius = 14;

  // Energy bar dimensions
  const barX = 340;
  const barMaxH = 120;
  const barW = 16;

  const currentAngleDeg = ((displayTheta * 180) / Math.PI).toFixed(1);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Values */}
      <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
        <span className="bg-indigo-100 dark:bg-indigo-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`T = ${period.toFixed(2)} \\text{ s}`} />
        </span>
        <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`\\theta = ${currentAngleDeg}°`} />
        </span>
        <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`h = ${h.toFixed(3)} \\text{ m}`} />
        </span>
      </div>

      {/* SVG */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-sm" aria-label="Kyvadlo">
          {/* Background */}
          <defs>
            <radialGradient id="pendBg" cx="50%" cy="20%" r="80%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </radialGradient>
          </defs>
          <rect x={0} y={0} width={svgW} height={svgH} fill="url(#pendBg)" rx={8} />

          {/* Pivot mount */}
          <rect x={pivotX - 30} y={pivotY - 8} width={60} height={12} rx={3} fill="#475569" />
          <circle cx={pivotX} cy={pivotY} r={5} fill="#64748b" stroke="#475569" strokeWidth="2" />

          {/* Swing arc (dotted) */}
          <path d={arcPath} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />

          {/* Lowest point marker */}
          <circle cx={pivotX} cy={pivotY + stringLen} r={3} fill="#22c55e" opacity="0.5" />
          <line x1={pivotX - 15} y1={pivotY + stringLen} x2={pivotX + 15} y2={pivotY + stringLen} stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />

          {/* String */}
          <line
            x1={pivotX}
            y1={pivotY}
            x2={bobX}
            y2={bobY}
            stroke="#475569"
            strokeWidth="2"
          />

          {/* Height line */}
          {h > 0.01 && (
            <g>
              <line
                x1={bobX + bobRadius + 8}
                y1={bobY}
                x2={bobX + bobRadius + 8}
                y2={pivotY + stringLen}
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <text
                x={bobX + bobRadius + 14}
                y={(bobY + pivotY + stringLen) / 2 + 4}
                fill="#6366f1"
                fontSize="9"
                fontWeight="bold"
              >
                h
              </text>
            </g>
          )}

          {/* Bob */}
          <circle
            cx={bobX}
            cy={bobY}
            r={bobRadius}
            fill="#3b82f6"
            stroke="#2563eb"
            strokeWidth="2"
          />
          {/* Bob shine */}
          <circle
            cx={bobX - 3}
            cy={bobY - 4}
            r={4}
            fill="white"
            opacity="0.3"
          />

          {/* Bob shadow */}
          <ellipse
            cx={bobX}
            cy={pivotY + stringLen + bobRadius + 4}
            rx={bobRadius * 0.8}
            ry={3}
            fill="rgba(0,0,0,0.1)"
          />

          {/* Energy bars */}
          {showEnergyBars && Etotal > 0 && (
            <g>
              <rect x={barX - 6} y={pivotY + 20} width={barW * 2 + 18} height={barMaxH + 30} rx={5} fill="white" stroke="#e2e8f0" strokeWidth="1" />
              <text x={barX + barW + 3} y={pivotY + 35} textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="bold">Energie</text>

              {/* Ek bar (red) */}
              <rect
                x={barX}
                y={pivotY + 40 + barMaxH - (Ek / Etotal) * barMaxH}
                width={barW}
                height={(Ek / Etotal) * barMaxH}
                rx={3}
                fill="#ef4444"
              />
              <text x={barX + barW / 2} y={pivotY + 40 + barMaxH + 14} textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="bold">Ek</text>

              {/* Ep bar (blue) */}
              <rect
                x={barX + barW + 4}
                y={pivotY + 40 + barMaxH - (Ep / Etotal) * barMaxH}
                width={barW}
                height={(Ep / Etotal) * barMaxH}
                rx={3}
                fill="#3b82f6"
              />
              <text x={barX + barW + 4 + barW / 2} y={pivotY + 40 + barMaxH + 14} textAnchor="middle" fill="#3b82f6" fontSize="7" fontWeight="bold">Ep</text>

              {/* Total energy line */}
              <line
                x1={barX - 4}
                y1={pivotY + 40}
                x2={barX + barW * 2 + 12}
                y2={pivotY + 40}
                stroke="#22c55e"
                strokeWidth="1.5"
                strokeDasharray="3 2"
              />
            </g>
          )}

          {/* Length label */}
          <text x={pivotX - 30} y={pivotY + stringLen / 2} fill="#475569" fontSize="10" textAnchor="end">
            L = {length} m
          </text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl label="L" value={length} min={0.5} max={3} step={0.1} unit="m" onChange={setLength} color="#6366f1" />
        <SliderControl label="θ₀" value={angle0} min={5} max={80} step={5} unit="°" onChange={setAngle0} color="#3b82f6" />
        {showGSlider && (
          <SliderControl label="g" value={grav} min={1} max={20} step={1} unit="m/s²" onChange={setGrav} color="#22c55e" />
        )}
      </div>

      {/* Play/Pause */}
      <div className="flex items-center gap-3">
        <button
          onClick={isPlaying ? stopAnimation : startAnimation}
          className="px-4 py-1.5 text-sm font-bold rounded-full text-white transition-colors"
          style={{ backgroundColor: isPlaying ? "#f97316" : "#22c55e" }}
        >
          {isPlaying ? "⏸ Pauza" : "▶ Spustit"}
        </button>
        <button
          onClick={() => {
            stopAnimation();
            stateRef.current = { theta: theta0Rad, omega: 0 };
            setDisplayTheta(theta0Rad);
          }}
          className="px-3 py-1.5 text-sm font-medium rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          ↺ Reset
        </button>
      </div>

      {/* Period formula */}
      <div className="text-center text-xs text-muted-foreground">
        <MathDisplay math={`T = 2\\pi\\sqrt{\\frac{L}{g}} = 2\\pi\\sqrt{\\frac{${length}}{${grav}}} = ${period.toFixed(2)} \\text{ s}`} />
      </div>
    </div>
  );
}
