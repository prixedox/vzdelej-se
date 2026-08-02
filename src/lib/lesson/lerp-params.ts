/**
 * Linear interpolation between two stage parameter maps.
 *
 * The stage renders from the interpolated value, so a beat preset makes the
 * curve travel to its new configuration instead of jumping — the student sees
 * the transformation, which is the whole point of the format.
 */
export function lerpParams(
  from: Record<string, number>,
  to: Record<string, number>,
  k: number
): Record<string, number> {
  const clamped = Math.min(1, Math.max(0, k));
  const out: Record<string, number> = { ...from };
  for (const [key, target] of Object.entries(to)) {
    const start = from[key];
    out[key] = typeof start === "number" ? start + (target - start) * clamped : target;
  }
  return out;
}
