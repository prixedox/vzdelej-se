/**
 * Pure readouts for the `motion-timeline` stage: uniformly accelerated motion
 * s(t) = v0·t + a·t²/2, with a secant over the interval [t, t+h].
 *
 * `gapToInstant` is the manipulate goal: shrink h and watch the secant slope
 * converge on the instantaneous velocity.
 */

export const MOTION_TIMELINE_PARAMS = ["t", "h", "v0", "a"];
export const MOTION_TIMELINE_READOUTS = [
  "position",
  "instantVelocity",
  "secantSlope",
  "gapToInstant",
];

/** Below this the secant is numerically indistinguishable from the tangent. */
const MIN_H = 1e-4;

function s(t: number, v0: number, a: number): number {
  return v0 * t + (a * t * t) / 2;
}

export function readouts(p: Record<string, number>): Record<string, number> {
  const t = Number.isFinite(p.t) ? p.t : 0;
  const v0 = Number.isFinite(p.v0) ? p.v0 : 0;
  const a = Number.isFinite(p.a) ? p.a : 0;
  const h = Math.max(MIN_H, Number.isFinite(p.h) ? Math.abs(p.h) : MIN_H);

  const instantVelocity = v0 + a * t;
  const secantSlope = (s(t + h, v0, a) - s(t, v0, a)) / h;

  return {
    position: s(t, v0, a),
    instantVelocity,
    secantSlope,
    gapToInstant: secantSlope - instantVelocity,
  };
}
