"use client";

import { motion } from "motion/react";

interface MotionDiagramProps {
  positions: number[];   // x positions at each time step
  labels?: string[];     // labels for each dot (e.g. "t=0", "t=1")
  velocityArrows?: boolean;
  title?: string;
  unit?: string;
  animated?: boolean;
}

export function MotionDiagram({
  positions,
  labels,
  velocityArrows = false,
  title,
  unit = "m",
  animated = false,
}: MotionDiagramProps) {
  const w = 520;
  const h = velocityArrows ? 120 : 90;
  const pad = 30;
  const lineY = velocityArrows ? 55 : 45;

  const maxPos = Math.max(...positions, 1);
  const minPos = Math.min(...positions, 0);
  const range = maxPos - minPos || 1;

  function xPos(val: number) {
    return pad + ((val - minPos) / range) * (w - 2 * pad);
  }

  // Colors gradient from blue to red
  const colors = positions.map((_, i) => {
    const t = positions.length > 1 ? i / (positions.length - 1) : 0;
    const r = Math.round(59 + t * (239 - 59));
    const g = Math.round(130 + t * (68 - 130));
    const b = Math.round(246 + t * (68 - 246));
    return `rgb(${r},${g},${b})`;
  });

  return (
    <div className="flex flex-col items-center my-4">
      {title && (
        <p className="text-xs font-medium text-muted-foreground mb-1">{title}</p>
      )}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-lg" aria-label="Diagram pohybu">
        {/* Ground / track line */}
        <line
          x1={pad - 10}
          y1={lineY}
          x2={w - pad + 10}
          y2={lineY}
          stroke="#cbd5e1"
          strokeWidth="2"
          strokeDasharray="6 4"
        />

        {/* Arrow at end */}
        <polygon
          points={`${w - pad + 15},${lineY} ${w - pad + 5},${lineY - 4} ${w - pad + 5},${lineY + 4}`}
          fill="#cbd5e1"
        />

        {/* Scale markers */}
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
          const val = minPos + frac * range;
          const x = xPos(val);
          return (
            <g key={frac}>
              <line x1={x} y1={lineY + 5} x2={x} y2={lineY + 10} stroke="#94a3b8" strokeWidth="1" />
              <text x={x} y={lineY + 22} textAnchor="middle" fill="#94a3b8" fontSize="9">
                {Math.round(val)} {unit}
              </text>
            </g>
          );
        })}

        {/* Velocity arrows between dots */}
        {velocityArrows &&
          positions.slice(0, -1).map((pos, i) => {
            const nextPos = positions[i + 1];
            const x1 = xPos(pos);
            const x2 = xPos(nextPos);
            const arrowY = lineY + 35;
            const len = x2 - x1;
            if (Math.abs(len) < 3) return null;
            return (
              <g key={`arrow-${i}`}>
                <line
                  x1={x1 + 5}
                  y1={arrowY}
                  x2={x2 - 5}
                  y2={arrowY}
                  stroke={colors[i]}
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <text
                  x={(x1 + x2) / 2}
                  y={arrowY + 15}
                  textAnchor="middle"
                  fill={colors[i]}
                  fontSize="9"
                  fontWeight="bold"
                >
                  {Math.abs(nextPos - pos)} {unit}
                </text>
              </g>
            );
          })}

        {/* Arrow marker definition */}
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#64748b" />
          </marker>
        </defs>

        {/* Position dots */}
        {positions.map((pos, i) => {
          const x = xPos(pos);
          const DotG = animated ? motion.g : "g";
          const dotProps = animated
            ? {
                initial: { opacity: 0, scale: 0 } as any,
                animate: { opacity: 1, scale: 1 } as any,
                transition: { delay: 0.15 * i, type: "spring", stiffness: 300, damping: 15 },
              }
            : {};
          return (
            <DotG key={i} {...(dotProps as any)}>
              <circle cx={x} cy={lineY} r={8} fill={colors[i]} stroke="white" strokeWidth="2.5" />
              <text x={x} y={lineY + 3} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
                {i}
              </text>
              {labels?.[i] && (
                <text
                  x={x}
                  y={lineY - 16}
                  textAnchor="middle"
                  fill={colors[i]}
                  fontSize="10"
                  fontWeight="600"
                >
                  {labels[i]}
                </text>
              )}
            </DotG>
          );
        })}
      </svg>
    </div>
  );
}
