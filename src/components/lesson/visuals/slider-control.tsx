"use client";

import { useId } from "react";

import { Label } from "@/components/ui/label";

/**
 * Czech convention is a decimal comma (3,14 not 3.14). JS's own number→string
 * conversion already picks the shortest round-tripping representation with no
 * spurious trailing zeros, so this only swaps the separator — an integer's
 * string form has no "." to swap, so integer-valued sliders (the majority of
 * existing usages) render unchanged.
 */
function formatCzechNumber(value: number): string {
  return String(value).replace(".", ",");
}

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
  color?: string;
}

export function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
  color = "#3b82f6",
}: SliderControlProps) {
  const id = useId();
  const cls = `slider-${id.replace(/:/g, "")}`;

  return (
    <div
      className="flex items-center gap-3 px-2 py-1"
      onPointerDownCapture={(e) => e.stopPropagation()}
      style={{ touchAction: "none" }}
    >
      <style>{`
        .${cls} {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        .${cls}::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 9999px;
          background: #e2e8f0;
        }
        .${cls}::-moz-range-track {
          height: 6px;
          border-radius: 9999px;
          background: #e2e8f0;
        }
        .${cls}::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${color};
          margin-top: -8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          cursor: grab;
          border: 2px solid white;
        }
        .${cls}::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${color};
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          cursor: grab;
          border: 2px solid white;
        }
        .${cls}:active::-webkit-slider-thumb { cursor: grabbing; transform: scale(1.1); }
        .${cls}:active::-moz-range-thumb { cursor: grabbing; transform: scale(1.1); }
      `}</style>
      <Label
        htmlFor={id}
        className="justify-end text-sm font-semibold text-muted-foreground min-w-[2.5rem]"
      >
        {label}
      </Label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        // The visible readout sits in a sibling span, so screen readers get the
        // same Czech-formatted number and unit here rather than the raw value.
        aria-valuetext={`${formatCzechNumber(value)}${unit ? ` ${unit}` : ""}`}
        className={`${cls} flex-1 h-6`}
      />
      <span
        className="text-sm font-bold min-w-[3.5rem] tabular-nums"
        style={{ color }}
      >
        {formatCzechNumber(value)}
        {unit && ` ${unit}`}
      </span>
    </div>
  );
}
