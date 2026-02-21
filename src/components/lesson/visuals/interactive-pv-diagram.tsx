"use client";

import { useState, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractivePVDiagramProps {
  processType?: "isothermal" | "isobaric" | "isochoric" | "adiabatic" | "all";
  defaultP?: number; // initial pressure in kPa
  defaultV?: number; // initial volume in L
  defaultT?: number; // initial temperature in K
  showWork?: boolean;
  gamma?: number; // adiabatic index (Cp/Cv)
  n?: number; // moles
}

export function InteractivePVDiagram({
  processType = "all",
  defaultP = 200,
  defaultV = 2,
  defaultT = 300,
  showWork = true,
  gamma = 1.4,
  n = 1,
}: InteractivePVDiagramProps) {
  const [pressure, setPressure] = useState(defaultP);
  const [volume, setVolume] = useState(defaultV);
  const [selectedProcess, setSelectedProcess] = useState<string>(
    processType === "all" ? "isothermal" : processType
  );

  // SVG dimensions
  const svgW = 440;
  const svgH = 320;
  const plotL = 60;
  const plotR = 380;
  const plotT = 30;
  const plotB = 270;
  const plotW = plotR - plotL;
  const plotH = plotB - plotT;

  // Axis ranges
  const vMin = 0.5;
  const vMax = 8;
  const pMin = 0;
  const pMax = 400;

  // nRT from initial state
  const nRT = pressure * volume; // in kPa·L (= J)
  const temperature = nRT / (n * 8.314); // approximate T

  // Map data to SVG coordinates
  const toSvgX = (v: number) => plotL + ((v - vMin) / (vMax - vMin)) * plotW;
  const toSvgY = (p: number) => plotB - ((p - pMin) / (pMax - pMin)) * plotH;

  // Generate process curves
  const curves = useMemo(() => {
    const result: { type: string; path: string; color: string; label: string; work: number }[] = [];
    const steps = 100;

    const processes = processType === "all"
      ? ["isothermal", "isobaric", "isochoric", "adiabatic"]
      : [processType];

    for (const proc of processes) {
      const pts: { v: number; p: number }[] = [];
      let work = 0;

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const v2 = vMin + t * (vMax - vMin);
        let p2 = 0;

        switch (proc) {
          case "isothermal":
            // pV = const -> p = nRT/V
            p2 = nRT / v2;
            break;
          case "isobaric":
            // p = const
            p2 = pressure;
            break;
          case "isochoric":
            // V = const -> vertical line at volume
            // Show as p varies at fixed V
            p2 = pMin + t * (pMax - pMin);
            break;
          case "adiabatic":
            // pV^gamma = const
            p2 = pressure * Math.pow(volume / v2, gamma);
            break;
        }

        if (proc === "isochoric") {
          pts.push({ v: volume, p: p2 });
        } else {
          if (p2 > pMin && p2 < pMax * 1.5) {
            pts.push({ v: v2, p: Math.min(p2, pMax) });
          }
        }
      }

      // Calculate work (area under curve from volume to some V2)
      if (proc === "isothermal") {
        const v2 = Math.min(volume * 2, vMax);
        work = nRT * Math.log(v2 / volume);
      } else if (proc === "isobaric") {
        const v2 = Math.min(volume * 2, vMax);
        work = pressure * (v2 - volume);
      } else if (proc === "isochoric") {
        work = 0;
      } else if (proc === "adiabatic") {
        const v2 = Math.min(volume * 2, vMax);
        const p2 = pressure * Math.pow(volume / v2, gamma);
        work = (pressure * volume - p2 * v2) / (gamma - 1);
      }

      const colors: Record<string, string> = {
        isothermal: "#ef4444",
        isobaric: "#3b82f6",
        isochoric: "#22c55e",
        adiabatic: "#a855f7",
      };

      const labels: Record<string, string> = {
        isothermal: "Izotermický (T = konst.)",
        isobaric: "Izobarický (p = konst.)",
        isochoric: "Izochorický (V = konst.)",
        adiabatic: "Adiabatický (Q = 0)",
      };

      const path = pts
        .filter((pt) => pt.p >= pMin && pt.p <= pMax && pt.v >= vMin && pt.v <= vMax)
        .map((pt, i) => `${i === 0 ? "M" : "L"} ${toSvgX(pt.v).toFixed(1)} ${toSvgY(pt.p).toFixed(1)}`)
        .join(" ");

      result.push({
        type: proc,
        path,
        color: colors[proc] || "#666",
        label: labels[proc] || proc,
        work,
      });
    }

    return result;
  }, [nRT, pressure, volume, gamma, processType, vMin, vMax, pMin, pMax, toSvgX, toSvgY]);

  // Work area fill for selected process
  const workAreaPath = useMemo(() => {
    if (!showWork) return "";
    const steps = 60;
    const v2 = Math.min(volume * 2, vMax);
    const pts: string[] = [];

    // Start from bottom-left
    pts.push(`M ${toSvgX(volume).toFixed(1)} ${toSvgY(0).toFixed(1)}`);

    // Curve from V1 to V2
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const v = volume + t * (v2 - volume);
      let p = 0;

      switch (selectedProcess) {
        case "isothermal":
          p = nRT / v;
          break;
        case "isobaric":
          p = pressure;
          break;
        case "isochoric":
          p = pressure; // no work
          break;
        case "adiabatic":
          p = pressure * Math.pow(volume / v, gamma);
          break;
      }

      p = Math.max(0, Math.min(p, pMax));
      pts.push(`L ${toSvgX(v).toFixed(1)} ${toSvgY(p).toFixed(1)}`);
    }

    // Close path along bottom
    pts.push(`L ${toSvgX(v2).toFixed(1)} ${toSvgY(0).toFixed(1)}`);
    pts.push("Z");

    return pts.join(" ");
  }, [selectedProcess, volume, nRT, pressure, gamma, showWork, vMax, pMax, toSvgX, toSvgY]);

  const selectedCurve = curves.find((c) => c.type === selectedProcess);

  // Grid lines
  const gridLines = useMemo(() => {
    const lines: React.ReactNode[] = [];
    // Vertical grid
    for (let v = 1; v <= 7; v++) {
      const x = toSvgX(v);
      lines.push(
        <line key={`v${v}`} x1={x} y1={plotT} x2={x} y2={plotB} stroke="#e2e8f0" strokeWidth="0.5" />
      );
      lines.push(
        <text key={`vt${v}`} x={x} y={plotB + 16} textAnchor="middle" fill="#94a3b8" fontSize="9">{v}</text>
      );
    }
    // Horizontal grid
    for (let p = 50; p <= 350; p += 50) {
      const y = toSvgY(p);
      lines.push(
        <line key={`p${p}`} x1={plotL} y1={y} x2={plotR} y2={y} stroke="#e2e8f0" strokeWidth="0.5" />
      );
      lines.push(
        <text key={`pt${p}`} x={plotL - 6} y={y + 3} textAnchor="end" fill="#94a3b8" fontSize="9">{p}</text>
      );
    }
    return lines;
  }, [plotT, plotB, plotL, plotR, toSvgX, toSvgY]);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Values */}
      <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
        <span className="bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`p = ${pressure} \\text{ kPa}`} />
        </span>
        <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`V = ${volume.toFixed(1)} \\text{ L}`} />
        </span>
        <span className="bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`T \\approx ${temperature.toFixed(0)} \\text{ K}`} />
        </span>
        {showWork && selectedCurve && selectedProcess !== "isochoric" && (
          <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
            <MathDisplay math={`W = ${selectedCurve.work.toFixed(0)} \\text{ J}`} />
          </span>
        )}
      </div>

      {/* Process selector */}
      {processType === "all" && (
        <div className="flex flex-wrap justify-center gap-1">
          {curves.map((c) => (
            <button
              key={c.type}
              onClick={() => setSelectedProcess(c.type)}
              className="px-2 py-1 text-xs font-bold rounded-full transition-colors"
              style={{
                backgroundColor: selectedProcess === c.type ? c.color : "transparent",
                color: selectedProcess === c.type ? "white" : c.color,
                border: `2px solid ${c.color}`,
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {/* SVG */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-lg" aria-label="p-V diagram">
          <defs>
            <linearGradient id="pvBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fefce8" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
          </defs>
          <rect x={0} y={0} width={svgW} height={svgH} fill="url(#pvBg)" rx={8} />

          {/* Grid */}
          {gridLines}

          {/* Axes */}
          <line x1={plotL} y1={plotT} x2={plotL} y2={plotB} stroke="#334155" strokeWidth="2" />
          <line x1={plotL} y1={plotB} x2={plotR} y2={plotB} stroke="#334155" strokeWidth="2" />

          {/* Axis labels */}
          <text x={plotL + plotW / 2} y={plotB + 32} textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">
            V (L)
          </text>
          <text
            x={plotL - 36}
            y={plotT + plotH / 2}
            textAnchor="middle"
            fill="#334155"
            fontSize="12"
            fontWeight="bold"
            transform={`rotate(-90, ${plotL - 36}, ${plotT + plotH / 2})`}
          >
            p (kPa)
          </text>

          {/* Work area fill */}
          {showWork && workAreaPath && selectedProcess !== "isochoric" && (
            <path
              d={workAreaPath}
              fill={selectedCurve?.color || "#666"}
              opacity="0.15"
            />
          )}

          {/* Process curves */}
          {curves.map((c) => (
            <path
              key={c.type}
              d={c.path}
              fill="none"
              stroke={c.color}
              strokeWidth={c.type === selectedProcess ? 3 : 1.5}
              opacity={c.type === selectedProcess ? 1 : 0.4}
              strokeDasharray={c.type === selectedProcess ? undefined : "4 3"}
            />
          ))}

          {/* Initial state point */}
          <circle
            cx={toSvgX(volume)}
            cy={toSvgY(pressure)}
            r={6}
            fill={selectedCurve?.color || "#334155"}
            stroke="white"
            strokeWidth="2"
          />
          <text
            x={toSvgX(volume) + 10}
            y={toSvgY(pressure) - 8}
            fill="#334155"
            fontSize="10"
            fontWeight="bold"
          >
            A
          </text>

          {/* Legend */}
          {processType === "all" && (
            <g>
              {curves.map((c, i) => (
                <g key={c.type}>
                  <line
                    x1={plotR - 140}
                    y1={plotT + 12 + i * 16}
                    x2={plotR - 120}
                    y2={plotT + 12 + i * 16}
                    stroke={c.color}
                    strokeWidth={c.type === selectedProcess ? 3 : 1.5}
                    opacity={c.type === selectedProcess ? 1 : 0.5}
                  />
                  <text
                    x={plotR - 116}
                    y={plotT + 16 + i * 16}
                    fill={c.color}
                    fontSize="8"
                    fontWeight={c.type === selectedProcess ? "bold" : "normal"}
                    opacity={c.type === selectedProcess ? 1 : 0.6}
                  >
                    {c.label}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* Work label */}
          {showWork && selectedCurve && selectedProcess !== "isochoric" && (
            <text
              x={toSvgX(Math.min(volume * 1.5, vMax))}
              y={toSvgY(pressure / 3)}
              fill={selectedCurve.color}
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.7"
            >
              W
            </text>
          )}
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl label="p" value={pressure} min={50} max={400} step={10} unit="kPa" onChange={setPressure} color="#ef4444" />
        <SliderControl label="V" value={volume} min={1} max={6} step={0.5} unit="L" onChange={setVolume} color="#3b82f6" />
      </div>

      {/* Formula for selected process */}
      <div className="text-center text-xs text-muted-foreground">
        {selectedProcess === "isothermal" && (
          <MathDisplay math="pV = nRT = \\text{konst.} \\quad W = nRT \\ln\\frac{V_2}{V_1}" />
        )}
        {selectedProcess === "isobaric" && (
          <MathDisplay math="p = \\text{konst.} \\quad W = p \\cdot \\Delta V" />
        )}
        {selectedProcess === "isochoric" && (
          <MathDisplay math="V = \\text{konst.} \\quad W = 0" />
        )}
        {selectedProcess === "adiabatic" && (
          <MathDisplay math="pV^{\\gamma} = \\text{konst.} \\quad W = \\frac{p_1V_1 - p_2V_2}{\\gamma - 1}" />
        )}
      </div>
    </div>
  );
}
