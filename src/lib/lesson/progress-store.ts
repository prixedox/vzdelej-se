/**
 * localStorage tracking for chapter progress (mastery gates, tiers, streak,
 * spaced retrieval).
 */

const STORAGE_KEY = "vzdelej-se-progress-v2";

export interface LessonResult {
  completedAt: number;
  score: number;
  correctAnswers: number;
  totalProblems: number;
  timeSpentMs?: number;
}

export interface ChapterProgress {
  bestScore: number;
  completionCount: number;
  lastCompletedAt: number;
  results: LessonResult[];
  tier: "bronze" | "silver" | "gold" | null;
  /** True for stage-format chapters, which are never scored or tiered. */
  derived?: boolean;
}

export interface ProgressData {
  /** Keyed by `${topicSlug}/${chapterSlug}`. */
  chapters: Record<string, ChapterProgress>;
  streak: number;
  lastActivityAt: number;
}

function getDefaultProgress(): ProgressData {
  return { chapters: {}, streak: 0, lastActivityAt: Date.now() };
}

function isProgressData(value: unknown): value is ProgressData {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.chapters === "object" &&
    v.chapters !== null &&
    !Array.isArray(v.chapters) &&
    typeof v.streak === "number" &&
    typeof v.lastActivityAt === "number"
  );
}

export function loadProgress(): ProgressData {
  if (typeof window === "undefined") return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    const parsed: unknown = JSON.parse(raw);
    if (!isProgressData(parsed)) return getDefaultProgress();
    return parsed;
  } catch {
    return getDefaultProgress();
  }
}

function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // quota/unavailable — silent
  }
}

function computeTier(score: number): "bronze" | "silver" | "gold" | null {
  if (score >= 1) return "gold";
  if (score >= 0.8) return "silver";
  if (score > 0) return "bronze";
  return null;
}

function tierRank(tier: "bronze" | "silver" | "gold"): number {
  return tier === "gold" ? 3 : tier === "silver" ? 2 : 1;
}

function chapterKey(topicSlug: string, chapterSlug: string): string {
  return `${topicSlug}/${chapterSlug}`;
}

export function recordChapterCompletion(
  topicSlug: string,
  chapterSlug: string,
  result: LessonResult
): ProgressData {
  const progress = loadProgress();
  const key = chapterKey(topicSlug, chapterSlug);
  const existing = progress.chapters[key];
  const tier = computeTier(result.score);

  if (existing) {
    existing.completionCount += 1;
    existing.lastCompletedAt = result.completedAt;
    existing.bestScore = Math.max(existing.bestScore, result.score);
    existing.results = [result, ...existing.results].slice(0, 5);
    if (tier && (!existing.tier || tierRank(tier) > tierRank(existing.tier))) {
      existing.tier = tier;
    }
  } else {
    progress.chapters[key] = {
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

/**
 * Record that a stage chapter was worked through. Deliberately records no
 * score and no tier: the target learner arrives low on confidence, and
 * grading them would confirm the feeling that sent them here.
 */
export function recordChapterDerived(
  topicSlug: string,
  chapterSlug: string
): ProgressData {
  const data = loadProgress();
  const key = chapterKey(topicSlug, chapterSlug);
  const existing = data.chapters[key];

  data.chapters[key] = {
    bestScore: 0,
    completionCount: (existing?.completionCount ?? 0) + 1,
    lastCompletedAt: Date.now(),
    results: [],
    tier: null,
    derived: true,
  };
  data.lastActivityAt = Date.now();

  saveProgress(data);
  return data;
}

export function getChapterProgress(
  topicSlug: string,
  chapterSlug: string
): ChapterProgress | null {
  return loadProgress().chapters[chapterKey(topicSlug, chapterSlug)] ?? null;
}

export interface TopicAggregateProgress {
  completedChapters: number;
  totalChapters: number;
  /**
   * Lowest (worst) tier across scored (non-derived) chapters; null unless
   * every chapter in the topic is complete. Derived (stage) chapters count
   * toward completion but are excluded from the tier calculation itself —
   * a topic with no scored chapters at all stays null since there is
   * nothing to badge.
   */
  overallTier: "bronze" | "silver" | "gold" | null;
}

export function getTopicAggregateProgress(
  topicSlug: string,
  allChapterSlugs: readonly string[]
): TopicAggregateProgress {
  const progress = loadProgress();
  const completed = allChapterSlugs
    .map((cs) => progress.chapters[chapterKey(topicSlug, cs)])
    .filter((p): p is ChapterProgress => !!p && p.completionCount > 0);

  let overallTier: "bronze" | "silver" | "gold" | null = null;
  if (completed.length === allChapterSlugs.length && completed.length > 0) {
    // Derived (stage) chapters are never scored, so they must not drag the
    // aggregate down to null just for existing. Only graded chapters decide
    // overallTier; a topic with no graded chapters at all has nothing to
    // badge, so it correctly stays null.
    const scored = completed.filter((p) => !p.derived);
    if (scored.length > 0) {
      const ranks = scored.map((p) => (p.tier ? tierRank(p.tier) : 0));
      const minRank = Math.min(...ranks);
      overallTier =
        minRank === 3 ? "gold" : minRank === 2 ? "silver" : minRank === 1 ? "bronze" : null;
    }
  }

  return {
    completedChapters: completed.length,
    totalChapters: allChapterSlugs.length,
    overallTier,
  };
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

/**
 * Chapters due for review (spaced retrieval).
 * Intervals: 1d, 3d, 7d, 14d, 30d — per retry.
 * Returns `${topicSlug}/${chapterSlug}` keys.
 */
export function getChaptersForReview(limit = 3): string[] {
  const progress = loadProgress();
  const now = Date.now();
  const intervals = [1, 3, 7, 14, 30];

  return Object.entries(progress.chapters)
    .filter(([, cp]) => cp.completionCount > 0)
    .map(([key, cp]) => {
      const intervalDays = intervals[Math.min(cp.completionCount - 1, intervals.length - 1)];
      const dueAt = cp.lastCompletedAt + intervalDays * 24 * 60 * 60 * 1000;
      return { key, overdue: now - dueAt };
    })
    .filter(({ overdue }) => overdue > 0)
    .sort((a, b) => b.overdue - a.overdue)
    .slice(0, limit)
    .map(({ key }) => key);
}

export function getCompletedChapterKeys(): string[] {
  const progress = loadProgress();
  return Object.keys(progress.chapters).filter(
    (k) => progress.chapters[k].completionCount > 0
  );
}
