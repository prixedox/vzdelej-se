"use client";

import { motion } from "motion/react";

interface NumberLineProps {
  min: number;
  max: number;
  points?: { value: number; label: string; color?: string }[];
  highlight?: { from: number; to: number; color?: string };
  showArrow?: boolean;
  animated?: boolean;
}

export function NumberLine({
  min,
  max,
  points = [],
  highlight,
  showArrow = true,
  animated = false,
}: NumberLineProps) {
  const pad = 40;
  const w = 500;
  const h = 80;
  const lineY = 45;
  const range = max - min;

  function xPos(val: number) {
    return pad + ((val - min) / range) * (w - 2 * pad);
  }

  const ticks: number[] = [];
  const step = range <= 10 ? 1 : range <= 20 ? 2 : 5;
  for (let v = min; v <= max; v += step) ticks.push(v);

  return (
    <div className="flex justify-center my-4">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-lg" aria-label="Číselná osa">
        {/* Highlight region */}
        {highlight && (
          <rect
            x={xPos(highlight.from)}
            y={lineY - 18}
            width={xPos(highlight.to) - xPos(highlight.from)}
            height={36}
            fill={highlight.color || "#dbeafe"}
            rx={6}
            opacity={0.5}
          />
        )}

        {/* Main line */}
        <line
          x1={pad - 10}
          y1={lineY}
          x2={w - pad + 10}
          y2={lineY}
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Arrows */}
        {showArrow && (
          <>
            <polygon
              points={`${pad - 15},${lineY} ${pad - 5},${lineY - 5} ${pad - 5},${lineY + 5}`}
              fill="#475569"
            />
            <polygon
              points={`${w - pad + 15},${lineY} ${w - pad + 5},${lineY - 5} ${w - pad + 5},${lineY + 5}`}
              fill="#475569"
            />
          </>
        )}

        {/* Ticks and labels */}
        {ticks.map((v) => (
          <g key={v}>
            <line
              x1={xPos(v)}
              y1={lineY - 6}
              x2={xPos(v)}
              y2={lineY + 6}
              stroke="#475569"
              strokeWidth="1.5"
            />
            <text
              x={xPos(v)}
              y={lineY + 22}
              textAnchor="middle"
              fill="#64748b"
              fontSize="11"
            >
              {v}
            </text>
          </g>
        ))}

        {/* Points */}
        {points.map((p, i) => {
          const PointG = animated ? motion.g : "g";
          const pointProps = animated
            ? {
                initial: { opacity: 0, y: -25 } as any,
                animate: { opacity: 1, y: 0 } as any,
                transition: { delay: 0.3 + i * 0.15, type: "spring", stiffness: 260, damping: 12 },
              }
            : {};
          return (
            <PointG key={i} {...(pointProps as any)}>
              <circle
                cx={xPos(p.value)}
                cy={lineY}
                r={7}
                fill={p.color || "#3b82f6"}
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={xPos(p.value)}
                y={lineY - 14}
                textAnchor="middle"
                fill={p.color || "#3b82f6"}
                fontSize="12"
                fontWeight="bold"
              >
                {p.label}
              </text>
            </PointG>
          );
        })}
      </svg>
    </div>
  );
}
