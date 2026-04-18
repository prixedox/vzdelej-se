import { describe, it, expect, beforeEach } from "vitest";
import {
  loadProgress,
  recordChapterCompletion,
  getChapterProgress,
  getTopicAggregateProgress,
  updateStreak,
  getChaptersForReview,
} from "./progress-store";

const STORAGE_KEY = "vzdelej-se-progress-v2";

class MemoryStorage implements Storage {
  private store = new Map<string, string>();
  get length() { return this.store.size; }
  clear() { this.store.clear(); }
  getItem(k: string) { return this.store.get(k) ?? null; }
  key(i: number) { return Array.from(this.store.keys())[i] ?? null; }
  removeItem(k: string) { this.store.delete(k); }
  setItem(k: string, v: string) { this.store.set(k, v); }
}

beforeEach(() => {
  // @ts-expect-error — minimal window shim for tests
  globalThis.window = { localStorage: new MemoryStorage() };
  globalThis.localStorage = (globalThis.window as { localStorage: Storage }).localStorage;
});

describe("loadProgress shape guard", () => {
  it("returns defaults when empty", () => {
    expect(loadProgress().chapters).toEqual({});
  });

  it("returns defaults for 'null' JSON", () => {
    localStorage.setItem(STORAGE_KEY, "null");
    expect(loadProgress().chapters).toEqual({});
  });

  it("returns defaults for missing chapters field", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ streak: 5, lastActivityAt: 0 }));
    expect(loadProgress().chapters).toEqual({});
  });

  it("returns defaults for chapters-as-array", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ chapters: [], streak: 0, lastActivityAt: 0 })
    );
    expect(loadProgress().chapters).toEqual({});
  });
});

describe("tier progression per chapter", () => {
  it("never downgrades", () => {
    recordChapterCompletion("t", "a", {
      completedAt: 1,
      score: 1,
      correctAnswers: 5,
      totalProblems: 5,
    });
    expect(getChapterProgress("t", "a")?.tier).toBe("gold");
    recordChapterCompletion("t", "a", {
      completedAt: 2,
      score: 0.5,
      correctAnswers: 1,
      totalProblems: 2,
    });
    expect(getChapterProgress("t", "a")?.tier).toBe("gold");
  });

  it("chapter keys are independent within a topic", () => {
    recordChapterCompletion("t", "a", {
      completedAt: 1,
      score: 1,
      correctAnswers: 5,
      totalProblems: 5,
    });
    recordChapterCompletion("t", "b", {
      completedAt: 1,
      score: 0.5,
      correctAnswers: 1,
      totalProblems: 2,
    });
    expect(getChapterProgress("t", "a")?.tier).toBe("gold");
    expect(getChapterProgress("t", "b")?.tier).toBe("bronze");
  });
});

describe("topic aggregate", () => {
  it("gold only when every chapter is gold", () => {
    recordChapterCompletion("t", "a", {
      completedAt: 1,
      score: 1,
      correctAnswers: 1,
      totalProblems: 1,
    });
    recordChapterCompletion("t", "b", {
      completedAt: 1,
      score: 0.5,
      correctAnswers: 1,
      totalProblems: 2,
    });
    const agg = getTopicAggregateProgress("t", ["a", "b"]);
    expect(agg.completedChapters).toBe(2);
    expect(agg.totalChapters).toBe(2);
    expect(agg.overallTier).toBe("bronze");
  });

  it("null overallTier when any chapter is incomplete", () => {
    recordChapterCompletion("t", "a", {
      completedAt: 1,
      score: 1,
      correctAnswers: 1,
      totalProblems: 1,
    });
    const agg = getTopicAggregateProgress("t", ["a", "b"]);
    expect(agg.completedChapters).toBe(1);
    expect(agg.overallTier).toBeNull();
  });
});

describe("streak", () => {
  it("increments on correct, resets on wrong", () => {
    expect(updateStreak(true)).toBe(1);
    expect(updateStreak(true)).toBe(2);
    expect(updateStreak(false)).toBe(0);
    expect(updateStreak(true)).toBe(1);
  });
});

describe("spaced retrieval", () => {
  it("returns overdue chapter keys", () => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        chapters: {
          "t/due": {
            bestScore: 1,
            completionCount: 1,
            lastCompletedAt: now - 2 * oneDay,
            results: [],
            tier: "gold",
          },
          "t/fresh": {
            bestScore: 1,
            completionCount: 1,
            lastCompletedAt: now,
            results: [],
            tier: "gold",
          },
        },
        streak: 0,
        lastActivityAt: 0,
      })
    );
    const review = getChaptersForReview();
    expect(review).toContain("t/due");
    expect(review).not.toContain("t/fresh");
  });
});
