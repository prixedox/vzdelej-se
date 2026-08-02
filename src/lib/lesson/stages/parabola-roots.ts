/**
 * Pure readouts for the `parabola-roots` stage: y = ax² + bx + c.
 * No React. Goal detection runs against these values.
 */

export const PARABOLA_ROOTS_PARAMS = ["a", "b", "c"];
export const PARABOLA_ROOTS_READOUTS = ["rootCount", "rootGap", "vertexY"];

/** `a` is clamped away from zero — a zero leading coefficient is not a parabola. */
const MIN_A = 1e-6;

/**
 * Single source of truth for the zero-guard on `a`. Anything that divides by
 * `a` — here or in a component recomputing the same discriminant/vertex math
 * (e.g. for drawing root markers or handling a drag) — must clamp through
 * this, not redeclare `MIN_A` locally.
 */
export function safeA(a: number): number {
  return Math.abs(a) < MIN_A ? (a < 0 ? -MIN_A : MIN_A) : a;
}

export function readouts(p: Record<string, number>): Record<string, number> {
  const a = safeA(p.a);
  const b = p.b ?? 0;
  const c = p.c ?? 0;
  const d = b * b - 4 * a * c;

  // Signed, so the value passes continuously through zero: overshooting the
  // touching point reads negative rather than looking like another "just touching".
  const rootGap = (Math.sign(d) * Math.sqrt(Math.abs(d))) / Math.abs(a);

  return {
    rootCount: d > 0 ? 2 : d === 0 ? 1 : 0,
    rootGap,
    vertexY: c - (b * b) / (4 * a),
  };
}
