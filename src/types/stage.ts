import type { LessonStep } from "./lesson";

/** Registered manipulables. Adding one requires a registry entry + component. */
export type StageType = "parabola-roots" | "log-slide-rule" | "motion-timeline";

export interface StageSpec {
  type: StageType;
  /** Starting parameter values. Keys must be params the stage declares. */
  initial: Record<string, number>;
  /** Named quantities the stage computes. Beat goals may only reference these. */
  readouts: string[];
}

/** A declarative success condition on a single readout. */
export interface Goal {
  readout: string;
  target: number;
  within: number;
}

interface BeatBase {
  /** Czech. What to look at or do. */
  prompt: string;
  /** Stage springs to these params on beat entry. */
  preset?: Record<string, number>;
  /** Stage part ids to spotlight. */
  highlight?: string[];
}

export interface ObserveBeat extends BeatBase {
  kind: "observe";
}

export interface ManipulateBeat extends BeatBase {
  kind: "manipulate";
  goal: Goal;
  /** Fires the instant the goal holds. Czech. */
  onReached: string;
  /**
   * Rendered immediately whenever the goal is not yet met — there is no
   * "struggled for a while" delay before it appears. Shown alongside the
   * "Ukaž mi to" escape. Czech.
   */
  nudge?: string;
}

export interface PredictBeat extends BeatBase {
  kind: "predict";
  question: string;
  options: { label: string; isCorrect: boolean }[];
  /** Stage springs here after they answer, so they watch the outcome. */
  then: Record<string, number>;
  reveal: string;
}

export type Beat = ObserveBeat | ManipulateBeat | PredictBeat;

/**
 * The naming moment is a required top-level field, not a Beat variant.
 * This makes a formula-first stage lesson unrepresentable.
 */
export interface NamingBeat {
  /** The pattern in words, before any symbol. Czech. */
  observation: string;
  /** The formula. Its first appearance in the lesson. LaTeX. */
  formula: string;
  /** How the symbols map onto what was just seen. Czech. */
  mapping: string;
}

export interface StageLesson {
  title?: string;
  stage: StageSpec;
  /** Attention-driving sequence. The formula does NOT appear here. */
  beats: Beat[];
  naming: NamingBeat;
  /** Practice after the name exists. Reuses the existing step union. */
  apply?: LessonStep[];
  summary: { keyTakeaways: string[] };
  nextTopicSuggestion?: string;
}
