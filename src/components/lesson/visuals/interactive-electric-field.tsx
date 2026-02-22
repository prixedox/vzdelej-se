"use client";

import { useState, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveElectricFieldProps {
  defaultQ1?: number; // charge 1 in nC (default 5)
  defaultQ2?: number; // charge 2 in nC (default -3)
  defaultDistance?: number; // distance in cm (default 10)
  showFieldLines?: boolean; // default true
  showForce?: boolean; // default true
  mode?: "coulomb" | "field" | "both"; // default "both"
}

export function InteractiveElectricField({
  defaultQ1 = 5,
  defaultQ2 = -3,
  defaultDistance = 10,
  showFieldLines = true,
  showForce = true,
  mode = "both",
}: InteractiveElectricFieldProps) {
  const [q1, setQ1] = useState(defaultQ1);
  const [q2, setQ2] = useState(defaultQ2);
  const [distance, setDistance] = useState(defaultDistance);

  // SVG dimensions
  const svgW = 440;
  const svgH = 320;
  const cx = svgW / 2;
  const cy = svgH / 2;

  // Coulomb constant
  const k = 8.99e9; // N m^2 / C^2

  // Convert units: nC -> C, cm -> m
  const q1_C = q1 * 1e-9;
  const q2_C = q2 * 1e-9;
  const r_m = distance * 1e-2;

  // Force in N, then convert to mN for display
  const forceN = (q1 !== 0 && q2 !== 0 && distance > 0)
    ? k * Math.abs(q1_C) * Math.abs(q2_C) / (r_m * r_m)
    : 0;
  const forceMN = forceN * 1e3; // millinewtons

  // Attractive if opposite signs, repulsive if same signs
  const isAttractive = q1 * q2 < 0;
  const isRepulsive = q1 * q2 > 0;

  // Electric field intensity at midpoint (from both charges)
  const midR = r_m / 2;
  const e1 = (q1 !== 0 && distance > 0)
    ? k * Math.abs(q1_C) / (midR * midR)
    : 0;
  const e2 = (q2 !== 0 && distance > 0)
    ? k * Math.abs(q2_C) / (midR * midR)
    : 0;

  // At the midpoint, the field from each charge points away from + or toward -
  // If opposite signs: fields add; if same signs: fields subtract
  const eMidpoint = (q1 * q2 < 0) ? e1 + e2
    : Math.abs(e1 - e2);

  // Positions of charges in SVG coordinates
  const pxPerCm = Math.min(14, 280 / Math.max(distance, 3));
  const halfDistPx = (distance * pxPerCm) / 2;

  const charge1X = cx - halfDistPx;
  const charge2X = cx + halfDistPx;
  const chargeY = cy;
  const chargeRadius = 18;

  // Force arrow scaling: clamp so arrow is visible but not too large
  const forceArrowLen = Math.min(60, Math.max(8, forceMN * 3));

  // Field lines generation
  const fieldLines = useMemo(() => {
    if (!showFieldLines) return [];

    const lines: { x1: number; y1: number; x2: number; y2: number; fromCharge: 1 | 2 }[] = [];
    const numLines = 10;
    const lineLen = 55;

    // Generate lines for charge 1
    if (q1 !== 0) {
      for (let i = 0; i < numLines; i++) {
        const baseAngle = (2 * Math.PI * i) / numLines;

        // Influence from other charge: bend lines toward/away from charge 2
        let bendFactor = 0;
        if (q2 !== 0) {
          // Attractive: field lines from q1 bend toward q2
          // Repulsive: field lines from q1 bend away from q2
          const angleToQ2 = 0; // q2 is to the right
          let angleDiff = baseAngle - angleToQ2;
          // Normalize to [-pi, pi]
          while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
          while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

          const influence = 0.3 * Math.abs(q2) / (Math.abs(q1) + Math.abs(q2));
          if (isAttractive) {
            // Bend toward q2
            bendFactor = -angleDiff * influence;
          } else if (isRepulsive) {
            // Bend away from q2
            bendFactor = angleDiff * influence * 0.5;
          }
        }

        const finalAngle = baseAngle + bendFactor;
        const sign = q1 > 0 ? 1 : -1; // positive: outward; negative: inward
        const startR = chargeRadius + 2;
        const endR = startR + lineLen;

        lines.push({
          x1: charge1X + sign * startR * Math.cos(finalAngle),
          y1: chargeY - sign * startR * Math.sin(finalAngle),
          x2: charge1X + sign * endR * Math.cos(finalAngle),
          y2: chargeY - sign * endR * Math.sin(finalAngle),
          fromCharge: 1,
        });
      }
    }

    // Generate lines for charge 2
    if (q2 !== 0) {
      for (let i = 0; i < numLines; i++) {
        const baseAngle = (2 * Math.PI * i) / numLines;

        let bendFactor = 0;
        if (q1 !== 0) {
          const angleToQ1 = Math.PI; // q1 is to the left
          let angleDiff = baseAngle - angleToQ1;
          while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
          while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

          const influence = 0.3 * Math.abs(q1) / (Math.abs(q1) + Math.abs(q2));
          if (isAttractive) {
            bendFactor = -angleDiff * influence;
          } else if (isRepulsive) {
            bendFactor = angleDiff * influence * 0.5;
          }
        }

        const finalAngle = baseAngle + bendFactor;
        const sign = q2 > 0 ? 1 : -1;
        const startR = chargeRadius + 2;
        const endR = startR + lineLen;

        lines.push({
          x1: charge2X + sign * startR * Math.cos(finalAngle),
          y1: chargeY - sign * startR * Math.sin(finalAngle),
          x2: charge2X + sign * endR * Math.cos(finalAngle),
          y2: chargeY - sign * endR * Math.sin(finalAngle),
          fromCharge: 2,
        });
      }
    }

    return lines;
  }, [q1, q2, charge1X, charge2X, chargeY, isAttractive, isRepulsive, showFieldLines, chargeRadius]);

  // Format large/small numbers nicely
  const formatE = (val: number): string => {
    if (val === 0) return "0";
    if (val >= 1e6) return (val / 1e6).toFixed(1) + " \\times 10^6";
    if (val >= 1e3) return (val / 1e3).toFixed(1) + " \\times 10^3";
    return val.toFixed(1);
  };

  const showCoulomb = mode === "coulomb" || mode === "both";
  const showField = mode === "field" || mode === "both";

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Values */}
      <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
        {showCoulomb && (
          <span className="bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`F = ${forceMN.toFixed(2)} \\text{ mN}`} />
          </span>
        )}
        {showField && (
          <span className="bg-purple-100 dark:bg-purple-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`E_{\\text{stred}} = ${formatE(eMidpoint)} \\text{ N/C}`} />
          </span>
        )}
        <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`r = ${distance} \\text{ cm}`} />
        </span>
      </div>

      {/* SVG */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-lg" aria-label="Elektrické pole">
          <defs>
            <linearGradient id="efBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
            <radialGradient id="posChargeGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="60%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </radialGradient>
            <radialGradient id="negChargeGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="60%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </radialGradient>
            <radialGradient id="neutralGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#d1d5db" />
              <stop offset="60%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#6b7280" />
            </radialGradient>
            <marker id="efArrowForce" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
            </marker>
            <marker id="efArrowField" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="6" markerHeight="5" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
          </defs>

          {/* Background */}
          <rect x={0} y={0} width={svgW} height={svgH} fill="url(#efBg)" rx={8} />

          {/* Subtle grid */}
          {Array.from({ length: 9 }, (_, i) => {
            const x = 40 + i * 45;
            return <line key={`gv${i}`} x1={x} y1={20} x2={x} y2={svgH - 20} stroke="#e2e8f0" strokeWidth="0.5" />;
          })}
          {Array.from({ length: 6 }, (_, i) => {
            const y = 30 + i * 50;
            return <line key={`gh${i}`} x1={20} y1={y} x2={svgW - 20} y2={y} stroke="#e2e8f0" strokeWidth="0.5" />;
          })}

          {/* Distance line */}
          <line
            x1={charge1X}
            y1={chargeY + 50}
            x2={charge2X}
            y2={chargeY + 50}
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <line x1={charge1X} y1={chargeY + 42} x2={charge1X} y2={chargeY + 58} stroke="#64748b" strokeWidth="1" />
          <line x1={charge2X} y1={chargeY + 42} x2={charge2X} y2={chargeY + 58} stroke="#64748b" strokeWidth="1" />
          <text
            x={cx}
            y={chargeY + 68}
            textAnchor="middle"
            fill="#475569"
            fontSize="11"
            fontWeight="bold"
          >
            r = {distance} cm
          </text>

          {/* Field lines */}
          {showFieldLines && fieldLines.map((line, i) => (
            <line
              key={`fl${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#94a3b8"
              strokeWidth="1"
              opacity="0.5"
              markerEnd="url(#efArrowField)"
            />
          ))}

          {/* Force arrows */}
          {showForce && q1 !== 0 && q2 !== 0 && (
            <>
              {/* Force on charge 1 */}
              <line
                x1={charge1X}
                y1={chargeY}
                x2={isAttractive ? charge1X + forceArrowLen : charge1X - forceArrowLen}
                y2={chargeY}
                stroke="#f97316"
                strokeWidth="3"
                markerEnd="url(#efArrowForce)"
              />
              <text
                x={isAttractive ? charge1X + forceArrowLen + 4 : charge1X - forceArrowLen - 4}
                y={chargeY - 8}
                textAnchor={isAttractive ? "start" : "end"}
                fill="#f97316"
                fontSize="10"
                fontWeight="bold"
              >
                F
              </text>

              {/* Force on charge 2 */}
              <line
                x1={charge2X}
                y1={chargeY}
                x2={isAttractive ? charge2X - forceArrowLen : charge2X + forceArrowLen}
                y2={chargeY}
                stroke="#f97316"
                strokeWidth="3"
                markerEnd="url(#efArrowForce)"
              />
              <text
                x={isAttractive ? charge2X - forceArrowLen - 4 : charge2X + forceArrowLen + 4}
                y={chargeY - 8}
                textAnchor={isAttractive ? "end" : "start"}
                fill="#f97316"
                fontSize="10"
                fontWeight="bold"
              >
                F
              </text>
            </>
          )}

          {/* Charge 1 glow */}
          <circle
            cx={charge1X}
            cy={chargeY}
            r={chargeRadius + 6}
            fill={q1 > 0 ? "#ef4444" : q1 < 0 ? "#3b82f6" : "#9ca3af"}
            opacity="0.12"
          />

          {/* Charge 1 */}
          <circle
            cx={charge1X}
            cy={chargeY}
            r={chargeRadius}
            fill={q1 > 0 ? "url(#posChargeGrad)" : q1 < 0 ? "url(#negChargeGrad)" : "url(#neutralGrad)"}
            stroke="white"
            strokeWidth="2.5"
          />
          {/* Charge 1 highlight */}
          <circle
            cx={charge1X - chargeRadius * 0.25}
            cy={chargeY - chargeRadius * 0.3}
            r={chargeRadius * 0.3}
            fill="white"
            opacity="0.2"
          />
          {/* Charge 1 label */}
          <text
            x={charge1X}
            y={chargeY + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize="18"
            fontWeight="bold"
          >
            {q1 > 0 ? "+" : q1 < 0 ? "\u2212" : "0"}
          </text>
          <text
            x={charge1X}
            y={chargeY - chargeRadius - 10}
            textAnchor="middle"
            fill={q1 > 0 ? "#dc2626" : q1 < 0 ? "#2563eb" : "#6b7280"}
            fontSize="11"
            fontWeight="bold"
          >
            Q{"\u2081"} = {q1} nC
          </text>

          {/* Charge 2 glow */}
          <circle
            cx={charge2X}
            cy={chargeY}
            r={chargeRadius + 6}
            fill={q2 > 0 ? "#ef4444" : q2 < 0 ? "#3b82f6" : "#9ca3af"}
            opacity="0.12"
          />

          {/* Charge 2 */}
          <circle
            cx={charge2X}
            cy={chargeY}
            r={chargeRadius}
            fill={q2 > 0 ? "url(#posChargeGrad)" : q2 < 0 ? "url(#negChargeGrad)" : "url(#neutralGrad)"}
            stroke="white"
            strokeWidth="2.5"
          />
          {/* Charge 2 highlight */}
          <circle
            cx={charge2X - chargeRadius * 0.25}
            cy={chargeY - chargeRadius * 0.3}
            r={chargeRadius * 0.3}
            fill="white"
            opacity="0.2"
          />
          {/* Charge 2 label */}
          <text
            x={charge2X}
            y={chargeY + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize="18"
            fontWeight="bold"
          >
            {q2 > 0 ? "+" : q2 < 0 ? "\u2212" : "0"}
          </text>
          <text
            x={charge2X}
            y={chargeY - chargeRadius - 10}
            textAnchor="middle"
            fill={q2 > 0 ? "#dc2626" : q2 < 0 ? "#2563eb" : "#6b7280"}
            fontSize="11"
            fontWeight="bold"
          >
            Q{"\u2082"} = {q2} nC
          </text>

          {/* Midpoint marker */}
          {showField && (
            <g>
              <circle cx={cx} cy={chargeY} r={3} fill="#a855f7" opacity="0.6" />
              <text
                x={cx}
                y={chargeY - 10}
                textAnchor="middle"
                fill="#7c3aed"
                fontSize="8"
                fontWeight="bold"
              >
                E
              </text>
            </g>
          )}

          {/* Interaction label */}
          {q1 !== 0 && q2 !== 0 && (
            <text
              x={cx}
              y={30}
              textAnchor="middle"
              fill="#475569"
              fontSize="11"
              fontWeight="bold"
            >
              {isAttractive ? "Přitažlivá síla" : isRepulsive ? "Odpudivá síla" : ""}
            </text>
          )}
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl label="Q₁" value={q1} min={-10} max={10} step={1} unit="nC" onChange={setQ1} color="#ef4444" />
        <SliderControl label="Q₂" value={q2} min={-10} max={10} step={1} unit="nC" onChange={setQ2} color="#3b82f6" />
        <SliderControl label="r" value={distance} min={3} max={20} step={1} unit="cm" onChange={setDistance} color="#22c55e" />
      </div>

      {/* Formulas */}
      <div className="text-center text-xs text-muted-foreground space-y-1">
        {showCoulomb && (
          <MathDisplay math={`F = k \\frac{|Q_1||Q_2|}{r^2} = ${forceMN.toFixed(2)} \\text{ mN}`} />
        )}
        {showField && (
          <MathDisplay math={`E = k \\frac{|Q|}{r^2} \\quad E_{\\text{střed}} = ${formatE(eMidpoint)} \\text{ N/C}`} />
        )}
      </div>
    </div>
  );
}
