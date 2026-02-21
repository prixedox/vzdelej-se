"use client";

import { motion } from "motion/react";

interface VelocityGraphProps {
  points: { t: number; v: number }[];
  showArea?: boolean;
  areaColor?: string;
  xLabel?: string;
  yLabel?: string;
  title?: string;
  animated?: boolean;
}

export function VelocityGraph({
  points,
  showArea = false,
  areaColor = "#3b82f680",
  xLabel = "t (s)",
  yLabel = "v (m/s)",
  title,
  animated = false,
}: VelocityGraphProps) {
  const w = 420;
  const h = 260;
  const padL = 50;
  const padR = 20;
  const padT = title ? 30 : 15;
  const padB = 40;

  const maxT = Math.max(...points.map((p) => p.t), 1);
  const maxV = Math.max(...points.map((p) => p.v), 1);

  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  function xPos(t: number) {
    return padL + (t / maxT) * plotW;
  }
  function yPos(v: number) {
    return padT + plotH - (v / maxV) * plotH;
  }

  const pathData = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xPos(p.t)} ${yPos(p.v)}`)
    .join(" ");

  const areaPath =
    pathData + ` L ${xPos(points[points.length - 1].t)} ${yPos(0)} L ${xPos(points[0].t)} ${yPos(0)} Z`;

  // Grid lines
  const gridLinesT: number[] = [];
  const stepT = maxT <= 5 ? 1 : maxT <= 10 ? 2 : 5;
  for (let t = stepT; t <= maxT; t += stepT) gridLinesT.push(t);

  const gridLinesV: number[] = [];
  const stepV = maxV <= 5 ? 1 : maxV <= 20 ? 5 : 10;
  for (let v = stepV; v <= maxV; v += stepV) gridLinesV.push(v);

  return (
    <div className="flex flex-col items-center my-4">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md" aria-label="Graf rychlosti">
        {title && (
          <text x={w / 2} y={16} textAnchor="middle" fill="#374151" fontSize="13" fontWeight="600">
            {title}
          </text>
        )}

        {/* Grid */}
        {gridLinesT.map((t) => (
          <g key={`gt-${t}`}>
            <line x1={xPos(t)} y1={padT} x2={xPos(t)} y2={padT + plotH} stroke="#e5e7eb" strokeWidth="1" />
            <text x={xPos(t)} y={padT + plotH + 18} textAnchor="middle" fill="#94a3b8" fontSize="10">
              {t}
            </text>
          </g>
        ))}
        {gridLinesV.map((v) => (
          <g key={`gv-${v}`}>
            <line x1={padL} y1={yPos(v)} x2={padL + plotW} y2={yPos(v)} stroke="#e5e7eb" strokeWidth="1" />
            <text x={padL - 8} y={yPos(v) + 4} textAnchor="end" fill="#94a3b8" fontSize="10">
              {v}
            </text>
          </g>
        ))}

        {/* Axes */}
        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#374151" strokeWidth="2" />
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#374151" strokeWidth="2" />

        {/* Axis labels */}
        <text x={padL + plotW / 2} y={h - 5} textAnchor="middle" fill="#64748b" fontSize="11">
          {xLabel}
        </text>
        <text
          x={14}
          y={padT + plotH / 2}
          textAnchor="middle"
          fill="#64748b"
          fontSize="11"
          transform={`rotate(-90, 14, ${padT + plotH / 2})`}
        >
          {yLabel}
        </text>

        {/* Area under curve */}
        {showArea && (
          animated ? (
            <motion.path
              d={areaPath}
              fill={areaColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
          ) : (
            <path d={areaPath} fill={areaColor} />
          )
        )}

        {/* Line */}
        {animated ? (
          <motion.path
            d={pathData}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          />
        ) : (
          <path d={pathData} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        )}

        {/* Points */}
        {points.map((p, i) =>
          animated ? (
            <motion.circle
              key={i}
              cx={xPos(p.t)}
              cy={yPos(p.v)}
              r={4}
              fill="#3b82f6"
              stroke="white"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 300 }}
            />
          ) : (
            <circle key={i} cx={xPos(p.t)} cy={yPos(p.v)} r={4} fill="#3b82f6" stroke="white" strokeWidth="2" />
          )
        )}

        {/* Zero label */}
        <text x={padL - 8} y={padT + plotH + 4} textAnchor="end" fill="#94a3b8" fontSize="10">
          0
        </text>
      </svg>
    </div>
  );
}
