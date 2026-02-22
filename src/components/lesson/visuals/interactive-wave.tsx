"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveWaveProps {
  mode?: "traveling" | "standing" | "interference";
  defaultAmplitude?: number;
  defaultWavelength?: number;
  defaultFrequency?: number;
  showParticles?: boolean;
  showLabels?: boolean;
}

// SVG coordinate helpers
const SVG_W = 440;
const SVG_H = 280;
const MARGIN_L = 30;
const MARGIN_R = 20;
const CENTER_Y = 140;
const WAVE_WIDTH = SVG_W - MARGIN_L - MARGIN_R;
const PX_PER_CM = WAVE_WIDTH / 20; // 20 cm visible range
const NUM_PARTICLES = 18;

function waveY(
  x: number,
  t: number,
  amplitude: number,
  wavelength: number,
  frequency: number,
  mode: "traveling" | "standing" | "interference",
  phaseDeg: number = 0,
  waveIndex: number = 0,
): number {
  const A = amplitude * PX_PER_CM;
  const k = (2 * Math.PI) / wavelength; // in cm^-1
  const w = 2 * Math.PI * frequency;

  if (mode === "traveling") {
    return A * Math.sin(k * x - w * t);
  }
  if (mode === "standing") {
    return 2 * A * Math.sin(k * x) * Math.cos(w * t);
  }
  // interference
  const phaseRad = (phaseDeg * Math.PI) / 180;
  if (waveIndex === 0) {
    return A * Math.sin(k * x - w * t);
  }
  if (waveIndex === 1) {
    return A * Math.sin(k * x - w * t + phaseRad);
  }
  // sum
  return (
    A * Math.sin(k * x - w * t) +
    A * Math.sin(k * x - w * t + phaseRad)
  );
}

function buildWavePath(
  t: number,
  amplitude: number,
  wavelength: number,
  frequency: number,
  mode: "traveling" | "standing" | "interference",
  phaseDeg: number,
  waveIndex: number,
): string {
  const steps = 200;
  const dx = 20 / steps; // 20 cm range
  const parts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const xCm = i * dx;
    const svgX = MARGIN_L + xCm * PX_PER_CM;
    const yOff = waveY(xCm, t, amplitude, wavelength, frequency, mode, phaseDeg, waveIndex);
    const svgY = CENTER_Y - yOff;
    parts.push(`${i === 0 ? "M" : "L"} ${svgX.toFixed(1)} ${svgY.toFixed(1)}`);
  }
  return parts.join(" ");
}

export function InteractiveWave({
  mode = "traveling",
  defaultAmplitude = 3,
  defaultWavelength = 8,
  defaultFrequency = 2,
  showParticles = true,
  showLabels = true,
}: InteractiveWaveProps) {
  const [amplitude, setAmplitude] = useState(defaultAmplitude);
  const [wavelength, setWavelength] = useState(defaultWavelength);
  const [frequency, setFrequency] = useState(defaultFrequency);
  const [phaseDeg, setPhaseDeg] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  // Derived quantities
  const velocity = useMemo(() => frequency * wavelength, [frequency, wavelength]);
  const period = useMemo(() => 1 / frequency, [frequency]);

  // Animation loop
  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = timestamp;
      setTime((prev) => prev + dt);
      rafRef.current = requestAnimationFrame(animate);
    },
    [],
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
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  // Build wave paths
  const wavePaths = useMemo(() => {
    if (mode === "interference") {
      return {
        wave1: buildWavePath(time, amplitude, wavelength, frequency, mode, phaseDeg, 0),
        wave2: buildWavePath(time, amplitude, wavelength, frequency, mode, phaseDeg, 1),
        sum: buildWavePath(time, amplitude, wavelength, frequency, mode, phaseDeg, 2),
      };
    }
    return {
      main: buildWavePath(time, amplitude, wavelength, frequency, mode, phaseDeg, 0),
    };
  }, [time, amplitude, wavelength, frequency, mode, phaseDeg]);

  // Particle positions
  const particles = useMemo(() => {
    if (!showParticles) return [];
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const xCm = (i + 0.5) * (20 / NUM_PARTICLES);
      const svgX = MARGIN_L + xCm * PX_PER_CM;
      let yOff: number;
      if (mode === "interference") {
        yOff = waveY(xCm, time, amplitude, wavelength, frequency, mode, phaseDeg, 2);
      } else {
        yOff = waveY(xCm, time, amplitude, wavelength, frequency, mode, phaseDeg, 0);
      }
      pts.push({ x: svgX, y: CENTER_Y - yOff });
    }
    return pts;
  }, [time, amplitude, wavelength, frequency, mode, phaseDeg, showParticles]);

  // Wavelength marker: find first two crests for the primary wave
  const lambdaMarker = useMemo(() => {
    if (!showLabels) return null;
    if (mode === "interference") return null; // too cluttered for interference

    // Search for first crest (local max)
    const step = 0.05;
    const crests: number[] = [];
    for (let xCm = step; xCm < 20 - step; xCm += step) {
      const yPrev = waveY(xCm - step, time, amplitude, wavelength, frequency, mode, phaseDeg, 0);
      const yCurr = waveY(xCm, time, amplitude, wavelength, frequency, mode, phaseDeg, 0);
      const yNext = waveY(xCm + step, time, amplitude, wavelength, frequency, mode, phaseDeg, 0);
      if (yCurr > yPrev && yCurr > yNext && yCurr > 0.1 * amplitude * PX_PER_CM) {
        crests.push(xCm);
        // Skip past this crest
        xCm += wavelength * 0.5;
      }
      if (crests.length >= 2) break;
    }
    if (crests.length < 2) return null;
    const x1 = MARGIN_L + crests[0] * PX_PER_CM;
    const x2 = MARGIN_L + crests[1] * PX_PER_CM;
    const yTop = CENTER_Y - amplitude * PX_PER_CM - 18;
    return { x1, x2, y: yTop };
  }, [time, amplitude, wavelength, frequency, mode, phaseDeg, showLabels]);

  // Amplitude marker: find the first crest for amplitude arrow
  const ampMarker = useMemo(() => {
    if (!showLabels) return null;
    if (mode === "interference") return null;

    const step = 0.05;
    for (let xCm = step; xCm < 20 - step; xCm += step) {
      const yPrev = waveY(xCm - step, time, amplitude, wavelength, frequency, mode, phaseDeg, 0);
      const yCurr = waveY(xCm, time, amplitude, wavelength, frequency, mode, phaseDeg, 0);
      const yNext = waveY(xCm + step, time, amplitude, wavelength, frequency, mode, phaseDeg, 0);
      if (yCurr > yPrev && yCurr > yNext && yCurr > 0.1 * amplitude * PX_PER_CM) {
        const svgX = MARGIN_L + xCm * PX_PER_CM;
        return { x: svgX, yTop: CENTER_Y - yCurr, yBot: CENTER_Y };
      }
    }
    return null;
  }, [time, amplitude, wavelength, frequency, mode, phaseDeg, showLabels]);

  // Standing wave: nodes and antinodes
  const standingMarkers = useMemo(() => {
    if (mode !== "standing" || !showLabels) return { nodes: [], antinodes: [] };
    const nodes: number[] = [];
    const antinodes: number[] = [];
    // Nodes at x = n * lambda/2, antinodes at x = (2n+1)*lambda/4
    for (let n = 0; n * (wavelength / 2) <= 20; n++) {
      const xNode = n * (wavelength / 2);
      if (xNode >= 0 && xNode <= 20) {
        nodes.push(MARGIN_L + xNode * PX_PER_CM);
      }
    }
    for (let n = 0; (2 * n + 1) * (wavelength / 4) <= 20; n++) {
      const xAnti = (2 * n + 1) * (wavelength / 4);
      if (xAnti >= 0 && xAnti <= 20) {
        antinodes.push(MARGIN_L + xAnti * PX_PER_CM);
      }
    }
    return { nodes, antinodes };
  }, [mode, wavelength, showLabels]);

  // Wave colors
  const mainColor = mode === "traveling" ? "#3b82f6" : "#8b5cf6";

  // Formula for display
  const formulaMain = useMemo(() => {
    if (mode === "traveling") {
      return `y = A \\sin\\left(2\\pi\\left(\\frac{x}{\\lambda} - ft\\right)\\right)`;
    }
    if (mode === "standing") {
      return `y = 2A \\sin\\frac{2\\pi x}{\\lambda} \\cos(2\\pi ft)`;
    }
    return `y = y_1 + y_2, \\quad \\Delta\\varphi = ${phaseDeg}°`;
  }, [mode, phaseDeg]);

  const formulaVelocity = mode !== "interference" ? `v = f \\cdot \\lambda = ${frequency} \\cdot ${wavelength} = ${velocity} \\text{ cm/s}` : null;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Values display */}
      <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
        <span className="bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`A = ${amplitude} \\text{ cm}`} />
        </span>
        <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`\\lambda = ${wavelength} \\text{ cm}`} />
        </span>
        <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`f = ${frequency} \\text{ Hz}`} />
        </span>
        <span className="bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`v = ${velocity} \\text{ cm/s}`} />
        </span>
        <span className="bg-purple-100 dark:bg-purple-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`T = ${period.toFixed(2)} \\text{ s}`} />
        </span>
      </div>

      {/* SVG */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full max-w-lg" aria-label="Vlnění">
          {/* Background gradient */}
          <defs>
            <radialGradient id="waveBg" cx="50%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </radialGradient>
            {/* Arrow marker for wavelength */}
            <marker id="arrowL" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
              <path d="M 0 0 L 8 3 L 0 6 Z" fill="#3b82f6" />
            </marker>
            <marker id="arrowR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M 8 0 L 0 3 L 8 6 Z" fill="#3b82f6" />
            </marker>
            {/* Amplitude arrow markers */}
            <marker id="arrowUp" markerWidth="6" markerHeight="8" refX="3" refY="0" orient="auto">
              <path d="M 0 8 L 3 0 L 6 8 Z" fill="#ef4444" />
            </marker>
            <marker id="arrowDown" markerWidth="6" markerHeight="8" refX="3" refY="8" orient="auto">
              <path d="M 0 0 L 3 8 L 6 0 Z" fill="#ef4444" />
            </marker>
          </defs>
          <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="url(#waveBg)" rx={8} />

          {/* Equilibrium line */}
          <line
            x1={MARGIN_L}
            y1={CENTER_Y}
            x2={SVG_W - MARGIN_R}
            y2={CENTER_Y}
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="6 4"
          />

          {/* Traveling mode: single wave */}
          {mode === "traveling" && wavePaths.main && (
            <path d={wavePaths.main} fill="none" stroke={mainColor} strokeWidth="2.5" strokeLinecap="round" />
          )}

          {/* Standing mode: wave + envelope + node/antinode markers */}
          {mode === "standing" && (
            <>
              {/* Envelope (max displacement) */}
              {(() => {
                const envTop: string[] = [];
                const envBot: string[] = [];
                const steps = 200;
                for (let i = 0; i <= steps; i++) {
                  const xCm = i * (20 / steps);
                  const svgX = MARGIN_L + xCm * PX_PER_CM;
                  const envelope = 2 * amplitude * PX_PER_CM * Math.abs(Math.sin((2 * Math.PI * xCm) / wavelength));
                  envTop.push(`${i === 0 ? "M" : "L"} ${svgX.toFixed(1)} ${(CENTER_Y - envelope).toFixed(1)}`);
                  envBot.push(`${i === 0 ? "M" : "L"} ${svgX.toFixed(1)} ${(CENTER_Y + envelope).toFixed(1)}`);
                }
                return (
                  <>
                    <path d={envTop.join(" ")} fill="none" stroke="#c4b5fd" strokeWidth="1" strokeDasharray="4 3" />
                    <path d={envBot.join(" ")} fill="none" stroke="#c4b5fd" strokeWidth="1" strokeDasharray="4 3" />
                  </>
                );
              })()}
              <path d={wavePaths.main!} fill="none" stroke={mainColor} strokeWidth="2.5" strokeLinecap="round" />

              {/* Node markers */}
              {standingMarkers.nodes.map((nx, i) => (
                <g key={`node-${i}`}>
                  <circle cx={nx} cy={CENTER_Y} r={4} fill="none" stroke="#ef4444" strokeWidth="1.5" />
                  {showLabels && (
                    <text x={nx} y={CENTER_Y + 16} textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">
                      uzel
                    </text>
                  )}
                </g>
              ))}
              {/* Antinode markers */}
              {standingMarkers.antinodes.map((ax, i) => (
                <g key={`anti-${i}`}>
                  <line x1={ax} y1={CENTER_Y - 2 * amplitude * PX_PER_CM - 4} x2={ax} y2={CENTER_Y + 2 * amplitude * PX_PER_CM + 4} stroke="#22c55e" strokeWidth="1" strokeDasharray="3 2" />
                  {showLabels && (
                    <text x={ax} y={CENTER_Y + 2 * amplitude * PX_PER_CM + 16} textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="bold">
                      kmit
                    </text>
                  )}
                </g>
              ))}
            </>
          )}

          {/* Interference mode: two waves + sum */}
          {mode === "interference" && (
            <>
              <path d={wavePaths.wave1!} fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              <path d={wavePaths.wave2!} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              <path d={wavePaths.sum!} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
              {/* Legend */}
              {showLabels && (
                <g>
                  <line x1={SVG_W - 110} y1={20} x2={SVG_W - 90} y2={20} stroke="#ef4444" strokeWidth="2" />
                  <text x={SVG_W - 85} y={24} fill="#ef4444" fontSize="9">y&#8321;</text>
                  <line x1={SVG_W - 110} y1={34} x2={SVG_W - 90} y2={34} stroke="#3b82f6" strokeWidth="2" />
                  <text x={SVG_W - 85} y={38} fill="#3b82f6" fontSize="9">y&#8322;</text>
                  <line x1={SVG_W - 110} y1={48} x2={SVG_W - 90} y2={48} stroke="#22c55e" strokeWidth="2.5" />
                  <text x={SVG_W - 85} y={52} fill="#22c55e" fontSize="9">y&#8321;+y&#8322;</text>
                </g>
              )}
            </>
          )}

          {/* Particle dots */}
          {showParticles &&
            particles.map((p, i) => (
              <circle
                key={`p-${i}`}
                cx={p.x}
                cy={p.y}
                r={3.5}
                fill={mode === "interference" ? "#22c55e" : mainColor}
                stroke="white"
                strokeWidth="1"
              />
            ))}

          {/* Wavelength marker (double-headed arrow between crests) */}
          {lambdaMarker && (
            <g>
              <line
                x1={lambdaMarker.x1}
                y1={lambdaMarker.y}
                x2={lambdaMarker.x2}
                y2={lambdaMarker.y}
                stroke="#3b82f6"
                strokeWidth="1.5"
                markerStart="url(#arrowR)"
                markerEnd="url(#arrowL)"
              />
              {/* Dashed vertical guide lines from crests to arrow */}
              <line x1={lambdaMarker.x1} y1={lambdaMarker.y + 3} x2={lambdaMarker.x1} y2={CENTER_Y - amplitude * PX_PER_CM} stroke="#3b82f6" strokeWidth="0.7" strokeDasharray="3 2" />
              <line x1={lambdaMarker.x2} y1={lambdaMarker.y + 3} x2={lambdaMarker.x2} y2={CENTER_Y - amplitude * PX_PER_CM} stroke="#3b82f6" strokeWidth="0.7" strokeDasharray="3 2" />
              {showLabels && (
                <text
                  x={(lambdaMarker.x1 + lambdaMarker.x2) / 2}
                  y={lambdaMarker.y - 5}
                  textAnchor="middle"
                  fill="#3b82f6"
                  fontSize="11"
                  fontWeight="bold"
                >
                  &#955; = {wavelength} cm
                </text>
              )}
            </g>
          )}

          {/* Amplitude marker (vertical double arrow) */}
          {ampMarker && (
            <g>
              <line
                x1={ampMarker.x + 14}
                y1={ampMarker.yTop}
                x2={ampMarker.x + 14}
                y2={ampMarker.yBot}
                stroke="#ef4444"
                strokeWidth="1.5"
                markerStart="url(#arrowUp)"
                markerEnd="url(#arrowDown)"
              />
              {showLabels && (
                <text
                  x={ampMarker.x + 26}
                  y={(ampMarker.yTop + ampMarker.yBot) / 2 + 3}
                  fill="#ef4444"
                  fontSize="11"
                  fontWeight="bold"
                >
                  A = {amplitude} cm
                </text>
              )}
            </g>
          )}

          {/* Axis labels */}
          <text x={MARGIN_L - 4} y={CENTER_Y + 4} textAnchor="end" fill="#64748b" fontSize="9">0</text>
          <text x={SVG_W - MARGIN_R + 6} y={CENTER_Y + 4} textAnchor="start" fill="#64748b" fontSize="9">x</text>
          <text x={MARGIN_L - 4} y={CENTER_Y - amplitude * PX_PER_CM + 4} textAnchor="end" fill="#94a3b8" fontSize="8">+A</text>
          <text x={MARGIN_L - 4} y={CENTER_Y + amplitude * PX_PER_CM + 4} textAnchor="end" fill="#94a3b8" fontSize="8">-A</text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl label="A" value={amplitude} min={1} max={6} step={0.5} unit="cm" onChange={setAmplitude} color="#ef4444" />
        <SliderControl label="λ" value={wavelength} min={4} max={16} step={1} unit="cm" onChange={setWavelength} color="#3b82f6" />
        <SliderControl label="f" value={frequency} min={0.5} max={5} step={0.5} unit="Hz" onChange={setFrequency} color="#22c55e" />
        {mode === "interference" && (
          <SliderControl label="Δφ" value={phaseDeg} min={0} max={360} step={15} unit="°" onChange={setPhaseDeg} color="#a855f7" />
        )}
      </div>

      {/* Play/Pause/Reset */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-1.5 text-sm font-bold rounded-full text-white transition-colors"
          style={{ backgroundColor: isPlaying ? "#f97316" : "#22c55e" }}
        >
          {isPlaying ? "\u23F8 Pauza" : "\u25B6 Spustit"}
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 text-sm font-medium rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          {"\u21BA"} Reset
        </button>
      </div>

      {/* Formula display */}
      <div className="text-center text-xs text-muted-foreground space-y-1">
        {formulaVelocity && <MathDisplay math={formulaVelocity} />}
        <br />
        <MathDisplay math={formulaMain} />
      </div>
    </div>
  );
}
