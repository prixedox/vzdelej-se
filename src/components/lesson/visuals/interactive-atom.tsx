"use client";

import { useState, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveAtomProps {
  mode?: "bohr" | "energy-levels" | "photoelectric" | "decay";
  defaultZ?: number;
  defaultN?: number;
  defaultPhotonEnergy?: number;
  defaultHalfLife?: number;
}

// --- Constants ---
const SVG_W = 440;
const SVG_H = 320;

const ELEMENT_DATA: Record<number, { symbol: string; name: string; color: string }> = {
  1: { symbol: "H", name: "Vodík", color: "#ef4444" },
  2: { symbol: "He", name: "Helium", color: "#f97316" },
  3: { symbol: "Li", name: "Lithium", color: "#22c55e" },
};

// Deterministic pseudo-random based on seed
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Build a wavy line path (photon representation)
function wavyPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  waves: number = 6,
  amp: number = 4,
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;
  const steps = waves * 2;
  const parts: string[] = [`M ${x1.toFixed(1)} ${y1.toFixed(1)}`];
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const cx = x1 + dx * t;
    const cy = y1 + dy * t;
    const sign = i % 2 === 1 ? 1 : -1;
    const px = cx + nx * amp * sign;
    const py = cy + ny * amp * sign;
    parts.push(`L ${px.toFixed(1)} ${py.toFixed(1)}`);
  }
  parts.push(`L ${x2.toFixed(1)} ${y2.toFixed(1)}`);
  return parts.join(" ");
}

export function InteractiveAtom({
  mode = "bohr",
  defaultZ = 1,
  defaultN = 2,
  defaultPhotonEnergy = 5,
  defaultHalfLife = 10,
}: InteractiveAtomProps) {
  // --- Bohr mode state ---
  const [n, setN] = useState(defaultN);
  const [z, setZ] = useState(defaultZ);
  const [prevN, setPrevN] = useState(defaultN);

  // --- Energy levels mode state ---
  const [ni, setNi] = useState(4);
  const [nf, setNf] = useState(2);

  // --- Photoelectric mode state ---
  const [photonEnergy, setPhotonEnergy] = useState(defaultPhotonEnergy);
  const [workFunction, setWorkFunction] = useState(2.5);

  // --- Decay mode state ---
  const [halfLife, setHalfLife] = useState(defaultHalfLife);
  const [time, setTime] = useState(0);

  // Track n transitions for Bohr mode
  const handleNChange = (newN: number) => {
    setPrevN(n);
    setN(newN);
  };

  // Ensure ni > nf for energy levels
  const handleNiChange = (val: number) => {
    setNi(val);
    if (val <= nf) setNf(val - 1);
  };
  const handleNfChange = (val: number) => {
    setNf(val);
    if (val >= ni) setNi(val + 1);
  };

  // =====================
  // BOHR MODE
  // =====================
  const bohrData = useMemo(() => {
    const elem = ELEMENT_DATA[z] || ELEMENT_DATA[1];
    const levels = [1, 2, 3, 4, 5, 6].map((lvl) => ({
      n: lvl,
      energy: (-13.6 * z * z) / (lvl * lvl),
      radius: 20 + lvl * 22,
    }));
    const currentEnergy = (-13.6 * z * z) / (n * n);
    const prevEnergy = (-13.6 * z * z) / (prevN * prevN);
    const transitionEnergy = prevEnergy - currentEnergy;
    const isEmission = n < prevN;
    const isAbsorption = n > prevN;
    return { elem, levels, currentEnergy, prevEnergy, transitionEnergy, isEmission, isAbsorption };
  }, [n, z, prevN]);

  function renderBohr() {
    const cx = SVG_W / 2;
    const cy = SVG_H / 2;
    const elem = bohrData.elem;
    const electronAngle = -Math.PI / 4;

    return (
      <g>
        {/* Orbits */}
        {bohrData.levels.slice(0, 4).map((lvl) => (
          <circle
            key={`orbit-${lvl.n}`}
            cx={cx}
            cy={cy}
            r={lvl.radius}
            fill="none"
            stroke={lvl.n === n ? "#3b82f6" : "#cbd5e1"}
            strokeWidth={lvl.n === n ? 2 : 1}
            strokeDasharray={lvl.n === n ? undefined : "4 3"}
            opacity={lvl.n === n ? 1 : 0.5}
          />
        ))}

        {/* Energy labels next to orbits */}
        {bohrData.levels.slice(0, 4).map((lvl) => (
          <text
            key={`label-${lvl.n}`}
            x={cx + lvl.radius * Math.cos(-Math.PI / 6) + 6}
            y={cy + lvl.radius * Math.sin(-Math.PI / 6) - 4}
            fill="#64748b"
            fontSize="8"
            fontWeight={lvl.n === n ? "bold" : "normal"}
          >
            n={lvl.n}: {lvl.energy.toFixed(1)} eV
          </text>
        ))}

        {/* Nucleus glow */}
        <circle cx={cx} cy={cy} r={16} fill={elem.color} opacity={0.15} />
        <circle cx={cx} cy={cy} r={12} fill={elem.color} opacity={0.3} />
        {/* Nucleus */}
        <circle cx={cx} cy={cy} r={9} fill={`url(#nucleusGrad)`} stroke={elem.color} strokeWidth={1.5} />
        {/* Nucleus label */}
        <text x={cx} y={cy + 3.5} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
          {elem.symbol}
        </text>
        <text x={cx} y={cy - 14} textAnchor="middle" fill={elem.color} fontSize="8" fontWeight="bold">
          Z={z}
        </text>

        {/* Electron on selected orbit */}
        {(() => {
          const orbitR = 20 + n * 22;
          const ex = cx + orbitR * Math.cos(electronAngle);
          const ey = cy + orbitR * Math.sin(electronAngle);
          return (
            <g>
              <circle cx={ex} cy={ey} r={6} fill="#3b82f6" opacity={0.2} />
              <circle cx={ex} cy={ey} r={4} fill="#3b82f6" stroke="white" strokeWidth={1} />
              <text x={ex + 8} y={ey - 6} fill="#3b82f6" fontSize="8" fontWeight="bold">
                e⁻
              </text>
            </g>
          );
        })()}

        {/* Photon arrow for transition */}
        {prevN !== n && (
          (() => {
            const r1 = 20 + prevN * 22;
            const r2 = 20 + n * 22;
            const angle = Math.PI / 3;
            const x1 = cx + r1 * Math.cos(angle);
            const y1 = cy - r1 * Math.sin(angle);
            const x2 = cx + r2 * Math.cos(angle);
            const y2 = cy - r2 * Math.sin(angle);
            const isEmit = bohrData.isEmission;
            const photonColor = isEmit ? "#eab308" : "#a855f7";
            // Wavy arrow pointing outward (emission) or inward (absorption)
            const fromX = isEmit ? x2 : x1;
            const fromY = isEmit ? y2 : y1;
            const toX = isEmit ? x1 + (x1 - cx) * 0.4 : x2;
            const toY = isEmit ? y1 - (cy - y1) * 0.4 : y2;
            return (
              <g>
                <path
                  d={wavyPath(fromX, fromY, toX, toY, 5, 3)}
                  fill="none"
                  stroke={photonColor}
                  strokeWidth={2}
                />
                {/* Arrowhead */}
                {(() => {
                  const dx = toX - fromX;
                  const dy = toY - fromY;
                  const len = Math.sqrt(dx * dx + dy * dy);
                  const ux = dx / len;
                  const uy = dy / len;
                  const nx = -uy;
                  const ny = ux;
                  const tip = { x: toX, y: toY };
                  const left = { x: toX - ux * 6 + nx * 3, y: toY - uy * 6 + ny * 3 };
                  const right = { x: toX - ux * 6 - nx * 3, y: toY - uy * 6 - ny * 3 };
                  return (
                    <polygon
                      points={`${tip.x},${tip.y} ${left.x},${left.y} ${right.x},${right.y}`}
                      fill={photonColor}
                    />
                  );
                })()}
                <text
                  x={(fromX + toX) / 2 + 10}
                  y={(fromY + toY) / 2 - 8}
                  fill={photonColor}
                  fontSize="8"
                  fontWeight="bold"
                >
                  {isEmit ? "foton ven" : "foton abs."}
                </text>
              </g>
            );
          })()
        )}
      </g>
    );
  }

  // =====================
  // ENERGY LEVELS MODE
  // =====================
  const energyData = useMemo(() => {
    const levels = [1, 2, 3, 4, 5, 6].map((lvl) => ({
      n: lvl,
      energy: -13.6 / (lvl * lvl),
    }));
    const deltaE = 13.6 * (1 / (nf * nf) - 1 / (ni * ni));
    // wavelength: E = hc/lambda, hc = 1240 eV*nm
    const wavelength = deltaE > 0 ? 1240 / deltaE : Infinity;
    return { levels, deltaE, wavelength };
  }, [ni, nf]);

  // Series colors
  function seriesColor(finalN: number, initialN: number): string {
    if (finalN === 1) return "#7c3aed"; // Lyman - UV purple
    if (finalN === 2) {
      // Balmer - visible
      if (initialN === 3) return "#ef4444"; // H-alpha red
      if (initialN === 4) return "#06b6d4"; // H-beta cyan
      if (initialN === 5) return "#3b82f6"; // H-gamma blue
      return "#8b5cf6"; // H-delta violet
    }
    if (finalN === 3) return "#dc2626"; // Paschen - IR red
    return "#94a3b8";
  }

  function renderEnergyLevels() {
    const leftX = 50;
    const rightX = 240;
    const topY = 30;
    const bottomY = 290;
    const eRange = 13.6; // from -13.6 to 0

    function yForEnergy(e: number): number {
      // e goes from -13.6 (bottom) to 0 (top)
      const fraction = (e + eRange) / eRange;
      return bottomY - fraction * (bottomY - topY);
    }

    // Series definitions for background arrows
    const seriesDefs = [
      { name: "Lyman", nf: 1, nis: [2, 3, 4, 5, 6], labelX: 280 },
      { name: "Balmer", nf: 2, nis: [3, 4, 5, 6], labelX: 330 },
      { name: "Paschen", nf: 3, nis: [4, 5, 6], labelX: 380 },
    ];

    return (
      <g>
        {/* Energy axis */}
        <line x1={40} y1={topY} x2={40} y2={bottomY} stroke="#94a3b8" strokeWidth={1} />
        <text x={14} y={topY + 4} fill="#64748b" fontSize="8" textAnchor="middle">
          E (eV)
        </text>

        {/* Energy levels */}
        {energyData.levels.map((lvl) => {
          const y = yForEnergy(lvl.energy);
          const isSelected = lvl.n === ni || lvl.n === nf;
          return (
            <g key={`elevel-${lvl.n}`}>
              <line
                x1={leftX}
                x2={rightX}
                y1={y}
                y2={y}
                stroke={isSelected ? "#3b82f6" : "#334155"}
                strokeWidth={isSelected ? 2 : 1.2}
              />
              <text x={leftX - 8} y={y + 3} textAnchor="end" fill="#64748b" fontSize="8">
                {lvl.energy.toFixed(1)}
              </text>
              <text x={rightX + 6} y={y + 3} textAnchor="start" fill="#334155" fontSize="9" fontWeight="bold">
                n={lvl.n}
              </text>
            </g>
          );
        })}

        {/* Infinity level (E=0) */}
        <line
          x1={leftX}
          x2={rightX}
          y1={yForEnergy(0)}
          y2={yForEnergy(0)}
          stroke="#94a3b8"
          strokeWidth={1}
          strokeDasharray="4 3"
        />
        <text x={leftX - 8} y={yForEnergy(0) + 3} textAnchor="end" fill="#94a3b8" fontSize="8">
          0
        </text>
        <text x={rightX + 6} y={yForEnergy(0) + 3} textAnchor="start" fill="#94a3b8" fontSize="9">
          n=&#8734;
        </text>

        {/* Series arrows (background) */}
        {seriesDefs.map((series) =>
          series.nis.map((initN) => {
            const yStart = yForEnergy(-13.6 / (initN * initN));
            const yEnd = yForEnergy(-13.6 / (series.nf * series.nf));
            const x = series.labelX - (initN - series.nis[0]) * 8;
            const col = seriesColor(series.nf, initN);
            const isActive = initN === ni && series.nf === nf;
            return (
              <g key={`series-${series.nf}-${initN}`} opacity={isActive ? 1 : 0.25}>
                <line
                  x1={x}
                  y1={yStart}
                  x2={x}
                  y2={yEnd + 4}
                  stroke={col}
                  strokeWidth={isActive ? 2.5 : 1.2}
                />
                {/* Arrowhead pointing down */}
                <polygon
                  points={`${x},${yEnd} ${x - 3},${yEnd - 6} ${x + 3},${yEnd - 6}`}
                  fill={col}
                />
              </g>
            );
          })
        )}

        {/* Series labels */}
        {seriesDefs.map((series) => (
          <text
            key={`slabel-${series.nf}`}
            x={series.labelX - 12}
            y={bottomY + 14}
            textAnchor="middle"
            fill="#64748b"
            fontSize="7"
          >
            {series.name}
          </text>
        ))}

        {/* Active transition arrow (highlighted) */}
        {(() => {
          const yStart = yForEnergy(-13.6 / (ni * ni));
          const yEnd = yForEnergy(-13.6 / (nf * nf));
          const col = seriesColor(nf, ni);
          const midX = (leftX + rightX) / 2;
          return (
            <g>
              <line
                x1={midX}
                y1={yStart}
                x2={midX}
                y2={yEnd + 5}
                stroke={col}
                strokeWidth={3}
              />
              <polygon
                points={`${midX},${yEnd} ${midX - 4},${yEnd - 8} ${midX + 4},${yEnd - 8}`}
                fill={col}
              />
              {/* Photon wavy line next to arrow */}
              <path
                d={wavyPath(midX + 12, yStart, midX + 12, yEnd, 4, 4)}
                fill="none"
                stroke="#eab308"
                strokeWidth={1.5}
              />
              {/* Energy label */}
              <text
                x={midX + 24}
                y={(yStart + yEnd) / 2}
                fill={col}
                fontSize="9"
                fontWeight="bold"
              >
                {energyData.deltaE.toFixed(2)} eV
              </text>
            </g>
          );
        })()}
      </g>
    );
  }

  // =====================
  // PHOTOELECTRIC MODE
  // =====================
  const photoData = useMemo(() => {
    const kineticEnergy = Math.max(0, photonEnergy - workFunction);
    const emitted = photonEnergy > workFunction;
    return { kineticEnergy, emitted };
  }, [photonEnergy, workFunction]);

  function renderPhotoelectric() {
    const metalX = 170;
    const metalY = 60;
    const metalW = 30;
    const metalH = 160;
    const emitted = photoData.emitted;

    // Bar chart area
    const barBaseY = 280;
    const barMaxH = 120;
    const barW = 36;
    const barStartX = 270;
    const maxE = 10;

    function barH(e: number): number {
      return (e / maxE) * barMaxH;
    }

    return (
      <g>
        {/* Metal surface */}
        <defs>
          <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>
        <rect
          x={metalX}
          y={metalY}
          width={metalW}
          height={metalH}
          fill="url(#metalGrad)"
          stroke="#475569"
          strokeWidth={1.5}
          rx={2}
        />
        <text x={metalX + metalW / 2} y={metalY + metalH + 16} textAnchor="middle" fill="#475569" fontSize="9" fontWeight="bold">
          Kov
        </text>

        {/* Incoming photon (wavy arrow from left) */}
        <path
          d={wavyPath(30, 140, metalX - 6, 140, 8, 5)}
          fill="none"
          stroke="#eab308"
          strokeWidth={2.5}
        />
        {/* Photon arrowhead */}
        <polygon
          points={`${metalX - 4},${140} ${metalX - 12},${136} ${metalX - 12},${144}`}
          fill="#eab308"
        />
        <text x={80} y={128} fill="#eab308" fontSize="9" fontWeight="bold">
          Foton ({photonEnergy.toFixed(1)} eV)
        </text>

        {/* Electron emission or block */}
        {emitted ? (
          <g>
            {/* Ejected electron */}
            <line
              x1={metalX + metalW + 8}
              y1={140}
              x2={metalX + metalW + 55}
              y2={120}
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="3 2"
            />
            <polygon
              points={`${metalX + metalW + 57},${119} ${metalX + metalW + 48},${118} ${metalX + metalW + 51},${126}`}
              fill="#3b82f6"
            />
            <circle
              cx={metalX + metalW + 60}
              cy={116}
              r={5}
              fill="#3b82f6"
              stroke="white"
              strokeWidth={1}
            />
            <circle
              cx={metalX + metalW + 60}
              cy={116}
              r={8}
              fill="#3b82f6"
              opacity={0.15}
            />
            <text x={metalX + metalW + 60} y={116 + 3} textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">
              e⁻
            </text>
            {/* Success label */}
            <rect x={metalX + metalW + 18} y={86} width={100} height={18} rx={9} fill="#22c55e" opacity={0.15} />
            <text x={metalX + metalW + 68} y={98} textAnchor="middle" fill="#16a34a" fontSize="9" fontWeight="bold">
              Elektron vyletí!
            </text>
          </g>
        ) : (
          <g>
            {/* Blocked electron */}
            <circle cx={metalX + metalW + 20} cy={140} r={5} fill="#94a3b8" opacity={0.5} />
            {/* X mark */}
            <line x1={metalX + metalW + 15} y1={135} x2={metalX + metalW + 25} y2={145} stroke="#ef4444" strokeWidth={2} />
            <line x1={metalX + metalW + 25} y1={135} x2={metalX + metalW + 15} y2={145} stroke="#ef4444" strokeWidth={2} />
            {/* Failure label */}
            <rect x={metalX + metalW + 8} y={86} width={110} height={18} rx={9} fill="#ef4444" opacity={0.15} />
            <text x={metalX + metalW + 63} y={98} textAnchor="middle" fill="#dc2626" fontSize="9" fontWeight="bold">
              Žádný elektron
            </text>
          </g>
        )}

        {/* Bar chart */}
        <text x={barStartX + barW * 1.5 + 4} y={barBaseY - barMaxH - 8} textAnchor="middle" fill="#64748b" fontSize="8">
          Energie (eV)
        </text>
        {/* Baseline */}
        <line x1={barStartX - 5} y1={barBaseY} x2={barStartX + barW * 3 + 14} y2={barBaseY} stroke="#94a3b8" strokeWidth={1} />

        {/* Photon energy bar */}
        <rect
          x={barStartX}
          y={barBaseY - barH(photonEnergy)}
          width={barW}
          height={barH(photonEnergy)}
          fill="#eab308"
          opacity={0.7}
          rx={2}
        />
        <text x={barStartX + barW / 2} y={barBaseY - barH(photonEnergy) - 4} textAnchor="middle" fill="#eab308" fontSize="8" fontWeight="bold">
          {photonEnergy.toFixed(1)}
        </text>
        <text x={barStartX + barW / 2} y={barBaseY + 12} textAnchor="middle" fill="#64748b" fontSize="7">
          E_fot
        </text>

        {/* Work function bar */}
        <rect
          x={barStartX + barW + 4}
          y={barBaseY - barH(workFunction)}
          width={barW}
          height={barH(workFunction)}
          fill="#6b7280"
          opacity={0.7}
          rx={2}
        />
        <text x={barStartX + barW + 4 + barW / 2} y={barBaseY - barH(workFunction) - 4} textAnchor="middle" fill="#6b7280" fontSize="8" fontWeight="bold">
          {workFunction.toFixed(1)}
        </text>
        <text x={barStartX + barW + 4 + barW / 2} y={barBaseY + 12} textAnchor="middle" fill="#64748b" fontSize="7">
          W₀
        </text>

        {/* Kinetic energy bar */}
        <rect
          x={barStartX + (barW + 4) * 2}
          y={barBaseY - barH(photoData.kineticEnergy)}
          width={barW}
          height={Math.max(0, barH(photoData.kineticEnergy))}
          fill="#3b82f6"
          opacity={0.7}
          rx={2}
        />
        {photoData.kineticEnergy > 0 && (
          <text
            x={barStartX + (barW + 4) * 2 + barW / 2}
            y={barBaseY - barH(photoData.kineticEnergy) - 4}
            textAnchor="middle"
            fill="#3b82f6"
            fontSize="8"
            fontWeight="bold"
          >
            {photoData.kineticEnergy.toFixed(1)}
          </text>
        )}
        <text x={barStartX + (barW + 4) * 2 + barW / 2} y={barBaseY + 12} textAnchor="middle" fill="#64748b" fontSize="7">
          E_k
        </text>
      </g>
    );
  }

  // =====================
  // DECAY MODE
  // =====================
  const NUCLEI_COUNT = 50;
  const nucleiGrid = useMemo(() => {
    const rng = seededRandom(42);
    const gridCols = 10;
    const cellW = 28;
    const cellH = 28;
    const startX = 30;
    const startY = 20;
    const positions: { x: number; y: number; decayTime: number }[] = [];
    for (let i = 0; i < NUCLEI_COUNT; i++) {
      const col = i % gridCols;
      const row = Math.floor(i / gridCols);
      const jitterX = (rng() - 0.5) * 8;
      const jitterY = (rng() - 0.5) * 8;
      // Each nucleus has a deterministic "decay time" based on exponential distribution
      // Using inverse CDF: t = -T * ln(U) where U is uniform
      const u = rng();
      const decayTime = -halfLife * Math.log(u);
      positions.push({
        x: startX + col * cellW + cellW / 2 + jitterX,
        y: startY + row * cellH + cellH / 2 + jitterY,
        decayTime,
      });
    }
    return positions;
  }, [halfLife]);

  const decayData = useMemo(() => {
    const undecayed = nucleiGrid.filter((nuc) => nuc.decayTime > time).length;
    const ratio = undecayed / NUCLEI_COUNT;
    const theoreticalRatio = Math.pow(0.5, time / halfLife);
    const activity = (NUCLEI_COUNT * Math.log(2) * theoreticalRatio) / halfLife;
    return { undecayed, ratio, theoreticalRatio, activity };
  }, [nucleiGrid, time, halfLife]);

  function renderDecay() {
    const maxTime = 5 * halfLife;
    // Decay curve area
    const curveLeft = 30;
    const curveRight = 420;
    const curveTop = 180;
    const curveBottom = 300;
    const curveW = curveRight - curveLeft;
    const curveH = curveBottom - curveTop;

    // Build decay curve path
    const curveSteps = 100;
    const curveParts: string[] = [];
    for (let i = 0; i <= curveSteps; i++) {
      const t = (i / curveSteps) * maxTime;
      const nRatio = Math.pow(0.5, t / halfLife);
      const px = curveLeft + (t / maxTime) * curveW;
      const py = curveBottom - nRatio * curveH;
      curveParts.push(`${i === 0 ? "M" : "L"} ${px.toFixed(1)} ${py.toFixed(1)}`);
    }
    const curvePath = curveParts.join(" ");

    // Current point
    const currentX = curveLeft + (time / maxTime) * curveW;
    const currentY = curveBottom - decayData.theoreticalRatio * curveH;

    return (
      <g>
        {/* Nuclei grid */}
        {nucleiGrid.map((nuc, i) => {
          const decayed = nuc.decayTime <= time;
          return (
            <g key={`nuc-${i}`}>
              <circle
                cx={nuc.x}
                cy={nuc.y}
                r={9}
                fill={decayed ? "#d1d5db" : "#3b82f6"}
                stroke={decayed ? "#9ca3af" : "#1d4ed8"}
                strokeWidth={1}
                opacity={decayed ? 0.5 : 0.9}
              />
              {!decayed && (
                <circle cx={nuc.x} cy={nuc.y} r={9} fill="#3b82f6" opacity={0.15} />
              )}
            </g>
          );
        })}

        {/* Nuclei grid legend */}
        <circle cx={310} cy={30} r={7} fill="#3b82f6" stroke="#1d4ed8" strokeWidth={1} />
        <text x={322} y={34} fill="#334155" fontSize="8">nerozpadlé</text>
        <circle cx={310} cy={48} r={7} fill="#d1d5db" stroke="#9ca3af" strokeWidth={1} opacity={0.5} />
        <text x={322} y={52} fill="#334155" fontSize="8">rozpadlé</text>

        {/* Count label */}
        <text x={310} y={72} fill="#334155" fontSize="9" fontWeight="bold">
          N = {decayData.undecayed} / {NUCLEI_COUNT}
        </text>

        {/* Decay curve */}
        {/* Axes */}
        <line x1={curveLeft} y1={curveBottom} x2={curveRight} y2={curveBottom} stroke="#94a3b8" strokeWidth={1} />
        <line x1={curveLeft} y1={curveTop} x2={curveLeft} y2={curveBottom} stroke="#94a3b8" strokeWidth={1} />

        {/* Axis labels */}
        <text x={(curveLeft + curveRight) / 2} y={curveBottom + 14} textAnchor="middle" fill="#64748b" fontSize="8">
          Čas t (s)
        </text>
        <text x={curveLeft - 6} y={(curveTop + curveBottom) / 2} textAnchor="middle" fill="#64748b" fontSize="8" transform={`rotate(-90, ${curveLeft - 6}, ${(curveTop + curveBottom) / 2})`}>
          N/N₀
        </text>

        {/* Y-axis ticks */}
        {[0, 0.25, 0.5, 0.75, 1].map((val) => {
          const y = curveBottom - val * curveH;
          return (
            <g key={`ytick-${val}`}>
              <line x1={curveLeft - 3} y1={y} x2={curveLeft} y2={y} stroke="#94a3b8" strokeWidth={1} />
              <text x={curveLeft - 6} y={y + 3} textAnchor="end" fill="#94a3b8" fontSize="7">
                {val}
              </text>
            </g>
          );
        })}

        {/* X-axis ticks at each half-life */}
        {[1, 2, 3, 4, 5].map((mult) => {
          const t = mult * halfLife;
          const x = curveLeft + (t / maxTime) * curveW;
          return (
            <g key={`xtick-${mult}`}>
              <line x1={x} y1={curveBottom} x2={x} y2={curveBottom + 3} stroke="#94a3b8" strokeWidth={1} />
              <text x={x} y={curveBottom + 12} textAnchor="middle" fill="#94a3b8" fontSize="7">
                {mult}T
              </text>
              {/* Dashed guide at 0.5 level for first half-life */}
              {mult === 1 && (
                <line
                  x1={curveLeft}
                  y1={curveBottom - 0.5 * curveH}
                  x2={x}
                  y2={curveBottom - 0.5 * curveH}
                  stroke="#a855f7"
                  strokeWidth={0.7}
                  strokeDasharray="3 2"
                  opacity={0.5}
                />
              )}
            </g>
          );
        })}

        {/* Curve */}
        <path d={curvePath} fill="none" stroke="#a855f7" strokeWidth={2} />

        {/* Current point marker */}
        <circle cx={currentX} cy={currentY} r={5} fill="#22c55e" stroke="white" strokeWidth={1.5} />
        {/* Vertical dashed line from point to x-axis */}
        <line
          x1={currentX}
          y1={currentY}
          x2={currentX}
          y2={curveBottom}
          stroke="#22c55e"
          strokeWidth={1}
          strokeDasharray="3 2"
          opacity={0.5}
        />
      </g>
    );
  }

  // =====================
  // VALUES DISPLAY
  // =====================
  function renderValues() {
    if (mode === "bohr") {
      const energy = bohrData.currentEnergy;
      return (
        <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
          <span className="bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
            Z = {z} ({bohrData.elem.name})
          </span>
          <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
            n = {n}
          </span>
          <span className="bg-purple-100 dark:bg-purple-900/40 px-2 py-1 rounded-full">
            E = {energy.toFixed(2)} eV
          </span>
          {prevN !== n && (
            <span className="bg-yellow-100 dark:bg-yellow-900/40 px-2 py-1 rounded-full">
              ΔE = {Math.abs(bohrData.transitionEnergy).toFixed(2)} eV
            </span>
          )}
        </div>
      );
    }
    if (mode === "energy-levels") {
      return (
        <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
          <span className="bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
            n_i = {ni}
          </span>
          <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
            n_f = {nf}
          </span>
          <span className="bg-purple-100 dark:bg-purple-900/40 px-2 py-1 rounded-full">
            ΔE = {energyData.deltaE.toFixed(2)} eV
          </span>
          <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
            λ = {energyData.wavelength < 10000 ? energyData.wavelength.toFixed(1) : "∞"} nm
          </span>
        </div>
      );
    }
    if (mode === "photoelectric") {
      return (
        <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
          <span className="bg-yellow-100 dark:bg-yellow-900/40 px-2 py-1 rounded-full">
            E_foton = {photonEnergy.toFixed(1)} eV
          </span>
          <span className="bg-gray-100 dark:bg-gray-800/40 px-2 py-1 rounded-full">
            W₀ = {workFunction.toFixed(1)} eV
          </span>
          <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
            E_k = {photoData.kineticEnergy.toFixed(1)} eV
          </span>
          <span className={`px-2 py-1 rounded-full ${photoData.emitted ? "bg-green-100 dark:bg-green-900/40" : "bg-red-100 dark:bg-red-900/40"}`}>
            {photoData.emitted ? "Emise!" : "Bez emise"}
          </span>
        </div>
      );
    }
    // decay
    return (
      <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
        <span className="bg-purple-100 dark:bg-purple-900/40 px-2 py-1 rounded-full">
          T = {halfLife} s
        </span>
        <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
          t = {time.toFixed(1)} s
        </span>
        <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
          N/N₀ = {decayData.ratio.toFixed(2)}
        </span>
        <span className="bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded-full">
          A = {decayData.activity.toFixed(2)} s⁻¹
        </span>
      </div>
    );
  }

  // =====================
  // SLIDERS
  // =====================
  function renderSliders() {
    if (mode === "bohr") {
      return (
        <>
          <SliderControl label="n" value={n} min={1} max={6} step={1} onChange={handleNChange} color="#3b82f6" />
          <SliderControl label="Z" value={z} min={1} max={3} step={1} onChange={setZ} color="#ef4444" />
        </>
      );
    }
    if (mode === "energy-levels") {
      return (
        <>
          <SliderControl label="nᵢ" value={ni} min={2} max={6} step={1} onChange={handleNiChange} color="#ef4444" />
          <SliderControl label="nf" value={nf} min={1} max={5} step={1} onChange={handleNfChange} color="#3b82f6" />
        </>
      );
    }
    if (mode === "photoelectric") {
      return (
        <>
          <SliderControl label="E" value={photonEnergy} min={1} max={10} step={0.5} unit="eV" onChange={setPhotonEnergy} color="#eab308" />
          <SliderControl label="W₀" value={workFunction} min={1} max={6} step={0.5} unit="eV" onChange={setWorkFunction} color="#6b7280" />
        </>
      );
    }
    // decay
    const maxTime = 5 * halfLife;
    return (
      <>
        <SliderControl label="T" value={halfLife} min={1} max={30} step={1} unit="s" onChange={(val) => { setHalfLife(val); if (time > 5 * val) setTime(5 * val); }} color="#a855f7" />
        <SliderControl label="t" value={time} min={0} max={maxTime} step={0.5} unit="s" onChange={setTime} color="#22c55e" />
      </>
    );
  }

  // =====================
  // FORMULA
  // =====================
  function getFormula(): string {
    if (mode === "bohr") {
      return `E_n = -\\frac{13{,}6 \\cdot Z^2}{n^2} \\text{ eV}`;
    }
    if (mode === "energy-levels") {
      return `E = 13{,}6 \\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right) \\text{ eV}, \\quad \\lambda = \\frac{hc}{E}`;
    }
    if (mode === "photoelectric") {
      return `E_k = E_{\\text{foton}} - W_0`;
    }
    return `N(t) = N_0 \\cdot \\left(\\frac{1}{2}\\right)^{t/T}`;
  }

  // =====================
  // MODE LABELS
  // =====================
  const modeLabels: Record<string, string> = {
    bohr: "Bohrův model atomu",
    "energy-levels": "Energetické hladiny vodíku",
    photoelectric: "Fotoelektrický jev",
    decay: "Radioaktivní rozpad",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Mode label */}
      <div className="text-sm font-bold text-muted-foreground">
        {modeLabels[mode]}
      </div>

      {/* Values display */}
      {renderValues()}

      {/* SVG */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full max-w-lg" aria-label={modeLabels[mode]}>
          <defs>
            <radialGradient id="atomBg" cx="50%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </radialGradient>
            <radialGradient id="nucleusGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor={ELEMENT_DATA[z]?.color || "#ef4444"} stopOpacity="1" />
              <stop offset="100%" stopColor="#7f1d1d" stopOpacity="1" />
            </radialGradient>
          </defs>

          {/* Background */}
          <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="url(#atomBg)" rx={8} />

          {/* Mode-specific content */}
          {mode === "bohr" && renderBohr()}
          {mode === "energy-levels" && renderEnergyLevels()}
          {mode === "photoelectric" && renderPhotoelectric()}
          {mode === "decay" && renderDecay()}
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        {renderSliders()}
      </div>

      {/* Formula display */}
      <div className="text-center text-xs text-muted-foreground space-y-1">
        <MathDisplay math={getFormula()} />
      </div>
    </div>
  );
}
