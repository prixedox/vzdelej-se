import type { Goal } from "@/types/stage";

/**
 * Declarative goal check. Mirrors `answer-evaluator.ts`: never throws,
 * always returns a boolean. An unreachable goal cannot trap a student
 * because the manipulate beat always offers "ukaž mi to".
 */
export function isGoalMet(goal: Goal, readouts: Record<string, number>): boolean {
  const value = readouts[goal.readout];
  if (typeof value !== "number" || !Number.isFinite(value)) return false;
  if (!Number.isFinite(goal.target) || !Number.isFinite(goal.within)) return false;
  if (goal.within < 0) return false;
  return Math.abs(value - goal.target) <= goal.within;
}
