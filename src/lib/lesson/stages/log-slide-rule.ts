/**
 * Pure readouts for the `log-slide-rule` stage.
 *
 * Both rulers carry a log10 scale over 1..10. Shifting the top ruler right by
 * `offset` (in log10 units) puts 10^offset of the bottom ruler under the top
 * ruler's 1 — so sliding adds lengths and therefore multiplies numbers.
 */

export const LOG_SLIDE_RULE_PARAMS = ["offset"];
export const LOG_SLIDE_RULE_READOUTS = ["alignedValue", "offsetLog"];

export function readouts(p: Record<string, number>): Record<string, number> {
  const offset = Number.isFinite(p.offset) ? p.offset : 0;
  return {
    alignedValue: Math.pow(10, offset),
    offsetLog: offset,
  };
}
