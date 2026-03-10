/**
 * Lightweight localStorage tracking for lesson progress.
 * Used for: mastery gates, challenge tiers, streak system, spaced retrieval.
 */

const STORAGE_KEY = "vzdelej-se-progress";

export interface LessonResult {
  completedAt: number; // timestamp
  score: number; // 0-1
  correctAnswers: number;
  totalProblems: number;
  timeSpentMs?: number;
}

export interface TopicProgress {
  /** Best result for this topic */
  bestScore: number;
  /** Number of times completed */
  completionCount: number;
  /** Last completion timestamp */
  lastCompletedAt: number;
  /** All results (most recent first, keep last 5) */
  results: LessonResult[];
  /** Challenge tier: "bronze" | "silver" | "gold" | null */
  tier: "bronze" | "silver" | "gold" | null;
}

export interface ProgressData {
  topics: Record<string, TopicProgress>;
  /** Current streak (consecutive correct answers across sessions) */
  streak: number;
  /** Last activity timestamp */
  lastActivityAt: number;
}

function getDefaultProgress(): ProgressData {
  return {
    topics: {},
    streak: 0,
    lastActivityAt: Date.now(),
  };
}

export function loadProgress(): ProgressData {
  if (typeof window === "undefined") return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    return JSON.parse(raw) as ProgressData;
  } catch {
    return getDefaultProgress();
  }
}

function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

function computeTier(score: number): "bronze" | "silver" | "gold" | null {
  if (score >= 1) return "gold";
  if (score >= 0.8) return "silver";
  if (score > 0) return "bronze";
  return null;
}

export function recordLessonCompletion(
  topicSlug: string,
  result: LessonResult
): ProgressData {
  const progress = loadProgress();

  const existing = progress.topics[topicSlug];
  const tier = computeTier(result.score);

  if (existing) {
    existing.completionCount += 1;
    existing.lastCompletedAt = result.completedAt;
    existing.bestScore = Math.max(existing.bestScore, result.score);
    existing.results = [result, ...existing.results].slice(0, 5);
    // Only upgrade tier, never downgrade
    if (tier && (!existing.tier || tierRank(tier) > tierRank(existing.tier))) {
      existing.tier = tier;
    }
  } else {
    progress.topics[topicSlug] = {
      bestScore: result.score,
      completionCount: 1,
      lastCompletedAt: result.completedAt,
      results: [result],
      tier,
    };
  }

  progress.lastActivityAt = Date.now();
  saveProgress(progress);
  return progress;
}

function tierRank(tier: "bronze" | "silver" | "gold"): number {
  return tier === "gold" ? 3 : tier === "silver" ? 2 : 1;
}

export function getTopicProgress(topicSlug: string): TopicProgress | null {
  const progress = loadProgress();
  return progress.topics[topicSlug] ?? null;
}

export function updateStreak(correct: boolean): number {
  const progress = loadProgress();
  progress.streak = correct ? progress.streak + 1 : 0;
  progress.lastActivityAt = Date.now();
  saveProgress(progress);
  return progress.streak;
}

export function getStreak(): number {
  return loadProgress().streak;
}

/** Get topics sorted by when they should be reviewed (spaced retrieval) */
export function getTopicsForReview(limit = 3): string[] {
  const progress = loadProgress();
  const now = Date.now();

  return Object.entries(progress.topics)
    .filter(([, tp]) => tp.completionCount > 0)
    .map(([slug, tp]) => {
      // Spacing interval grows with completions: 1d, 3d, 7d, 14d, 30d
      const intervals = [1, 3, 7, 14, 30];
      const intervalDays = intervals[Math.min(tp.completionCount - 1, intervals.length - 1)];
      const intervalMs = intervalDays * 24 * 60 * 60 * 1000;
      const dueAt = tp.lastCompletedAt + intervalMs;
      const overdue = now - dueAt;
      return { slug, overdue };
    })
    .filter(({ overdue }) => overdue > 0)
    .sort((a, b) => b.overdue - a.overdue)
    .slice(0, limit)
    .map(({ slug }) => slug);
}

/** Get all completed topic slugs */
export function getCompletedTopics(): string[] {
  const progress = loadProgress();
  return Object.keys(progress.topics).filter(
    (slug) => progress.topics[slug].completionCount > 0
  );
}
