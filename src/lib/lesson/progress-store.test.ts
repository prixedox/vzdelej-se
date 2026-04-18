import { describe, it, expect, beforeEach } from "vitest";
import {
  loadProgress,
  recordLessonCompletion,
  getTopicProgress,
  updateStreak,
  getTopicsForReview,
} from "./progress-store";

const STORAGE_KEY = "vzdelej-se-progress";

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
  // @ts-expect-error — override for tests
  globalThis.window = { localStorage: new MemoryStorage() };
  // @ts-expect-error
  globalThis.localStorage = globalThis.window.localStorage;
});

describe("loadProgress shape guard", () => {
  it("returns defaults when storage is empty", () => {
    const p = loadProgress();
    expect(p.topics).toEqual({});
    expect(p.streak).toBe(0);
  });

  it("returns defaults for 'null' JSON", () => {
    localStorage.setItem(STORAGE_KEY, "null");
    const p = loadProgress();
    expect(p.topics).toEqual({});
  });

  it("returns defaults for missing topics field", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ streak: 5, lastActivityAt: 0 }));
    const p = loadProgress();
    expect(p.topics).toEqual({});
    expect(p.streak).toBe(0);
  });

  it("returns defaults for topics-as-array", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ topics: [], streak: 0, lastActivityAt: 0 }));
    const p = loadProgress();
    expect(p.topics).toEqual({});
  });

  it("returns defaults for invalid JSON", () => {
    localStorage.setItem(STORAGE_KEY, "{not-json");
    const p = loadProgress();
    expect(p.topics).toEqual({});
  });

  it("accepts valid saved data", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      topics: { "foo": { bestScore: 1, completionCount: 1, lastCompletedAt: 0, results: [], tier: "gold" } },
      streak: 3,
      lastActivityAt: 123,
    }));
    const p = loadProgress();
    expect(p.streak).toBe(3);
    expect(getTopicProgress("foo")?.tier).toBe("gold");
  });
});

describe("tier progression", () => {
  it("never downgrades a tier", () => {
    recordLessonCompletion("x", { completedAt: 1, score: 1, correctAnswers: 5, totalProblems: 5 });
    expect(getTopicProgress("x")?.tier).toBe("gold");
    recordLessonCompletion("x", { completedAt: 2, score: 0.5, correctAnswers: 1, totalProblems: 2 });
    expect(getTopicProgress("x")?.tier).toBe("gold");
  });

  it("computes bronze/silver/gold bands", () => {
    recordLessonCompletion("a", { completedAt: 1, score: 0.5, correctAnswers: 1, totalProblems: 2 });
    expect(getTopicProgress("a")?.tier).toBe("bronze");
    recordLessonCompletion("b", { completedAt: 1, score: 0.85, correctAnswers: 17, totalProblems: 20 });
    expect(getTopicProgress("b")?.tier).toBe("silver");
    recordLessonCompletion("c", { completedAt: 1, score: 1, correctAnswers: 5, totalProblems: 5 });
    expect(getTopicProgress("c")?.tier).toBe("gold");
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

describe("spaced retrieval intervals", () => {
  it("includes only overdue topics", () => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      topics: {
        "due": { bestScore: 1, completionCount: 1, lastCompletedAt: now - 2 * oneDay, results: [], tier: "gold" },
        "fresh": { bestScore: 1, completionCount: 1, lastCompletedAt: now, results: [], tier: "gold" },
      },
      streak: 0,
      lastActivityAt: 0,
    }));
    const review = getTopicsForReview();
    expect(review).toContain("due");
    expect(review).not.toContain("fresh");
  });
});
