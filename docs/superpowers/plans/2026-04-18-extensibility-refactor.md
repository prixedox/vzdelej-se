# Extensibility Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the content pipeline to a chapter-based structure with English slugs, auto-generated registry, Zod validation, Vitest tests, and scaffolding CLIs — removing V1 lesson code in the process.

**Architecture:** Each topic is a folder of chapter files. A codegen script produces the registry (`data.generated.ts`). Zod validates content and cross-checks against the topic tree on every build. V1 lesson types and components are deleted.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Zod 4, Vitest 2, tsx, pnpm.

**Reference spec:** `docs/superpowers/specs/2026-04-18-extensibility-refactor-design.md`

**Commit layout:**
1. Foundations — Vitest + safety-net tests
2. Content migration — schemas, codegen, validation, migration of 35 lessons
3. Routes + V1 deletion — chapter routes, delete V1 code, rename V2 → default
4. CLIs + CLAUDE.md — scaffolders, docs, cleanup

---

## Prerequisites

- [ ] **Pre-0: Verify clean working tree**

Run:
```bash
git status
```
Expected: "nothing to commit, working tree clean" on branch `main`.

If dirty: stash or commit before proceeding.

- [ ] **Pre-1: Verify baseline build + lint**

Run:
```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm build 2>&1 | tail -5
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm lint 2>&1 | tail -3
```
Expected:
- Build: exit 0, "✓ Generating static pages"
- Lint: `✖ 76 problems (53 errors, 23 warnings)` (pre-existing, not a regression)

If either fails with a different error: stop and investigate.

---

# COMMIT 1 — FOUNDATIONS (Vitest + safety-net tests)

## Task 1.1: Install Vitest and tsx

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Install devDeps**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm add -D vitest@^2 @vitest/ui@^2 tsx@^4
```
Expected: devDependencies updated, no build errors.

- [ ] **Step 2: Add test scripts to `package.json`**

Modify `package.json` `scripts`:
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

- [ ] **Step 3: Create `vitest.config.ts`**

Full contents:
```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "scripts/**/*.test.ts"],
    globals: false,
  },
});
```

- [ ] **Step 4: Verify Vitest runs (empty suite)**

Run:
```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm test:run
```
Expected: "No test files found" with exit 0 or explicit "no tests" message (Vitest exits 0 when `--passWithNoTests` is default-off — if it exits 1, add `passWithNoTests: true` to `vitest.config.ts` `test` block, re-run).

## Task 1.2: Progress-store tests

**Files:**
- Create: `src/lib/lesson/progress-store.test.ts`

- [ ] **Step 1: Write the test file**

Full contents:
```ts
import { describe, it, expect, beforeEach } from "vitest";
import {
  loadProgress,
  recordLessonCompletion,
  getTopicProgress,
  updateStreak,
  getTopicsForReview,
} from "./progress-store";

const STORAGE_KEY = "vzdelej-se-progress";

// jsdom/node: provide a minimal localStorage shim
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
    // completionCount=1 → 1-day interval
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
```

- [ ] **Step 2: Run and verify**

Run:
```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm test:run src/lib/lesson/progress-store.test.ts
```
Expected: all tests pass.

If `loadProgress shape guard` tests fail: progress-store lacks the shape guard. (Should be present from commit `75afecd`.)

## Task 1.3: Build-slides-v2 tests

**Files:**
- Create: `src/lib/lesson/build-slides-v2.test.ts`

- [ ] **Step 1: Write the test file**

Full contents:
```ts
import { describe, it, expect } from "vitest";
import { buildSlidesV2 } from "./build-slides-v2";
import type { LessonV2 } from "@/types/lesson-v2";

const baseLesson: LessonV2 = {
  title: "Test",
  steps: [
    { type: "explain", body: "intro" },
    {
      type: "multiple-choice",
      question: "Q?",
      choices: [
        { label: "A", isCorrect: true, feedback: "right" },
        { label: "B", isCorrect: false, feedback: "wrong" },
      ],
      explanation: "because",
    },
  ],
  summary: { keyTakeaways: ["k1"] },
};

describe("buildSlidesV2", () => {
  it("produces steps + summary + complete", () => {
    const slides = buildSlidesV2(baseLesson);
    // 2 steps + summary + complete = 4
    expect(slides).toHaveLength(4);
    expect(slides[0].type).toBe("explain-v2");
    expect(slides[1].type).toBe("multiple-choice-v2");
    expect(slides[2].type).toBe("summary-v2");
    expect(slides[3].type).toBe("complete-v2");
  });

  it("prepends narrative when present", () => {
    const slides = buildSlidesV2({ ...baseLesson, narrative: "Once upon a time…" });
    // narrative + 2 steps + summary + complete = 5
    expect(slides).toHaveLength(5);
    expect(slides[0].type).toBe("explain-v2");
    if (slides[0].type === "explain-v2") {
      expect(slides[0].step.body).toBe("Once upon a time…");
      expect(slides[0].step.callout).toBe("Příběh");
    }
  });

  it("assigns monotonic stepIndex and consistent totalSteps", () => {
    const slides = buildSlidesV2(baseLesson);
    slides.forEach((s, i) => expect(s.stepIndex).toBe(i));
    const total = slides[0].totalSteps;
    slides.forEach((s) => expect(s.totalSteps).toBe(total));
    expect(total).toBe(4);
  });

  it("maps every step variant correctly", () => {
    const allVariants: LessonV2 = {
      title: "t",
      steps: [
        { type: "explain", body: "b" },
        { type: "multiple-choice", question: "q", choices: [{ label: "a", isCorrect: true, feedback: "" }], explanation: "" },
        { type: "text-input", question: "q", expectedAnswer: "a", explanation: "" },
        { type: "explore", prompt: "p", visual: { type: "balance-scale", props: {} } },
        { type: "reveal", question: "q", revealedContent: "r" },
        { type: "sort-order", question: "q", items: ["a", "b"], explanation: "" },
        {
          type: "prediction",
          scenario: "s",
          question: "q",
          options: [{ label: "a", isCorrect: true }, { label: "b", isCorrect: false }],
          reveal: "r",
        },
      ],
      summary: { keyTakeaways: [] },
    };
    const slides = buildSlidesV2(allVariants);
    const types = slides.slice(0, -2).map((s) => s.type);
    expect(types).toEqual([
      "explain-v2",
      "multiple-choice-v2",
      "text-input-v2",
      "explore-v2",
      "reveal-v2",
      "sort-order-v2",
      "prediction-v2",
    ]);
  });
});
```

- [ ] **Step 2: Run and verify**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm test:run src/lib/lesson/build-slides-v2.test.ts
```
Expected: all pass.

## Task 1.4: Commit foundations

- [ ] **Step 1: Verify all tests + build still work**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm test:run && pnpm build 2>&1 | tail -5
```
Expected: tests pass, build succeeds.

- [ ] **Step 2: Commit**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts src/lib/lesson/progress-store.test.ts src/lib/lesson/build-slides-v2.test.ts
git commit -m "$(cat <<'EOF'
Add Vitest + safety-net tests for existing pure logic

- Install vitest, @vitest/ui, tsx devDeps
- pnpm test (watch) / pnpm test:run (one-shot)
- Tests: progress-store shape guard, tier rules, spaced intervals,
  streak; buildSlidesV2 narrative injection, stepIndex consistency,
  all step variants

Prep for upcoming content-pipeline refactor.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

# COMMIT 2 — CONTENT MIGRATION (schemas, codegen, 35 lesson rewrite)

## Task 2.1: Chapter type

**Files:**
- Create: `src/types/chapter.ts`

- [ ] **Step 1: Create `src/types/chapter.ts`**

Full contents:
```ts
import type { LessonV2 } from "./lesson-v2";

/** A single learnable unit within a topic. */
export interface ChapterDefinition {
  /** URL fragment. Must match filename (sans .ts) and `^[a-z0-9-]+$`. */
  slug: string;
  /** Parent topic's slug. Must match parent directory name and exist in the tree. */
  topicSlug: string;
  /** Sort order within a topic. Unique per topic. */
  order: number;
  /** Display title (Czech). */
  title: string;
  /** The lesson content (steps, narrative, summary). */
  lesson: LessonV2;
}
```

Note: keeps `LessonV2` name for commit 2; renamed to `Lesson` in commit 3 along with V1 deletion.

## Task 2.2: Zod schema

**Files:**
- Create: `src/lib/lessons/schema.ts`
- Create: `src/lib/lessons/schema.test.ts`

- [ ] **Step 1: Write the failing test first**

Full contents of `src/lib/lessons/schema.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { chapterSchema } from "./schema";

const validLesson = {
  steps: [{ type: "explain" as const, body: "hello" }],
  summary: { keyTakeaways: ["k"] },
};

const validChapter = {
  slug: "intro",
  topicSlug: "linear-equations",
  order: 1,
  title: "Úvod",
  lesson: validLesson,
};

describe("chapterSchema", () => {
  it("accepts a valid chapter", () => {
    expect(chapterSchema.safeParse(validChapter).success).toBe(true);
  });

  it("rejects invalid slug shape", () => {
    expect(chapterSchema.safeParse({ ...validChapter, slug: "Intro" }).success).toBe(false);
    expect(chapterSchema.safeParse({ ...validChapter, slug: "intro with space" }).success).toBe(false);
    expect(chapterSchema.safeParse({ ...validChapter, topicSlug: "linearni-rovnice" }).success).toBe(true); // hyphens ok
  });

  it("rejects empty steps", () => {
    expect(chapterSchema.safeParse({
      ...validChapter,
      lesson: { ...validLesson, steps: [] },
    }).success).toBe(false);
  });

  it("rejects MC with zero correct choices", () => {
    const ch = {
      ...validChapter,
      lesson: {
        steps: [{
          type: "multiple-choice",
          question: "q",
          choices: [
            { label: "a", isCorrect: false, feedback: "f" },
            { label: "b", isCorrect: false, feedback: "f" },
          ],
          explanation: "e",
        }],
        summary: { keyTakeaways: ["k"] },
      },
    };
    expect(chapterSchema.safeParse(ch).success).toBe(false);
  });

  it("rejects MC with multiple correct choices", () => {
    const ch = {
      ...validChapter,
      lesson: {
        steps: [{
          type: "multiple-choice",
          question: "q",
          choices: [
            { label: "a", isCorrect: true, feedback: "f" },
            { label: "b", isCorrect: true, feedback: "f" },
          ],
          explanation: "e",
        }],
        summary: { keyTakeaways: ["k"] },
      },
    };
    expect(chapterSchema.safeParse(ch).success).toBe(false);
  });

  it("rejects text-input with numericTolerance but non-numeric expectedAnswer", () => {
    const ch = {
      ...validChapter,
      lesson: {
        steps: [{
          type: "text-input",
          question: "q",
          expectedAnswer: "hello",
          numericTolerance: 0.01,
          explanation: "e",
        }],
        summary: { keyTakeaways: ["k"] },
      },
    };
    expect(chapterSchema.safeParse(ch).success).toBe(false);
  });

  it("accepts text-input with numericTolerance and numeric answer (with Czech comma)", () => {
    const ch = {
      ...validChapter,
      lesson: {
        steps: [{
          type: "text-input",
          question: "q",
          expectedAnswer: "3,14",
          numericTolerance: 0.01,
          explanation: "e",
        }],
        summary: { keyTakeaways: ["k"] },
      },
    };
    expect(chapterSchema.safeParse(ch).success).toBe(true);
  });

  it("rejects prediction with fewer than 2 options", () => {
    const ch = {
      ...validChapter,
      lesson: {
        steps: [{
          type: "prediction",
          scenario: "s",
          question: "q",
          options: [{ label: "a", isCorrect: true }],
          reveal: "r",
        }],
        summary: { keyTakeaways: ["k"] },
      },
    };
    expect(chapterSchema.safeParse(ch).success).toBe(false);
  });

  it("rejects sort-order with fewer than 2 items", () => {
    const ch = {
      ...validChapter,
      lesson: {
        steps: [{
          type: "sort-order",
          question: "q",
          items: ["only"],
          explanation: "e",
        }],
        summary: { keyTakeaways: ["k"] },
      },
    };
    expect(chapterSchema.safeParse(ch).success).toBe(false);
  });

  it("rejects negative order", () => {
    expect(chapterSchema.safeParse({ ...validChapter, order: -1 }).success).toBe(false);
  });
});
```

- [ ] **Step 2: Run tests, expect failure ("module not found")**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm test:run src/lib/lessons/schema.test.ts
```
Expected: FAIL with "Cannot find module './schema'".

- [ ] **Step 3: Write `src/lib/lessons/schema.ts`**

Full contents:
```ts
import { z } from "zod";

const slugShape = z.string().regex(/^[a-z0-9-]+$/, "slug must be lowercase alphanumeric with dashes");

const visualBlockSchema = z.object({
  type: z.string(),
  props: z.record(z.string(), z.unknown()),
  caption: z.string().optional(),
});

const explainStep = z.object({
  type: z.literal("explain"),
  body: z.string().min(1),
  visual: visualBlockSchema.optional(),
  callout: z.string().optional(),
  misconception: z.string().optional(),
});

const mcStep = z.object({
  type: z.literal("multiple-choice"),
  question: z.string().min(1),
  visual: visualBlockSchema.optional(),
  choices: z
    .array(
      z.object({
        label: z.string().min(1),
        isCorrect: z.boolean(),
        feedback: z.string(),
      })
    )
    .min(2)
    .refine(
      (choices) => choices.filter((c) => c.isCorrect).length === 1,
      "multiple-choice must have exactly one correct choice"
    ),
  explanation: z.string(),
  hints: z.array(z.string()).max(2).optional(),
});

const textInputStep = z
  .object({
    type: z.literal("text-input"),
    question: z.string().min(1),
    visual: visualBlockSchema.optional(),
    expectedAnswer: z.string().min(1),
    acceptableAnswers: z.array(z.string()).optional(),
    numericTolerance: z.number().positive().optional(),
    wrongAnswerFeedback: z.record(z.string(), z.string()).optional(),
    explanation: z.string(),
    hints: z.array(z.string()).max(2).optional(),
  })
  .refine(
    (s) => {
      if (s.numericTolerance === undefined) return true;
      // Accept Czech decimal comma
      const normalized = s.expectedAnswer.replace(",", ".");
      return !Number.isNaN(Number(normalized));
    },
    { message: "numericTolerance requires a numeric expectedAnswer" }
  );

const exploreStep = z.object({
  type: z.literal("explore"),
  prompt: z.string().min(1),
  visual: visualBlockSchema,
  followUpQuestion: z.string().optional(),
});

const revealStep = z.object({
  type: z.literal("reveal"),
  question: z.string().min(1),
  visual: visualBlockSchema.optional(),
  revealedContent: z.string().min(1),
});

const sortOrderStep = z.object({
  type: z.literal("sort-order"),
  question: z.string().min(1),
  items: z.array(z.string().min(1)).min(2),
  explanation: z.string(),
});

const predictionStep = z.object({
  type: z.literal("prediction"),
  scenario: z.string().min(1),
  question: z.string().min(1),
  options: z
    .array(
      z.object({
        label: z.string().min(1),
        isCorrect: z.boolean(),
      })
    )
    .min(2)
    .refine(
      (opts) => opts.filter((o) => o.isCorrect).length === 1,
      "prediction must have exactly one correct option"
    ),
  reveal: z.string().min(1),
  visual: visualBlockSchema.optional(),
});

export const lessonStepSchema = z.discriminatedUnion("type", [
  explainStep,
  mcStep,
  textInputStep,
  exploreStep,
  revealStep,
  sortOrderStep,
  predictionStep,
]);

export const lessonSchema = z.object({
  title: z.string().min(1).optional(),
  narrative: z.string().optional(),
  steps: z.array(lessonStepSchema).min(1),
  summary: z.object({ keyTakeaways: z.array(z.string().min(1)).min(1) }),
  nextTopicSuggestion: z.string().optional(),
});

export const chapterSchema = z.object({
  slug: slugShape,
  topicSlug: slugShape,
  order: z.number().int().nonnegative(),
  title: z.string().min(1),
  lesson: lessonSchema,
});

export type ChapterSchema = z.infer<typeof chapterSchema>;
```

- [ ] **Step 4: Run tests, expect pass**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm test:run src/lib/lessons/schema.test.ts
```
Expected: all pass.

## Task 2.3: English topic trees + slug unions

**Files:**
- Modify: `src/lib/topics/math-tree.ts`
- Modify: `src/lib/topics/physics-tree.ts`
- Modify: `src/lib/topics/index.ts`

- [ ] **Step 1: Rewrite `src/lib/topics/math-tree.ts` with English slugs**

Apply the slug rename table from the spec. Topic **names and descriptions stay Czech**; only slugs change.

Full contents:
```ts
import type { TopicTreeData } from "@/types/topic";

export const mathTree = {
  subject: "math",
  subjectName: "Matematika",
  icon: "📐",
  topics: [
    {
      slug: "algebra",
      name: "Algebra",
      description: "Základy algebraických operací a rovnic",
      icon: "🔢",
      children: [
        {
          slug: "linear-equations",
          name: "Lineární rovnice",
          description: "Řešení rovnic prvního stupně",
          aiContext:
            "Lineární rovnice ax + b = c, úpravy, ekvivalentní úpravy, slovní úlohy vedoucí na lineární rovnice",
        },
        {
          slug: "quadratic-equations",
          name: "Kvadratické rovnice",
          description: "Řešení rovnic druhého stupně",
          aiContext:
            "Kvadratické rovnice ax² + bx + c = 0, diskriminant, Vietovy vzorce, rozklad na součin",
        },
        {
          slug: "systems-of-equations",
          name: "Soustavy rovnic",
          description: "Soustavy lineárních rovnic",
          aiContext:
            "Soustavy dvou lineárních rovnic o dvou neznámých, dosazovací a sčítací metoda, grafické řešení",
        },
        {
          slug: "inequalities",
          name: "Nerovnice",
          description: "Lineární a kvadratické nerovnice",
          aiContext:
            "Lineární nerovnice, kvadratické nerovnice, intervalový zápis, nerovnice s absolutní hodnotou",
        },
        {
          slug: "algebraic-expressions",
          name: "Výrazové úpravy",
          description: "Úpravy algebraických výrazů",
          aiContext:
            "Vytýkání, vzorce (a+b)², (a-b)², a²-b², rozklad polynomů, lomené výrazy",
        },
        {
          slug: "sequences",
          name: "Posloupnosti a řady",
          description: "Aritmetické a geometrické posloupnosti",
          aiContext:
            "Aritmetická posloupnost, geometrická posloupnost, n-tý člen, součet prvních n členů, konvergence řad",
        },
      ],
    },
    {
      slug: "functions",
      name: "Funkce",
      description: "Funkce a jejich vlastnosti",
      icon: "📈",
      children: [
        {
          slug: "linear-functions",
          name: "Lineární funkce",
          description: "Funkce f(x) = ax + b",
          aiContext:
            "Lineární funkce, graf přímky, směrnice, průsečíky s osami, rovnoběžnost a kolmost přímek",
        },
        {
          slug: "quadratic-functions",
          name: "Kvadratická funkce",
          description: "Funkce f(x) = ax² + bx + c",
          aiContext:
            "Parabola, vrchol paraboly, průsečíky s osou x, diskriminant, posuny a transformace grafu",
        },
        {
          slug: "exponential-functions",
          name: "Exponenciální funkce",
          description: "Funkce f(x) = aˣ",
          aiContext:
            "Exponenciální funkce, exponenciální rovnice, exponenciální růst a pokles, pravidla pro počítání s mocninami",
        },
        {
          slug: "logarithmic-functions",
          name: "Logaritmická funkce",
          description: "Funkce f(x) = log_a(x)",
          aiContext:
            "Logaritmus, logaritmické rovnice, vlastnosti logaritmů, přirozený logaritmus, dekadický logaritmus",
        },
        {
          slug: "trigonometric-functions",
          name: "Goniometrické funkce",
          description: "Sinus, kosinus, tangens",
          aiContext:
            "Sin, cos, tan, jednotková kružnice, perioda, amplituda, goniometrické rovnice, grafy goniometrických funkcí",
        },
        {
          slug: "absolute-value",
          name: "Funkce s absolutní hodnotou",
          description: "Grafy a rovnice s absolutní hodnotou",
          aiContext:
            "Absolutní hodnota, graf funkce s absolutní hodnotou, rovnice a nerovnice s absolutní hodnotou",
        },
      ],
    },
    {
      slug: "geometry",
      name: "Geometrie",
      description: "Planimetrie a stereometrie",
      icon: "📏",
      children: [
        {
          slug: "triangles",
          name: "Trojúhelníky",
          description: "Vlastnosti a výpočty trojúhelníků",
          aiContext:
            "Druhy trojúhelníků, Pythagorova věta, sinová a kosinová věta, obsah trojúhelníku, Eukleidovy věty",
        },
        {
          slug: "circles",
          name: "Kružnice a kruhy",
          description: "Obvod, obsah, tečny, sečny",
          aiContext:
            "Kružnice, kruh, obvod a obsah kruhu, tečna ke kružnici, vzájemná poloha kružnic, kruhové výseče a úseče",
        },
        {
          slug: "analytic-geometry",
          name: "Analytická geometrie",
          description: "Souřadnicová geometrie v rovině",
          aiContext:
            "Vzdálenost bodů, rovnice přímky, rovnice kružnice, vzájemná poloha přímek, vektory v rovině",
        },
        {
          slug: "solid-geometry",
          name: "Stereometrie",
          description: "Tělesa a prostorová geometrie",
          aiContext:
            "Hranol, jehlan, válec, kužel, koule, objem a povrch těles, řezy těles, vzájemná poloha přímek a rovin",
        },
      ],
    },
    {
      slug: "combinatorics-and-probability",
      name: "Kombinatorika a pravděpodobnost",
      description: "Kombinatorika, pravděpodobnost, statistika",
      icon: "🎲",
      children: [
        {
          slug: "combinatorics",
          name: "Základy kombinatoriky",
          description: "Variace, kombinace, permutace",
          aiContext:
            "Variace, kombinace, permutace, faktoriál, kombinační čísla, princip inkluze a exkluze",
        },
        {
          slug: "probability",
          name: "Pravděpodobnost",
          description: "Klasická a podmíněná pravděpodobnost",
          aiContext:
            "Klasická pravděpodobnost, jevy, sjednocení a průnik jevů, podmíněná pravděpodobnost, Bayesova věta",
        },
      ],
    },
    {
      slug: "calculus",
      name: "Základy analýzy",
      description: "Limity, derivace a integrály",
      icon: "∞",
      children: [
        {
          slug: "limits",
          name: "Limity",
          description: "Limity posloupností a funkcí",
          aiContext:
            "Limita posloupnosti, limita funkce, jednostranné limity, nevlastní limity, l'Hôpitalovo pravidlo",
        },
        {
          slug: "derivatives",
          name: "Derivace",
          description: "Derivace funkcí a jejich aplikace",
          aiContext:
            "Definice derivace, derivace elementárních funkcí, pravidla derivování, monotonie, extrémy funkce, tečna ke grafu",
        },
        {
          slug: "integrals",
          name: "Integrály",
          description: "Neurčité a určité integrály",
          aiContext:
            "Primitivní funkce, neurčitý integrál, metody integrace (per partes, substituce), určitý integrál, výpočet obsahu pod křivkou",
        },
      ],
    },
  ],
} as const satisfies TopicTreeData;

type MathLeafSlugOf<T> = T extends { children: readonly (infer C)[] }
  ? C extends { slug: infer S }
    ? S
    : never
  : never;

export type MathTopicSlug = MathLeafSlugOf<(typeof mathTree.topics)[number]>;
```

- [ ] **Step 2: Rewrite `src/lib/topics/physics-tree.ts`**

Read the current contents first:
```bash
```
(use the Read tool with the current file path, then apply the rename)

Apply slug mapping: `kinematika → kinematics`, `dynamika → dynamics`, `energie-a-prace → energy-and-work`, `hybnost-a-impulz → momentum-and-impulse`, `gravitace → gravity`, `teplota-a-teplo → temperature-and-heat`, `idealni-plyn → ideal-gas`, `zakony-termodynamiky → thermodynamics-laws`, `elektricke-pole → electric-field`, `elektricke-obvody → electric-circuits`, `magneticke-pole → magnetic-field`, `mechanicke-vlneni → mechanical-waves`, `optika → optics`, `kvantova-fyzika → quantum-physics`. Categories: `mechanika → mechanics`, `termodynamika → thermodynamics`, `elektromagnetismus → electromagnetism`, `vlneni-a-optika → waves-and-optics`, `moderni-fyzika → modern-physics`.

End with the same type-level union export:
```ts
type PhysicsLeafSlugOf<T> = T extends { children: readonly (infer C)[] }
  ? C extends { slug: infer S } ? S : never
  : never;

export type PhysicsTopicSlug = PhysicsLeafSlugOf<(typeof physicsTree.topics)[number]>;
```

Keep `as const satisfies TopicTreeData`.

- [ ] **Step 3: Update `src/lib/topics/index.ts`**

Add exports:
```ts
export type { MathTopicSlug } from "./math-tree";
export type { PhysicsTopicSlug } from "./physics-tree";
export type TopicSlug = import("./math-tree").MathTopicSlug | import("./physics-tree").PhysicsTopicSlug;
```

- [ ] **Step 4: Verify trees compile**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm tsc --noEmit 2>&1 | head -30
```
Expected: errors related to missing lesson files (slug mismatch with `data.ts`). Tree files themselves: no errors. These errors will be resolved by subsequent tasks.

## Task 2.4: Migration script for lesson files

**Files:**
- Create: `scripts/migrate-to-chapters.ts`

- [ ] **Step 1: Create `scripts/migrate-to-chapters.ts`**

Full contents:
```ts
#!/usr/bin/env tsx
/**
 * One-off migration: moves src/lib/lessons/{subject}/{cs-slug}-v2.ts
 * to   src/lib/lessons/{subject}/{en-slug}/intro.ts
 *
 * - Keeps the lesson content (steps/narrative/summary) byte-identical where possible
 * - Rewrites the export to `export const chapter: ChapterDefinition = { ... }`
 * - Deletes the source file
 *
 * Run once:   pnpm tsx scripts/migrate-to-chapters.ts
 * After successful merge, this script is deleted.
 */
import { readdir, readFile, writeFile, mkdir, unlink, stat } from "node:fs/promises";
import path from "node:path";

const LESSONS_DIR = path.resolve("src/lib/lessons");

const MATH_SLUG_MAP: Record<string, string> = {
  "linearni-rovnice": "linear-equations",
  "kvadraticke-rovnice": "quadratic-equations",
  "soustavy-rovnic": "systems-of-equations",
  "nerovnice": "inequalities",
  "vyrazove-upravy": "algebraic-expressions",
  "posloupnosti": "sequences",
  "linearni-funkce": "linear-functions",
  "kvadraticka-funkce": "quadratic-functions",
  "exponencialni-funkce": "exponential-functions",
  "logaritmicka-funkce": "logarithmic-functions",
  "goniometricke-funkce": "trigonometric-functions",
  "absolutni-hodnota": "absolute-value",
  "trojuhelniky": "triangles",
  "kruznice-a-kruhy": "circles",
  "analyticka-geometrie": "analytic-geometry",
  "stereometrie": "solid-geometry",
  "kombinatorika-zaklady": "combinatorics",
  "pravdepodobnost": "probability",
  "limity": "limits",
  "derivace": "derivatives",
  "integraly": "integrals",
};

const PHYSICS_SLUG_MAP: Record<string, string> = {
  "kinematika": "kinematics",
  "dynamika": "dynamics",
  "energie-a-prace": "energy-and-work",
  "hybnost-a-impulz": "momentum-and-impulse",
  "gravitace": "gravity",
  "teplota-a-teplo": "temperature-and-heat",
  "idealni-plyn": "ideal-gas",
  "zakony-termodynamiky": "thermodynamics-laws",
  "elektricke-pole": "electric-field",
  "elektricke-obvody": "electric-circuits",
  "magneticke-pole": "magnetic-field",
  "mechanicke-vlneni": "mechanical-waves",
  "optika": "optics",
  "kvantova-fyzika": "quantum-physics",
};

/** Derive a Czech display title from the lesson's own `title` field. */
function extractTitle(source: string): string {
  const match = source.match(/title:\s*"([^"]+)"/);
  return match ? match[1] : "Úvod";
}

/** Replace the LessonV2 top-level export with a ChapterDefinition wrapper. */
function rewriteExport(source: string, enSlug: string, title: string): string {
  // Strip the original export declaration: `export const <name>V2Beginner: LessonV2 = {`
  // Replace with: content captured as `lesson` inside ChapterDefinition
  const re = /export const \w+:\s*LessonV2\s*=\s*\{([\s\S]*)\};?\s*$/m;
  const match = source.match(re);
  if (!match) throw new Error("Could not find LessonV2 export in file");

  const lessonBody = match[1].trim();

  // Extract non-lesson imports, preserve them. Add ChapterDefinition import.
  const importSection = source.slice(0, source.indexOf("export const"));
  const rewrittenImports = importSection
    .replace(/import type \{\s*LessonV2\s*\} from "@\/types\/lesson-v2";?\s*\n?/g, "")
    .trimEnd();

  return `${rewrittenImports}
import type { ChapterDefinition } from "@/types/chapter";
import type { LessonV2 } from "@/types/lesson-v2";

const lesson: LessonV2 = {${lessonBody}};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "${enSlug}",
  order: 1,
  title: ${JSON.stringify(title)},
  lesson,
};
`;
}

async function migrateOne(subject: "math" | "physics", csSlug: string, enSlug: string) {
  const src = path.join(LESSONS_DIR, subject, `${csSlug}-v2.ts`);
  const destDir = path.join(LESSONS_DIR, subject, enSlug);
  const dest = path.join(destDir, "intro.ts");

  try {
    await stat(src);
  } catch {
    console.log(`  skip: ${src} not found`);
    return;
  }

  const source = await readFile(src, "utf8");
  const title = extractTitle(source);
  const rewritten = rewriteExport(source, enSlug, title);

  await mkdir(destDir, { recursive: true });
  await writeFile(dest, rewritten, "utf8");
  await unlink(src);
  console.log(`  moved: ${subject}/${csSlug}-v2.ts → ${subject}/${enSlug}/intro.ts`);
}

async function main() {
  console.log("Migrating math lessons…");
  for (const [cs, en] of Object.entries(MATH_SLUG_MAP)) {
    await migrateOne("math", cs, en);
  }
  console.log("\nMigrating physics lessons…");
  for (const [cs, en] of Object.entries(PHYSICS_SLUG_MAP)) {
    await migrateOne("physics", cs, en);
  }
  console.log("\nDone. Remaining step: regenerate data.generated.ts (Task 2.5).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

- [ ] **Step 2: Run the migration script**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm tsx scripts/migrate-to-chapters.ts
```
Expected: 35 "moved:" lines, no errors.

- [ ] **Step 3: Verify filesystem**

```bash
ls src/lib/lessons/math/linear-equations/
ls src/lib/lessons/physics/kinematics/
```
Expected: both directories exist, each containing `intro.ts`.

- [ ] **Step 4: Verify old files are gone**

```bash
ls src/lib/lessons/math/*-v2.ts src/lib/lessons/physics/*-v2.ts 2>&1 | head
```
Expected: `ls: cannot access: No such file or directory`.

## Task 2.5: Codegen script

**Files:**
- Create: `scripts/build-registry.ts`
- Create: `scripts/build-registry.test.ts`

- [ ] **Step 1: Write the failing test**

Full contents of `scripts/build-registry.test.ts`:
```ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtemp, rm, mkdir, writeFile, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { buildRegistry } from "./build-registry";

let tmp: string;

beforeEach(async () => {
  tmp = await mkdtemp(path.join(tmpdir(), "registry-test-"));
});

afterEach(async () => {
  await rm(tmp, { recursive: true, force: true });
});

async function writeChapter(p: string, slug: string, topicSlug: string, order: number) {
  await mkdir(path.dirname(p), { recursive: true });
  await writeFile(p, `export const chapter = { slug: "${slug}", topicSlug: "${topicSlug}", order: ${order}, title: "t", lesson: { steps: [], summary: { keyTakeaways: [] } } };\n`);
}

describe("buildRegistry", () => {
  it("generates imports and a keyed registry", async () => {
    await writeChapter(path.join(tmp, "math", "linear-equations", "intro.ts"), "intro", "linear-equations", 1);
    await writeChapter(path.join(tmp, "math", "linear-equations", "word-problems.ts"), "word-problems", "linear-equations", 2);
    await writeChapter(path.join(tmp, "physics", "kinematics", "intro.ts"), "intro", "kinematics", 1);

    await buildRegistry(tmp, path.join(tmp, "data.generated.ts"));
    const out = await readFile(path.join(tmp, "data.generated.ts"), "utf8");

    expect(out).toContain('from "./math/linear-equations/intro"');
    expect(out).toContain('from "./math/linear-equations/word-problems"');
    expect(out).toContain('from "./physics/kinematics/intro"');
    expect(out).toMatch(/"linear-equations\/intro":/);
    expect(out).toMatch(/"linear-equations\/word-problems":/);
    expect(out).toMatch(/"kinematics\/intro":/);
    expect(out).toMatch(/AUTO-GENERATED/);
  });

  it("skips unrelated files", async () => {
    await writeChapter(path.join(tmp, "math", "linear-equations", "intro.ts"), "intro", "linear-equations", 1);
    await writeFile(path.join(tmp, "math", "linear-equations", "README.md"), "# notes");
    await writeFile(path.join(tmp, "math", "linear-equations", "helpers.test.ts"), "// test");

    await buildRegistry(tmp, path.join(tmp, "data.generated.ts"));
    const out = await readFile(path.join(tmp, "data.generated.ts"), "utf8");
    expect(out).not.toContain("README");
    expect(out).not.toContain("helpers.test");
  });
});
```

- [ ] **Step 2: Verify test fails**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm test:run scripts/build-registry.test.ts
```
Expected: FAIL ("Cannot find module './build-registry'").

- [ ] **Step 3: Write `scripts/build-registry.ts`**

Full contents:
```ts
#!/usr/bin/env tsx
/**
 * Scans src/lib/lessons/{subject}/{topic}/{chapter}.ts and generates
 * src/lib/lessons/data.generated.ts — a typed registry of every chapter.
 *
 * Re-run: pnpm build:registry  (also runs in predev / prebuild).
 * The output is committed.
 */
import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

export async function buildRegistry(lessonsDir: string, outPath: string): Promise<void> {
  const entries: Array<{ subject: string; topicSlug: string; chapterSlug: string; importPath: string; identifier: string }> = [];
  const subjects = await readdir(lessonsDir);

  for (const subject of subjects) {
    const subjectDir = path.join(lessonsDir, subject);
    const subjectStat = await stat(subjectDir).catch(() => null);
    if (!subjectStat?.isDirectory()) continue;

    const topics = await readdir(subjectDir);
    for (const topicSlug of topics) {
      const topicDir = path.join(subjectDir, topicSlug);
      const topicStat = await stat(topicDir).catch(() => null);
      if (!topicStat?.isDirectory()) continue;

      const files = await readdir(topicDir);
      for (const file of files) {
        if (!file.endsWith(".ts") || file.endsWith(".test.ts") || file.endsWith(".d.ts")) continue;
        const chapterSlug = file.slice(0, -3);
        const importPath = `./${subject}/${topicSlug}/${chapterSlug}`;
        const identifier = `${subject}__${topicSlug.replace(/-/g, "_")}__${chapterSlug.replace(/-/g, "_")}`;
        entries.push({ subject, topicSlug, chapterSlug, importPath, identifier });
      }
    }
  }

  entries.sort((a, b) => a.importPath.localeCompare(b.importPath));

  const importLines = entries.map(
    (e) => `import { chapter as ${e.identifier} } from "${e.importPath}";`
  );
  const recordLines = entries.map(
    (e) => `  "${e.topicSlug}/${e.chapterSlug}": ${e.identifier},`
  );

  const content = `// AUTO-GENERATED by scripts/build-registry.ts — do not edit.
// Regenerate with: pnpm build:registry
import type { ChapterDefinition } from "@/types/chapter";

${importLines.join("\n")}

export const chapters: Readonly<Record<string, ChapterDefinition>> = {
${recordLines.join("\n")}
};
`;

  await writeFile(outPath, content, "utf8");
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const lessonsDir = path.resolve("src/lib/lessons");
  const outPath = path.join(lessonsDir, "data.generated.ts");
  buildRegistry(lessonsDir, outPath).then(() => {
    console.log(`Wrote ${outPath}`);
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
```

- [ ] **Step 4: Run tests**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm test:run scripts/build-registry.test.ts
```
Expected: both tests pass.

- [ ] **Step 5: Run against real lessons**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm tsx scripts/build-registry.ts
```
Expected: `Wrote …/data.generated.ts`. File should contain 35 imports and 35 record entries.

- [ ] **Step 6: Rewrite `src/lib/lessons/data.ts` as a thin shim**

Full contents:
```ts
import type { ChapterDefinition } from "@/types/chapter";
import { chapters } from "./data.generated";

export { chapters };

export function getChapter(topicSlug: string, chapterSlug: string): ChapterDefinition | null {
  return chapters[`${topicSlug}/${chapterSlug}`] ?? null;
}

export function hasChapter(topicSlug: string, chapterSlug: string): boolean {
  return `${topicSlug}/${chapterSlug}` in chapters;
}

export function getChaptersForTopic(topicSlug: string): ChapterDefinition[] {
  return Object.values(chapters)
    .filter((c) => c.topicSlug === topicSlug)
    .sort((a, b) => a.order - b.order);
}

// Back-compat shim — callers migrated in commit 3.
export function getLesson(topicSlug: string) {
  const ch = getChapter(topicSlug, "intro");
  return ch?.lesson ?? null;
}

export function hasLesson(topicSlug: string): boolean {
  return hasChapter(topicSlug, "intro");
}
```

## Task 2.6: Validation script

**Files:**
- Create: `scripts/validate-content.ts`

- [ ] **Step 1: Write `scripts/validate-content.ts`**

Full contents:
```ts
#!/usr/bin/env tsx
/**
 * Validates every chapter file with the Zod schema and cross-checks
 * against the topic tree. Runs in `prebuild`. Fails the build on any
 * violation.
 */
import { chapterSchema } from "@/lib/lessons/schema";
import { chapters } from "@/lib/lessons/data";
import { mathTree } from "@/lib/topics/math-tree";
import { physicsTree } from "@/lib/topics/physics-tree";
import type { TopicNode } from "@/types/topic";

function collectLeafSlugs(topics: readonly TopicNode[]): Set<string> {
  const out = new Set<string>();
  const walk = (node: TopicNode) => {
    if (!node.children || node.children.length === 0) out.add(node.slug);
    else node.children.forEach(walk);
  };
  topics.forEach(walk);
  return out;
}

function main() {
  const errors: string[] = [];
  const leafSlugs = new Set([
    ...collectLeafSlugs(mathTree.topics as unknown as readonly TopicNode[]),
    ...collectLeafSlugs(physicsTree.topics as unknown as readonly TopicNode[]),
  ]);

  // 1. Validate every chapter
  const chaptersByTopic = new Map<string, Map<number, string>>();
  for (const [key, chapter] of Object.entries(chapters)) {
    const parsed = chapterSchema.safeParse(chapter);
    if (!parsed.success) {
      errors.push(`[schema] ${key}: ${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`);
      continue;
    }
    // Key must match ${topicSlug}/${chapterSlug}
    const expectedKey = `${chapter.topicSlug}/${chapter.slug}`;
    if (key !== expectedKey) {
      errors.push(`[key-mismatch] registry key ${key} does not match chapter ${expectedKey}`);
    }
    // topicSlug must exist in tree
    if (!leafSlugs.has(chapter.topicSlug)) {
      errors.push(`[unknown-topic] ${key}: topicSlug "${chapter.topicSlug}" is not in any tree`);
    }
    // Track order uniqueness per topic
    const byOrder = chaptersByTopic.get(chapter.topicSlug) ?? new Map<number, string>();
    const existing = byOrder.get(chapter.order);
    if (existing) {
      errors.push(`[duplicate-order] topic "${chapter.topicSlug}" has two chapters with order=${chapter.order}: ${existing}, ${chapter.slug}`);
    } else {
      byOrder.set(chapter.order, chapter.slug);
    }
    chaptersByTopic.set(chapter.topicSlug, byOrder);
  }

  // 2. Every topic in tree must have ≥1 chapter
  for (const slug of leafSlugs) {
    if (!chaptersByTopic.has(slug)) {
      errors.push(`[missing-chapter] topic "${slug}" has no chapters registered`);
    }
  }

  if (errors.length) {
    console.error(`\nContent validation failed with ${errors.length} error(s):\n`);
    for (const e of errors) console.error("  " + e);
    process.exit(1);
  }

  console.log(`✓ Content OK: ${Object.keys(chapters).length} chapters across ${chaptersByTopic.size} topics`);
}

main();
```

- [ ] **Step 2: Run validation**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm tsx scripts/validate-content.ts
```
Expected: `✓ Content OK: 35 chapters across 35 topics`.

If errors appear:
- `[schema]` → open the named chapter file and inspect the migrated content
- `[missing-chapter]` → a topic was renamed but its chapter file wasn't migrated
- `[duplicate-order]` → unexpected at this stage (every topic has exactly one `order: 1`)

## Task 2.7: Wire codegen + validation into build

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add prebuild/predev hooks and helper scripts**

`package.json` `scripts` section:
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "predev": "pnpm build:registry",
    "build": "next build",
    "prebuild": "pnpm build:registry && pnpm validate:content",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest",
    "test:run": "vitest run",
    "build:registry": "tsx scripts/build-registry.ts",
    "validate:content": "tsx scripts/validate-content.ts"
  }
}
```

- [ ] **Step 2: Verify full build**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm build 2>&1 | tail -15
```
Expected: registry written, content validated, Next build succeeds. If Next complains about missing routes for old Czech slugs, those fixes land in commit 3 — confirm the failure is ONLY about missing routes / removed `/lessons/[lessonId]` references, not about content validation.

If content validation fails: stop and fix before proceeding.

## Task 2.8: Data integrity test

**Files:**
- Create: `src/lib/lessons/data.test.ts`

- [ ] **Step 1: Write test**

Full contents:
```ts
import { describe, it, expect } from "vitest";
import { chapters, getChaptersForTopic } from "./data";
import { mathTree } from "@/lib/topics/math-tree";
import { physicsTree } from "@/lib/topics/physics-tree";
import type { TopicNode } from "@/types/topic";

function leafSlugs(topics: readonly TopicNode[]): string[] {
  const out: string[] = [];
  const walk = (n: TopicNode) => (n.children?.length ? n.children.forEach(walk) : out.push(n.slug));
  topics.forEach(walk);
  return out;
}

const allLeaves = [
  ...leafSlugs(mathTree.topics as unknown as readonly TopicNode[]),
  ...leafSlugs(physicsTree.topics as unknown as readonly TopicNode[]),
];

describe("chapter registry", () => {
  it("has at least one chapter for every leaf topic", () => {
    for (const slug of allLeaves) {
      const chapterList = getChaptersForTopic(slug);
      expect(chapterList.length, `topic ${slug}`).toBeGreaterThan(0);
    }
  });

  it("every chapter's topicSlug is a real topic", () => {
    const leafSet = new Set(allLeaves);
    for (const [key, ch] of Object.entries(chapters)) {
      expect(leafSet.has(ch.topicSlug), `${key} has unknown topicSlug "${ch.topicSlug}"`).toBe(true);
    }
  });

  it("order is unique within each topic", () => {
    const byTopic = new Map<string, Set<number>>();
    for (const ch of Object.values(chapters)) {
      const set = byTopic.get(ch.topicSlug) ?? new Set<number>();
      expect(set.has(ch.order), `topic ${ch.topicSlug} has duplicate order ${ch.order}`).toBe(false);
      set.add(ch.order);
      byTopic.set(ch.topicSlug, set);
    }
  });

  it("getChaptersForTopic returns sorted by order", () => {
    for (const slug of allLeaves) {
      const list = getChaptersForTopic(slug);
      for (let i = 1; i < list.length; i++) {
        expect(list[i].order).toBeGreaterThan(list[i - 1].order);
      }
    }
  });
});
```

- [ ] **Step 2: Run all tests**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm test:run
```
Expected: all tests pass.

## Task 2.9: Commit 2

- [ ] **Step 1: Full verification**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm test:run && pnpm build 2>&1 | tail -10
```

If build fails due to references to old Czech slugs in `src/app/(app)/topics/[subjectSlug]/[topicSlug]/page.tsx` or `src/app/(app)/lessons/[lessonId]/page.tsx` — that's expected. Commit 3 handles routing. For commit 2, the build only needs to pass up to the codegen+validation step. Confirm both scripts run cleanly, then commit even if the Next build is failing on route logic.

Actually, to keep commit 2 self-contained and buildable: do NOT commit yet if `pnpm build` breaks. Instead, apply a **minimal route patch** to keep the build green: update `src/app/(app)/topics/[subjectSlug]/[topicSlug]/page.tsx` to use `getChapter(topicSlug, "intro")` via the shim so old-style single-lesson routing still works. Full chapter routes land in commit 3.

If there are route breakages: patch `src/app/(app)/topics/[subjectSlug]/[topicSlug]/page.tsx` to call `getLesson(topicSlug)` (the back-compat shim in `data.ts`). It should keep working — just slower path.

Re-run build:
```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm build 2>&1 | tail -10
```
Expected: build succeeds.

- [ ] **Step 2: Delete the now-unused `migrate-to-chapters.ts`**

Actually: keep it for commit 2, delete in commit 4. It's a historical artifact for this PR.

- [ ] **Step 3: Stage and commit**

```bash
git add src/lib/lessons/ src/lib/topics/ src/types/chapter.ts scripts/ package.json pnpm-lock.yaml
git status
```

Review `git status` for surprises (anything staged you didn't intend).

```bash
git commit -m "$(cat <<'EOF'
Migrate content pipeline to chapter structure with English slugs

- Every topic is now a folder; each lesson is a chapter within it
- English slugs across trees, paths, and code (display text stays Czech)
- ChapterDefinition type (src/types/chapter.ts)
- Zod schemas + validation script (fails builds on bad content)
- Codegen registry: scripts/build-registry.ts → data.generated.ts
- data.ts reduced to a thin shim with helpers
- prebuild/predev wire codegen + validation into pnpm
- 35 lessons migrated via one-off scripts/migrate-to-chapters.ts

Routes and V1 cleanup follow in commits 3–4.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

# COMMIT 3 — ROUTES + V1 DELETION

## Task 3.1: Rename V2 types to default names

**Files:**
- Rename: `src/types/lesson-v2.ts` → `src/types/lesson.ts` (REPLACES existing V1 file)
- Rename: `src/types/slide-v2.ts` → `src/types/slide.ts`
- Modify: `src/types/chapter.ts` (update import)
- Modify: everywhere `LessonV2`, `SlideV2` appears

- [ ] **Step 1: Delete V1 type files**

```bash
rm src/types/lesson.ts src/types/slide.ts
```

- [ ] **Step 2: Rename V2 → default**

```bash
git mv src/types/lesson-v2.ts src/types/lesson.ts
git mv src/types/slide-v2.ts src/types/slide.ts
```

- [ ] **Step 3: Inside `src/types/lesson.ts`, rename `LessonV2 → Lesson`**

Find/replace (entire file):
- `LessonV2` → `Lesson`
- Also at bottom, change the exported type `LessonV2` → `Lesson` if present.

Verify the file compiles conceptually: every `export interface` matches its use sites.

- [ ] **Step 4: Inside `src/types/slide.ts`, rename `SlideV2 → Slide` and every `*SlideV2` → `*Slide`**

Types affected: `ExplainSlideV2`, `MultipleChoiceSlideV2`, `TextInputSlideV2`, `ExploreSlideV2`, `RevealSlideV2`, `SortOrderSlideV2`, `PredictionSlideV2`, `SummarySlideV2`, `CompleteSlideV2`, union `SlideV2`. Drop the `V2` suffix from each.

Also rename slide `type` values: `"explain-v2"` → `"explain"`, `"multiple-choice-v2"` → `"multiple-choice"`, etc. (drops `-v2` suffix).

- [ ] **Step 5: Update imports project-wide**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"
# Search then manually update each file (or batch with sed carefully)
```

Files to update:
- `src/types/chapter.ts` — `@/types/lesson-v2` → `@/types/lesson`; `LessonV2` → `Lesson`
- `src/lib/lesson/build-slides-v2.ts` — imports + all type refs
- `src/components/lesson/**/*.tsx` — imports + type refs
- `src/lib/lessons/**/*.ts` (migrated chapter files) — `LessonV2` → `Lesson`
- `src/lib/lesson/progress-store.ts` — no type refs, should be unchanged
- `src/lib/lessons/schema.ts` — none, still uses zod
- `src/lib/lesson/build-slides-v2.test.ts` — update

Slide-`type` string values changed, so the renderer switch/case strings need updating too.

For each file use Edit tool with `replace_all: true` on the identifier names.

- [ ] **Step 6: Rename `build-slides-v2.ts` → `build-slides.ts` (V1 version deleted first)**

```bash
rm src/lib/lesson/build-slides.ts                 # V1 builder (renamed by git? check)
git mv src/lib/lesson/build-slides-v2.ts src/lib/lesson/build-slides.ts
```
If the first `rm` errors because V1 `build-slides.ts` doesn't exist (only `build-slides-v2.ts`), skip it — V1 deletion in Task 3.2 handles it.

- [ ] **Step 7: Verify types still check**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm tsc --noEmit 2>&1 | head -50
```
Expected: some errors from V1 code still referencing `LessonV2`/`LessonContent`. Those disappear once Task 3.2 deletes V1.

## Task 3.2: Delete V1 code

**Files deleted** (verify each exists before deleting):
- `src/lib/lesson/build-slides.ts` (V1, if still present — was renamed in 3.1 step 6 if V2 took the name)
- `src/components/lesson/slide-deck.tsx` (V1 — V2 version will be renamed in 3.3)
- `src/components/lesson/slide-renderer.tsx` (V1)
- `src/components/lesson/practice-problem.tsx` (V1)
- `src/components/lesson/confetti-burst.tsx` (only if unused after V1 delete)
- `src/components/lesson/slides/concept-slide.tsx`
- `src/components/lesson/slides/practice-slide.tsx`
- `src/components/lesson/slides/walkthrough-intro-slide.tsx`
- `src/components/lesson/slides/walkthrough-step-slide.tsx`
- `src/components/lesson/slides/walkthrough-result-slide.tsx`
- `src/components/lesson/slides/summary-slide.tsx` (V1 version — V2 has `summary-slide-v2.tsx`)
- `src/components/lesson/slides/section-title-slide.tsx`
- `src/components/lesson/slides/exploration-slide.tsx`
- `src/components/lesson/slides/knowledge-check-slide.tsx`

- [ ] **Step 1: List V1 files to verify existence**

```bash
ls src/components/lesson/*.tsx src/components/lesson/slides/*.tsx src/lib/lesson/*.ts
```

Record which of the files above actually exist. Don't delete what isn't there.

- [ ] **Step 2: Delete V1 types from `src/types/lesson.ts` (now the ex-V2 file)**

If `src/types/lesson.ts` contains leftover V1 types (`LessonContent`, `PracticeProblem`, `Difficulty`, etc.) — it shouldn't, but check — remove them.

- [ ] **Step 3: Delete V1 component files with `git rm`**

```bash
git rm <each-file-from-step-1-that-exists>
```

Example (adjust to actual filenames):
```bash
git rm src/components/lesson/slides/concept-slide.tsx \
       src/components/lesson/slides/practice-slide.tsx \
       src/components/lesson/slides/walkthrough-intro-slide.tsx \
       src/components/lesson/slides/walkthrough-step-slide.tsx \
       src/components/lesson/slides/walkthrough-result-slide.tsx \
       src/components/lesson/slides/summary-slide.tsx \
       src/components/lesson/slides/section-title-slide.tsx \
       src/components/lesson/slides/exploration-slide.tsx \
       src/components/lesson/slides/knowledge-check-slide.tsx \
       src/components/lesson/practice-problem.tsx
```

- [ ] **Step 4: Check if `confetti-burst.tsx` and V1 slide-deck/renderer are still referenced**

```bash
```
Use Grep to search for imports of each file. If no imports remain, delete. If referenced by a still-alive file, investigate.

- [ ] **Step 5: Verify TS compile**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm tsc --noEmit 2>&1 | head -30
```
Expected: errors only about missing `Lesson`/`Slide` imports in files touched by Task 3.3 (route components not yet updated).

## Task 3.3: Rename V2 component files to default names

**Files:**
- Rename: `src/components/lesson/slide-deck-v2.tsx` → `slide-deck.tsx`
- Rename: `src/components/lesson/slide-renderer-v2.tsx` → `slide-renderer.tsx`
- Rename: `src/components/lesson/slides/*-slide-v2.tsx` → `*-slide.tsx` (drop `-v2` suffix)
  - `explain-slide-v2.tsx` → `explain-slide.tsx`
  - `mc-slide-v2.tsx` → `mc-slide.tsx`
  - `text-input-slide-v2.tsx` → `text-input-slide.tsx`
  - `explore-slide-v2.tsx` → `explore-slide.tsx`
  - `reveal-slide-v2.tsx` → `reveal-slide.tsx`
  - `sort-order-slide-v2.tsx` → `sort-order-slide.tsx`
  - `summary-slide-v2.tsx` → `summary-slide.tsx`
  - `prediction-slide-v2.tsx` → `prediction-slide.tsx`

- [ ] **Step 1: Rename with git mv**

```bash
git mv src/components/lesson/slide-deck-v2.tsx src/components/lesson/slide-deck.tsx
git mv src/components/lesson/slide-renderer-v2.tsx src/components/lesson/slide-renderer.tsx
git mv src/components/lesson/slides/explain-slide-v2.tsx src/components/lesson/slides/explain-slide.tsx
git mv src/components/lesson/slides/mc-slide-v2.tsx src/components/lesson/slides/mc-slide.tsx
git mv src/components/lesson/slides/text-input-slide-v2.tsx src/components/lesson/slides/text-input-slide.tsx
git mv src/components/lesson/slides/explore-slide-v2.tsx src/components/lesson/slides/explore-slide.tsx
git mv src/components/lesson/slides/reveal-slide-v2.tsx src/components/lesson/slides/reveal-slide.tsx
git mv src/components/lesson/slides/sort-order-slide-v2.tsx src/components/lesson/slides/sort-order-slide.tsx
git mv src/components/lesson/slides/summary-slide-v2.tsx src/components/lesson/slides/summary-slide.tsx
git mv src/components/lesson/slides/prediction-slide-v2.tsx src/components/lesson/slides/prediction-slide.tsx
```

- [ ] **Step 2: Rename component exports**

Inside each renamed file, drop the `V2` suffix from the exported function name (e.g., `SlideDeckV2` → `SlideDeck`). Update the `interface`/`Props` types similarly.

Also rename `PredictionSlideV2Props` → `PredictionSlideProps`, `BLOCKING_TYPES` strings inside `slide-deck.tsx` from `"prediction-v2"` → `"prediction"`, `"multiple-choice-v2"` → `"multiple-choice"`, etc.

- [ ] **Step 3: Update all callers**

Grep for `V2` identifier use:
```bash
```
Use Grep with pattern `SlideDeckV2|SlideRendererV2|ExplainSlideV2|MCSlideV2|TextInputSlideV2|ExploreSlideV2|RevealSlideV2|SortOrderSlideV2|SummarySlideV2|PredictionSlideV2`.

Update each file to use the new names. Main culprit: `src/components/lesson/lesson-shell.tsx`, `src/components/lesson/slide-renderer.tsx`, `src/components/lesson/slide-deck.tsx`.

- [ ] **Step 4: Rename `build-slides-v2.test.ts` → `build-slides.test.ts`**

```bash
git mv src/lib/lesson/build-slides-v2.test.ts src/lib/lesson/build-slides.test.ts
```
Update imports inside the test file: `from "./build-slides-v2"` → `from "./build-slides"`, `LessonV2` → `Lesson`, and slide type strings (`"explain-v2"` → `"explain"` etc.).

- [ ] **Step 5: TS compile check**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm tsc --noEmit 2>&1 | head -30
```
Expected: errors only in `lesson-shell.tsx` + route files (fixed in Tasks 3.4+).

## Task 3.4: Update `lesson-shell.tsx` for chapter-based completion

**Files:**
- Modify: `src/components/lesson/lesson-shell.tsx`

- [ ] **Step 1: Rewrite `lesson-shell.tsx`**

Full contents:
```tsx
"use client";

import { useState, useCallback, useMemo } from "react";
import { SlideDeck } from "./slide-deck";
import { LessonComplete } from "./lesson-complete";
import { buildSlides } from "@/lib/lesson/build-slides";
import { recordChapterCompletion } from "@/lib/lesson/progress-store";
import type { Lesson } from "@/types/lesson";

interface LessonShellProps {
  lesson: Lesson;
  topicSlug: string;
  chapterSlug: string;
}

export function LessonShell({ lesson, topicSlug, chapterSlug }: LessonShellProps) {
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [tier, setTier] = useState<"bronze" | "silver" | "gold" | null>(null);

  const slides = useMemo(() => buildSlides(lesson), [lesson]);

  const handleComplete = useCallback(
    (answeredSteps: Map<number, { isCorrect: boolean; attempts: number }>) => {
      const narrativeOffset = lesson.narrative ? 1 : 0;
      const questionStepIndices = lesson.steps
        .map((step, i) => ({ step, i: i + narrativeOffset }))
        .filter(
          ({ step }) =>
            step.type === "multiple-choice" ||
            step.type === "text-input" ||
            step.type === "sort-order" ||
            step.type === "prediction"
        )
        .map(({ i }) => i);

      const total = questionStepIndices.length;
      const correct = questionStepIndices.filter(
        (i) => answeredSteps.get(i)?.isCorrect
      ).length;

      setScore({ correct, total });
      setCompleted(true);

      const result = recordChapterCompletion(topicSlug, chapterSlug, {
        completedAt: Date.now(),
        score: total > 0 ? correct / total : 1,
        correctAnswers: correct,
        totalProblems: total,
      });
      setTier(result.chapters[`${topicSlug}/${chapterSlug}`]?.tier ?? null);
    },
    [lesson.steps, lesson.narrative, topicSlug, chapterSlug]
  );

  if (completed) {
    const { correct, total } = score;
    return (
      <LessonComplete
        score={total > 0 ? correct / total : 0}
        totalProblems={total}
        correctAnswers={correct}
        isPerfect={correct === total}
        tier={tier}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <SlideDeck slides={slides} onComplete={handleComplete} />
    </div>
  );
}
```

Notes:
- Drops V1 branch (no `isV2` check)
- Single `SlideDeck` (no V1/V2 split)
- Takes `topicSlug` + `chapterSlug` as required props
- Calls new `recordChapterCompletion` (wired in Task 3.5)

## Task 3.5: Progress store — per-chapter keys

**Files:**
- Modify: `src/lib/lesson/progress-store.ts`
- Modify: `src/lib/lesson/progress-store.test.ts`

- [ ] **Step 1: Rewrite `progress-store.ts`**

Full contents (bumped STORAGE_KEY, chapter-level keys, topic aggregation helper):
```ts
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

export function getChapterProgress(topicSlug: string, chapterSlug: string): ChapterProgress | null {
  return loadProgress().chapters[chapterKey(topicSlug, chapterSlug)] ?? null;
}

export interface TopicAggregateProgress {
  completedChapters: number;
  totalChapters: number;
  /** Lowest (worst) tier across all completed chapters; null if none completed. */
  overallTier: "bronze" | "silver" | "gold" | null;
}

export function getTopicAggregateProgress(
  topicSlug: string,
  allChapterSlugs: string[]
): TopicAggregateProgress {
  const progress = loadProgress();
  const completed = allChapterSlugs
    .map((cs) => progress.chapters[chapterKey(topicSlug, cs)])
    .filter((p): p is ChapterProgress => !!p && p.completionCount > 0);

  let overallTier: "bronze" | "silver" | "gold" | null = null;
  if (completed.length === allChapterSlugs.length && completed.length > 0) {
    const ranks = completed.map((p) => (p.tier ? tierRank(p.tier) : 0));
    const minRank = Math.min(...ranks);
    overallTier = minRank === 3 ? "gold" : minRank === 2 ? "silver" : minRank === 1 ? "bronze" : null;
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
```

- [ ] **Step 2: Rewrite `progress-store.test.ts` for the new API**

Full contents (replaces the file entirely):
```ts
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
  // @ts-expect-error
  globalThis.window = { localStorage: new MemoryStorage() };
  // @ts-expect-error
  globalThis.localStorage = globalThis.window.localStorage;
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ chapters: [], streak: 0, lastActivityAt: 0 }));
    expect(loadProgress().chapters).toEqual({});
  });
});

describe("tier progression per chapter", () => {
  it("never downgrades", () => {
    recordChapterCompletion("t", "a", { completedAt: 1, score: 1, correctAnswers: 5, totalProblems: 5 });
    expect(getChapterProgress("t", "a")?.tier).toBe("gold");
    recordChapterCompletion("t", "a", { completedAt: 2, score: 0.5, correctAnswers: 1, totalProblems: 2 });
    expect(getChapterProgress("t", "a")?.tier).toBe("gold");
  });

  it("chapter keys are independent", () => {
    recordChapterCompletion("t", "a", { completedAt: 1, score: 1, correctAnswers: 5, totalProblems: 5 });
    recordChapterCompletion("t", "b", { completedAt: 1, score: 0.5, correctAnswers: 1, totalProblems: 2 });
    expect(getChapterProgress("t", "a")?.tier).toBe("gold");
    expect(getChapterProgress("t", "b")?.tier).toBe("bronze");
  });
});

describe("topic aggregate", () => {
  it("reports completed count and gold only when all gold", () => {
    recordChapterCompletion("t", "a", { completedAt: 1, score: 1, correctAnswers: 1, totalProblems: 1 });
    recordChapterCompletion("t", "b", { completedAt: 1, score: 0.5, correctAnswers: 1, totalProblems: 2 });
    const agg = getTopicAggregateProgress("t", ["a", "b"]);
    expect(agg.completedChapters).toBe(2);
    expect(agg.totalChapters).toBe(2);
    expect(agg.overallTier).toBe("bronze"); // worst across chapters
  });

  it("returns null overallTier when not all chapters done", () => {
    recordChapterCompletion("t", "a", { completedAt: 1, score: 1, correctAnswers: 1, totalProblems: 1 });
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
  });
});

describe("spaced retrieval", () => {
  it("returns overdue chapter keys", () => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      chapters: {
        "t/due": { bestScore: 1, completionCount: 1, lastCompletedAt: now - 2 * oneDay, results: [], tier: "gold" },
        "t/fresh": { bestScore: 1, completionCount: 1, lastCompletedAt: now, results: [], tier: "gold" },
      },
      streak: 0,
      lastActivityAt: 0,
    }));
    const review = getChaptersForReview();
    expect(review).toContain("t/due");
    expect(review).not.toContain("t/fresh");
  });
});
```

- [ ] **Step 3: Update `topic-card.tsx` for aggregate progress**

Modify `src/components/topic/topic-card.tsx` to call `getTopicAggregateProgress(topic.slug, chapterSlugs)` instead of `getTopicProgress(topic.slug)`. Prop change: `TopicCard` now takes `chapterSlugs: string[]` in addition to existing props. Callers (in the category listing page) pass `getChaptersForTopic(slug).map(c => c.slug)`.

- [ ] **Step 4: Run tests**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm test:run
```
Expected: all pass.

## Task 3.6: New `/topics/[subject]/[topic]/[chapter]/page.tsx` route

**Files:**
- Create: `src/app/(app)/topics/[subjectSlug]/[topicSlug]/[chapterSlug]/page.tsx`

- [ ] **Step 1: Create the chapter page**

Full contents:
```tsx
import { notFound } from "next/navigation";
import { LessonShell } from "@/components/lesson/lesson-shell";
import { getChapter } from "@/lib/lessons/data";
import { findTopic } from "@/lib/topics";

interface PageProps {
  params: Promise<{ subjectSlug: string; topicSlug: string; chapterSlug: string }>;
}

export default async function ChapterPage({ params }: PageProps) {
  const { subjectSlug, topicSlug, chapterSlug } = await params;
  const chapter = getChapter(topicSlug, chapterSlug);
  if (!chapter) return notFound();

  const topic = findTopic(subjectSlug, topicSlug);
  if (!topic) return notFound();

  return (
    <main className="container mx-auto px-4 py-6">
      <LessonShell
        lesson={chapter.lesson}
        topicSlug={topicSlug}
        chapterSlug={chapterSlug}
      />
    </main>
  );
}
```

## Task 3.7: Update topic page to list chapters

**Files:**
- Modify: `src/app/(app)/topics/[subjectSlug]/[topicSlug]/page.tsx`

- [ ] **Step 1: Rewrite the topic page**

Read the current file first, then replace contents. The new behavior: render a list of chapter cards (each a link to the chapter page) with completion badges.

Full contents:
```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { findTopic } from "@/lib/topics";
import { getChaptersForTopic } from "@/lib/lessons/data";

interface PageProps {
  params: Promise<{ subjectSlug: string; topicSlug: string }>;
}

export default async function TopicPage({ params }: PageProps) {
  const { subjectSlug, topicSlug } = await params;
  const topic = findTopic(subjectSlug, topicSlug);
  if (!topic) return notFound();

  const chapters = getChaptersForTopic(topicSlug);
  if (chapters.length === 0) return notFound();

  return (
    <main className="container mx-auto px-4 py-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">{topic.name}</h1>
        {topic.description && (
          <p className="text-muted-foreground">{topic.description}</p>
        )}
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase text-muted-foreground">
          Kapitoly
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {chapters.map((ch) => (
            <Link
              key={ch.slug}
              href={`/topics/${subjectSlug}/${topicSlug}/${ch.slug}`}
            >
              <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Kapitola {ch.order}
                      </p>
                      <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                        {ch.title}
                      </h3>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
```

## Task 3.8: Delete `/lessons/[lessonId]` route

**Files:**
- Delete: `src/app/(app)/lessons/[lessonId]/page.tsx`
- Delete: `src/app/(app)/lessons/[lessonId]/` directory (if empty)

- [ ] **Step 1: Delete the route**

```bash
git rm -r src/app/\(app\)/lessons/\[lessonId\]
```

- [ ] **Step 2: Check if `src/app/(app)/lessons/` has any other contents**

```bash
ls src/app/\(app\)/lessons 2>&1
```

If empty or no longer exists, clean it:
```bash
rm -rf src/app/\(app\)/lessons 2>&1
```

## Task 3.9: Remove back-compat shims from `data.ts`

**Files:**
- Modify: `src/lib/lessons/data.ts`

- [ ] **Step 1: Delete `getLesson` / `hasLesson` shims**

Remove those two functions from `data.ts`. They were only needed during commit 2 transitional state.

- [ ] **Step 2: Grep for any remaining callers**

```bash
```
Use Grep for `getLesson(` and `hasLesson(` in `src/`. If any references outside `data.ts` remain, update them to use `getChapter(slug, "intro")` or appropriate replacement. Should be clean after Task 3.7.

## Task 3.10: Commit 3 verification + commit

- [ ] **Step 1: Full verification**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm test:run && pnpm build 2>&1 | tail -15 && pnpm lint 2>&1 | tail -3
```
Expected:
- Tests: all pass
- Build: exit 0, static pages generated for new route shape
- Lint: ≤53 errors (baseline — no new errors from this refactor)

- [ ] **Step 2: Manual browser smoke**

Start dev server if not running:
```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm dev &
```

Open http://localhost:3000/topics/math/linear-equations — should show chapter list with one "Úvod do lineárních rovnic" card. Click it → lesson player loads. Complete the lesson → completion screen + tier badge.

Repeat for a physics lesson: http://localhost:3000/topics/physics/kinematics

- [ ] **Step 3: Commit**

```bash
git status
git add -A
git commit -m "$(cat <<'EOF'
Delete V1 lesson system; rename V2 → default; add chapter routes

- Routes: /topics/[subject]/[topic] now lists chapters;
  /topics/[subject]/[topic]/[chapter] is the lesson player
- /lessons/[lessonId] removed
- V1 types, components, builder deleted
- V2 types and components renamed (drop V2 suffix)
- Progress store: per-chapter keys, STORAGE_KEY bumped (old data orphaned)
- getTopicAggregateProgress computes worst-tier across chapters

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

# COMMIT 4 — CLIs + CLAUDE.md POLISH

## Task 4.1: `new-chapter` scaffolding CLI

**Files:**
- Create: `scripts/new-chapter.ts`
- Create: `scripts/new-chapter.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Write the test first**

Full contents of `scripts/new-chapter.test.ts`:
```ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtemp, rm, writeFile, readFile, readdir, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createChapter } from "./new-chapter";

let tmp: string;

beforeEach(async () => {
  tmp = await mkdtemp(path.join(tmpdir(), "new-chapter-test-"));
  // Pre-seed one existing chapter
  await mkdir(path.join(tmp, "math", "linear-equations"), { recursive: true });
  await writeFile(
    path.join(tmp, "math", "linear-equations", "intro.ts"),
    `export const chapter = { slug: "intro", topicSlug: "linear-equations", order: 1, title: "Úvod", lesson: { steps: [], summary: { keyTakeaways: [] } } };\n`
  );
});

afterEach(async () => {
  await rm(tmp, { recursive: true, force: true });
});

describe("createChapter", () => {
  it("creates a new chapter file with next order", async () => {
    await createChapter({
      root: tmp,
      subject: "math",
      topicSlug: "linear-equations",
      chapterSlug: "word-problems",
      title: "Slovní úlohy",
      knownTopics: new Set(["linear-equations"]),
    });
    const files = await readdir(path.join(tmp, "math", "linear-equations"));
    expect(files).toContain("word-problems.ts");
    const content = await readFile(path.join(tmp, "math", "linear-equations", "word-problems.ts"), "utf8");
    expect(content).toContain('slug: "word-problems"');
    expect(content).toContain('order: 2');
    expect(content).toContain('title: "Slovní úlohy"');
  });

  it("rejects unknown topic", async () => {
    await expect(
      createChapter({
        root: tmp,
        subject: "math",
        topicSlug: "nonexistent",
        chapterSlug: "intro",
        title: "t",
        knownTopics: new Set(["linear-equations"]),
      })
    ).rejects.toThrow(/unknown topic/i);
  });

  it("rejects existing chapter slug", async () => {
    await expect(
      createChapter({
        root: tmp,
        subject: "math",
        topicSlug: "linear-equations",
        chapterSlug: "intro",
        title: "t",
        knownTopics: new Set(["linear-equations"]),
      })
    ).rejects.toThrow(/already exists/i);
  });

  it("rejects invalid slug shape", async () => {
    await expect(
      createChapter({
        root: tmp,
        subject: "math",
        topicSlug: "linear-equations",
        chapterSlug: "Word Problems",
        title: "t",
        knownTopics: new Set(["linear-equations"]),
      })
    ).rejects.toThrow(/slug shape/i);
  });
});
```

- [ ] **Step 2: Write `scripts/new-chapter.ts`**

Full contents:
```ts
#!/usr/bin/env tsx
/**
 * Scaffolder: pnpm new-chapter <subject>/<topic>/<chapter> [title]
 *
 * Creates a new chapter file from a template, computes the next `order`
 * within the topic, and runs the registry builder.
 */
import { readdir, stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const SLUG_RE = /^[a-z0-9-]+$/;

export interface CreateChapterParams {
  root: string;
  subject: string;
  topicSlug: string;
  chapterSlug: string;
  title: string;
  knownTopics: Set<string>;
}

async function nextOrder(topicDir: string): Promise<number> {
  const files = await readdir(topicDir);
  const orders: number[] = [];
  for (const f of files) {
    if (!f.endsWith(".ts") || f.endsWith(".test.ts")) continue;
    // The file might not compile in TS isolation, so parse "order: N" as text.
    const p = path.join(topicDir, f);
    const { readFile } = await import("node:fs/promises");
    const src = await readFile(p, "utf8");
    const m = src.match(/order:\s*(\d+)/);
    if (m) orders.push(Number(m[1]));
  }
  return orders.length ? Math.max(...orders) + 1 : 1;
}

function template(topicSlug: string, chapterSlug: string, order: number, title: string): string {
  return `import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  narrative: "TODO: 2–3 sentence story/framing (Czech)",
  steps: [
    {
      type: "explain",
      body: "TODO: 2–3 sentence explanation (Czech, $...$ for inline LaTeX)",
    },
  ],
  summary: {
    keyTakeaways: ["TODO: first takeaway"],
  },
};

export const chapter: ChapterDefinition = {
  slug: "${chapterSlug}",
  topicSlug: "${topicSlug}",
  order: ${order},
  title: ${JSON.stringify(title)},
  lesson,
};
`;
}

export async function createChapter(p: CreateChapterParams): Promise<string> {
  if (!SLUG_RE.test(p.chapterSlug)) {
    throw new Error(`invalid slug shape: ${p.chapterSlug} (expected ${SLUG_RE})`);
  }
  if (!p.knownTopics.has(p.topicSlug)) {
    throw new Error(`unknown topic: ${p.topicSlug}`);
  }
  const topicDir = path.join(p.root, p.subject, p.topicSlug);
  await mkdir(topicDir, { recursive: true });
  const target = path.join(topicDir, `${p.chapterSlug}.ts`);
  const exists = await stat(target).then(() => true).catch(() => false);
  if (exists) throw new Error(`chapter already exists: ${target}`);

  const order = await nextOrder(topicDir);
  await writeFile(target, template(p.topicSlug, p.chapterSlug, order, p.title), "utf8");
  return target;
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const arg = process.argv[2];
  const title = process.argv[3] ?? "TODO název";
  if (!arg) {
    console.error("Usage: pnpm new-chapter <subject>/<topic>/<chapter> [title]");
    process.exit(1);
  }
  const parts = arg.split("/");
  if (parts.length !== 3) {
    console.error("Expected <subject>/<topic>/<chapter>");
    process.exit(1);
  }
  const [subject, topicSlug, chapterSlug] = parts;

  // Build knownTopics from the actual trees
  (async () => {
    const { mathTree } = await import("@/lib/topics/math-tree");
    const { physicsTree } = await import("@/lib/topics/physics-tree");
    const collect = (topics: readonly { slug: string; children?: readonly unknown[] }[]): string[] => {
      const out: string[] = [];
      const walk = (n: { slug: string; children?: readonly unknown[] }) => {
        if (!n.children?.length) out.push(n.slug);
        else (n.children as { slug: string; children?: readonly unknown[] }[]).forEach(walk);
      };
      topics.forEach(walk);
      return out;
    };
    const known = new Set([
      ...collect(mathTree.topics as readonly { slug: string; children?: readonly unknown[] }[]),
      ...collect(physicsTree.topics as readonly { slug: string; children?: readonly unknown[] }[]),
    ]);

    try {
      const file = await createChapter({
        root: path.resolve("src/lib/lessons"),
        subject,
        topicSlug,
        chapterSlug,
        title,
        knownTopics: known,
      });
      console.log(`✓ Created ${file}`);
      console.log(`Run: pnpm build:registry`);
    } catch (e) {
      console.error(`✗ ${(e as Error).message}`);
      process.exit(1);
    }
  })();
}
```

- [ ] **Step 3: Add `pnpm new-chapter` script to `package.json`**

In the `scripts` block:
```json
"new-chapter": "tsx scripts/new-chapter.ts"
```

- [ ] **Step 4: Run tests**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm test:run scripts/new-chapter.test.ts
```
Expected: all 4 tests pass.

- [ ] **Step 5: Smoke test the CLI**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm new-chapter math/linear-equations/test-chapter "Test"
```
Expected: `✓ Created src/lib/lessons/math/linear-equations/test-chapter.ts`.

Remove the test file afterward:
```bash
rm src/lib/lessons/math/linear-equations/test-chapter.ts
```

## Task 4.2: `new-topic` scaffolding CLI

**Files:**
- Create: `scripts/new-topic.ts`
- Modify: `package.json`

- [ ] **Step 1: Write `scripts/new-topic.ts`**

Full contents:
```ts
#!/usr/bin/env tsx
/**
 * Scaffolder: pnpm new-topic <subject>/<category>/<topic> "Display Name"
 *
 * 1. Inserts a TopicNode under the given category in the tree file
 * 2. Creates the first chapter (intro.ts) via the new-chapter scaffolder
 *
 * NOTE: This edits the tree file by text manipulation. Review the diff
 * before committing — a malformed tree file will block the build.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createChapter } from "./new-chapter";

const SLUG_RE = /^[a-z0-9-]+$/;

async function insertTopicIntoTree(
  treePath: string,
  categorySlug: string,
  topicSlug: string,
  displayName: string
): Promise<void> {
  const src = await readFile(treePath, "utf8");
  // Find `slug: "<category>"` block, then its `children: [`
  const categoryIdx = src.indexOf(`slug: "${categorySlug}"`);
  if (categoryIdx === -1) throw new Error(`category "${categorySlug}" not found in ${treePath}`);

  const childrenIdx = src.indexOf("children: [", categoryIdx);
  if (childrenIdx === -1) throw new Error(`category "${categorySlug}" has no children array`);

  // Find closing `],` for that children array (naive: next `]` after a sequence of TopicNode objects)
  // Simpler: insert a new child right after `children: [` with proper comma handling.
  const insertAt = childrenIdx + "children: [".length;
  const insertion = `
        {
          slug: "${topicSlug}",
          name: ${JSON.stringify(displayName)},
          description: "TODO popis (Czech)",
          aiContext: "TODO aiContext (Czech)",
        },`;

  const next = src.slice(0, insertAt) + insertion + src.slice(insertAt);
  await writeFile(treePath, next, "utf8");
}

async function main() {
  const arg = process.argv[2];
  const displayName = process.argv[3] ?? "TODO";
  if (!arg) {
    console.error("Usage: pnpm new-topic <subject>/<category>/<topic> \"Display Name\"");
    process.exit(1);
  }
  const parts = arg.split("/");
  if (parts.length !== 3) {
    console.error("Expected <subject>/<category>/<topic>");
    process.exit(1);
  }
  const [subject, categorySlug, topicSlug] = parts;
  if (!SLUG_RE.test(topicSlug)) {
    console.error(`Invalid slug shape: ${topicSlug}`);
    process.exit(1);
  }

  const treeFile = subject === "math" ? "math-tree.ts" : subject === "physics" ? "physics-tree.ts" : null;
  if (!treeFile) {
    console.error(`Unknown subject: ${subject}`);
    process.exit(1);
  }

  const treePath = path.resolve(`src/lib/topics/${treeFile}`);
  try {
    await insertTopicIntoTree(treePath, categorySlug, topicSlug, displayName);
    console.log(`✓ Added "${topicSlug}" under category "${categorySlug}" in ${treeFile}`);

    const file = await createChapter({
      root: path.resolve("src/lib/lessons"),
      subject,
      topicSlug,
      chapterSlug: "intro",
      title: "Úvod",
      knownTopics: new Set([topicSlug]),
    });
    console.log(`✓ Created intro chapter ${file}`);
    console.log(`\nNext: fill in description/aiContext in ${treeFile}, edit ${file}, then pnpm build:registry`);
  } catch (e) {
    console.error(`✗ ${(e as Error).message}`);
    process.exit(1);
  }
}

main();
```

- [ ] **Step 2: Add `pnpm new-topic` script to `package.json`**

```json
"new-topic": "tsx scripts/new-topic.ts"
```

- [ ] **Step 3: Smoke test**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm new-topic math/algebra/test-topic "Test téma"
```
Expected: tree file updated, new chapter file created. **Don't run build:registry** — this is a smoke test.

Verify the diff looks right:
```bash
git diff src/lib/topics/math-tree.ts
ls src/lib/lessons/math/test-topic/
```

Revert:
```bash
git checkout src/lib/topics/math-tree.ts
rm -rf src/lib/lessons/math/test-topic
```

## Task 4.3: Delete migration script

**Files:**
- Delete: `scripts/migrate-to-chapters.ts`

- [ ] **Step 1: Delete**

```bash
git rm scripts/migrate-to-chapters.ts
```

## Task 4.4: CLAUDE.md pass-2 updates

**Files (update all to match final state):**
- `CLAUDE.md` (root)
- `src/CLAUDE.md`
- `src/app/CLAUDE.md` (if exists; create if not)
- `src/components/CLAUDE.md`
- `src/components/lesson/CLAUDE.md`
- `src/components/lesson/slides/CLAUDE.md`
- `src/components/lesson/visuals/CLAUDE.md`
- `src/lib/CLAUDE.md`
- `src/lib/lesson/CLAUDE.md`
- `src/lib/lessons/CLAUDE.md`
- `src/lib/lessons/math/CLAUDE.md` (NEW — create)
- `src/lib/lessons/physics/CLAUDE.md` (NEW — create)
- `src/lib/topics/CLAUDE.md`
- `src/types/CLAUDE.md`
- `scripts/CLAUDE.md` (NEW — create)
- `.claude/rules/lessons.md`
- `.claude/rules/topics.md`
- `.claude/rules/components.md`

- [ ] **Step 1: Update root `CLAUDE.md`**

Changes:
- Commands section: add `pnpm test`, `pnpm test:run`, `pnpm new-chapter`, `pnpm new-topic`, `pnpm build:registry`, `pnpm validate:content`
- Architecture section: add `scripts/` and `docs/` directories to the tree
- Two Lesson Formats section: **delete entirely** (V1 is gone; only one format now)
- Add a "Chapters" section noting the new model

- [ ] **Step 2: Rewrite `src/lib/lessons/CLAUDE.md`**

Full contents:
````markdown
# src/lib/lessons/

Static chapter content. Each file exports a `ChapterDefinition`.

## Structure

```
data.ts              ← Thin shim: re-exports + helpers (getChapter, getChaptersForTopic)
data.generated.ts    ← CODEGEN output; do not edit by hand
schema.ts            ← Zod schemas for Chapter + Lesson + every step type
{subject}/{topic}/{chapter}.ts  ← One file per chapter
```

## Adding a Chapter

Easiest: `pnpm new-chapter math/<topic-slug>/<chapter-slug> "Display Title"`.

Manually:
1. Create `src/lib/lessons/{subject}/{topic-slug}/{chapter-slug}.ts`
2. Export a `ChapterDefinition` named `chapter`:
   ```ts
   export const chapter: ChapterDefinition = {
     slug: "word-problems",        // must match filename
     topicSlug: "linear-equations", // must match parent folder + exist in tree
     order: 2,                     // unique per topic
     title: "Slovní úlohy",        // Czech display title
     lesson: { steps: [...], summary: { keyTakeaways: [...] } },
   };
   ```
3. Run `pnpm build:registry` (regenerates `data.generated.ts`)

## Rules

- All file/folder/slug names **English**. Display text (`title`, lesson content) **Czech**.
- Slugs match `^[a-z0-9-]+$`
- `order` is unique within a topic
- `topicSlug` must exist in the topic tree (see `src/lib/topics/`)
- Every MC step has **exactly one** `isCorrect: true`
- Text-input with `numericTolerance` must have a numeric `expectedAnswer` (Czech decimal comma `3,14` accepted)
- `pnpm build` runs Zod validation — malformed content fails the build

## Content Conventions

- LaTeX: `$...$` inline, `$$...$$` block
- Math functions: `tg` (not `tan`), `cotg`, `ln`, `log`
- Intervals: `⟨a; b⟩` closed, `(a; b)` open
- Use `motion/react` for animations (never `framer-motion`)
````

- [ ] **Step 3: Create `src/lib/lessons/math/CLAUDE.md`**

Full contents:
```markdown
# src/lib/lessons/math/

Math chapters. One folder per topic (matching slugs in `math-tree.ts`).

Each topic folder contains one file per chapter:
```
math/linear-equations/intro.ts
math/linear-equations/word-problems.ts
math/derivatives/intro.ts
```

See `src/lib/lessons/CLAUDE.md` for chapter file shape and conventions.
```

- [ ] **Step 4: Create `src/lib/lessons/physics/CLAUDE.md`**

Same content as math/ but for physics.

- [ ] **Step 5: Create `scripts/CLAUDE.md`**

Full contents:
````markdown
# scripts/

Build-time scripts. Run with `tsx` (no compile step).

| Script | Purpose | When to run |
|--------|---------|-------------|
| `build-registry.ts` | Scans `src/lib/lessons/` and writes `data.generated.ts` with a typed chapter registry | `predev`, `prebuild`; also `pnpm build:registry` manually |
| `validate-content.ts` | Zod-validates every chapter; cross-checks against the topic trees | `prebuild`; also `pnpm validate:content` |
| `new-chapter.ts` | Scaffolds a new chapter file from a template | `pnpm new-chapter <subject>/<topic>/<chapter> [title]` |
| `new-topic.ts` | Adds a new topic to the tree + creates the first chapter | `pnpm new-topic <subject>/<category>/<topic> [name]` |

## Rules

- No React imports — scripts run in Node
- Prefer `node:` prefixed imports (`node:fs/promises`)
- Fail loudly — `process.exit(1)` on any validation error
- Deterministic output — regenerations should produce byte-identical files given the same input
````

- [ ] **Step 6: Update `src/lib/lesson/CLAUDE.md`**

Full contents:
````markdown
# src/lib/lesson/

Lesson runtime engine — builds slides and validates answers. Pure functions, no React.

## Files

| File | Purpose |
|------|---------|
| `build-slides.ts` | `Lesson` → `Slide[]` (narrative + steps → summary → complete) |
| `answer-evaluator.ts` | `checkAnswer()` — normalize, exact → acceptable list → numeric tolerance |
| `math-colors.ts` | Color constants for variable tracking in KaTeX |
| `progress-store.ts` | localStorage: chapter completions, tiers, streak, spaced retrieval |

## Answer Evaluation

1. Normalize: trim, lowercase, Czech comma → dot, strip LaTeX wrappers
2. Exact match with expected answer
3. Match against `acceptableAnswers[]`
4. Numeric tolerance: `|userNum - expectedNum| ≤ tolerance`

Always returns boolean, never throws.

## Progress

- Keys: `${topicSlug}/${chapterSlug}`
- Tier never downgrades
- `getTopicAggregateProgress()` returns worst-tier across a topic's chapters
````

- [ ] **Step 7: Rewrite `src/types/CLAUDE.md`**

Full contents:
```markdown
# src/types/

Shared TypeScript interfaces. Imported by both `components/` and `lib/`.

## Files

| File | Purpose |
|------|---------|
| `chapter.ts` | `ChapterDefinition` — one learnable unit within a topic |
| `lesson.ts` | `Lesson`, `LessonStep` union (explain, multiple-choice, text-input, explore, reveal, sort-order, prediction) |
| `slide.ts` | `Slide` discriminated union for the slide-deck renderer |
| `topic.ts` | `TopicNode`, `TopicTreeData` |

## Rules

- All slide/step unions use `type` field as discriminant
- `VisualBlock.props` is `Record<string, unknown>` — typed only at component level
- Keep types here only if shared across 2+ directories
```

- [ ] **Step 8: Rewrite `.claude/rules/lessons.md`**

Update to describe chapter-based content creation flow:
- Adding a new lesson = `pnpm new-chapter`
- File structure per chapter
- Slug rules
- Content rules unchanged
- Remove all V1 references

- [ ] **Step 9: Update `.claude/rules/topics.md`**

Replace Czech slug examples with English ones. Update "Adding a New Topic" to reference `pnpm new-topic`.

- [ ] **Step 10: Update `.claude/rules/components.md`**

Remove V1 references. "Adding a new slide type" list matches the `Slide` union. Update slide type strings (drop `-v2` suffix).

- [ ] **Step 11: Update `src/components/lesson/CLAUDE.md`**

Drop V1 mentions from the component flow diagram. Remove references to deleted components (`practice-problem.tsx`, V1 slides).

- [ ] **Step 12: Update `src/components/lesson/slides/CLAUDE.md`**

Drop V1 slide list. Keep only the V2 list (now just "the list").

## Task 4.5: Final verification + commit

- [ ] **Step 1: Full verification**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm test:run && pnpm build 2>&1 | tail -10 && pnpm lint 2>&1 | tail -3
```
Expected: tests pass, build passes, lint at baseline (no new errors).

- [ ] **Step 2: Manual browser smoke**

If dev server still running from earlier, restart to pick up all changes:
```bash
kill $(lsof -ti:3000) 2>/dev/null
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH" && pnpm dev &
```

Visit:
- http://localhost:3000 — homepage
- http://localhost:3000/topics — subjects list
- http://localhost:3000/topics/math — category tree (English slugs in URL)
- http://localhost:3000/topics/math/linear-equations — chapter list (1 card)
- http://localhost:3000/topics/math/linear-equations/intro — lesson player
- Complete a lesson → verify tier badge shows correctly
- http://localhost:3000/topics/physics/kinematics/intro — physics lesson

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Add new-chapter/new-topic CLIs; update CLAUDE.md docs; drop migration script

- pnpm new-chapter <subject>/<topic>/<chapter> [title] — scaffolds a chapter file
- pnpm new-topic <subject>/<category>/<topic> [name] — adds topic to tree +
  creates intro chapter
- CLAUDE.md refreshed across the tree to match final state (chapter model,
  scripts, no V1 references)
- Migration script removed (one-off, purpose served)

Refactor complete: adding a new chapter is one file + one command.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 4: Push all four commits**

```bash
git push origin main
```

---

# Rollback Strategy

If any commit introduces an unrecoverable problem:

- Commit 1 alone: safe to `git revert` — no structural changes.
- Commit 2 alone: `git revert` restores V1 Czech-slug structure; `pnpm build:registry` would need to be removed from `package.json` too, or the revert will leave a broken prebuild hook. Use `git revert --no-commit`, then fix `package.json`, then commit.
- Commit 3: reverting alone is hard (V1 files deleted). Preferable: `git revert HEAD` on the most recent commit and re-fix forward.
- Commit 4: trivial to revert — only CLIs + docs.

---

# Self-Review Checklist

- [x] **Spec coverage:** every section in the spec maps to at least one task (chapter layer → 2.1/2.3/3.7; codegen → 2.5; validation → 2.6; CLIs → 4.1/4.2; CLAUDE.md → 4.4; V1 delete → 3.2; Vitest → 1.1; English migration → 2.3/2.4)
- [x] **No placeholders:** every code step has runnable code; every command has expected output
- [x] **Type consistency:** `Lesson`, `Slide`, `ChapterDefinition`, `recordChapterCompletion`, `getChaptersForTopic` used consistently across tasks
- [x] **Commit hygiene:** four commits, each independently reviewable, each leaves the build green (with the minor Task 2.9 caveat around route compat shims)
- [x] **Rollback path documented**

---

# Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-04-18-extensibility-refactor.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task with two-stage review between tasks. Clean context per task, catches issues early, slower per task but far less risk for a refactor this size.

**2. Inline Execution** — Execute tasks in this session. Faster but my context will grow; review happens at commit checkpoints rather than per-task.

**Which approach?**
