"use client";

import { motion } from "motion/react";

interface BalanceScaleProps {
  leftItems: string[];
  rightItems: string[];
  balanced?: boolean;
  highlight?: "left" | "right" | "both" | "none";
  animated?: boolean;
}

export function BalanceScale({
  leftItems,
  rightItems,
  balanced = true,
  highlight = "none",
  animated = false,
}: BalanceScaleProps) {
  const tilt = balanced ? 0 : -3;

  const BeamG = animated ? motion.g : "g";
  const beamProps = animated
    ? {
        initial: { rotate: -8 },
        animate: { rotate: tilt },
        transition: { type: "spring", stiffness: 80, damping: 12, delay: 0.2 },
        style: { transformOrigin: "200px 100px" },
      }
    : {};

  return (
    <div className="flex justify-center my-4">
      <svg viewBox="0 0 400 220" className="w-full max-w-md" aria-label="Váha">
        {/* Base */}
        <polygon points="170,210 230,210 210,190 190,190" fill="#94a3b8" />
        <rect x="195" y="100" width="10" height="90" fill="#94a3b8" rx="2" />

        {/* Beam */}
        <BeamG {...(beamProps as any)} transform={animated ? undefined : `rotate(${tilt}, 200, 100)`}>
          <rect x="40" y="96" width="320" height="8" fill="#475569" rx="4" />

          {/* Fulcrum triangle */}
          <polygon points="192,96 208,96 200,82" fill="#f59e0b" />

          {/* Left pan */}
          <line x1="80" y1="104" x2="80" y2="140" stroke="#64748b" strokeWidth="2" />
          <ellipse cx="80" cy="142" rx="55" ry="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Left items */}
          {leftItems.map((item, i) => {
            const x = 55 + i * (110 / Math.max(leftItems.length, 1));
            const isX = item.toLowerCase().includes("x");
            const ItemG = animated ? motion.g : "g";
            const itemProps = animated
              ? {
                  initial: { opacity: 0, y: -20 } as any,
                  animate: { opacity: 1, y: 0 } as any,
                  transition: { delay: 0.4 + i * 0.1, type: "spring", stiffness: 200 },
                }
              : {};
            return (
              <ItemG key={`l-${i}`} {...(itemProps as any)}>
                <rect
                  x={x - 14}
                  y={115}
                  width={28}
                  height={24}
                  rx={4}
                  fill={isX ? (highlight === "left" || highlight === "both" ? "#3b82f6" : "#6366f1") : "#f1f5f9"}
                  stroke={isX ? "#4f46e5" : "#cbd5e1"}
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={131}
                  textAnchor="middle"
                  className="text-xs font-bold"
                  fill={isX ? "white" : "#334155"}
                  fontSize="12"
                >
                  {item}
                </text>
              </ItemG>
            );
          })}

          {/* Right pan */}
          <line x1="320" y1="104" x2="320" y2="140" stroke="#64748b" strokeWidth="2" />
          <ellipse cx="320" cy="142" rx="55" ry="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Right items */}
          {rightItems.map((item, i) => {
            const x = 295 + i * (110 / Math.max(rightItems.length, 1));
            const isX = item.toLowerCase().includes("x");
            const ItemG = animated ? motion.g : "g";
            const itemProps = animated
              ? {
                  initial: { opacity: 0, y: -20 } as any,
                  animate: { opacity: 1, y: 0 } as any,
                  transition: { delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 },
                }
              : {};
            return (
              <ItemG key={`r-${i}`} {...(itemProps as any)}>
                <rect
                  x={x - 14}
                  y={115}
                  width={28}
                  height={24}
                  rx={4}
                  fill={isX ? "#6366f1" : (highlight === "right" || highlight === "both" ? "#22c55e" : "#f1f5f9")}
                  stroke={isX ? "#4f46e5" : "#cbd5e1"}
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={131}
                  textAnchor="middle"
                  className="text-xs font-bold"
                  fill={isX ? "white" : "#334155"}
                  fontSize="12"
                >
                  {item}
                </text>
              </ItemG>
            );
          })}
        </BeamG>

        {/* Equal sign */}
        {balanced && (
          <g>
            <text x="200" y="78" textAnchor="middle" fill="#16a34a" fontSize="18" fontWeight="bold">=</text>
          </g>
        )}
      </svg>
    </div>
  );
}
