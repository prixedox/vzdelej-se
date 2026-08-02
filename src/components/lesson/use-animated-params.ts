"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { lerpParams } from "@/lib/lesson/lerp-params";

const DURATION_MS = 520;

const easeOutCubic = (k: number) => 1 - Math.pow(1 - k, 3);

/**
 * Stage parameters with two write modes: `setNow` for direct manipulation
 * (dragging must feel instant) and `springTo` for beat presets (the change
 * must be watchable). Honors prefers-reduced-motion by snapping.
 */
export function useAnimatedParams(initial: Record<string, number>) {
  const [params, setParams] = useState(initial);
  const paramsRef = useRef(initial);
  const frameRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const commit = useCallback((next: Record<string, number>) => {
    paramsRef.current = next;
    setParams(next);
  }, []);

  const cancel = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const setNow = useCallback(
    (next: Record<string, number>) => {
      cancel();
      commit(next);
    },
    [cancel, commit]
  );

  const springTo = useCallback(
    (target: Record<string, number>) => {
      cancel();
      if (reduceMotion) {
        commit({ ...paramsRef.current, ...target });
        return;
      }
      const from = { ...paramsRef.current };
      const start = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - start) / DURATION_MS);
        commit(lerpParams(from, target, easeOutCubic(k)));
        frameRef.current = k < 1 ? requestAnimationFrame(tick) : null;
      };
      frameRef.current = requestAnimationFrame(tick);
    },
    [cancel, commit, reduceMotion]
  );

  useEffect(() => cancel, [cancel]);

  return { params, setNow, springTo };
}
