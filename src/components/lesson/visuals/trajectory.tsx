"use client";

import { motion } from "motion/react";

interface TrajectoryProps {
  type: "horizontal-throw" | "vertical-throw" | "free-fall";
  v0?: number;
  height?: number;
  g?: number;
  showComponents?: boolean;
  animated?: boolean;
}

export function Trajectory({
  type,
  v0 = 10,
  height = 45,
  g = 10,
  showComponents = true,
  animated = false,
}: TrajectoryProps) {
  const w = 400;
  const h = 280;
  const pad = 40;

  if (type === "horizontal-throw") {
    const tFall = Math.sqrt((2 * height) / g);
    const xMax = v0 * tFall;
    const scaleX = (w - 2 * pad) / (xMax * 1.15);
    const scaleY = (h - 2 * pad) / (height * 1.1);

    // Generate parabolic path
    const steps = 20;
    const pathPoints: string[] = [];
    const dots: { x: number; y: number; t: number }[] = [];

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * tFall;
      const px = pad + v0 * t * scaleX;
      const py = pad + 0.5 * g * t * t * scaleY;
      pathPoints.push(`${i === 0 ? "M" : "L"} ${px} ${py}`);

      if (i % 4 === 0) {
        dots.push({ x: px, y: py, t });
      }
    }

    const landX = pad + xMax * scaleX;
    const landY = pad + height * scaleY;

    return (
      <div className="flex justify-center my-4">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-sm" aria-label="Vodorovný vrh">
          {/* Building/cliff */}
          <rect x={pad - 25} y={pad - 5} width={30} height={height * scaleY + 10} fill="#94a3b8" rx={3} />
          <rect x={pad - 20} y={pad} width={8} height={10} fill="#bfdbfe" rx={1} />
          <rect x={pad - 10} y={pad} width={8} height={10} fill="#bfdbfe" rx={1} />

          {/* Ground */}
          <line x1={pad - 30} y1={landY} x2={w - 10} y2={landY} stroke="#65a30d" strokeWidth="3" />
          {/* Grass tufts */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <text key={i} x={pad + i * 60} y={landY + 15} fill="#65a30d" fontSize="12">
              ⌇
            </text>
          ))}

          {/* Height arrow */}
          <line x1={pad - 30} y1={pad} x2={pad - 30} y2={landY} stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={pad - 35} y={pad + height * scaleY * 0.5 + 4} textAnchor="end" fill="#6366f1" fontSize="11" fontWeight="bold">
            {height} m
          </text>

          {/* Trajectory path */}
          {animated ? (
            <motion.path
              d={pathPoints.join(" ")}
              fill="none"
              stroke="#f97316"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            />
          ) : (
            <path d={pathPoints.join(" ")} fill="none" stroke="#f97316" strokeWidth="2.5" strokeDasharray="6 3" />
          )}

          {/* Dots at intervals */}
          {dots.map((d, i) => (
            <g key={i}>
              <circle cx={d.x} cy={d.y} r={5} fill="#f97316" stroke="white" strokeWidth="2" />
              <text x={d.x + 8} y={d.y - 6} fill="#f97316" fontSize="9" fontWeight="600">
                t={d.t.toFixed(1)}s
              </text>
            </g>
          ))}

          {/* Velocity components at last dot */}
          {showComponents && dots.length > 1 && (
            <g>
              {/* Horizontal v */}
              <line
                x1={landX - 40}
                y1={landY - 25}
                x2={landX}
                y2={landY - 25}
                stroke="#3b82f6"
                strokeWidth="2"
                markerEnd="url(#arrowBlue)"
              />
              <text x={landX - 20} y={landY - 32} textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">
                v₀ = {v0} m/s
              </text>

              {/* Vertical v */}
              <line
                x1={landX + 10}
                y1={landY - 45}
                x2={landX + 10}
                y2={landY - 5}
                stroke="#ef4444"
                strokeWidth="2"
                markerEnd="url(#arrowRed)"
              />
              <text x={landX + 25} y={landY - 20} fill="#ef4444" fontSize="10" fontWeight="bold">
                v_y = gt
              </text>
            </g>
          )}

          {/* Dolet label */}
          <line x1={pad} y1={landY + 8} x2={landX} y2={landY + 8} stroke="#16a34a" strokeWidth="1.5" />
          <text x={(pad + landX) / 2} y={landY + 25} textAnchor="middle" fill="#16a34a" fontSize="11" fontWeight="bold">
            dolet: {xMax.toFixed(1)} m
          </text>

          <defs>
            <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
            </marker>
            <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
            </marker>
          </defs>
        </svg>
      </div>
    );
  }

  if (type === "free-fall") {
    const tTotal = Math.sqrt((2 * height) / g);
    const scaleY = (h - 2 * pad - 20) / height;

    const dots: { y: number; t: number; v: number }[] = [];
    const numDots = Math.min(Math.ceil(tTotal) + 1, 6);
    for (let i = 0; i < numDots; i++) {
      const t = i;
      if (t > tTotal + 0.1) break;
      const dist = 0.5 * g * t * t;
      dots.push({ y: pad + dist * scaleY, t, v: g * t });
    }

    return (
      <div className="flex justify-center my-4">
        <svg viewBox={`0 0 200 ${h}`} className="w-full max-w-[200px]" aria-label="Volný pád">
          {/* Object at top */}
          <circle cx={100} cy={pad - 5} r={8} fill="#f97316" stroke="white" strokeWidth="2" />

          {/* Dotted fall line */}
          <line x1={100} y1={pad + 5} x2={100} y2={h - pad} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Ground */}
          <line x1={40} y1={h - pad} x2={160} y2={h - pad} stroke="#65a30d" strokeWidth="3" />

          {/* Falling dots */}
          {dots.map((d, i) => (
            <g key={i}>
              <circle cx={100} cy={d.y} r={6} fill="#f97316" opacity={0.3 + 0.7 * (i / dots.length)} stroke="white" strokeWidth="1.5" />
              <text x={130} y={d.y + 4} fill="#64748b" fontSize="10">
                t={d.t}s → v={d.v}m/s
              </text>
            </g>
          ))}

          {/* Height label */}
          <line x1={55} y1={pad} x2={55} y2={h - pad} stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x={50} y={(pad + h - pad) / 2 + 4} textAnchor="end" fill="#6366f1" fontSize="11" fontWeight="bold">
            {height} m
          </text>

          {/* g arrow */}
          <text x={100} y={h - pad + 18} textAnchor="middle" fill="#475569" fontSize="10">
            g = {g} m/s²
          </text>
        </svg>
      </div>
    );
  }

  if (type === "vertical-throw") {
    const tUp = v0 / g;
    const hMax = (v0 * v0) / (2 * g);
    const tTotal = 2 * tUp;
    const scaleY = (h - 2 * pad - 20) / (hMax * 1.15);

    const pathPoints: string[] = [];
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * tTotal;
      const y = v0 * t - 0.5 * g * t * t;
      const px = pad + (t / tTotal) * (w - 2 * pad);
      const py = h - pad - y * scaleY;
      pathPoints.push(`${i === 0 ? "M" : "L"} ${px} ${py}`);
    }

    return (
      <div className="flex justify-center my-4">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-sm" aria-label="Svislý vrh vzhůru">
          {/* Axes */}
          <line x1={pad} y1={pad - 10} x2={pad} y2={h - pad + 5} stroke="#374151" strokeWidth="2" />
          <line x1={pad - 5} y1={h - pad} x2={w - pad + 10} y2={h - pad} stroke="#374151" strokeWidth="2" />

          <text x={w / 2} y={h - 8} textAnchor="middle" fill="#64748b" fontSize="11">t (s)</text>
          <text x={15} y={pad + 10} fill="#64748b" fontSize="11">h (m)</text>

          {/* hMax dashed line */}
          <line
            x1={pad}
            y1={h - pad - hMax * scaleY}
            x2={w - pad}
            y2={h - pad - hMax * scaleY}
            stroke="#16a34a"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text
            x={pad - 8}
            y={h - pad - hMax * scaleY + 4}
            textAnchor="end"
            fill="#16a34a"
            fontSize="10"
            fontWeight="bold"
          >
            {hMax.toFixed(0)} m
          </text>

          {/* Parabola */}
          {animated ? (
            <motion.path
              d={pathPoints.join(" ")}
              fill="none"
              stroke="#f97316"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
          ) : (
            <path d={pathPoints.join(" ")} fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
          )}

          {/* Key points */}
          <circle cx={pad} cy={h - pad} r={5} fill="#3b82f6" stroke="white" strokeWidth="2" />
          <text x={pad + 10} y={h - pad - 8} fill="#3b82f6" fontSize="9" fontWeight="bold">
            v₀={v0} m/s
          </text>

          {/* Top */}
          <circle cx={pad + (tUp / tTotal) * (w - 2 * pad)} cy={h - pad - hMax * scaleY} r={5} fill="#16a34a" stroke="white" strokeWidth="2" />
          <text
            x={pad + (tUp / tTotal) * (w - 2 * pad)}
            y={h - pad - hMax * scaleY - 12}
            textAnchor="middle"
            fill="#16a34a"
            fontSize="10"
            fontWeight="bold"
          >
            v = 0
          </text>

          {/* Landing */}
          <circle cx={pad + (w - 2 * pad)} cy={h - pad} r={5} fill="#ef4444" stroke="white" strokeWidth="2" />

          {/* Time labels */}
          <text x={pad + (tUp / tTotal) * (w - 2 * pad)} y={h - pad + 16} textAnchor="middle" fill="#64748b" fontSize="9">
            t={tUp.toFixed(1)}s
          </text>
          <text x={pad + (w - 2 * pad)} y={h - pad + 16} textAnchor="middle" fill="#64748b" fontSize="9">
            T={tTotal.toFixed(1)}s
          </text>
        </svg>
      </div>
    );
  }

  return null;
}
