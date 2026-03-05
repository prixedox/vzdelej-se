"use client";

import { useState, useMemo, useCallback } from "react";
import { MathDisplay } from "../math-display";

interface InteractiveProbabilityProps {
  mode?: "coin" | "dice" | "marbles";
  marbleConfig?: { red: number; blue: number };
  showHistogram?: boolean;
  showTheoreticalLine?: boolean;
}

const SVG_W = 460;
const SVG_H = 280;
const CHART_L = 50;
const CHART_R = SVG_W - 30;
const CHART_T = 30;
const CHART_B = SVG_H - 40;
const CHART_W = CHART_R - CHART_L;
const CHART_H = CHART_B - CHART_T;

function formatNum(n: number): string {
  return n.toFixed(3).replace(".", ",");
}

function getOutcomes(mode: "coin" | "dice" | "marbles"): string[] {
  if (mode === "coin") return ["Panna", "Orel"];
  if (mode === "dice") return ["1", "2", "3", "4", "5", "6"];
  return ["Cervena", "Modra"];
}

function getLabels(mode: "coin" | "dice" | "marbles"): string[] {
  if (mode === "coin") return ["Panna", "Orel"];
  if (mode === "dice") return ["1", "2", "3", "4", "5", "6"];
  return ["Cervena", "Modra"];
}

function getTheoreticalP(mode: "coin" | "dice" | "marbles", outcome: string, marbleConfig: { red: number; blue: number }): number {
  if (mode === "coin") return 0.5;
  if (mode === "dice") return 1 / 6;
  const total = marbleConfig.red + marbleConfig.blue;
  if (outcome === "Cervena") return marbleConfig.red / total;
  return marbleConfig.blue / total;
}

function rollOne(mode: "coin" | "dice" | "marbles", marbleConfig: { red: number; blue: number }): string {
  if (mode === "coin") return Math.random() < 0.5 ? "Panna" : "Orel";
  if (mode === "dice") return String(Math.floor(Math.random() * 6) + 1);
  const total = marbleConfig.red + marbleConfig.blue;
  return Math.random() < marbleConfig.red / total ? "Cervena" : "Modra";
}

function getEmoji(mode: "coin" | "dice" | "marbles", result: string): string {
  if (mode === "coin") return "\uD83E\uDE99";
  if (mode === "dice") return "\uD83C\uDFB2";
  return result === "Cervena" ? "\uD83D\uDD34" : "\uD83D\uDD35";
}

function getBarColor(mode: "coin" | "dice" | "marbles", outcome: string, idx: number): string {
  if (mode === "coin") return idx === 0 ? "#f59e0b" : "#6366f1";
  if (mode === "dice") {
    const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"];
    return colors[idx];
  }
  return outcome === "Cervena" ? "#ef4444" : "#3b82f6";
}

export function InteractiveProbability({
  mode = "coin",
  marbleConfig = { red: 5, blue: 3 },
  showHistogram = true,
  showTheoreticalLine = true,
}: InteractiveProbabilityProps) {
  const [results, setResults] = useState<string[]>([]);

  const outcomes = useMemo(() => getOutcomes(mode), [mode]);
  const labels = useMemo(() => getLabels(mode), [mode]);

  const handleRoll = useCallback(() => {
    setResults((prev) => [...prev, rollOne(mode, marbleConfig)]);
  }, [mode, marbleConfig]);

  const handleRoll10 = useCallback(() => {
    setResults((prev) => {
      const next = [...prev];
      for (let i = 0; i < 10; i++) {
        next.push(rollOne(mode, marbleConfig));
      }
      return next;
    });
  }, [mode, marbleConfig]);

  const handleReset = useCallback(() => {
    setResults([]);
  }, []);

  const frequencies = useMemo(() => {
    const map: Record<string, number> = {};
    for (const o of outcomes) map[o] = 0;
    for (const r of results) {
      if (map[r] !== undefined) map[r]++;
    }
    return map;
  }, [results, outcomes]);

  const total = results.length;
  const lastResult = total > 0 ? results[total - 1] : null;

  const maxFreq = useMemo(() => {
    if (total === 0) return 1;
    return Math.max(...outcomes.map((o) => frequencies[o]), 1);
  }, [frequencies, outcomes, total]);

  const buttonLabel = mode === "coin" ? "Hodit minci" : mode === "dice" ? "Hodit kostkou" : "Tahni kuličku";

  const theoreticalFormula = useMemo(() => {
    if (mode === "coin") return `P = \\frac{1}{2} = 0{,}5`;
    if (mode === "dice") return `P = \\frac{1}{6} \\approx 0{,}167`;
    const t = marbleConfig.red + marbleConfig.blue;
    return `P(\\text{č}) = \\frac{${marbleConfig.red}}{${t}},\\; P(\\text{m}) = \\frac{${marbleConfig.blue}}{${t}}`;
  }, [mode, marbleConfig]);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Info display */}
      <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
          Pokusu: {total}
        </span>
        {lastResult && (
          <span className="bg-amber-100 dark:bg-amber-900/40 px-2 py-1 rounded-full">
            {getEmoji(mode, lastResult)} {lastResult === "Cervena" ? "Cervena" : lastResult === "Modra" ? "Modra" : lastResult}
          </span>
        )}
        <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={theoreticalFormula} />
        </span>
      </div>

      {/* SVG Histogram */}
      {showHistogram && (
        <div className="flex justify-center w-full">
          <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full max-w-lg" aria-label="Histogram pravdepodobnosti">
            <defs>
              <radialGradient id="probBg" cx="50%" cy="40%" r="70%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </radialGradient>
            </defs>
            <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="url(#probBg)" rx={8} />

            {/* Y axis */}
            <line x1={CHART_L} y1={CHART_T} x2={CHART_L} y2={CHART_B} stroke="#94a3b8" strokeWidth={1} />
            {/* X axis */}
            <line x1={CHART_L} y1={CHART_B} x2={CHART_R} y2={CHART_B} stroke="#94a3b8" strokeWidth={1} />

            {/* Y axis labels */}
            {[0, 0.25, 0.5, 0.75, 1].map((v) => {
              const y = CHART_B - v * CHART_H;
              return (
                <g key={v}>
                  <line x1={CHART_L - 4} y1={y} x2={CHART_L} y2={y} stroke="#94a3b8" strokeWidth={1} />
                  <text x={CHART_L - 8} y={y + 4} textAnchor="end" fill="#64748b" fontSize={9}>
                    {(v * 100).toFixed(0)}%
                  </text>
                  {v > 0 && (
                    <line x1={CHART_L} y1={y} x2={CHART_R} y2={y} stroke="#e2e8f0" strokeWidth={0.5} />
                  )}
                </g>
              );
            })}

            {/* Y axis title */}
            <text x={14} y={CHART_T + CHART_H / 2} fill="#64748b" fontSize={10} fontWeight="bold" transform={`rotate(-90, 14, ${CHART_T + CHART_H / 2})`} textAnchor="middle">
              Rel. cetnost
            </text>

            {/* Bars */}
            {outcomes.map((outcome, i) => {
              const n = outcomes.length;
              const barGroupW = CHART_W / n;
              const barW = Math.min(barGroupW * 0.6, 60);
              const bx = CHART_L + barGroupW * i + (barGroupW - barW) / 2;
              const freq = total > 0 ? frequencies[outcome] / total : 0;
              const barH = freq * CHART_H;
              const color = getBarColor(mode, outcome, i);

              return (
                <g key={outcome}>
                  {/* Bar */}
                  <rect
                    x={bx}
                    y={CHART_B - barH}
                    width={barW}
                    height={Math.max(barH, 0)}
                    fill={color}
                    rx={3}
                    opacity={0.85}
                  />
                  {/* Frequency label */}
                  {total > 0 && freq > 0 && (
                    <text
                      x={bx + barW / 2}
                      y={CHART_B - barH - 6}
                      textAnchor="middle"
                      fill={color}
                      fontSize={10}
                      fontWeight="bold"
                    >
                      {(freq * 100).toFixed(1)}%
                    </text>
                  )}
                  {/* Count */}
                  {total > 0 && (
                    <text
                      x={bx + barW / 2}
                      y={CHART_B - barH / 2 + 4}
                      textAnchor="middle"
                      fill="white"
                      fontSize={11}
                      fontWeight="bold"
                    >
                      {frequencies[outcome]}
                    </text>
                  )}
                  {/* Label */}
                  <text
                    x={bx + barW / 2}
                    y={CHART_B + 16}
                    textAnchor="middle"
                    fill="#334155"
                    fontSize={11}
                    fontWeight="bold"
                  >
                    {labels[i]}
                  </text>
                </g>
              );
            })}

            {/* Theoretical probability lines */}
            {showTheoreticalLine && outcomes.map((outcome, i) => {
              const n = outcomes.length;
              const barGroupW = CHART_W / n;
              const barW = Math.min(barGroupW * 0.6, 60);
              const bx = CHART_L + barGroupW * i + (barGroupW - barW) / 2;
              const theoP = getTheoreticalP(mode, outcome, marbleConfig);
              const theoY = CHART_B - theoP * CHART_H;

              return (
                <line
                  key={`theo-${outcome}`}
                  x1={bx - 4}
                  y1={theoY}
                  x2={bx + barW + 4}
                  y2={theoY}
                  stroke="#1e293b"
                  strokeWidth={1.5}
                  strokeDasharray="6 3"
                />
              );
            })}

            {/* Legend for theoretical line */}
            {showTheoreticalLine && (
              <g>
                <line x1={CHART_R - 120} y1={18} x2={CHART_R - 90} y2={18} stroke="#1e293b" strokeWidth={1.5} strokeDasharray="6 3" />
                <text x={CHART_R - 85} y={22} fill="#1e293b" fontSize={9}>Teor. pravdepodobnost</text>
              </g>
            )}
          </svg>
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <button
          onClick={handleRoll}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          {buttonLabel}
        </button>
        <button
          onClick={handleRoll10}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          10x hodit
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
