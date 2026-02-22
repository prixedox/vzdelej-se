"use client";

import { useState, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveCircuitProps {
  mode?: "ohm" | "series" | "parallel";
  defaultVoltage?: number;
  defaultR1?: number;
  defaultR2?: number;
  showPower?: boolean;
  showCurrent?: boolean;
}

export function InteractiveCircuit({
  mode = "ohm",
  defaultVoltage = 12,
  defaultR1 = 100,
  defaultR2 = 200,
  showPower = true,
  showCurrent = true,
}: InteractiveCircuitProps) {
  const [voltage, setVoltage] = useState(defaultVoltage);
  const [r1, setR1] = useState(defaultR1);
  const [r2, setR2] = useState(defaultR2);

  // Computed electrical values
  const computed = useMemo(() => {
    let rTotal: number;
    if (mode === "ohm") {
      rTotal = r1;
    } else if (mode === "series") {
      rTotal = r1 + r2;
    } else {
      // parallel: 1/R = 1/R1 + 1/R2
      rTotal = r1 * r2 / (r1 + r2);
    }
    // Guard against division by zero
    const current = rTotal > 0 ? voltage / rTotal : 0; // in A
    const currentMa = current * 1000; // in mA
    const power = voltage * current; // in W
    const powerMw = power * 1000; // in mW

    // Mode-specific values
    let i1 = current;
    let i2 = current;
    let u1 = voltage;
    let u2 = 0;

    if (mode === "series") {
      u1 = current * r1;
      u2 = current * r2;
    } else if (mode === "parallel") {
      i1 = r1 > 0 ? voltage / r1 : 0;
      i2 = r2 > 0 ? voltage / r2 : 0;
      u1 = voltage;
      u2 = voltage;
    }

    return { rTotal, current, currentMa, power, powerMw, i1, i2, u1, u2 };
  }, [voltage, r1, r2, mode]);

  // Animation speed: higher current = shorter duration
  const animDuration = useMemo(() => {
    if (computed.currentMa <= 0) return 0;
    // Map current to animation duration: 3s at 20mA, 0.5s at 240mA
    const d = Math.max(0.4, 3 - (computed.currentMa / 80));
    return d;
  }, [computed.currentMa]);

  const svgW = 440;
  const svgH = 340;

  // Circuit path coordinates
  const left = 80;
  const right = 360;
  const top = 60;
  const bottom = 280;
  const midX = (left + right) / 2;
  const midY = (top + bottom) / 2;

  // Resistor drawing helper: draws a zigzag between two points (horizontal or vertical)
  function resistorZigzag(
    x1: number, y1: number,
    x2: number, y2: number,
    zigCount: number = 5,
    amplitude: number = 10,
  ): string {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 1) return `M ${x1} ${y1}`;

    // Unit vector along the line
    const ux = dx / len;
    const uy = dy / len;
    // Perpendicular vector
    const px = -uy;
    const py = ux;

    // Leave straight leads at start/end
    const leadLen = len * 0.15;
    const zigLen = len - 2 * leadLen;
    const segLen = zigLen / (zigCount * 2);

    let d = `M ${x1} ${y1}`;
    // Lead in
    const sx = x1 + ux * leadLen;
    const sy = y1 + uy * leadLen;
    d += ` L ${sx} ${sy}`;

    // Zigzag
    for (let i = 0; i < zigCount * 2; i++) {
      const t = (i + 1) * segLen;
      const cx = sx + ux * t;
      const cy = sy + uy * t;
      const sign = i % 2 === 0 ? 1 : -1;
      d += ` L ${cx + px * amplitude * sign} ${cy + py * amplitude * sign}`;
    }

    // Lead out
    d += ` L ${x2} ${y2}`;
    return d;
  }

  // Battery symbol (drawn vertically)
  function renderBattery(cx: number, yTop: number, yBot: number) {
    const my = (yTop + yBot) / 2;
    const gapH = 20;
    const longW = 18; // + plate (wider)
    const shortW = 10; // - plate (narrower)
    return (
      <g>
        {/* Wire from top to + plate */}
        <line x1={cx} y1={yTop} x2={cx} y2={my - gapH / 2} stroke="#334155" strokeWidth="2.5" />
        {/* + plate (longer line) */}
        <line
          x1={cx - longW} y1={my - gapH / 2}
          x2={cx + longW} y2={my - gapH / 2}
          stroke="#f97316" strokeWidth="3"
        />
        {/* - plate (shorter line) */}
        <line
          x1={cx - shortW} y1={my + gapH / 2}
          x2={cx + shortW} y2={my + gapH / 2}
          stroke="#3b82f6" strokeWidth="3"
        />
        {/* Wire from - plate to bottom */}
        <line x1={cx} y1={my + gapH / 2} x2={cx} y2={yBot} stroke="#334155" strokeWidth="2.5" />
        {/* + label */}
        <text x={cx + longW + 6} y={my - gapH / 2 + 4} fill="#f97316" fontSize="12" fontWeight="bold">+</text>
        {/* - label */}
        <text x={cx + shortW + 6} y={my + gapH / 2 + 5} fill="#3b82f6" fontSize="12" fontWeight="bold">&minus;</text>
        {/* U label */}
        <text x={cx - longW - 10} y={my + 5} fill="#ef4444" fontSize="13" fontWeight="bold" textAnchor="end">
          U
        </text>
      </g>
    );
  }

  // Current direction arrows (triangles along path)
  function renderCurrentArrow(cx: number, cy: number, direction: "up" | "down" | "left" | "right", size: number = 6, color: string = "#22c55e") {
    const s = size;
    let points = "";
    switch (direction) {
      case "right":
        points = `${cx - s},${cy - s / 2} ${cx + s},${cy} ${cx - s},${cy + s / 2}`;
        break;
      case "left":
        points = `${cx + s},${cy - s / 2} ${cx - s},${cy} ${cx + s},${cy + s / 2}`;
        break;
      case "down":
        points = `${cx - s / 2},${cy - s} ${cx},${cy + s} ${cx + s / 2},${cy - s}`;
        break;
      case "up":
        points = `${cx - s / 2},${cy + s} ${cx},${cy - s} ${cx + s / 2},${cy + s}`;
        break;
    }
    return <polygon points={points} fill={color} />;
  }

  // Generate evenly-spaced dot positions along circuit path segments
  function dotsAlongSegments(
    segments: { x: number; y: number }[],
    count: number,
  ): { x: number; y: number }[] {
    // Compute total length
    let totalLen = 0;
    const segLens: number[] = [];
    for (let i = 1; i < segments.length; i++) {
      const dx = segments[i].x - segments[i - 1].x;
      const dy = segments[i].y - segments[i - 1].y;
      const sl = Math.sqrt(dx * dx + dy * dy);
      segLens.push(sl);
      totalLen += sl;
    }

    const dots: { x: number; y: number }[] = [];
    for (let d = 0; d < count; d++) {
      const target = (d / count) * totalLen;
      let acc = 0;
      for (let s = 0; s < segLens.length; s++) {
        if (acc + segLens[s] >= target) {
          const t = (target - acc) / segLens[s];
          dots.push({
            x: segments[s].x + t * (segments[s + 1].x - segments[s].x),
            y: segments[s].y + t * (segments[s + 1].y - segments[s].y),
          });
          break;
        }
        acc += segLens[s];
      }
    }
    return dots;
  }

  // ===== OHM MODE =====
  function renderOhmCircuit() {
    // Rectangle: top-left -> top-right -> bottom-right -> bottom-left
    // Battery on left side (going down), Resistor on right side (going down)
    const rMidY = midY;

    // Path segments for current flow (clockwise: top-left -> top-right -> right-down through R -> bottom-right -> bottom-left -> left-up through battery)
    const loopSegments = [
      { x: left, y: top },
      { x: right, y: top },
      { x: right, y: bottom },
      { x: left, y: bottom },
      { x: left, y: top },
    ];

    const dots = dotsAlongSegments(loopSegments, 8);

    return (
      <g>
        {/* Top wire */}
        <line x1={left} y1={top} x2={right} y2={top} stroke="#334155" strokeWidth="2.5" />
        {/* Bottom wire */}
        <line x1={left} y1={bottom} x2={right} y2={bottom} stroke="#334155" strokeWidth="2.5" />
        {/* Right wire segments (above & below resistor) */}
        <line x1={right} y1={top} x2={right} y2={rMidY - 40} stroke="#334155" strokeWidth="2.5" />
        <line x1={right} y1={rMidY + 40} x2={right} y2={bottom} stroke="#334155" strokeWidth="2.5" />

        {/* Battery on left */}
        {renderBattery(left, top, bottom)}

        {/* Resistor R1 on right side */}
        <path
          d={resistorZigzag(right, rMidY - 40, right, rMidY + 40, 5, 12)}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* R1 label */}
        <rect x={right + 16} y={rMidY - 12} width={52} height={24} rx={5} fill="#8b5cf6" />
        <text x={right + 42} y={rMidY + 4} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
          R = {r1}
        </text>

        {/* Voltage label on battery */}
        <rect x={left - 52} y={midY - 22} width={38} height={20} rx={4} fill="#ef4444" opacity={0.15} />
        <text x={left - 33} y={midY - 8} textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">
          {voltage} V
        </text>

        {/* Current arrows */}
        {showCurrent && (
          <g>
            {renderCurrentArrow(midX, top - 1, "right")}
            {renderCurrentArrow(right + 1, rMidY + 50, "down")}
            {renderCurrentArrow(midX, bottom + 1, "left")}
            {renderCurrentArrow(left - 1, rMidY - 50, "up")}
            {/* I label */}
            <text x={midX + 12} y={top - 8} fill="#22c55e" fontSize="11" fontWeight="bold">
              I = {computed.currentMa.toFixed(1)} mA
            </text>
          </g>
        )}

        {/* Animated current dots */}
        {showCurrent && computed.currentMa > 0 && dots.map((dot, i) => (
          <circle
            key={`dot-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={3.5}
            fill="#22c55e"
            opacity={0.8}
          >
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur={`${animDuration}s`}
              begin={`${(i / dots.length) * animDuration}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
    );
  }

  // ===== SERIES MODE =====
  function renderSeriesCircuit() {
    // Two resistors in series on right side
    const r1CenterY = midY - 45;
    const r2CenterY = midY + 45;
    const rHalf = 30; // half-height of each resistor zigzag

    const loopSegments = [
      { x: left, y: top },
      { x: right, y: top },
      { x: right, y: bottom },
      { x: left, y: bottom },
      { x: left, y: top },
    ];

    const dots = dotsAlongSegments(loopSegments, 8);

    return (
      <g>
        {/* Top wire */}
        <line x1={left} y1={top} x2={right} y2={top} stroke="#334155" strokeWidth="2.5" />
        {/* Bottom wire */}
        <line x1={left} y1={bottom} x2={right} y2={bottom} stroke="#334155" strokeWidth="2.5" />
        {/* Right wire top segment */}
        <line x1={right} y1={top} x2={right} y2={r1CenterY - rHalf} stroke="#334155" strokeWidth="2.5" />
        {/* Wire between R1 and R2 */}
        <line x1={right} y1={r1CenterY + rHalf} x2={right} y2={r2CenterY - rHalf} stroke="#334155" strokeWidth="2.5" />
        {/* Right wire bottom segment */}
        <line x1={right} y1={r2CenterY + rHalf} x2={right} y2={bottom} stroke="#334155" strokeWidth="2.5" />

        {/* Battery on left */}
        {renderBattery(left, top, bottom)}

        {/* Resistor R1 */}
        <path
          d={resistorZigzag(right, r1CenterY - rHalf, right, r1CenterY + rHalf, 4, 12)}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x={right + 16} y={r1CenterY - 12} width={62} height={24} rx={5} fill="#8b5cf6" />
        <text x={right + 47} y={r1CenterY + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
          R1 = {r1}
        </text>

        {/* Resistor R2 */}
        <path
          d={resistorZigzag(right, r2CenterY - rHalf, right, r2CenterY + rHalf, 4, 12)}
          fill="none"
          stroke="#a855f7"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x={right + 16} y={r2CenterY - 12} width={62} height={24} rx={5} fill="#a855f7" />
        <text x={right + 47} y={r2CenterY + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
          R2 = {r2}
        </text>

        {/* Voltage drop labels U1, U2 */}
        <text x={right - 20} y={r1CenterY + 4} textAnchor="end" fill="#ef4444" fontSize="10" fontWeight="bold">
          U1 = {computed.u1.toFixed(1)} V
        </text>
        <text x={right - 20} y={r2CenterY + 4} textAnchor="end" fill="#ef4444" fontSize="10" fontWeight="bold">
          U2 = {computed.u2.toFixed(1)} V
        </text>

        {/* Voltage label on battery */}
        <rect x={left - 52} y={midY - 22} width={38} height={20} rx={4} fill="#ef4444" opacity={0.15} />
        <text x={left - 33} y={midY - 8} textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">
          {voltage} V
        </text>

        {/* Current arrows */}
        {showCurrent && (
          <g>
            {renderCurrentArrow(midX, top - 1, "right")}
            {renderCurrentArrow(right + 1, r2CenterY + rHalf + 15, "down")}
            {renderCurrentArrow(midX, bottom + 1, "left")}
            {renderCurrentArrow(left - 1, midY - 60, "up")}
            <text x={midX + 12} y={top - 8} fill="#22c55e" fontSize="11" fontWeight="bold">
              I = {computed.currentMa.toFixed(1)} mA
            </text>
          </g>
        )}

        {/* Animated current dots */}
        {showCurrent && computed.currentMa > 0 && dots.map((dot, i) => (
          <circle
            key={`dot-s-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={3.5}
            fill="#22c55e"
            opacity={0.8}
          >
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur={`${animDuration}s`}
              begin={`${(i / dots.length) * animDuration}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
    );
  }

  // ===== PARALLEL MODE =====
  function renderParallelCircuit() {
    // Two resistors in parallel: two paths branching from top-right and merging at bottom-right
    const branchTop = top + 30;
    const branchBot = bottom - 30;
    const r1X = right - 40; // left branch
    const r2X = right + 40; // right branch
    const rHalf = 35;

    // Compute branch currents
    const i1mA = computed.i1 * 1000;
    const i2mA = computed.i2 * 1000;

    // Dot paths for each branch
    const branch1Segments = [
      { x: left, y: top },
      { x: right, y: top },
      { x: r1X, y: branchTop },
      { x: r1X, y: branchBot },
      { x: right, y: bottom },
      { x: left, y: bottom },
      { x: left, y: top },
    ];
    const branch2Segments = [
      { x: left, y: top },
      { x: right, y: top },
      { x: r2X, y: branchTop },
      { x: r2X, y: branchBot },
      { x: right, y: bottom },
      { x: left, y: bottom },
      { x: left, y: top },
    ];

    const dots1 = dotsAlongSegments(branch1Segments, 6);
    const dots2 = dotsAlongSegments(branch2Segments, 6);

    return (
      <g>
        {/* Top wire (left to branch point) */}
        <line x1={left} y1={top} x2={right} y2={top} stroke="#334155" strokeWidth="2.5" />
        {/* Bottom wire (branch point to left) */}
        <line x1={left} y1={bottom} x2={right} y2={bottom} stroke="#334155" strokeWidth="2.5" />

        {/* Branch splits at (right, top) */}
        {/* Branch 1 (left path) - top */}
        <line x1={right} y1={top} x2={r1X} y2={branchTop} stroke="#334155" strokeWidth="2" />
        <line x1={r1X} y1={branchTop} x2={r1X} y2={midY - rHalf} stroke="#334155" strokeWidth="2" />
        <line x1={r1X} y1={midY + rHalf} x2={r1X} y2={branchBot} stroke="#334155" strokeWidth="2" />
        <line x1={r1X} y1={branchBot} x2={right} y2={bottom} stroke="#334155" strokeWidth="2" />

        {/* Branch 2 (right path) - top */}
        <line x1={right} y1={top} x2={r2X} y2={branchTop} stroke="#334155" strokeWidth="2" />
        <line x1={r2X} y1={branchTop} x2={r2X} y2={midY - rHalf} stroke="#334155" strokeWidth="2" />
        <line x1={r2X} y1={midY + rHalf} x2={r2X} y2={branchBot} stroke="#334155" strokeWidth="2" />
        <line x1={r2X} y1={branchBot} x2={right} y2={bottom} stroke="#334155" strokeWidth="2" />

        {/* Battery on left */}
        {renderBattery(left, top, bottom)}

        {/* Resistor R1 (left branch) */}
        <path
          d={resistorZigzag(r1X, midY - rHalf, r1X, midY + rHalf, 5, 10)}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x={r1X - 50} y={midY - 12} width={42} height={24} rx={5} fill="#8b5cf6" />
        <text x={r1X - 29} y={midY + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
          R1={r1}
        </text>

        {/* Resistor R2 (right branch) */}
        <path
          d={resistorZigzag(r2X, midY - rHalf, r2X, midY + rHalf, 5, 10)}
          fill="none"
          stroke="#a855f7"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x={r2X + 8} y={midY - 12} width={42} height={24} rx={5} fill="#a855f7" />
        <text x={r2X + 29} y={midY + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
          R2={r2}
        </text>

        {/* Branch current labels */}
        {showCurrent && (
          <g>
            <text x={r1X - 6} y={branchTop + 18} textAnchor="end" fill="#22c55e" fontSize="9" fontWeight="bold">
              I1 = {i1mA.toFixed(1)} mA
            </text>
            <text x={r2X + 6} y={branchTop + 18} textAnchor="start" fill="#22c55e" fontSize="9" fontWeight="bold">
              I2 = {i2mA.toFixed(1)} mA
            </text>
          </g>
        )}

        {/* Voltage label on battery */}
        <rect x={left - 52} y={midY - 22} width={38} height={20} rx={4} fill="#ef4444" opacity={0.15} />
        <text x={left - 33} y={midY - 8} textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">
          {voltage} V
        </text>

        {/* Main current arrows */}
        {showCurrent && (
          <g>
            {renderCurrentArrow(midX - 30, top - 1, "right")}
            {renderCurrentArrow(midX - 30, bottom + 1, "left")}
            {renderCurrentArrow(left - 1, midY - 50, "up")}
            {/* Branch arrows */}
            {renderCurrentArrow(r1X, midY + rHalf + 12, "down")}
            {renderCurrentArrow(r2X, midY + rHalf + 12, "down")}
            <text x={midX - 18} y={top - 8} fill="#22c55e" fontSize="11" fontWeight="bold">
              I = {computed.currentMa.toFixed(1)} mA
            </text>
          </g>
        )}

        {/* Current dots on branch 1 */}
        {showCurrent && computed.currentMa > 0 && dots1.map((dot, i) => (
          <circle
            key={`dot-p1-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={3}
            fill="#22c55e"
            opacity={0.75}
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur={`${animDuration}s`}
              begin={`${(i / dots1.length) * animDuration}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Current dots on branch 2 */}
        {showCurrent && computed.currentMa > 0 && dots2.map((dot, i) => (
          <circle
            key={`dot-p2-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={3}
            fill="#22c55e"
            opacity={0.75}
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur={`${animDuration}s`}
              begin={`${((i + 0.5) / dots2.length) * animDuration}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
    );
  }

  // Mode label
  const modeLabels: Record<string, string> = {
    ohm: "Ohmův zákon",
    series: "Sériové zapojení",
    parallel: "Paralelní zapojení",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Mode title */}
      <div className="text-sm font-bold text-muted-foreground">{modeLabels[mode]}</div>

      {/* Values display */}
      <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
        <span className="bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`U = ${voltage} \\text{ V}`} />
        </span>
        {showCurrent && (
          <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`I = ${computed.currentMa.toFixed(1)} \\text{ mA}`} />
          </span>
        )}
        <span className="bg-purple-100 dark:bg-purple-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`R = ${computed.rTotal.toFixed(1)} \\text{ \\Omega}`} />
        </span>
        {showPower && (
          <span className="bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`P = ${computed.powerMw.toFixed(1)} \\text{ mW}`} />
          </span>
        )}
      </div>

      {/* SVG Circuit */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-lg" aria-label={modeLabels[mode]}>
          <defs>
            <linearGradient id="circuitBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
          </defs>
          <rect x={0} y={0} width={svgW} height={svgH} fill="url(#circuitBg)" rx={8} />

          {mode === "ohm" && renderOhmCircuit()}
          {mode === "series" && renderSeriesCircuit()}
          {mode === "parallel" && renderParallelCircuit()}
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl
          label="U"
          value={voltage}
          min={1}
          max={24}
          step={1}
          unit="V"
          onChange={setVoltage}
          color="#f97316"
        />
        <SliderControl
          label="R1"
          value={r1}
          min={10}
          max={500}
          step={10}
          unit="\u03A9"
          onChange={setR1}
          color="#8b5cf6"
        />
        {mode !== "ohm" && (
          <SliderControl
            label="R2"
            value={r2}
            min={10}
            max={500}
            step={10}
            unit="\u03A9"
            onChange={setR2}
            color="#a855f7"
          />
        )}
      </div>

      {/* Formula display */}
      <div className="text-center text-xs text-muted-foreground">
        {mode === "ohm" && (
          <MathDisplay math="U = I \cdot R" />
        )}
        {mode === "series" && (
          <MathDisplay math="R = R_1 + R_2, \quad I = \frac{U}{R_1 + R_2}" />
        )}
        {mode === "parallel" && (
          <MathDisplay math="\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2}" />
        )}
      </div>
    </div>
  );
}
