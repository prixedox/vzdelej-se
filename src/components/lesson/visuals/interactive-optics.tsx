"use client";

import { useState, useMemo } from "react";
import { MathDisplay } from "../math-display";
import { SliderControl } from "./slider-control";

interface InteractiveOpticsProps {
  element?: "convex-lens" | "concave-lens" | "concave-mirror" | "convex-mirror";
  defaultFocalLength?: number;
  defaultObjectDistance?: number;
  defaultObjectHeight?: number;
  showRays?: boolean;
}

export function InteractiveOptics({
  element = "convex-lens",
  defaultFocalLength = 5,
  defaultObjectDistance = 12,
  defaultObjectHeight = 3,
  showRays = true,
}: InteractiveOpticsProps) {
  const [f, setF] = useState(defaultFocalLength);
  const [a, setA] = useState(defaultObjectDistance);
  const [h, setH] = useState(defaultObjectHeight);

  const isMirror = element === "concave-mirror" || element === "convex-mirror";
  const isConverging = element === "convex-lens" || element === "concave-mirror";

  // Sign convention: converging element f > 0, diverging f < 0
  const fSigned = isConverging ? f : -f;

  // SVG layout
  const svgW = 440;
  const svgH = 300;
  const axisY = svgH / 2; // optical axis vertical center
  const lensX = isMirror ? 320 : svgW / 2; // lens at center, mirror on right
  const scale = 15; // px per cm

  // Thin lens / mirror equation: 1/f = 1/a + 1/b => b = a*f / (a - f)
  const computed = useMemo(() => {
    const denom = a - fSigned;
    const bRaw = Math.abs(denom) < 0.01 ? (denom >= 0 ? 9999 : -9999) : (a * fSigned) / denom;
    const isInfinite = Math.abs(bRaw) > 50;
    const b = isInfinite ? (bRaw > 0 ? 50 : -50) : bRaw;
    const m = -b / a; // magnification (negative = inverted)
    const hPrime = m * h;
    const isReal = bRaw > 0;
    const isVirtual = bRaw < 0;
    return { b, bRaw, m, hPrime, isReal, isVirtual, isInfinite };
  }, [a, fSigned, h]);

  // Convert physical coordinates to SVG
  // For lenses: object is to the left (negative x from lens), image can be either side
  // For mirrors: object is to the left, image can be either side
  // In physical coords: positive distance = left of lens for object, right for image (lens)
  //                     For mirrors: positive = left (in front of mirror)
  const objectSvgX = isMirror ? lensX - a * scale : lensX - a * scale;
  const objectTopY = axisY - h * scale;

  // Image position
  const imageSvgX = useMemo(() => {
    if (isMirror) {
      // For mirrors: real image is in front (left), virtual is behind (right)
      return lensX - computed.b * scale;
    }
    // For lenses: real image is on the right, virtual on the left
    return lensX + computed.b * scale;
  }, [lensX, computed.b, scale, isMirror]);

  const imageHeight = computed.hPrime * scale;
  const imageTopY = axisY - imageHeight;

  // Focal points in SVG coordinates
  const focalPoints = useMemo(() => {
    if (isMirror) {
      // Mirror: F is in front (to the left), center of curvature C at 2f
      return {
        f1x: lensX - fSigned * scale, // F
        f2x: lensX - 2 * fSigned * scale, // C (center of curvature)
        f1Label: "F",
        f2Label: "C",
      };
    }
    // Lens: F on the left, F' on the right
    return {
      f1x: lensX - fSigned * scale, // F (object side)
      f2x: lensX + fSigned * scale, // F' (image side)
      f1Label: "F",
      f2Label: "F'",
    };
  }, [lensX, fSigned, scale, isMirror]);

  // Clamp a point to SVG boundaries
  function clampX(x: number): number {
    return Math.max(5, Math.min(svgW - 5, x));
  }
  function clampY(y: number): number {
    return Math.max(5, Math.min(svgH - 5, y));
  }

  // Compute line-boundary intersection for extending rays
  // Given a point and direction, find where the ray exits the SVG
  function extendRay(
    x0: number,
    y0: number,
    dx: number,
    dy: number,
  ): { x: number; y: number } {
    // Find the parameter t for each boundary
    const candidates: number[] = [];
    if (dx !== 0) {
      const tLeft = (5 - x0) / dx;
      const tRight = (svgW - 5 - x0) / dx;
      if (tLeft > 0.001) candidates.push(tLeft);
      if (tRight > 0.001) candidates.push(tRight);
    }
    if (dy !== 0) {
      const tTop = (5 - y0) / dy;
      const tBot = (svgH - 5 - y0) / dy;
      if (tTop > 0.001) candidates.push(tTop);
      if (tBot > 0.001) candidates.push(tBot);
    }
    // Pick the smallest positive t that keeps us in bounds
    let bestT = Infinity;
    for (const t of candidates) {
      const px = x0 + dx * t;
      const py = y0 + dy * t;
      if (px >= 4 && px <= svgW - 4 && py >= 4 && py <= svgH - 4) {
        if (t < bestT) bestT = t;
      }
    }
    if (bestT === Infinity) bestT = 1;
    return {
      x: clampX(x0 + dx * bestT),
      y: clampY(y0 + dy * bestT),
    };
  }

  // Generate principal rays
  const rays = useMemo(() => {
    if (!showRays) return [];

    const objX = objectSvgX;
    const objTopSvgY = objectTopY;
    const result: {
      segments: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }[];
      color: string;
    }[] = [];

    if (isMirror) {
      // === MIRROR RAY CONSTRUCTION ===
      const mirrorX = lensX;
      const fX = focalPoints.f1x;
      const cX = focalPoints.f2x;

      // Ray 1 (red): Parallel to axis -> reflects through F
      {
        const segments: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }[] = [];
        // Incoming: from object top, horizontal to mirror
        segments.push({ x1: objX, y1: objTopSvgY, x2: mirrorX, y2: objTopSvgY });

        if (isConverging) {
          // Concave mirror: reflects through F
          const dx = fX - mirrorX;
          const dy = axisY - objTopSvgY;
          const ext = extendRay(mirrorX, objTopSvgY, dx, dy);
          segments.push({ x1: mirrorX, y1: objTopSvgY, x2: ext.x, y2: ext.y });
        } else {
          // Convex mirror: reflects as if coming from F (behind mirror)
          const dx = mirrorX - fX;
          const dy = objTopSvgY - axisY;
          const ext = extendRay(mirrorX, objTopSvgY, -dx, dy);
          segments.push({ x1: mirrorX, y1: objTopSvgY, x2: ext.x, y2: ext.y });
          // Virtual extension (dashed) - behind mirror towards F
          const extBehind = extendRay(mirrorX, objTopSvgY, dx, -dy);
          segments.push({ x1: mirrorX, y1: objTopSvgY, x2: extBehind.x, y2: extBehind.y, dashed: true });
        }
        result.push({ segments, color: "#ef4444" });
      }

      // Ray 2 (green): Through center of curvature C -> reflects back on itself
      {
        const segments: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }[] = [];
        if (isConverging) {
          // Ray aimed at C hits mirror and reflects back
          // Intersection with mirror surface (approximate as vertical line)
          const hitY = objTopSvgY + (mirrorX - objX) * (axisY - objTopSvgY) / (cX - objX);
          segments.push({ x1: objX, y1: objTopSvgY, x2: mirrorX, y2: clampY(hitY) });
          // Reflects straight back
          const ext = extendRay(mirrorX, clampY(hitY), -(mirrorX - objX), -(clampY(hitY) - objTopSvgY));
          segments.push({ x1: mirrorX, y1: clampY(hitY), x2: ext.x, y2: ext.y });
        } else {
          // Convex mirror: ray aimed at C (behind mirror)
          const hitY = objTopSvgY + (mirrorX - objX) * (axisY - objTopSvgY) / (cX - objX);
          segments.push({ x1: objX, y1: objTopSvgY, x2: mirrorX, y2: clampY(hitY) });
          const ext = extendRay(mirrorX, clampY(hitY), -(mirrorX - objX), -(clampY(hitY) - objTopSvgY));
          segments.push({ x1: mirrorX, y1: clampY(hitY), x2: ext.x, y2: ext.y });
          // Virtual extension behind mirror
          segments.push({ x1: mirrorX, y1: clampY(hitY), x2: clampX(cX), y2: axisY, dashed: true });
        }
        result.push({ segments, color: "#22c55e" });
      }

      // Ray 3 (blue): Through F -> reflects parallel to axis
      {
        const segments: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }[] = [];
        if (isConverging) {
          // Ray through F hits mirror
          const hitY = objTopSvgY + (mirrorX - objX) * (axisY - objTopSvgY) / (fX - objX);
          segments.push({ x1: objX, y1: objTopSvgY, x2: mirrorX, y2: clampY(hitY) });
          // Reflects parallel to axis
          const ext = extendRay(mirrorX, clampY(hitY), -1, 0);
          segments.push({ x1: mirrorX, y1: clampY(hitY), x2: ext.x, y2: clampY(hitY) });
        } else {
          // Convex mirror: ray aimed at F (behind mirror) reflects parallel
          const hitY = objTopSvgY + (mirrorX - objX) * (axisY - objTopSvgY) / (fX - objX);
          segments.push({ x1: objX, y1: objTopSvgY, x2: mirrorX, y2: clampY(hitY) });
          const ext = extendRay(mirrorX, clampY(hitY), -1, 0);
          segments.push({ x1: mirrorX, y1: clampY(hitY), x2: ext.x, y2: clampY(hitY) });
          // Virtual extension behind mirror towards F
          segments.push({ x1: mirrorX, y1: clampY(hitY), x2: clampX(fX), y2: axisY, dashed: true });
        }
        result.push({ segments, color: "#3b82f6" });
      }
    } else {
      // === LENS RAY CONSTRUCTION ===

      // Ray 1 (red): Parallel to axis -> passes through F' (or diverges from F' for concave)
      {
        const segments: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }[] = [];
        // Incoming: horizontal from object top to lens
        segments.push({ x1: objX, y1: objTopSvgY, x2: lensX, y2: objTopSvgY });

        if (isConverging) {
          // Converges through F' on the right
          const dx = focalPoints.f2x - lensX;
          const dy = axisY - objTopSvgY;
          const ext = extendRay(lensX, objTopSvgY, dx, dy);
          segments.push({ x1: lensX, y1: objTopSvgY, x2: ext.x, y2: ext.y });
        } else {
          // Concave lens: diverges as if coming from F on the same side as object
          // After lens, ray goes away from axis on exit side
          const dx = lensX - focalPoints.f2x;
          const dy = objTopSvgY - axisY;
          const ext = extendRay(lensX, objTopSvgY, dx, dy);
          segments.push({ x1: lensX, y1: objTopSvgY, x2: ext.x, y2: ext.y });
          // Virtual extension (dashed) back to F on the object side
          const extVirt = extendRay(lensX, objTopSvgY, -dx, -dy);
          segments.push({ x1: lensX, y1: objTopSvgY, x2: extVirt.x, y2: extVirt.y, dashed: true });
        }
        result.push({ segments, color: "#ef4444" });
      }

      // Ray 2 (green): Through center of lens -> continues straight
      {
        const segments: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }[] = [];
        const dx = lensX - objX;
        const dy = axisY - objTopSvgY;
        // Extend through lens center in the same direction
        const ext = extendRay(lensX, axisY, dx, dy);
        segments.push({ x1: objX, y1: objTopSvgY, x2: lensX, y2: axisY });
        segments.push({ x1: lensX, y1: axisY, x2: ext.x, y2: ext.y });
        result.push({ segments, color: "#22c55e" });
      }

      // Ray 3 (blue): Through F (on object side) -> exits parallel to axis
      {
        const segments: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }[] = [];
        if (isConverging) {
          // Ray passes through F then hits lens, exits parallel
          // Line from object top to F on object side
          const fObjX = focalPoints.f1x;
          const fObjY = axisY;
          // Direction from object top toward F
          const dirX = fObjX - objX;
          const dirY = fObjY - objTopSvgY;
          // Find where this ray hits the lens (x = lensX)
          const tLens = (lensX - objX) / dirX;
          const hitY = objTopSvgY + dirY * tLens;

          segments.push({ x1: objX, y1: objTopSvgY, x2: lensX, y2: clampY(hitY) });
          // After lens: exits parallel to axis
          const ext = extendRay(lensX, clampY(hitY), 1, 0);
          segments.push({ x1: lensX, y1: clampY(hitY), x2: ext.x, y2: clampY(hitY) });
        } else {
          // Concave lens: ray aimed at F' (on exit side) -> after lens exits parallel
          // Actually for diverging lens, ray 3: ray aimed at F on exit side
          // goes through lens and exits parallel
          // For concave lens: ray aimed at F' on the exit side
          // With f < 0, the virtual F' is on the object side, so we aim at the real
          // focal distance on the exit side: (lensX + |f|*scale, axisY)
          const aimX = lensX + Math.abs(fSigned) * scale;
          const dirX = aimX - objX;
          const dirY = axisY - objTopSvgY;
          const tLens = (lensX - objX) / dirX;
          const hitY = objTopSvgY + dirY * tLens;

          segments.push({ x1: objX, y1: objTopSvgY, x2: lensX, y2: clampY(hitY) });
          // Exits parallel
          const ext = extendRay(lensX, clampY(hitY), 1, 0);
          segments.push({ x1: lensX, y1: clampY(hitY), x2: ext.x, y2: clampY(hitY) });
          // Virtual dashed extension behind lens on object side
          const extBack = extendRay(lensX, clampY(hitY), -1, 0);
          segments.push({ x1: lensX, y1: clampY(hitY), x2: extBack.x, y2: clampY(hitY), dashed: true });
        }
        result.push({ segments, color: "#3b82f6" });
      }
    }

    return result;
  }, [
    objectSvgX, objectTopY, lensX, axisY, focalPoints,
    isConverging, isMirror, showRays, scale, fSigned, a, svgW, svgH,
  ]);

  // Lens / mirror symbol rendering
  function renderOpticalElement() {
    const halfH = 110; // half-height of the element symbol

    if (element === "convex-lens") {
      // Double convex: two outward-curving arcs
      const bulge = 14;
      return (
        <g>
          {/* Left arc */}
          <path
            d={`M ${lensX} ${axisY - halfH} Q ${lensX - bulge} ${axisY} ${lensX} ${axisY + halfH}`}
            fill="none"
            stroke="#1e40af"
            strokeWidth="2.5"
          />
          {/* Right arc */}
          <path
            d={`M ${lensX} ${axisY - halfH} Q ${lensX + bulge} ${axisY} ${lensX} ${axisY + halfH}`}
            fill="none"
            stroke="#1e40af"
            strokeWidth="2.5"
          />
          {/* Fill between arcs for subtle appearance */}
          <path
            d={`M ${lensX} ${axisY - halfH} Q ${lensX - bulge} ${axisY} ${lensX} ${axisY + halfH} Q ${lensX + bulge} ${axisY} ${lensX} ${axisY - halfH} Z`}
            fill="#93c5fd"
            opacity="0.2"
          />
          {/* Arrowheads at tips */}
          <polygon
            points={`${lensX - 6},${axisY - halfH + 4} ${lensX},${axisY - halfH - 4} ${lensX + 6},${axisY - halfH + 4}`}
            fill="#1e40af"
          />
          <polygon
            points={`${lensX - 6},${axisY + halfH - 4} ${lensX},${axisY + halfH + 4} ${lensX + 6},${axisY + halfH - 4}`}
            fill="#1e40af"
          />
        </g>
      );
    }

    if (element === "concave-lens") {
      // Double concave: two inward-curving arcs
      const bulge = 14;
      return (
        <g>
          {/* Left arc (curves inward = toward center) */}
          <path
            d={`M ${lensX - 8} ${axisY - halfH} Q ${lensX + bulge} ${axisY} ${lensX - 8} ${axisY + halfH}`}
            fill="none"
            stroke="#1e40af"
            strokeWidth="2.5"
          />
          {/* Right arc (curves inward = toward center) */}
          <path
            d={`M ${lensX + 8} ${axisY - halfH} Q ${lensX - bulge} ${axisY} ${lensX + 8} ${axisY + halfH}`}
            fill="none"
            stroke="#1e40af"
            strokeWidth="2.5"
          />
          {/* Subtle fill */}
          <path
            d={`M ${lensX - 8} ${axisY - halfH} Q ${lensX + bulge} ${axisY} ${lensX - 8} ${axisY + halfH}
                L ${lensX + 8} ${axisY + halfH} Q ${lensX - bulge} ${axisY} ${lensX + 8} ${axisY - halfH} Z`}
            fill="#93c5fd"
            opacity="0.15"
          />
          {/* Top connecting line */}
          <line
            x1={lensX - 8} y1={axisY - halfH}
            x2={lensX + 8} y2={axisY - halfH}
            stroke="#1e40af" strokeWidth="2"
          />
          {/* Bottom connecting line */}
          <line
            x1={lensX - 8} y1={axisY + halfH}
            x2={lensX + 8} y2={axisY + halfH}
            stroke="#1e40af" strokeWidth="2"
          />
          {/* Arrowheads at tips */}
          <polygon
            points={`${lensX - 6},${axisY - halfH + 4} ${lensX},${axisY - halfH - 4} ${lensX + 6},${axisY - halfH + 4}`}
            fill="#1e40af"
          />
          <polygon
            points={`${lensX - 6},${axisY + halfH - 4} ${lensX},${axisY + halfH + 4} ${lensX + 6},${axisY + halfH - 4}`}
            fill="#1e40af"
          />
        </g>
      );
    }

    if (element === "concave-mirror") {
      // Concave mirror: curved surface on the right, reflecting side faces left
      const bulge = 25;
      return (
        <g>
          <path
            d={`M ${lensX + 4} ${axisY - halfH} Q ${lensX - bulge} ${axisY} ${lensX + 4} ${axisY + halfH}`}
            fill="none"
            stroke="#475569"
            strokeWidth="3"
          />
          {/* Hatching on the back side (right) */}
          {Array.from({ length: 12 }, (_, i) => {
            const t = (i + 1) / 13;
            const y = axisY - halfH + t * 2 * halfH;
            // Quadratic bezier x at this t
            const qx = (1 - t) * (1 - t) * (lensX + 4) + 2 * (1 - t) * t * (lensX - bulge) + t * t * (lensX + 4);
            return (
              <line
                key={`hatch${i}`}
                x1={qx}
                y1={y}
                x2={qx + 8}
                y2={y - 6}
                stroke="#94a3b8"
                strokeWidth="1"
              />
            );
          })}
        </g>
      );
    }

    if (element === "convex-mirror") {
      // Convex mirror: curved surface on the right, bulging toward the left (reflecting side faces left)
      const bulge = 25;
      return (
        <g>
          <path
            d={`M ${lensX - 4} ${axisY - halfH} Q ${lensX + bulge} ${axisY} ${lensX - 4} ${axisY + halfH}`}
            fill="none"
            stroke="#475569"
            strokeWidth="3"
          />
          {/* Hatching on the back side (right) */}
          {Array.from({ length: 12 }, (_, i) => {
            const t = (i + 1) / 13;
            const y = axisY - halfH + t * 2 * halfH;
            const qx = (1 - t) * (1 - t) * (lensX - 4) + 2 * (1 - t) * t * (lensX + bulge) + t * t * (lensX - 4);
            return (
              <line
                key={`hatch${i}`}
                x1={qx}
                y1={y}
                x2={qx + 8}
                y2={y - 6}
                stroke="#94a3b8"
                strokeWidth="1"
              />
            );
          })}
        </g>
      );
    }

    return null;
  }

  // Format values
  const bDisplay = computed.isInfinite
    ? (computed.bRaw > 0 ? "\u2192 \u221E" : "\u2192 -\u221E")
    : computed.bRaw.toFixed(1);
  const mDisplay = computed.isInfinite
    ? "\u2192 \u221E"
    : computed.m.toFixed(2);
  const hPrimeDisplay = computed.isInfinite
    ? "\u2192 \u221E"
    : Math.abs(computed.hPrime).toFixed(1);

  const imageTypeLabel = computed.isReal ? "re\u00E1ln\u00FD" : "virtu\u00E1ln\u00ED";

  const elementLabels: Record<string, string> = {
    "convex-lens": "Spojka (konvexn\u00ED \u010Do\u010Dka)",
    "concave-lens": "Rozptylka (konk\u00E1vn\u00ED \u010Do\u010Dka)",
    "concave-mirror": "Dut\u00E9 zrcadlo",
    "convex-mirror": "Vypukl\u00E9 zrcadlo",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Element type label */}
      <div className="text-sm font-bold text-muted-foreground">
        {elementLabels[element]}
      </div>

      {/* Values display */}
      <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
        <span className="bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`f = ${f} \\text{ cm}`} />
        </span>
        <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`a = ${a} \\text{ cm}`} />
        </span>
        <span className="bg-purple-100 dark:bg-purple-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`b = ${bDisplay} \\text{ cm}`} />
          <span className="ml-1 text-[10px] opacity-70">({imageTypeLabel})</span>
        </span>
        <span className="bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`m = ${mDisplay}`} />
        </span>
        <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
          <MathDisplay math={`h' = ${hPrimeDisplay} \\text{ cm}`} />
        </span>
      </div>

      {/* SVG Diagram */}
      <div className="flex justify-center w-full">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-lg" aria-label="Geometrick\u00E1 optika">
          <defs>
            <linearGradient id="opticsBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fefce8" />
              <stop offset="100%" stopColor="#fef9c3" />
            </linearGradient>
            <marker id="optAxisArrow" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
            <marker id="optObjArrow" viewBox="0 0 10 7" refX="5" refY="7" markerWidth="8" markerHeight="6" orient="auto">
              <polygon points="0 7, 5 0, 10 7" fill="#334155" />
            </marker>
          </defs>

          {/* Background */}
          <rect x={0} y={0} width={svgW} height={svgH} fill="url(#opticsBg)" rx={8} />

          {/* Subtle grid */}
          {Array.from({ length: 9 }, (_, i) => {
            const x = 40 + i * 45;
            return <line key={`gv${i}`} x1={x} y1={10} x2={x} y2={svgH - 10} stroke="#e5e7eb" strokeWidth="0.4" />;
          })}
          {Array.from({ length: 6 }, (_, i) => {
            const y = 25 + i * 50;
            return <line key={`gh${i}`} x1={10} y1={y} x2={svgW - 10} y2={y} stroke="#e5e7eb" strokeWidth="0.4" />;
          })}

          {/* Optical axis */}
          <line
            x1={10}
            y1={axisY}
            x2={svgW - 10}
            y2={axisY}
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerStart="url(#optAxisArrow)"
            markerEnd="url(#optAxisArrow)"
          />

          {/* Focal points */}
          <circle cx={focalPoints.f1x} cy={axisY} r={4} fill="#f97316" />
          <text
            x={focalPoints.f1x}
            y={axisY + 16}
            textAnchor="middle"
            fill="#f97316"
            fontSize="12"
            fontWeight="bold"
          >
            {focalPoints.f1Label}
          </text>

          <circle cx={focalPoints.f2x} cy={axisY} r={4} fill="#f97316" />
          <text
            x={focalPoints.f2x}
            y={axisY + 16}
            textAnchor="middle"
            fill="#f97316"
            fontSize="12"
            fontWeight="bold"
          >
            {focalPoints.f2Label}
          </text>

          {/* Center mark on optical axis */}
          <circle cx={lensX} cy={axisY} r={3} fill="#64748b" />

          {/* Optical element (lens or mirror) */}
          {renderOpticalElement()}

          {/* Principal rays */}
          {rays.map((ray, ri) =>
            ray.segments.map((seg, si) => (
              <line
                key={`ray${ri}-${si}`}
                x1={seg.x1}
                y1={seg.y1}
                x2={seg.x2}
                y2={seg.y2}
                stroke={ray.color}
                strokeWidth="1.5"
                strokeDasharray={seg.dashed ? "5 3" : undefined}
                opacity={seg.dashed ? 0.5 : 0.8}
              />
            ))
          )}

          {/* Object arrow */}
          <line
            x1={objectSvgX}
            y1={axisY}
            x2={objectSvgX}
            y2={objectTopY}
            stroke="#334155"
            strokeWidth="2.5"
          />
          {/* Object arrowhead */}
          <polygon
            points={`${objectSvgX - 5},${objectTopY + 8} ${objectSvgX},${objectTopY - 2} ${objectSvgX + 5},${objectTopY + 8}`}
            fill="#334155"
          />
          {/* Object label */}
          <text
            x={objectSvgX}
            y={objectTopY - 8}
            textAnchor="middle"
            fill="#334155"
            fontSize="12"
            fontWeight="bold"
          >
            P
          </text>

          {/* Image arrow (if not at infinity) */}
          {!computed.isInfinite && (
            <g>
              <line
                x1={imageSvgX}
                y1={axisY}
                x2={imageSvgX}
                y2={imageTopY}
                stroke={computed.isReal ? "#7c3aed" : "#7c3aed"}
                strokeWidth="2.5"
                strokeDasharray={computed.isVirtual ? "5 3" : undefined}
              />
              {/* Image arrowhead */}
              {imageHeight < 0 ? (
                // Arrow points downward (inverted image)
                <polygon
                  points={`${imageSvgX - 5},${imageTopY - 8} ${imageSvgX},${imageTopY + 2} ${imageSvgX + 5},${imageTopY - 8}`}
                  fill="#7c3aed"
                  opacity={computed.isVirtual ? 0.6 : 1}
                />
              ) : (
                // Arrow points upward (upright image)
                <polygon
                  points={`${imageSvgX - 5},${imageTopY + 8} ${imageSvgX},${imageTopY - 2} ${imageSvgX + 5},${imageTopY + 8}`}
                  fill="#7c3aed"
                  opacity={computed.isVirtual ? 0.6 : 1}
                />
              )}
              {/* Image label */}
              <text
                x={imageSvgX}
                y={imageHeight < 0 ? imageTopY + 18 : imageTopY - 8}
                textAnchor="middle"
                fill="#7c3aed"
                fontSize="12"
                fontWeight="bold"
                opacity={computed.isVirtual ? 0.7 : 1}
              >
                P&apos;
              </text>
            </g>
          )}

          {/* Infinity indication when image is at infinity */}
          {computed.isInfinite && (
            <text
              x={lensX + (isMirror ? -60 : 60)}
              y={axisY - 20}
              textAnchor="middle"
              fill="#7c3aed"
              fontSize="14"
              fontWeight="bold"
            >
              P&apos; {"\u2192"} {"\u221E"}
            </text>
          )}

          {/* Distance labels */}
          <line
            x1={objectSvgX}
            y1={axisY + 25}
            x2={lensX}
            y2={axisY + 25}
            stroke="#3b82f6"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <text
            x={(objectSvgX + lensX) / 2}
            y={axisY + 38}
            textAnchor="middle"
            fill="#3b82f6"
            fontSize="10"
            fontWeight="bold"
          >
            a = {a} cm
          </text>

          {!computed.isInfinite && (
            <>
              <line
                x1={lensX}
                y1={axisY + 25}
                x2={imageSvgX}
                y2={axisY + 25}
                stroke="#7c3aed"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <text
                x={(lensX + imageSvgX) / 2}
                y={axisY + 48}
                textAnchor="middle"
                fill="#7c3aed"
                fontSize="10"
                fontWeight="bold"
              >
                b = {computed.bRaw.toFixed(1)} cm
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-xs mx-auto space-y-1">
        <SliderControl
          label="f"
          value={f}
          min={2}
          max={15}
          step={0.5}
          unit="cm"
          onChange={setF}
          color="#f97316"
        />
        <SliderControl
          label="a"
          value={a}
          min={2}
          max={25}
          step={0.5}
          unit="cm"
          onChange={setA}
          color="#3b82f6"
        />
        <SliderControl
          label="h"
          value={h}
          min={1}
          max={5}
          step={0.5}
          unit="cm"
          onChange={setH}
          color="#22c55e"
        />
      </div>

      {/* Formula display */}
      <div className="text-center text-xs text-muted-foreground space-y-1">
        <MathDisplay math="\\frac{1}{f} = \\frac{1}{a} + \\frac{1}{b}, \\quad m = -\\frac{b}{a}" />
      </div>
    </div>
  );
}
