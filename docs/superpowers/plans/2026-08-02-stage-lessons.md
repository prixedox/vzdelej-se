# Stage Lessons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a second chapter format in which a persistent manipulable stays on screen for the whole lesson and the formula appears last, as a name for something the student has already watched happen.

**Architecture:** `ChapterDefinition` becomes a union of `DeckChapter` (existing, `format` optional so no current file changes) and `StageChapter`. A stage chapter declares one `StageSpec`, a list of `Beat`s, and a required `naming` field. Pure readout functions live in `src/lib/lesson/stages/` with no React; the controlled stage components live in `src/components/lesson/stages/`. Goal detection is declarative data checked against readouts, so it is unit-testable with no DOM.

**Tech Stack:** Next.js 16 (App Router, static export), React 19, TypeScript strict, Tailwind CSS 4, shadcn/ui, KaTeX, Zod 4, Motion (`motion/react`), Vitest.

**Spec:** `docs/superpowers/specs/2026-08-02-stage-lessons-design.md`

## Global Constraints

Every task's requirements implicitly include this section.

- TypeScript strict. No `any`, no `@ts-ignore`.
- All user-facing text is **Czech**. Code comments, identifiers, slugs, filenames stay **English**.
- Import alias is `@/` → `src/`. Import order: React → external libs → internal.
- Animation imports come from `motion/react`, never `framer-motion`.
- `cn()` from `@/lib/utils` for conditional Tailwind classes.
- `"use client"` only on components that use hooks or browser APIs.
- Never hand-edit `src/lib/lessons/data.generated.ts` — regenerate with `pnpm build:registry`.
- Never hand-edit files in `src/components/ui/`.
- Data flow direction: `types/` ← `lib/` ← `components/` ← `app/`. `src/lib/` must not import React.
- Czech math conventions: decimal comma (`3,14`), `tg`/`cotg`/`ln`/`log`, closed interval `⟨a; b⟩`, open `(a; b)`.
- LaTeX: `$...$` inline, `$$...$$` block.
- Dark mode via `next-themes` — every new UI element needs `dark:` variants.
- Tailwind spacing scale only (`p-4`, `gap-6`), no arbitrary values.
- Tests live next to code as `*.test.ts`.
- Run one test file with `pnpm test:run <path>`; the whole suite with `pnpm test:run`.
- `pnpm build:registry` after adding or renaming any chapter file.
- `chapter.order` must be unique within its topic folder — list the folder before picking a value. `validate:content` fails loudly on collisions.

**One deliberate deviation from the spec:** the spec describes beat transitions animating stage parameters "through `useSpring`". This plan uses a pure `lerpParams` function driven by `requestAnimationFrame` instead. Stage parameters are a dynamic `Record<string, number>` whose keys differ per stage, and `useSpring` requires a fixed hook count known at render time. The rAF approach delivers the same behavior — the stage travels between configurations — and keeps the interpolation math pure and unit-testable, which a hook would not be in a repo with no component-testing stack.

---

### Task 1: Stage types and the chapter union

Introduces every type later tasks reference, and converts `ChapterDefinition` to a union without touching any of the 38 existing chapter files.

**Files:**
- Create: `src/types/stage.ts`
- Modify: `src/types/chapter.ts` (whole file)
- Modify: `src/app/(app)/topics/[subjectSlug]/[topicSlug]/[chapterSlug]/chapter-page.tsx:41`

**Interfaces:**
- Consumes: nothing.
- Produces: `StageType`, `StageSpec`, `Beat`, `ObserveBeat`, `ManipulateBeat`, `PredictBeat`, `Goal`, `NamingBeat`, `StageLesson` from `@/types/stage`; `ChapterDefinition`, `DeckChapter`, `StageChapter` from `@/types/chapter`.

- [ ] **Step 1: Create the stage types**

Create `src/types/stage.ts`:

```ts
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
  /** Offered after sustained fiddling without reaching the goal. Czech. */
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
```

- [ ] **Step 2: Convert `ChapterDefinition` to a union**

Replace the whole of `src/types/chapter.ts`:

```ts
import type { Lesson } from "./lesson";
import type { StageLesson } from "./stage";

interface ChapterBase {
  /** URL fragment. Must match filename (sans .ts) and `^[a-z0-9-]+$`. */
  slug: string;
  /** Parent topic's slug. Must match parent directory name and exist in the tree. */
  topicSlug: string;
  /** Sort order within a topic. Unique per topic. */
  order: number;
  /** Display title (Czech). */
  title: string;
}

/** The original format. `format` is optional so existing files need no edits. */
export interface DeckChapter extends ChapterBase {
  format?: "deck";
  lesson: Lesson;
}

/** Derive-then-name format: persistent stage + beats + required naming. */
export interface StageChapter extends ChapterBase {
  format: "stage";
  lesson: StageLesson;
}

export type ChapterDefinition = DeckChapter | StageChapter;
```

- [ ] **Step 3: Run the type checker to see what the union broke**

Run: `pnpm exec tsc --noEmit`
Expected: FAIL — one error at `chapter-page.tsx:41`, because `chapter.lesson` is now `Lesson | StageLesson` and `LessonShell` accepts only `Lesson`.

- [ ] **Step 4: Narrow at the single consumer**

In `src/app/(app)/topics/[subjectSlug]/[topicSlug]/[chapterSlug]/chapter-page.tsx`, replace the `<LessonShell .../>` element (line 41) with a narrowed branch. Stage rendering arrives in Task 11; until then a stage chapter shows the standard not-found fallback rather than crashing.

```tsx
      {chapter.format === "stage" ? (
        <div className="text-center py-20 space-y-3">
          <h2 className="text-2xl font-bold">Kapitola nenalezena</h2>
          <Link href="/topics" className="text-primary hover:underline">
            Zpět na témata
          </Link>
        </div>
      ) : (
        <LessonShell
          lesson={chapter.lesson}
          topicSlug={topicSlug}
          chapterSlug={chapterSlug}
        />
      )}
```

- [ ] **Step 5: Verify types and the existing suite are clean**

Run: `pnpm exec tsc --noEmit && pnpm test:run && pnpm lint`
Expected: tsc clean, all existing tests PASS, lint clean. The 38 existing chapter files are unmodified.

- [ ] **Step 6: Commit**

```bash
git add src/types/stage.ts src/types/chapter.ts "src/app/(app)/topics/[subjectSlug]/[topicSlug]/[chapterSlug]/chapter-page.tsx"
git commit -m "feat(types): add stage lesson types and chapter format union"
```

---

### Task 2: `parabola-roots` readouts

The first pure stage module. No React, no DOM — this is what makes goal detection testable.

**Files:**
- Create: `src/lib/lesson/stages/parabola-roots.ts`
- Test: `src/lib/lesson/stages/parabola-roots.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `PARABOLA_ROOTS_PARAMS: string[]`, `PARABOLA_ROOTS_READOUTS: string[]`, `readouts(p: Record<string, number>): Record<string, number>` from `@/lib/lesson/stages/parabola-roots`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/lesson/stages/parabola-roots.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readouts, PARABOLA_ROOTS_PARAMS, PARABOLA_ROOTS_READOUTS } from "./parabola-roots";

describe("parabola-roots readouts", () => {
  it("reports two roots when the discriminant is positive", () => {
    // x^2 - 4 = 0 → roots at ±2, D = 16
    const r = readouts({ a: 1, b: 0, c: -4 });
    expect(r.rootCount).toBe(2);
    expect(r.rootGap).toBeCloseTo(4, 5);
  });

  it("reports one root and zero gap at the touching point", () => {
    // x^2 = 0 → D = 0
    const r = readouts({ a: 1, b: 0, c: 0 });
    expect(r.rootCount).toBe(1);
    expect(r.rootGap).toBeCloseTo(0, 10);
  });

  it("reports no roots and a negative gap once lifted past the axis", () => {
    // x^2 + 2 = 0 → D = -8
    const r = readouts({ a: 1, b: 0, c: 2 });
    expect(r.rootCount).toBe(0);
    expect(r.rootGap).toBeLessThan(0);
  });

  it("passes rootGap continuously through zero so overshoot is distinguishable", () => {
    const just = readouts({ a: 1, b: 0, c: -0.01 }).rootGap;
    const past = readouts({ a: 1, b: 0, c: 0.01 }).rootGap;
    expect(just).toBeGreaterThan(0);
    expect(past).toBeLessThan(0);
    expect(Math.abs(just + past)).toBeLessThan(1e-9);
  });

  it("handles a downward-opening parabola", () => {
    // -x^2 + 4 = 0 → roots at ±2
    const r = readouts({ a: -1, b: 0, c: 4 });
    expect(r.rootCount).toBe(2);
    expect(r.rootGap).toBeCloseTo(4, 5);
  });

  it("computes the vertex y-coordinate", () => {
    // x^2 - 4x + 1 → vertex at x = 2, y = -3
    expect(readouts({ a: 1, b: -4, c: 1 }).vertexY).toBeCloseTo(-3, 5);
  });

  it("never returns a non-finite readout, even for a degenerate a", () => {
    for (const key of PARABOLA_ROOTS_READOUTS) {
      expect(Number.isFinite(readouts({ a: 0, b: 0, c: 0 })[key]), key).toBe(true);
    }
  });

  it("declares params and readouts used by the registry", () => {
    expect(PARABOLA_ROOTS_PARAMS).toEqual(["a", "b", "c"]);
    expect(PARABOLA_ROOTS_READOUTS).toEqual(["rootCount", "rootGap", "vertexY"]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run src/lib/lesson/stages/parabola-roots.test.ts`
Expected: FAIL — cannot resolve `./parabola-roots`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/lesson/stages/parabola-roots.ts`:

```ts
/**
 * Pure readouts for the `parabola-roots` stage: y = ax² + bx + c.
 * No React. Goal detection runs against these values.
 */

export const PARABOLA_ROOTS_PARAMS = ["a", "b", "c"];
export const PARABOLA_ROOTS_READOUTS = ["rootCount", "rootGap", "vertexY"];

/** `a` is clamped away from zero — a zero leading coefficient is not a parabola. */
const MIN_A = 1e-6;

export function readouts(p: Record<string, number>): Record<string, number> {
  const a = Math.abs(p.a) < MIN_A ? (p.a < 0 ? -MIN_A : MIN_A) : p.a;
  const b = p.b ?? 0;
  const c = p.c ?? 0;
  const d = b * b - 4 * a * c;

  // Signed, so the value passes continuously through zero: overshooting the
  // touching point reads negative rather than looking like another "just touching".
  const rootGap = (Math.sign(d) * Math.sqrt(Math.abs(d))) / Math.abs(a);

  return {
    rootCount: d > 0 ? 2 : d === 0 ? 1 : 0,
    rootGap,
    vertexY: c - (b * b) / (4 * a),
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test:run src/lib/lesson/stages/parabola-roots.test.ts`
Expected: PASS, 8 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/lesson/stages/parabola-roots.ts src/lib/lesson/stages/parabola-roots.test.ts
git commit -m "feat(stages): add pure parabola-roots readouts"
```

---

### Task 3: Goal evaluation

**Files:**
- Create: `src/lib/lesson/goal.ts`
- Test: `src/lib/lesson/goal.test.ts`

**Interfaces:**
- Consumes: `Goal` from `@/types/stage`.
- Produces: `isGoalMet(goal: Goal, readouts: Record<string, number>): boolean` from `@/lib/lesson/goal`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/lesson/goal.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { isGoalMet } from "./goal";
import type { Goal } from "@/types/stage";

const goal: Goal = { readout: "rootGap", target: 0, within: 0.15 };

describe("isGoalMet", () => {
  it("is met exactly on target", () => {
    expect(isGoalMet(goal, { rootGap: 0 })).toBe(true);
  });

  it("is met inside the tolerance on both sides", () => {
    expect(isGoalMet(goal, { rootGap: 0.1 })).toBe(true);
    expect(isGoalMet(goal, { rootGap: -0.1 })).toBe(true);
  });

  it("is met exactly at the tolerance boundary", () => {
    expect(isGoalMet(goal, { rootGap: 0.15 })).toBe(true);
  });

  it("is not met outside the tolerance", () => {
    expect(isGoalMet(goal, { rootGap: 0.2 })).toBe(false);
  });

  it("works for a non-zero target", () => {
    const g: Goal = { readout: "alignedValue", target: 3, within: 0.15 };
    expect(isGoalMet(g, { alignedValue: 2.9 })).toBe(true);
    expect(isGoalMet(g, { alignedValue: 3.5 })).toBe(false);
  });

  it("is not met when the readout is missing", () => {
    expect(isGoalMet(goal, {})).toBe(false);
  });

  it("is not met for non-finite readouts", () => {
    expect(isGoalMet(goal, { rootGap: NaN })).toBe(false);
    expect(isGoalMet(goal, { rootGap: Infinity })).toBe(false);
  });

  it("never throws", () => {
    const bad = { readout: "x", target: NaN, within: -1 } as Goal;
    expect(() => isGoalMet(bad, { x: 1 })).not.toThrow();
    expect(isGoalMet(bad, { x: 1 })).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run src/lib/lesson/goal.test.ts`
Expected: FAIL — cannot resolve `./goal`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/lesson/goal.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test:run src/lib/lesson/goal.test.ts`
Expected: PASS, 8 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/lesson/goal.ts src/lib/lesson/goal.test.ts
git commit -m "feat(stages): add declarative goal evaluation"
```

---

### Task 4: Stage registry

The single source of truth for which stages exist, what params they take, and what they read out. Validation and components both read it.

**Files:**
- Create: `src/lib/lesson/stages/registry.ts`
- Test: `src/lib/lesson/stages/registry.test.ts`

**Interfaces:**
- Consumes: `readouts`, `PARABOLA_ROOTS_PARAMS`, `PARABOLA_ROOTS_READOUTS` from `@/lib/lesson/stages/parabola-roots`; `StageType` from `@/types/stage`.
- Produces: `StageModule` interface, `stageRegistry: Record<StageType, StageModule>`, `getStageModule(type: string): StageModule | null` from `@/lib/lesson/stages/registry`.

Tasks 13 and 14 add the `log-slide-rule` and `motion-timeline` entries.

- [ ] **Step 1: Write the failing test**

Create `src/lib/lesson/stages/registry.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { stageRegistry, getStageModule } from "./registry";

describe("stage registry", () => {
  it("resolves a registered stage", () => {
    const mod = getStageModule("parabola-roots");
    expect(mod).not.toBeNull();
    expect(mod?.params).toEqual(["a", "b", "c"]);
  });

  it("returns null for an unregistered stage", () => {
    expect(getStageModule("does-not-exist")).toBeNull();
  });

  it("declares a range for every param, low before high", () => {
    for (const [type, mod] of Object.entries(stageRegistry)) {
      for (const p of mod.params) {
        const range = mod.ranges[p];
        expect(range, `${type}.${p}`).toBeDefined();
        expect(range[0], `${type}.${p}`).toBeLessThan(range[1]);
      }
    }
  });

  it("every registered stage produces exactly the readouts it declares", () => {
    for (const [type, mod] of Object.entries(stageRegistry)) {
      const seed = Object.fromEntries(mod.params.map((p) => [p, 1]));
      const produced = Object.keys(mod.readouts(seed)).sort();
      expect(produced, type).toEqual([...mod.readouts_declared].sort());
    }
  });

  it("every registered stage declares at least one param and one readout", () => {
    for (const [type, mod] of Object.entries(stageRegistry)) {
      expect(mod.params.length, type).toBeGreaterThan(0);
      expect(mod.readouts_declared.length, type).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run src/lib/lesson/stages/registry.test.ts`
Expected: FAIL — cannot resolve `./registry`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/lesson/stages/registry.ts`:

```ts
import type { StageType } from "@/types/stage";
import {
  readouts as parabolaRootsReadouts,
  PARABOLA_ROOTS_PARAMS,
  PARABOLA_ROOTS_READOUTS,
} from "./parabola-roots";

export interface StageModule {
  /** Parameter keys this stage accepts in `initial`, `preset`, and `then`. */
  params: string[];
  /**
   * Inclusive [min, max] per param. Drives the generic "ukaž mi to" search
   * and lets validation reject out-of-range authored values.
   */
  ranges: Record<string, [number, number]>;
  /** Readout keys this stage produces. Beat goals may only reference these. */
  readouts_declared: string[];
  /** Pure. Must return exactly the declared readout keys, all finite. */
  readouts: (p: Record<string, number>) => Record<string, number>;
}

/**
 * `Partial` while only one stage exists — Tasks 13 and 14 add the other two,
 * and Task 14 restores the exhaustive `Record<StageType, StageModule>` so a
 * declared-but-unimplemented stage type becomes a compile error.
 */
export const stageRegistry: Partial<Record<StageType, StageModule>> = {
  "parabola-roots": {
    params: PARABOLA_ROOTS_PARAMS,
    ranges: { a: [-3, 3], b: [-6, 6], c: [-8, 6] },
    readouts_declared: PARABOLA_ROOTS_READOUTS,
    readouts: parabolaRootsReadouts,
  },
};

export function getStageModule(type: string): StageModule | null {
  return (stageRegistry as Record<string, StageModule>)[type] ?? null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test:run src/lib/lesson/stages/registry.test.ts && pnpm exec tsc --noEmit`
Expected: PASS, 4 tests. tsc clean.

- [ ] **Step 5: Commit**

```bash
git add src/lib/lesson/stages/registry.ts src/lib/lesson/stages/registry.test.ts
git commit -m "feat(stages): add stage registry"
```

---

### Task 5: `buildBeats` — StageLesson to a flat screen list

Mirrors `buildSlides`. Produces one screen per beat, then naming, then each `apply` step as a reused `Slide`, then summary and complete.

**Files:**
- Create: `src/lib/lesson/build-beats.ts`
- Test: `src/lib/lesson/build-beats.test.ts`
- Modify: `src/lib/lesson/build-slides.ts:6` (export `stepToSlide`)

**Interfaces:**
- Consumes: `StageLesson`, `Beat`, `NamingBeat` from `@/types/stage`; `Slide` from `@/types/slide`; `stepToSlide` from `@/lib/lesson/build-slides`.
- Produces: `StageScreen` union and `buildBeats(lesson: StageLesson): StageScreen[]` from `@/lib/lesson/build-beats`.

- [ ] **Step 1: Export `stepToSlide` from the existing builder**

In `src/lib/lesson/build-slides.ts`, change line 6 from `function stepToSlide(` to `export function stepToSlide(`. Nothing else changes.

- [ ] **Step 2: Write the failing test**

Create `src/lib/lesson/build-beats.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { buildBeats } from "./build-beats";
import type { StageLesson } from "@/types/stage";

const lesson: StageLesson = {
  stage: { type: "parabola-roots", initial: { a: 1, b: 0, c: -4 }, readouts: ["rootGap"] },
  beats: [
    { kind: "observe", prompt: "Táhni parabolou nahoru a dolů." },
    {
      kind: "manipulate",
      prompt: "Posuň ji tak, aby se osy jen dotýkala.",
      goal: { readout: "rootGap", target: 0, within: 0.15 },
      onReached: "Teď se oba kořeny slily v jeden.",
    },
  ],
  naming: {
    observation: "Existuje přesná hranice.",
    formula: "D = b^2 - 4ac",
    mapping: "$D$ měří vzdálenost od té hranice.",
  },
  apply: [
    {
      type: "multiple-choice",
      question: "Kolik kořenů má rovnice s $D < 0$?",
      choices: [
        { label: "Žádný", isCorrect: true, feedback: "Správně." },
        { label: "Dva", isCorrect: false, feedback: "Dva jsou při $D > 0$." },
      ],
      explanation: "Záporný diskriminant znamená žádný reálný kořen.",
    },
  ],
  summary: { keyTakeaways: ["Diskriminant měří vzdálenost od dotyku."] },
};

describe("buildBeats", () => {
  it("emits beats, then naming, then apply, then summary, then complete", () => {
    const screens = buildBeats(lesson);
    expect(screens.map((s) => s.kind)).toEqual([
      "beat",
      "beat",
      "naming",
      "apply",
      "summary",
      "complete",
    ]);
  });

  it("places naming after every beat", () => {
    const screens = buildBeats(lesson);
    const namingIndex = screens.findIndex((s) => s.kind === "naming");
    const lastBeatIndex = screens.map((s) => s.kind).lastIndexOf("beat");
    expect(namingIndex).toBeGreaterThan(lastBeatIndex);
  });

  it("numbers screens consecutively from zero with a consistent total", () => {
    const screens = buildBeats(lesson);
    screens.forEach((s, i) => {
      expect(s.index).toBe(i);
      expect(s.total).toBe(screens.length);
    });
  });

  it("gives every screen a unique id", () => {
    const ids = buildBeats(lesson).map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("wraps apply steps as reusable Slides", () => {
    const screens = buildBeats(lesson);
    const apply = screens.find((s) => s.kind === "apply");
    expect(apply?.kind).toBe("apply");
    if (apply?.kind === "apply") {
      expect(apply.slide.type).toBe("multiple-choice");
    }
  });

  it("works with no apply steps at all", () => {
    const screens = buildBeats({ ...lesson, apply: undefined });
    expect(screens.map((s) => s.kind)).toEqual(["beat", "beat", "naming", "summary", "complete"]);
  });

  it("carries the beat payload through untouched", () => {
    const first = buildBeats(lesson)[0];
    expect(first.kind).toBe("beat");
    if (first.kind === "beat") {
      expect(first.beat.prompt).toBe("Táhni parabolou nahoru a dolů.");
    }
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `pnpm test:run src/lib/lesson/build-beats.test.ts`
Expected: FAIL — cannot resolve `./build-beats`.

- [ ] **Step 4: Write the implementation**

Create `src/lib/lesson/build-beats.ts`:

```ts
import type { Beat, NamingBeat, StageLesson } from "@/types/stage";
import type { Slide } from "@/types/slide";
import { stepToSlide } from "./build-slides";

interface ScreenBase {
  id: string;
  index: number;
  total: number;
}

export interface BeatScreen extends ScreenBase {
  kind: "beat";
  beat: Beat;
}

export interface NamingScreen extends ScreenBase {
  kind: "naming";
  naming: NamingBeat;
}

/** Practice reuses the deck-format slide components verbatim. */
export interface ApplyScreen extends ScreenBase {
  kind: "apply";
  slide: Slide;
}

export interface StageSummaryScreen extends ScreenBase {
  kind: "summary";
  keyTakeaways: string[];
  nextTopicSuggestion?: string;
}

export interface StageCompleteScreen extends ScreenBase {
  kind: "complete";
}

export type StageScreen =
  | BeatScreen
  | NamingScreen
  | ApplyScreen
  | StageSummaryScreen
  | StageCompleteScreen;

export function buildBeats(lesson: StageLesson): StageScreen[] {
  const screens: StageScreen[] = [];
  const push = (make: (base: ScreenBase) => StageScreen) => {
    const index = screens.length;
    // `total` is patched once the full list is known.
    screens.push(make({ id: `stage-${index}`, index, total: 0 }));
  };

  lesson.beats.forEach((beat) => push((base) => ({ ...base, kind: "beat", beat })));

  push((base) => ({ ...base, kind: "naming", naming: lesson.naming }));

  (lesson.apply ?? []).forEach((step, i) =>
    push((base) => ({
      ...base,
      kind: "apply",
      // stepIndex/totalSteps are unused by the stage shell but required by Slide.
      slide: stepToSlide(step, `${base.id}-apply-${i}`, i, lesson.apply?.length ?? 0),
    }))
  );

  push((base) => ({
    ...base,
    kind: "summary",
    keyTakeaways: lesson.summary.keyTakeaways,
    nextTopicSuggestion: lesson.nextTopicSuggestion,
  }));

  push((base) => ({ ...base, kind: "complete" }));

  const total = screens.length;
  screens.forEach((s) => {
    s.total = total;
  });

  return screens;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test:run src/lib/lesson/build-beats.test.ts && pnpm test:run src/lib/lesson/build-slides.test.ts`
Expected: both PASS. `build-beats` 7 tests.

- [ ] **Step 6: Commit**

```bash
git add src/lib/lesson/build-beats.ts src/lib/lesson/build-beats.test.ts src/lib/lesson/build-slides.ts
git commit -m "feat(stages): add buildBeats screen builder"
```

---

### Task 6: Zod schema for stage chapters

**Files:**
- Modify: `src/lib/lessons/schema.ts` (append; change the `chapterSchema` export)
- Test: `src/lib/lessons/schema.test.ts` (append a describe block)

**Interfaces:**
- Consumes: `lessonStepSchema`, `slugShape` (already in the file).
- Produces: `stageLessonSchema`, `deckChapterSchema`, `stageChapterSchema`, and a rewritten `chapterSchema` from `@/lib/lessons/schema`.

- [ ] **Step 1: Write the failing test**

Append to `src/lib/lessons/schema.test.ts`:

```ts
import { stageChapterSchema } from "./schema";

const validStageChapter = {
  slug: "discriminant",
  topicSlug: "quadratic-equations",
  order: 2,
  format: "stage" as const,
  title: "Diskriminant",
  lesson: {
    stage: {
      type: "parabola-roots",
      initial: { a: 1, b: 0, c: -4 },
      readouts: ["rootCount", "rootGap", "vertexY"],
    },
    beats: [
      { kind: "observe", prompt: "Táhni parabolou nahoru a dolů." },
      {
        kind: "manipulate",
        prompt: "Posuň ji tak, aby se osy jen dotýkala.",
        goal: { readout: "rootGap", target: 0, within: 0.15 },
        onReached: "Teď se oba kořeny slily v jeden.",
      },
    ],
    naming: {
      observation: "Existuje přesná hranice.",
      formula: "D = b^2 - 4ac",
      mapping: "$D$ měří vzdálenost od té hranice.",
    },
    summary: { keyTakeaways: ["Diskriminant měří vzdálenost od dotyku."] },
  },
};

describe("stageChapterSchema", () => {
  it("accepts a well-formed stage chapter", () => {
    expect(stageChapterSchema.safeParse(validStageChapter).success).toBe(true);
  });

  it("rejects a stage chapter with no beats", () => {
    const bad = { ...validStageChapter, lesson: { ...validStageChapter.lesson, beats: [] } };
    expect(stageChapterSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects a missing naming block", () => {
    const lesson = { ...validStageChapter.lesson } as Record<string, unknown>;
    delete lesson.naming;
    expect(stageChapterSchema.safeParse({ ...validStageChapter, lesson }).success).toBe(false);
  });

  it("rejects an empty naming formula", () => {
    const bad = {
      ...validStageChapter,
      lesson: {
        ...validStageChapter.lesson,
        naming: { ...validStageChapter.lesson.naming, formula: "" },
      },
    };
    expect(stageChapterSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects a predict beat without exactly one correct option", () => {
    const bad = {
      ...validStageChapter,
      lesson: {
        ...validStageChapter.lesson,
        beats: [
          {
            kind: "predict",
            prompt: "A když ji zvedneš ještě výš?",
            question: "Kolik bude kořenů?",
            options: [
              { label: "Dva", isCorrect: true },
              { label: "Žádný", isCorrect: true },
            ],
            then: { c: 2 },
            reveal: "Žádný.",
          },
        ],
      },
    };
    expect(stageChapterSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects a negative goal tolerance", () => {
    const bad = {
      ...validStageChapter,
      lesson: {
        ...validStageChapter.lesson,
        beats: [
          {
            kind: "manipulate",
            prompt: "Posuň.",
            goal: { readout: "rootGap", target: 0, within: -1 },
            onReached: "Hotovo.",
          },
        ],
      },
    };
    expect(stageChapterSchema.safeParse(bad).success).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run src/lib/lessons/schema.test.ts`
Expected: FAIL — `stageChapterSchema` is not exported.

- [ ] **Step 3: Write the implementation**

In `src/lib/lessons/schema.ts`, replace the final `chapterSchema` export block with:

```ts
// ── Stage format ──

const goalSchema = z.object({
  readout: z.string().min(1),
  target: z.number().finite(),
  within: z.number().nonnegative(),
});

const paramMap = z.record(z.string(), z.number().finite());

const beatBase = {
  prompt: z.string().min(1),
  preset: paramMap.optional(),
  highlight: z.array(z.string().min(1)).optional(),
};

const observeBeat = z.object({ kind: z.literal("observe"), ...beatBase });

const manipulateBeat = z.object({
  kind: z.literal("manipulate"),
  ...beatBase,
  goal: goalSchema,
  onReached: z.string().min(1),
  nudge: z.string().min(1).optional(),
});

const predictBeat = z.object({
  kind: z.literal("predict"),
  ...beatBase,
  question: z.string().min(1),
  options: z
    .array(z.object({ label: z.string().min(1), isCorrect: z.boolean() }))
    .min(2)
    .refine(
      (opts) => opts.filter((o) => o.isCorrect).length === 1,
      "predict beat must have exactly one correct option"
    ),
  then: paramMap,
  reveal: z.string().min(1),
});

const beatSchema = z.discriminatedUnion("kind", [observeBeat, manipulateBeat, predictBeat]);

export const stageLessonSchema = z.object({
  title: z.string().min(1).optional(),
  stage: z.object({
    type: z.string().min(1),
    initial: paramMap,
    readouts: z.array(z.string().min(1)).min(1),
  }),
  beats: z.array(beatSchema).min(1),
  naming: z.object({
    observation: z.string().min(1),
    formula: z.string().min(1),
    mapping: z.string().min(1),
  }),
  apply: z.array(lessonStepSchema).optional(),
  summary: z.object({ keyTakeaways: z.array(z.string().min(1)).min(1) }),
  nextTopicSuggestion: z.string().optional(),
});

// ── Chapter ──

const chapterBase = {
  slug: slugShape,
  topicSlug: slugShape,
  order: z.number().int().nonnegative(),
  title: z.string().min(1),
};

export const deckChapterSchema = z.object({
  ...chapterBase,
  format: z.literal("deck").optional(),
  lesson: lessonSchema,
});

export const stageChapterSchema = z.object({
  ...chapterBase,
  format: z.literal("stage"),
  lesson: stageLessonSchema,
});

/**
 * A plain union rather than a discriminated one: existing deck chapters omit
 * `format` entirely, which `z.discriminatedUnion` would reject. Callers that
 * want precise errors should branch on `format` and use the specific schema —
 * `validate-content.ts` does exactly that.
 */
export const chapterSchema = z.union([deckChapterSchema, stageChapterSchema]);

export type ChapterSchema = z.infer<typeof chapterSchema>;
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test:run src/lib/lessons/schema.test.ts && pnpm exec tsc --noEmit`
Expected: PASS — the pre-existing schema tests plus 6 new ones. tsc clean.

- [ ] **Step 5: Commit**

```bash
git add src/lib/lessons/schema.ts src/lib/lessons/schema.test.ts
git commit -m "feat(stages): add Zod schema for stage chapters"
```

---

### Task 7: Stage cross-checks in content validation

The four checks that types cannot express — especially the formula-leak check, which is what makes derive-then-name enforced rather than merely encouraged.

**Files:**
- Create: `src/lib/lessons/validate-stage.ts`
- Test: `src/lib/lessons/validate-stage.test.ts`
- Modify: `scripts/validate-content.ts`

**Interfaces:**
- Consumes: `StageChapter` from `@/types/chapter`; `getStageModule` from `@/lib/lesson/stages/registry`.
- Produces: `formulaToken(formula: string): string` and `validateStageChapter(key: string, chapter: StageChapter): string[]` from `@/lib/lessons/validate-stage`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/lessons/validate-stage.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { formulaToken, validateStageChapter } from "./validate-stage";
import type { StageChapter } from "@/types/chapter";

function chapter(overrides: Partial<StageChapter["lesson"]> = {}): StageChapter {
  return {
    slug: "discriminant",
    topicSlug: "quadratic-equations",
    order: 2,
    format: "stage",
    title: "Diskriminant",
    lesson: {
      stage: {
        type: "parabola-roots",
        initial: { a: 1, b: 0, c: -4 },
        readouts: ["rootCount", "rootGap", "vertexY"],
      },
      beats: [
        {
          kind: "manipulate",
          prompt: "Posuň ji tak, aby se osy jen dotýkala.",
          goal: { readout: "rootGap", target: 0, within: 0.15 },
          onReached: "Teď se oba kořeny slily v jeden.",
        },
      ],
      naming: {
        observation: "Existuje přesná hranice.",
        formula: "D = b^2 - 4ac",
        mapping: "$D$ měří vzdálenost od té hranice.",
      },
      summary: { keyTakeaways: ["Diskriminant měří vzdálenost od dotyku."] },
      ...overrides,
    },
  };
}

describe("formulaToken", () => {
  it("takes the longest side of an equation, whitespace stripped", () => {
    expect(formulaToken("D = b^2 - 4ac")).toBe("b^2-4ac");
    expect(formulaToken("E = mc^2")).toBe("mc^2");
  });

  it("handles a multi-term right-hand side", () => {
    expect(formulaToken("\\log(ab) = \\log a + \\log b")).toBe("\\loga+\\logb");
  });

  it("returns the whole string when there is no equals sign", () => {
    expect(formulaToken("a^2 + b^2")).toBe("a^2+b^2");
  });
});

describe("validateStageChapter", () => {
  it("accepts a well-formed chapter", () => {
    expect(validateStageChapter("quadratic-equations/discriminant", chapter())).toEqual([]);
  });

  it("rejects a goal referencing an undeclared readout", () => {
    const bad = chapter({
      beats: [
        {
          kind: "manipulate",
          prompt: "Posuň.",
          goal: { readout: "notAThing", target: 0, within: 0.1 },
          onReached: "Hotovo.",
        },
      ],
    });
    const errors = validateStageChapter("k", bad);
    expect(errors.some((e) => e.includes("notAThing"))).toBe(true);
  });

  it("rejects a preset key the stage does not declare", () => {
    const bad = chapter({
      beats: [{ kind: "observe", prompt: "Sleduj.", preset: { zzz: 1 } }],
    });
    expect(validateStageChapter("k", bad).some((e) => e.includes("zzz"))).toBe(true);
  });

  it("rejects an unregistered stage type", () => {
    const bad = chapter({
      stage: { type: "no-such-stage", initial: {}, readouts: ["x"] },
    } as Partial<StageChapter["lesson"]>);
    expect(validateStageChapter("k", bad).some((e) => e.includes("no-such-stage"))).toBe(true);
  });

  it("rejects readouts the stage module does not produce", () => {
    const bad = chapter({
      stage: { type: "parabola-roots", initial: { a: 1 }, readouts: ["madeUp"] },
    } as Partial<StageChapter["lesson"]>);
    expect(validateStageChapter("k", bad).some((e) => e.includes("madeUp"))).toBe(true);
  });

  it("rejects the naming formula leaking into a beat prompt", () => {
    const bad = chapter({
      beats: [{ kind: "observe", prompt: "Vzorec je $b^2 - 4ac$, zapamatuj si ho." }],
    });
    expect(validateStageChapter("k", bad).some((e) => e.includes("formula-leak"))).toBe(true);
  });

  it("rejects the formula leaking into onReached", () => {
    const bad = chapter({
      beats: [
        {
          kind: "manipulate",
          prompt: "Posuň.",
          goal: { readout: "rootGap", target: 0, within: 0.1 },
          onReached: "Tady je b^2-4ac rovno nule.",
        },
      ],
    });
    expect(validateStageChapter("k", bad).some((e) => e.includes("formula-leak"))).toBe(true);
  });

  it("allows the formula in the naming block itself", () => {
    expect(validateStageChapter("k", chapter())).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run src/lib/lessons/validate-stage.test.ts`
Expected: FAIL — cannot resolve `./validate-stage`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/lessons/validate-stage.ts`:

```ts
import type { StageChapter } from "@/types/chapter";
import type { Beat } from "@/types/stage";
import { getStageModule } from "@/lib/lesson/stages/registry";

/**
 * The formula's identifying substring, derived deterministically:
 * strip whitespace; if there is an `=`, take the longest side; else the whole string.
 *   "D = b^2 - 4ac"                 → "b^2-4ac"
 *   "\\log(ab) = \\log a + \\log b" → "\\loga+\\logb"
 */
export function formulaToken(formula: string): string {
  const stripped = formula.replace(/\s+/g, "");
  if (!stripped.includes("=")) return stripped;
  return stripped
    .split("=")
    .reduce((longest, side) => (side.length > longest.length ? side : longest), "");
}

/** Every free-text field of a beat that a student can read. */
function beatText(beat: Beat): string[] {
  const out = [beat.prompt];
  if (beat.kind === "manipulate") {
    out.push(beat.onReached);
    if (beat.nudge) out.push(beat.nudge);
  }
  if (beat.kind === "predict") {
    out.push(beat.question, beat.reveal, ...beat.options.map((o) => o.label));
  }
  return out;
}

export function validateStageChapter(key: string, chapter: StageChapter): string[] {
  const errors: string[] = [];
  const { stage, beats, naming } = chapter.lesson;

  const mod = getStageModule(stage.type);
  if (!mod) {
    errors.push(`[unknown-stage] ${key}: stage type "${stage.type}" is not in the registry`);
    return errors;
  }

  const declaredParams = new Set(mod.params);
  const declaredReadouts = new Set(mod.readouts_declared);

  for (const r of stage.readouts) {
    if (!declaredReadouts.has(r)) {
      errors.push(`[unknown-readout] ${key}: stage "${stage.type}" does not produce readout "${r}"`);
    }
  }

  const checkParams = (where: string, params: Record<string, number>) => {
    for (const p of Object.keys(params)) {
      if (!declaredParams.has(p)) {
        errors.push(`[unknown-param] ${key}: ${where} sets "${p}", not a param of "${stage.type}"`);
      }
    }
  };

  checkParams("stage.initial", stage.initial);

  const authoredReadouts = new Set(stage.readouts);
  beats.forEach((beat, i) => {
    if (beat.preset) checkParams(`beats[${i}].preset`, beat.preset);
    if (beat.kind === "predict") checkParams(`beats[${i}].then`, beat.then);
    if (beat.kind === "manipulate" && !authoredReadouts.has(beat.goal.readout)) {
      errors.push(
        `[unknown-readout] ${key}: beats[${i}].goal.readout "${beat.goal.readout}" is not in stage.readouts`
      );
    }
  });

  // The pedagogy check: the formula must appear for the first time in `naming`.
  const token = formulaToken(naming.formula);
  if (token.length > 0) {
    beats.forEach((beat, i) => {
      for (const text of beatText(beat)) {
        if (text.replace(/\s+/g, "").includes(token)) {
          errors.push(
            `[formula-leak] ${key}: beats[${i}] contains "${token}" — the formula must first appear in naming`
          );
          break;
        }
      }
    });
  }

  return errors;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test:run src/lib/lessons/validate-stage.test.ts`
Expected: PASS, 11 tests.

- [ ] **Step 5: Wire it into the validation script**

In `scripts/validate-content.ts`, add these imports at the top:

```ts
import { deckChapterSchema, stageChapterSchema } from "@/lib/lessons/schema";
import { validateStageChapter } from "@/lib/lessons/validate-stage";
import type { StageChapter } from "@/types/chapter";
```

Remove the now-unused `chapterSchema` import. Then replace the schema-parse block inside the `for (const [key, chapter] of Object.entries(chapters))` loop — the lines from `const parsed = chapterSchema.safeParse(chapter);` through the closing `}` of `if (!parsed.success) { ... continue; }` — with:

```ts
    const isStage = chapter.format === "stage";
    const schema = isStage ? stageChapterSchema : deckChapterSchema;
    const parsed = schema.safeParse(chapter);
    if (!parsed.success) {
      errors.push(
        `[schema] ${key}: ${parsed.error.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; ")}`
      );
      continue;
    }
    if (isStage) {
      errors.push(...validateStageChapter(key, chapter as StageChapter));
    }
```

- [ ] **Step 6: Verify the full validation still passes on existing content**

Run: `pnpm validate:content`
Expected: `✓ Content OK: 38 chapters across ...` — the 38 deck chapters route to `deckChapterSchema` and still pass.

- [ ] **Step 7: Commit**

```bash
git add src/lib/lessons/validate-stage.ts src/lib/lessons/validate-stage.test.ts scripts/validate-content.ts
git commit -m "feat(stages): validate stage readouts, params, and formula placement"
```

---

### Task 8: Czech diacritic density check

**Scope note:** the spec puts *repairing* the five bad chapters out of scope, but a rule that fails the build would break `prebuild` immediately. Resolution: the rule fails the build for everything except a named grandfather list. New content — including all three pilot chapters — is guarded from day one, and the debt is explicit in code rather than implicit.

**Files:**
- Create: `src/lib/lessons/diacritics.ts`
- Test: `src/lib/lessons/diacritics.test.ts`
- Modify: `scripts/validate-content.ts`

**Interfaces:**
- Consumes: `ChapterDefinition` from `@/types/chapter`.
- Produces: `PROSE_KEYS`, `DIACRITIC_EXEMPT`, `MIN_DIACRITIC_RATIO`, `MIN_LETTERS`, `collectProse(value: unknown): string[]`, `diacriticRatio(text: string): { letters: number; ratio: number }`, `checkDiacritics(key: string, chapter: ChapterDefinition): string[]` from `@/lib/lessons/diacritics`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/lessons/diacritics.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  collectProse,
  diacriticRatio,
  checkDiacritics,
  DIACRITIC_EXEMPT,
  MIN_LETTERS,
} from "./diacritics";
import type { ChapterDefinition } from "@/types/chapter";

describe("collectProse", () => {
  it("picks up prose-bearing keys only", () => {
    const found = collectProse({
      slug: "should-not-appear",
      body: "Rovnice má dvě řešení.",
      expectedAnswer: "42",
    });
    expect(found).toEqual(["Rovnice má dvě řešení."]);
  });

  it("descends into arrays and nested objects", () => {
    const found = collectProse({
      summary: { keyTakeaways: ["První.", "Druhé."] },
      steps: [{ question: "Kolik?" }],
    });
    expect(found.sort()).toEqual(["Druhé.", "Kolik?", "První."]);
  });
});

describe("diacriticRatio", () => {
  it("ignores LaTeX spans when counting", () => {
    // Without stripping, the ASCII-only LaTeX would drag the ratio down.
    const withMath = diacriticRatio("Řešení je $$x^{2} + bx + c = 0$$ a je přesné.");
    const withoutMath = diacriticRatio("Řešení je  a je přesné.");
    expect(withMath.letters).toBe(withoutMath.letters);
    expect(withMath.ratio).toBeCloseTo(withoutMath.ratio, 10);
  });

  it("reports a healthy ratio for real Czech prose", () => {
    const text =
      "Kvadratická rovnice má dvě řešení, jedno řešení, nebo žádné reálné řešení. " +
      "Záleží na diskriminantu, který měří vzdálenost od dotyku s osou.";
    expect(diacriticRatio(text).ratio).toBeGreaterThan(0.04);
  });

  it("reports a near-zero ratio for diacritic-stripped prose", () => {
    const text =
      "Kvadraticka rovnice ma dve reseni, jedno reseni, nebo zadne realne reseni. " +
      "Zalezi na diskriminantu, ktery meri vzdalenost od dotyku s osou.";
    expect(diacriticRatio(text).ratio).toBeLessThan(0.04);
  });

  it("returns a zero ratio rather than dividing by zero on empty input", () => {
    expect(diacriticRatio("").ratio).toBe(0);
    expect(diacriticRatio("$x^2$").ratio).toBe(0);
  });
});

function makeChapter(body: string, slug = "fresh", topicSlug = "linear-equations"): ChapterDefinition {
  return {
    slug,
    topicSlug,
    order: 99,
    title: "Testovací kapitola",
    lesson: {
      steps: [{ type: "explain", body }],
      summary: { keyTakeaways: ["Shrnutí."] },
    },
  };
}

describe("checkDiacritics", () => {
  const longCzech =
    "Kvadratická rovnice má dvě řešení, jedno řešení, nebo žádné reálné řešení. ".repeat(6);
  const longStripped =
    "Kvadraticka rovnice ma dve reseni, jedno reseni, nebo zadne realne reseni. ".repeat(6);

  it("passes healthy Czech prose", () => {
    expect(checkDiacritics("linear-equations/fresh", makeChapter(longCzech))).toEqual([]);
  });

  it("fails prose with stripped diacritics", () => {
    const errors = checkDiacritics("linear-equations/fresh", makeChapter(longStripped));
    expect(errors.length).toBe(1);
    expect(errors[0]).toContain("[diacritics]");
  });

  it("skips chapters on the grandfather list", () => {
    const [exempt] = [...DIACRITIC_EXEMPT];
    const [topicSlug, slug] = exempt.split("/");
    expect(checkDiacritics(exempt, makeChapter(longStripped, slug, topicSlug))).toEqual([]);
  });

  it("skips chapters with too little prose to judge", () => {
    expect(diacriticRatio("Ano.").letters).toBeLessThan(MIN_LETTERS);
    expect(checkDiacritics("linear-equations/fresh", makeChapter("Ano."))).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run src/lib/lessons/diacritics.test.ts`
Expected: FAIL — cannot resolve `./diacritics`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/lessons/diacritics.ts`:

```ts
import type { ChapterDefinition } from "@/types/chapter";

/**
 * Object keys whose string values are prose a student reads. Keys not listed
 * here (slug, type, expectedAnswer, ...) are excluded from the count.
 */
export const PROSE_KEYS = new Set([
  "title",
  "narrative",
  "body",
  "question",
  "prompt",
  "scenario",
  "reveal",
  "explanation",
  "feedback",
  "label",
  "callout",
  "misconception",
  "revealedContent",
  "followUpQuestion",
  "caption",
  "keyTakeaways",
  "items",
  "hints",
  "nudge",
  "onReached",
  "observation",
  "mapping",
]);

/**
 * Chapters written without Czech diacritics before the rule existed.
 * These read as broken to a Czech student and must be repaired; delete each
 * entry as it is fixed. Do NOT add to this list — new content must pass.
 */
export const DIACRITIC_EXEMPT = new Set([
  "limits/intro",
  "probability/intro",
  "triangles/intro",
  "derivatives/intro",
  "trigonometric-functions/intro",
]);

export const MIN_DIACRITIC_RATIO = 0.04;
/** Below this much prose the ratio is too noisy to judge. */
export const MIN_LETTERS = 200;

const DIACRITICS = /[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/g;
const LETTERS = /[\p{L}]/gu;

/** Walk a chapter and collect every string sitting under a prose key. */
export function collectProse(value: unknown): string[] {
  const out: string[] = [];
  const walk = (node: unknown, underProseKey: boolean) => {
    if (typeof node === "string") {
      if (underProseKey) out.push(node);
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((child) => walk(child, underProseKey));
      return;
    }
    if (node && typeof node === "object") {
      for (const [key, child] of Object.entries(node as Record<string, unknown>)) {
        walk(child, PROSE_KEYS.has(key));
      }
    }
  };
  walk(value, false);
  return out;
}

function stripLatex(s: string): string {
  return s.replace(/\$\$[\s\S]*?\$\$/g, " ").replace(/\$[^$]*\$/g, " ");
}

export function diacriticRatio(text: string): { letters: number; ratio: number } {
  const plain = stripLatex(text);
  const letters = (plain.match(LETTERS) ?? []).length;
  const marked = (plain.match(DIACRITICS) ?? []).length;
  return { letters, ratio: letters === 0 ? 0 : marked / letters };
}

export function checkDiacritics(key: string, chapter: ChapterDefinition): string[] {
  if (DIACRITIC_EXEMPT.has(key)) return [];
  const { letters, ratio } = diacriticRatio(collectProse(chapter).join(" "));
  if (letters < MIN_LETTERS) return [];
  if (ratio >= MIN_DIACRITIC_RATIO) return [];
  return [
    `[diacritics] ${key}: only ${(ratio * 100).toFixed(1)} % of letters carry Czech diacritics ` +
      `(minimum ${(MIN_DIACRITIC_RATIO * 100).toFixed(0)} %) — the text is missing háčky and čárky`,
  ];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test:run src/lib/lessons/diacritics.test.ts`
Expected: PASS, 10 tests.

- [ ] **Step 5: Wire it into the validation script**

In `scripts/validate-content.ts`, add the import:

```ts
import { checkDiacritics } from "@/lib/lessons/diacritics";
```

Then, immediately after the `if (isStage) { ... }` block added in Task 7, add:

```ts
    errors.push(...checkDiacritics(key, chapter));
```

- [ ] **Step 6: Verify existing content still validates**

Run: `pnpm validate:content`
Expected: `✓ Content OK: 38 chapters across ...`. The five exempt chapters are skipped; every other chapter clears 4 %.

If any non-exempt chapter fails, that is a genuine find — report it rather than widening the exemption list.

- [ ] **Step 7: Commit**

```bash
git add src/lib/lessons/diacritics.ts src/lib/lessons/diacritics.test.ts scripts/validate-content.ts
git commit -m "feat(content): fail the build on prose missing Czech diacritics"
```

---

### Task 9: Record stage completions without grading

A struggling student must not be handed a score. Stage chapters record that the lesson was *derived*, with no tier and no percentage.

**Files:**
- Modify: `src/lib/lesson/progress-store.ts`
- Test: `src/lib/lesson/progress-store.test.ts` (append a describe block)

**Interfaces:**
- Consumes: existing `ProgressData`, `loadProgress`, `saveProgress` internals.
- Produces: `recordChapterDerived(topicSlug: string, chapterSlug: string): ProgressData` and an added optional `derived?: boolean` field on `ChapterProgress`.

- [ ] **Step 1: Write the failing test**

Append to `src/lib/lesson/progress-store.test.ts`:

```ts
import { recordChapterDerived } from "./progress-store";

describe("recordChapterDerived", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("marks the chapter derived with no tier and no score", () => {
    const data = recordChapterDerived("quadratic-equations", "discriminant");
    const entry = data.chapters["quadratic-equations/discriminant"];
    expect(entry.derived).toBe(true);
    expect(entry.tier).toBeNull();
    expect(entry.bestScore).toBe(0);
    expect(entry.results).toEqual([]);
  });

  it("counts repeat visits without ever assigning a tier", () => {
    recordChapterDerived("quadratic-equations", "discriminant");
    const data = recordChapterDerived("quadratic-equations", "discriminant");
    const entry = data.chapters["quadratic-equations/discriminant"];
    expect(entry.completionCount).toBe(2);
    expect(entry.tier).toBeNull();
  });

  it("leaves deck-chapter progress untouched", () => {
    recordChapterCompletion("linear-equations", "intro", {
      completedAt: 1,
      score: 1,
      correctAnswers: 3,
      totalProblems: 3,
    });
    recordChapterDerived("quadratic-equations", "discriminant");
    const data = loadProgress();
    expect(data.chapters["linear-equations/intro"].tier).toBe("gold");
    expect(data.chapters["quadratic-equations/discriminant"].tier).toBeNull();
  });
});
```

If `recordChapterCompletion`, `loadProgress`, or `beforeEach` are not already imported in that test file, add them to the existing import statements.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run src/lib/lesson/progress-store.test.ts`
Expected: FAIL — `recordChapterDerived` is not exported.

- [ ] **Step 3: Write the implementation**

In `src/lib/lesson/progress-store.ts`, add a field to `ChapterProgress`:

```ts
export interface ChapterProgress {
  bestScore: number;
  completionCount: number;
  lastCompletedAt: number;
  results: LessonResult[];
  tier: "bronze" | "silver" | "gold" | null;
  /** True for stage-format chapters, which are never scored or tiered. */
  derived?: boolean;
}
```

Then add this exported function after `recordChapterCompletion`:

```ts
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
  const key = `${topicSlug}/${chapterSlug}`;
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test:run src/lib/lesson/progress-store.test.ts`
Expected: PASS — pre-existing tests plus 3 new ones.

- [ ] **Step 5: Commit**

```bash
git add src/lib/lesson/progress-store.ts src/lib/lesson/progress-store.test.ts
git commit -m "feat(stages): record stage chapters as derived, never scored"
```

---

### Task 10: `ParabolaRootsStage` component and the stage canvas router

The first controlled stage. Unlike `visuals/`, a stage does not own its state — the shell does, so beats can read and write it.

**Files:**
- Create: `src/components/lesson/stages/stage-canvas.tsx`
- Create: `src/components/lesson/stages/parabola-roots-stage.tsx`

**Interfaces:**
- Consumes: `readouts` from `@/lib/lesson/stages/parabola-roots`; `SliderControl` from `@/components/lesson/visuals/slider-control`.
- Produces: `StageProps` interface and `StageCanvas` component from `@/components/lesson/stages/stage-canvas`; `ParabolaRootsStage` from `@/components/lesson/stages/parabola-roots-stage`.

- [ ] **Step 1: Create the canvas router**

Create `src/components/lesson/stages/stage-canvas.tsx`:

```tsx
"use client";

import { ParabolaRootsStage } from "./parabola-roots-stage";

export interface StageProps {
  params: Record<string, number>;
  onParamsChange: (next: Record<string, number>) => void;
  /** Stage part ids to spotlight for the current beat. */
  highlight?: string[];
  /** False during predict reveal and naming — the student watches, cannot drag. */
  interactive: boolean;
}

export function StageCanvas({ type, ...props }: StageProps & { type: string }) {
  switch (type) {
    case "parabola-roots":
      return <ParabolaRootsStage {...props} />;
    default:
      // A stage is the whole lesson, so failing silently would render a blank
      // page. Block visuals fail silently because they are decoration.
      return (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Tuto interaktivní scénu se nepodařilo načíst.
        </div>
      );
  }
}
```

- [ ] **Step 2: Create the parabola stage**

Create `src/components/lesson/stages/parabola-roots-stage.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { readouts } from "@/lib/lesson/stages/parabola-roots";
import { SliderControl } from "@/components/lesson/visuals/slider-control";
import { cn } from "@/lib/utils";
import type { StageProps } from "./stage-canvas";

const VB = { w: 480, h: 320 };
const X_RANGE: [number, number] = [-5, 5];
const Y_RANGE: [number, number] = [-6, 10];
const C_RANGE: [number, number] = [-8, 6];

function toSvgX(x: number): number {
  return ((x - X_RANGE[0]) / (X_RANGE[1] - X_RANGE[0])) * VB.w;
}

function toSvgY(y: number): number {
  return VB.h - ((y - Y_RANGE[0]) / (Y_RANGE[1] - Y_RANGE[0])) * VB.h;
}

function curvePath(a: number, b: number, c: number): string {
  const steps = 120;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = X_RANGE[0] + ((X_RANGE[1] - X_RANGE[0]) * i) / steps;
    pts.push(`${toSvgX(x).toFixed(2)},${toSvgY(a * x * x + b * x + c).toFixed(2)}`);
  }
  return `M ${pts.join(" L ")}`;
}

export function ParabolaRootsStage({
  params,
  onParamsChange,
  highlight,
  interactive,
}: StageProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const a = params.a ?? 1;
  const b = params.b ?? 0;
  const c = params.c ?? 0;

  const r = readouts({ a, b, c });
  const rootsHighlighted = highlight?.includes("roots") ?? false;

  // Real roots, for the markers. rootGap is signed; only positive means two.
  const disc = b * b - 4 * a * c;
  const roots =
    disc >= 0
      ? [(-b - Math.sqrt(disc)) / (2 * a), (-b + Math.sqrt(disc)) / (2 * a)]
      : [];

  function setC(next: number) {
    onParamsChange({ ...params, c: Math.min(C_RANGE[1], Math.max(C_RANGE[0], next)) });
  }

  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!interactive || e.buttons !== 1 || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const ratio = (e.clientY - rect.top) / rect.height;
    const yValue = Y_RANGE[1] - ratio * (Y_RANGE[1] - Y_RANGE[0]);
    // Dragging moves the vertex to the pointer: c = yTarget + b²/4a.
    setC(yValue + (b * b) / (4 * a));
  }

  return (
    <div className="w-full space-y-3" aria-label="Parabola a její kořeny">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        preserveAspectRatio="xMidYMid meet"
        className={cn(
          "w-full h-auto rounded-lg bg-slate-50 dark:bg-slate-900",
          interactive ? "cursor-ns-resize touch-none" : "cursor-default"
        )}
        onPointerMove={handlePointerMove}
        role="img"
      >
        <line
          x1={0}
          y1={toSvgY(0)}
          x2={VB.w}
          y2={toSvgY(0)}
          className="stroke-slate-400 dark:stroke-slate-600"
          strokeWidth={1.5}
        />
        <line
          x1={toSvgX(0)}
          y1={0}
          x2={toSvgX(0)}
          y2={VB.h}
          className="stroke-slate-400 dark:stroke-slate-600"
          strokeWidth={1.5}
        />
        {/* Draws itself once on mount, then tracks params directly. */}
        <motion.path
          d={curvePath(a, b, c)}
          fill="none"
          className="stroke-blue-500"
          strokeWidth={2.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        {roots.map((x) => (
          <circle
            key={x}
            cx={toSvgX(x)}
            cy={toSvgY(0)}
            r={rootsHighlighted ? 8 : 5}
            className={cn(
              "fill-red-500 transition-all",
              rootsHighlighted && "stroke-red-300 stroke-[3]"
            )}
          />
        ))}
      </svg>

      <SliderControl
        label="c"
        value={Number(c.toFixed(2))}
        min={C_RANGE[0]}
        max={C_RANGE[1]}
        step={0.1}
        onChange={setC}
        color="#22c55e"
      />

      <p className="text-center text-sm text-muted-foreground tabular-nums">
        Počet průsečíků s osou: <strong>{r.rootCount}</strong>
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Verify it compiles and lints**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: both clean. Nothing renders it yet — Task 11 wires it up.

- [ ] **Step 4: Commit**

```bash
git add src/components/lesson/stages/
git commit -m "feat(stages): add controlled parabola-roots stage and canvas router"
```

---

### Task 11: `StageShell`, beat strips, naming panel, completion

Assembles the screen: sticky stage on top, one swapping strip below. Beat transitions spring the stage *parameters* so the curve travels between configurations rather than jumping.

**Files:**
- Create: `src/components/lesson/stage-shell.tsx`
- Create: `src/components/lesson/beats/beat-strip.tsx`
- Create: `src/components/lesson/beats/naming-panel.tsx`
- Create: `src/components/lesson/stage-complete.tsx`
- Modify: `src/app/(app)/topics/[subjectSlug]/[topicSlug]/[chapterSlug]/chapter-page.tsx`

**Interfaces:**
- Consumes: `buildBeats`, `StageScreen` from `@/lib/lesson/build-beats`; `isGoalMet` from `@/lib/lesson/goal`; `getStageModule` from `@/lib/lesson/stages/registry`; `recordChapterDerived` from `@/lib/lesson/progress-store`; `StageCanvas` from `@/components/lesson/stages/stage-canvas`; `SlideRenderer` from `@/components/lesson/slide-renderer`; `MathText` from `@/components/lesson/math-display`.
- Produces: `StageShell` from `@/components/lesson/stage-shell`.

- [ ] **Step 1: Create the naming panel**

Create `src/components/lesson/beats/naming-panel.tsx`:

```tsx
"use client";

import { motion } from "motion/react";
import { MathText } from "../math-display";
import { MathDisplay } from "../math-display";
import { Badge } from "@/components/ui/badge";
import type { NamingBeat } from "@/types/stage";

export function NamingPanel({ naming }: { naming: NamingBeat }) {
  return (
    <div className="space-y-4">
      <Badge
        variant="secondary"
        className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
      >
        Teď to má jméno
      </Badge>

      <MathText content={naming.observation} className="text-base leading-relaxed" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 260, damping: 22 }}
        className="rounded-lg border-2 border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950"
      >
        <MathDisplay math={naming.formula} />
      </motion.div>

      <MathText content={naming.mapping} className="text-base leading-relaxed" />
    </div>
  );
}
```

Check `math-display.tsx` for `MathDisplay`'s actual prop name before writing this — if it is not `math`, use the real one. Both `MathDisplay` and `MathText` are exported from the same module, so collapse the two import lines into one.

- [ ] **Step 2: Create the beat strip**

Create `src/components/lesson/beats/beat-strip.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Lightbulb, Check } from "lucide-react";
import { MathText } from "../math-display";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Beat } from "@/types/stage";

interface BeatStripProps {
  beat: Beat;
  /** True once a manipulate beat's goal holds. */
  reached: boolean;
  /** Springs the stage to the goal for a student who is stuck. */
  onShowMe: () => void;
  /** Springs the stage to `then` after a predict answer. */
  onPredictAnswered: () => void;
}

export function BeatStrip({ beat, reached, onShowMe, onPredictAnswered }: BeatStripProps) {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <MathText content={beat.prompt} className="text-base leading-relaxed" />

      {beat.kind === "manipulate" && (
        <>
          <AnimatePresence>
            {reached && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2 rounded-lg border border-emerald-300 bg-emerald-50 p-3 dark:border-emerald-700 dark:bg-emerald-950"
              >
                <Check className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <MathText
                  content={beat.onReached}
                  className="text-sm text-emerald-800 dark:text-emerald-200"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {!reached && (
            <div className="space-y-2">
              {beat.nudge && (
                <p className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Lightbulb className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{beat.nudge}</span>
                </p>
              )}
              {/* Never a dead end: the student can always ask to be shown. */}
              <Button variant="outline" size="sm" onClick={onShowMe} className="gap-1">
                <Eye className="h-4 w-4" />
                Ukaž mi to
              </Button>
            </div>
          )}
        </>
      )}

      {beat.kind === "predict" && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{beat.question}</p>
          {beat.options.map((option, i) => (
            <button
              key={option.label}
              onClick={() => {
                if (picked !== null) return;
                setPicked(i);
                onPredictAnswered();
              }}
              className={cn(
                "w-full rounded-lg border p-3 text-left transition-colors",
                picked === null && "hover:bg-muted",
                picked !== null && option.isCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950",
                picked === i && !option.isCorrect && "border-red-400 bg-red-50 dark:bg-red-950"
              )}
            >
              <MathText content={option.label} />
            </button>
          ))}
          {picked !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border bg-blue-50 p-3 dark:bg-blue-950"
            >
              <MathText content={beat.reveal} className="text-sm" />
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create the completion screen**

Create `src/components/lesson/stage-complete.tsx`. No score, no percentage, no tier — it reports what the student saw.

```tsx
"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MathText } from "./math-display";

export function StageComplete({ keyTakeaways }: { keyTakeaways: string[] }) {
  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <Sparkles className="h-16 w-16 text-emerald-500 mx-auto" />
      <h2 className="text-2xl font-bold">Máš to</h2>

      <ul className="space-y-2 text-left">
        {keyTakeaways.map((takeaway) => (
          <li key={takeaway} className="rounded-lg border bg-muted/40 p-3">
            <MathText content={takeaway} className="text-sm" />
          </li>
        ))}
      </ul>

      <Button asChild>
        <Link href="/topics">Další téma</Link>
      </Button>
    </div>
  );
}
```

- [ ] **Step 4: Write failing tests for the two pure helpers the shell needs**

`lerpParams` is what makes the stage *travel* between beat presets instead of jumping — the spec's central motion claim. `solveGoal` powers "ukaž mi to" generically, driven by the registry's declared ranges rather than any one stage's parameters.

Create `src/lib/lesson/lerp-params.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { lerpParams } from "./lerp-params";

describe("lerpParams", () => {
  it("returns the start values at k = 0", () => {
    expect(lerpParams({ c: -4 }, { c: 2 }, 0)).toEqual({ c: -4 });
  });

  it("returns the target values at k = 1", () => {
    expect(lerpParams({ c: -4 }, { c: 2 }, 1)).toEqual({ c: 2 });
  });

  it("interpolates linearly in between", () => {
    expect(lerpParams({ c: 0 }, { c: 10 }, 0.5).c).toBeCloseTo(5, 10);
  });

  it("interpolates every shared key", () => {
    const out = lerpParams({ a: 0, c: 0 }, { a: 2, c: 10 }, 0.5);
    expect(out.a).toBeCloseTo(1, 10);
    expect(out.c).toBeCloseTo(5, 10);
  });

  it("keeps start-only keys untouched", () => {
    expect(lerpParams({ a: 1, c: 0 }, { c: 10 }, 1)).toEqual({ a: 1, c: 10 });
  });

  it("adopts target-only keys immediately", () => {
    expect(lerpParams({ c: 0 }, { b: 3 }, 0.5).b).toBe(3);
  });

  it("clamps k outside the unit interval", () => {
    expect(lerpParams({ c: 0 }, { c: 10 }, -1).c).toBe(0);
    expect(lerpParams({ c: 0 }, { c: 10 }, 5).c).toBe(10);
  });
});
```

Create `src/lib/lesson/solve-goal.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { solveGoal } from "./solve-goal";
import { isGoalMet } from "./goal";
import type { StageModule } from "./stages/registry";
import {
  readouts,
  PARABOLA_ROOTS_PARAMS,
  PARABOLA_ROOTS_READOUTS,
} from "./stages/parabola-roots";

const mod: StageModule = {
  params: PARABOLA_ROOTS_PARAMS,
  ranges: { a: [-3, 3], b: [-6, 6], c: [-8, 6] },
  readouts_declared: PARABOLA_ROOTS_READOUTS,
  readouts,
};

describe("solveGoal", () => {
  const goal = { readout: "rootGap", target: 0, within: 0.15 };

  it("finds params satisfying the goal", () => {
    const solved = solveGoal(goal, mod, { a: 1, b: 0, c: -4 });
    expect(solved).not.toBeNull();
    expect(isGoalMet(goal, mod.readouts(solved!))).toBe(true);
  });

  it("changes only one parameter, leaving the rest as they were", () => {
    const solved = solveGoal(goal, mod, { a: 1, b: 0, c: -4 })!;
    const changed = PARABOLA_ROOTS_PARAMS.filter((p) => solved[p] !== ({ a: 1, b: 0, c: -4 } as Record<string, number>)[p]);
    expect(changed.length).toBe(1);
  });

  it("returns null when no value in range satisfies the goal", () => {
    const impossible = { readout: "rootGap", target: 999, within: 0.001 };
    expect(solveGoal(impossible, mod, { a: 1, b: 0, c: -4 })).toBeNull();
  });

  it("returns the current params untouched when the goal already holds", () => {
    const current = { a: 1, b: 0, c: 0 };
    expect(solveGoal(goal, mod, current)).toEqual(current);
  });

  it("never throws on a goal referencing an unknown readout", () => {
    const bad = { readout: "nope", target: 0, within: 0.1 };
    expect(() => solveGoal(bad, mod, { a: 1, b: 0, c: -4 })).not.toThrow();
    expect(solveGoal(bad, mod, { a: 1, b: 0, c: -4 })).toBeNull();
  });
});
```

- [ ] **Step 5: Run both tests to verify they fail**

Run: `pnpm test:run src/lib/lesson/lerp-params.test.ts src/lib/lesson/solve-goal.test.ts`
Expected: FAIL — neither module resolves.

- [ ] **Step 6: Implement both helpers**

Create `src/lib/lesson/lerp-params.ts`:

```ts
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
```

Create `src/lib/lesson/solve-goal.ts`:

```ts
import type { Goal } from "@/types/stage";
import type { StageModule } from "./stages/registry";
import { isGoalMet } from "./goal";

const SAMPLES = 400;

/**
 * Find parameters that satisfy `goal`, by sweeping one declared param at a
 * time across its registry-declared range. Generic across stages — no stage's
 * parameter names appear here.
 *
 * Backs the "ukaž mi to" escape, so a student is never trapped by a goal they
 * cannot hit. Returns null when nothing in range works.
 */
export function solveGoal(
  goal: Goal,
  mod: StageModule,
  current: Record<string, number>
): Record<string, number> | null {
  if (isGoalMet(goal, mod.readouts(current))) return current;

  for (const param of mod.params) {
    const range = mod.ranges[param];
    if (!range) continue;
    const [min, max] = range;
    for (let i = 0; i <= SAMPLES; i++) {
      const value = min + ((max - min) * i) / SAMPLES;
      const candidate = { ...current, [param]: value };
      if (isGoalMet(goal, mod.readouts(candidate))) return candidate;
    }
  }
  return null;
}
```

- [ ] **Step 7: Run both tests to verify they pass**

Run: `pnpm test:run src/lib/lesson/lerp-params.test.ts src/lib/lesson/solve-goal.test.ts`
Expected: PASS — 7 and 5 tests.

- [ ] **Step 8: Create the animated-params hook**

This is what turns a preset change into visible travel. Create `src/components/lesson/use-animated-params.ts`:

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { lerpParams } from "@/lib/lesson/lerp-params";

const DURATION_MS = 520;

const easeOutCubic = (k: number) => 1 - Math.pow(1 - k, 3);

/**
 * Stage parameters with two write modes: `setNow` for direct manipulation
 * (dragging must feel instant) and `springTo` for beat presets (the change
 * must be watchable). Honors prefers-reduced-motion by snapping.
 */
export function useAnimatedParams(initial: Record<string, number>) {
  const [params, setParams] = useState(initial);
  const paramsRef = useRef(initial);
  const frameRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const commit = useCallback((next: Record<string, number>) => {
    paramsRef.current = next;
    setParams(next);
  }, []);

  const cancel = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const setNow = useCallback(
    (next: Record<string, number>) => {
      cancel();
      commit(next);
    },
    [cancel, commit]
  );

  const springTo = useCallback(
    (target: Record<string, number>) => {
      cancel();
      if (reduceMotion) {
        commit({ ...paramsRef.current, ...target });
        return;
      }
      const from = { ...paramsRef.current };
      const start = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - start) / DURATION_MS);
        commit(lerpParams(from, target, easeOutCubic(k)));
        frameRef.current = k < 1 ? requestAnimationFrame(tick) : null;
      };
      frameRef.current = requestAnimationFrame(tick);
    },
    [cancel, commit, reduceMotion]
  );

  useEffect(() => cancel, [cancel]);

  return { params, setNow, springTo };
}
```

- [ ] **Step 9: Create the shell**

Create `src/components/lesson/stage-shell.tsx`:

```tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildBeats } from "@/lib/lesson/build-beats";
import { isGoalMet } from "@/lib/lesson/goal";
import { solveGoal } from "@/lib/lesson/solve-goal";
import { getStageModule } from "@/lib/lesson/stages/registry";
import { useAnimatedParams } from "./use-animated-params";
import { recordChapterDerived } from "@/lib/lesson/progress-store";
import { StageCanvas } from "./stages/stage-canvas";
import { BeatStrip } from "./beats/beat-strip";
import { NamingPanel } from "./beats/naming-panel";
import { StageComplete } from "./stage-complete";
import { SlideRenderer } from "./slide-renderer";
import { LessonProgressBar } from "./lesson-progress-bar";
import { Button } from "@/components/ui/button";
import type { StageLesson } from "@/types/stage";

interface StageShellProps {
  lesson: StageLesson;
  topicSlug: string;
  chapterSlug: string;
}

export function StageShell({ lesson, topicSlug, chapterSlug }: StageShellProps) {
  const screens = useMemo(() => buildBeats(lesson), [lesson]);
  const [index, setIndex] = useState(0);
  const { params, setNow, springTo } = useAnimatedParams(lesson.stage.initial);
  const reduceMotion = useReducedMotion();

  const screen = screens[index];
  const mod = getStageModule(lesson.stage.type);
  const readouts = useMemo(() => mod?.readouts(params) ?? {}, [mod, params]);

  const beat = screen.kind === "beat" ? screen.beat : null;
  const reached =
    beat?.kind === "manipulate" ? isGoalMet(beat.goal, readouts) : false;

  // Travel to the beat's preset on entry, so the student watches the stage
  // move into position rather than finding it already there.
  useEffect(() => {
    if (beat?.preset) springTo(beat.preset);
  }, [beat, springTo]);

  // Nothing blocks. A student who is already stuck must never meet a locked door.
  const goNext = useCallback(
    () => setIndex((i) => Math.min(screens.length - 1, i + 1)),
    [screens.length]
  );
  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  useEffect(() => {
    if (screen.kind === "complete") recordChapterDerived(topicSlug, chapterSlug);
  }, [screen.kind, topicSlug, chapterSlug]);

  function showMe() {
    if (beat?.kind !== "manipulate" || !mod) return;
    const solved = solveGoal(beat.goal, mod, params);
    // Travel there rather than teleport — the student needs to see which way
    // it moved, otherwise being shown teaches nothing.
    if (solved) springTo(solved);
  }

  if (screen.kind === "complete") {
    return <StageComplete keyTakeaways={lesson.summary.keyTakeaways} />;
  }

  return (
    <MotionConfig reducedMotion={reduceMotion ? "always" : "never"}>
      <div className="flex flex-col gap-4">
        <LessonProgressBar currentIndex={index} totalSteps={screens.length} />

        {/* The stage never unmounts: it is the continuity of the lesson. */}
        <div className="sticky top-16 z-10 rounded-lg border bg-background p-3 shadow-sm">
          <StageCanvas
            type={lesson.stage.type}
            params={params}
            onParamsChange={setNow}
            highlight={beat?.highlight}
            interactive={screen.kind === "beat"}
          />
        </div>

        <div className="min-h-[9rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              {screen.kind === "beat" && (
                <BeatStrip
                  beat={screen.beat}
                  reached={reached}
                  onShowMe={showMe}
                  onPredictAnswered={() => {
                    if (screen.beat.kind === "predict") {
                      // Travel, so the predicted outcome is watched happening.
                      springTo(screen.beat.then);
                    }
                  }}
                />
              )}
              {screen.kind === "naming" && <NamingPanel naming={screen.naming} />}
              {screen.kind === "apply" && (
                /*
                 * Answers are intentionally discarded. Deck lessons collect
                 * them to compute a score and tier; stage lessons are never
                 * scored, so there is nothing to accumulate. The slide's own
                 * inline feedback is the whole point of the practice step.
                 */
                <SlideRenderer
                  slide={screen.slide}
                  onAnswer={() => {}}
                  onInteracted={() => {}}
                  answeredSteps={new Map()}
                  interactedSteps={new Set()}
                />
              )}
              {screen.kind === "summary" && (
                <ul className="space-y-2">
                  {screen.keyTakeaways.map((t) => (
                    <li key={t} className="rounded-lg border bg-muted/40 p-3 text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <Button variant="outline" size="sm" onClick={goPrev} disabled={index === 0}>
            <ChevronLeft className="h-4 w-4" />
            Zpět
          </Button>
          <Button size="sm" onClick={goNext}>
            Další
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </MotionConfig>
  );
}
```

Check `SlideRenderer`'s actual prop signature in `slide-renderer.tsx` before writing this call and match it exactly.

- [ ] **Step 10: Dispatch on format in the chapter page**

In `chapter-page.tsx`, add `import { StageShell } from "@/components/lesson/stage-shell";` and replace the Task 1 placeholder branch:

```tsx
      {chapter.format === "stage" ? (
        <StageShell
          lesson={chapter.lesson}
          topicSlug={topicSlug}
          chapterSlug={chapterSlug}
        />
      ) : (
        <LessonShell
          lesson={chapter.lesson}
          topicSlug={topicSlug}
          chapterSlug={chapterSlug}
        />
      )}
```

- [ ] **Step 11: Verify it compiles**

Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm test:run`
Expected: all clean. No stage chapter exists yet, so nothing renders — Task 12 provides one.

- [ ] **Step 12: Commit**

```bash
git add src/lib/lesson/lerp-params.ts src/lib/lesson/lerp-params.test.ts src/lib/lesson/solve-goal.ts src/lib/lesson/solve-goal.test.ts src/components/lesson/use-animated-params.ts src/components/lesson/stage-shell.tsx src/components/lesson/beats/ src/components/lesson/stage-complete.tsx "src/app/(app)/topics/[subjectSlug]/[topicSlug]/[chapterSlug]/chapter-page.tsx"
git commit -m "feat(stages): add stage shell with param travel between beats"
```

---

### Task 12: Pilot chapter 1 — the discriminant

The easy case: the picture is obvious. This is the first end-to-end run of the whole format.

**Files:**
- Create: `src/lib/lessons/math/quadratic-equations/discriminant.ts`
- Modify: `src/lib/lessons/data.generated.ts` (regenerated, not hand-edited)

**Interfaces:**
- Consumes: `StageChapter` from `@/types/chapter`; `StageLesson` from `@/types/stage`.
- Produces: registry entry `quadratic-equations/discriminant`.

- [ ] **Step 1: Write the chapter**

Create `src/lib/lessons/math/quadratic-equations/discriminant.ts`:

```ts
import type { StageChapter } from "@/types/chapter";
import type { StageLesson } from "@/types/stage";

const lesson: StageLesson = {
  title: "Diskriminant",
  stage: {
    type: "parabola-roots",
    initial: { a: 1, b: 0, c: -4 },
    readouts: ["rootCount", "rootGap", "vertexY"],
  },
  beats: [
    {
      kind: "observe",
      prompt:
        "Táhni parabolou nahoru a dolů. Sleduj červené body — tam, kde parabola protíná vodorovnou osu.",
      highlight: ["roots"],
    },
    {
      kind: "manipulate",
      prompt: "Posuň parabolu tak, aby se osy jen dotýkala — ani ji neprotínala, ani nad ní nevisela.",
      goal: { readout: "rootGap", target: 0, within: 0.15 },
      onReached:
        "Přesně tady. Oba průsečíky se slily do jediného bodu — parabola se osy jen dotkla.",
      nudge: "Zkoušej parabolu zvedat nahoru. Body se k sobě přibližují.",
      highlight: ["roots"],
    },
    {
      kind: "predict",
      prompt: "Zvedneme parabolu ještě o kus výš.",
      question: "Kolik průsečíků s osou zbude?",
      options: [
        { label: "Dva", isCorrect: false },
        { label: "Jeden", isCorrect: false },
        { label: "Žádný", isCorrect: true },
      ],
      then: { c: 2 },
      reveal:
        "Žádný. Parabola se vznáší nad osou a nedotkne se jí — rovnice nemá reálné řešení.",
    },
  ],
  naming: {
    observation:
      "Viděl jsi tři stavy: dva průsečíky, pak jediný dotyk, pak žádný. Mezi nimi je přesná hranice — okamžik dotyku.",
    formula: "D = b^2 - 4ac",
    mapping:
      "Číslo $D$ měří, jak daleko jsi od té hranice. $D > 0$ — dva průsečíky. $D = 0$ — přesně ten dotyk, který jsi našel. $D < 0$ — parabola je nad osou a průsečík není žádný.",
  },
  apply: [
    {
      type: "multiple-choice",
      question: "Rovnice $x^2 + 2x + 5 = 0$ má $D = 4 - 20 = -16$. Kolik má reálných řešení?",
      choices: [
        {
          label: "Dvě",
          isCorrect: false,
          feedback: "Dvě řešení nastanou při $D > 0$. Tady je $D$ záporné.",
        },
        {
          label: "Jedno",
          isCorrect: false,
          feedback: "Jedno řešení je přesně ten dotyk, tedy $D = 0$.",
        },
        {
          label: "Žádné",
          isCorrect: true,
          feedback: "Ano — záporné $D$ znamená parabolu, která osu vůbec nepotká.",
        },
      ],
      explanation:
        "Záporný diskriminant odpovídá parabole vznášející se nad osou — přesně tomu stavu, který jsi na scéně vyrobil.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Diskriminant měří vzdálenost od okamžiku, kdy se parabola osy jen dotkne.",
      "$D > 0$ dva kořeny, $D = 0$ jeden, $D < 0$ žádný reálný.",
    ],
  },
};

export const chapter: StageChapter = {
  slug: "discriminant",
  topicSlug: "quadratic-equations",
  order: 2,
  format: "stage",
  title: "Diskriminant",
  lesson,
};
```

- [ ] **Step 2: Regenerate the registry and validate**

Run: `pnpm build:registry && pnpm validate:content`
Expected: `✓ Content OK: 39 chapters across ...`. If a `[formula-leak]` error appears, a beat mentions `b^2-4ac` — rewrite that beat in words, do not weaken the check.

- [ ] **Step 3: Run the whole suite and the type checker**

Run: `pnpm exec tsc --noEmit && pnpm test:run && pnpm lint`
Expected: all clean.

- [ ] **Step 4: Verify in the browser**

Run: `pnpm dev`

Open `http://localhost:3000/vzdelej-se/topics/math/quadratic-equations/discriminant/` — note the `/vzdelej-se` prefix, which `next.config.ts` sets via `basePath`.

Confirm each of these by hand:
1. The parabola is visible and stays on screen while the strip below changes.
2. Dragging vertically on the SVG moves the parabola; the `c` slider does too.
3. On beat 2, bringing the curve to a tangent makes the green "Přesně tady" panel appear.
4. "Ukaž mi to" makes the curve **travel** to the tangent position over roughly half a second — it must not teleport, or being shown teaches nothing.
5. Advancing to the predict beat and answering makes the curve travel up to its new position rather than jumping.
6. "Další" is never disabled — you can advance from any screen.
7. The formula $D = b^2 - 4ac$ appears for the first time on the naming screen.
8. The completion screen shows no percentage, no tier, no score.
9. Nothing is clipped or hidden behind the nav bar at 1280x900 — the bug found in the current deck format must not be reproduced here.

- [ ] **Step 5: Commit**

```bash
git add src/lib/lessons/math/quadratic-equations/discriminant.ts src/lib/lessons/data.generated.ts
git commit -m "feat(content): add discriminant stage chapter"
```

---

### Task 13: Pilot chapter 2 — logarithms via a slide rule

The hard case, chosen because logarithms have no obvious picture. Two log-scaled rulers: sliding one along the other adds lengths, and because the scale is logarithmic, adding lengths multiplies numbers.

**If this stage cannot be made to work, that is the pilot's most valuable output** — it means the model does not generalize past visually-obvious topics, and the rollout project should not start. Report that rather than forcing it.

**Files:**
- Create: `src/lib/lesson/stages/log-slide-rule.ts`
- Test: `src/lib/lesson/stages/log-slide-rule.test.ts`
- Create: `src/components/lesson/stages/log-slide-rule-stage.tsx`
- Modify: `src/lib/lesson/stages/registry.ts`
- Modify: `src/components/lesson/stages/stage-canvas.tsx`
- Create: `src/lib/lessons/math/logarithmic-functions/why-logarithms.ts`

**Interfaces:**
- Consumes: `StageProps` from `@/components/lesson/stages/stage-canvas`.
- Produces: `LOG_SLIDE_RULE_PARAMS`, `LOG_SLIDE_RULE_READOUTS`, `readouts` from `@/lib/lesson/stages/log-slide-rule`; `LogSlideRuleStage` from `@/components/lesson/stages/log-slide-rule-stage`.

- [ ] **Step 1: Write the failing readouts test**

Create `src/lib/lesson/stages/log-slide-rule.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readouts, LOG_SLIDE_RULE_PARAMS, LOG_SLIDE_RULE_READOUTS } from "./log-slide-rule";

describe("log-slide-rule readouts", () => {
  it("reads 1 when the rulers are aligned", () => {
    expect(readouts({ offset: 0 }).alignedValue).toBeCloseTo(1, 6);
  });

  it("reads 3 when shifted by log10(3)", () => {
    expect(readouts({ offset: Math.log10(3) }).alignedValue).toBeCloseTo(3, 6);
  });

  it("echoes the offset in log units", () => {
    expect(readouts({ offset: 0.5 }).offsetLog).toBeCloseTo(0.5, 10);
  });

  it("makes sliding multiply: alignment 3 puts 12 above the bottom 4", () => {
    const aligned = readouts({ offset: Math.log10(3) }).alignedValue;
    expect(aligned * 4).toBeCloseTo(12, 5);
  });

  it("never returns a non-finite readout", () => {
    for (const key of LOG_SLIDE_RULE_READOUTS) {
      expect(Number.isFinite(readouts({})[key]), key).toBe(true);
    }
  });

  it("declares params and readouts used by the registry", () => {
    expect(LOG_SLIDE_RULE_PARAMS).toEqual(["offset"]);
    expect(LOG_SLIDE_RULE_READOUTS).toEqual(["alignedValue", "offsetLog"]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run src/lib/lesson/stages/log-slide-rule.test.ts`
Expected: FAIL — cannot resolve `./log-slide-rule`.

- [ ] **Step 3: Write the readouts**

Create `src/lib/lesson/stages/log-slide-rule.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test:run src/lib/lesson/stages/log-slide-rule.test.ts`
Expected: PASS, 6 tests.

- [ ] **Step 5: Register the stage**

In `src/lib/lesson/stages/registry.ts`, add the import and the entry:

```ts
import {
  readouts as logSlideRuleReadouts,
  LOG_SLIDE_RULE_PARAMS,
  LOG_SLIDE_RULE_READOUTS,
} from "./log-slide-rule";
```

```ts
  "log-slide-rule": {
    params: LOG_SLIDE_RULE_PARAMS,
    ranges: { offset: [0, 1] },
    readouts_declared: LOG_SLIDE_RULE_READOUTS,
    readouts: logSlideRuleReadouts,
  },
```

- [ ] **Step 6: Write the stage component**

Create `src/components/lesson/stages/log-slide-rule-stage.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { readouts } from "@/lib/lesson/stages/log-slide-rule";
import { SliderControl } from "@/components/lesson/visuals/slider-control";
import { cn } from "@/lib/utils";
import type { StageProps } from "./stage-canvas";

const VB = { w: 480, h: 200 };
const MARGIN = 24;
const SPAN = VB.w - MARGIN * 2;
const TICKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** Position of a value on a log10 ruler covering 1..10. */
function tickX(value: number): number {
  return MARGIN + Math.log10(value) * SPAN;
}

export function LogSlideRuleStage({
  params,
  onParamsChange,
  highlight,
  interactive,
}: StageProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const offset = params.offset ?? 0;
  const shiftPx = offset * SPAN;
  const r = readouts({ offset });
  const alignHighlighted = highlight?.includes("aligned") ?? false;

  function setOffset(next: number) {
    onParamsChange({ ...params, offset: Math.min(1, Math.max(0, next)) });
  }

  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!interactive || e.buttons !== 1 || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const xInVb = ((e.clientX - rect.left) / rect.width) * VB.w;
    setOffset((xInVb - MARGIN) / SPAN);
  }

  return (
    <div className="w-full space-y-3" aria-label="Logaritmické posuvné pravítko">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        preserveAspectRatio="xMidYMid meet"
        className={cn(
          "w-full h-auto rounded-lg bg-slate-50 dark:bg-slate-900",
          interactive ? "cursor-ew-resize touch-none" : "cursor-default"
        )}
        onPointerMove={handlePointerMove}
        role="img"
      >
        {/* Top ruler — the one that slides */}
        <g transform={`translate(${shiftPx}, 0)`}>
          <rect x={MARGIN} y={50} width={SPAN} height={34} rx={4} className="fill-amber-100 dark:fill-amber-950" />
          {TICKS.map((t) => (
            <g key={`top-${t}`}>
              <line x1={tickX(t)} y1={50} x2={tickX(t)} y2={68} className="stroke-amber-600" strokeWidth={1.5} />
              <text x={tickX(t)} y={80} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300 text-[11px]">
                {t}
              </text>
            </g>
          ))}
        </g>

        {/* Bottom ruler — fixed */}
        <rect x={MARGIN} y={110} width={SPAN} height={34} rx={4} className="fill-blue-100 dark:fill-blue-950" />
        {TICKS.map((t) => (
          <g key={`bottom-${t}`}>
            <line x1={tickX(t)} y1={126} x2={tickX(t)} y2={144} className="stroke-blue-600" strokeWidth={1.5} />
            <text x={tickX(t)} y={158} textAnchor="middle" className="fill-blue-700 dark:fill-blue-300 text-[11px]">
              {t}
            </text>
          </g>
        ))}

        {/* The alignment line: top ruler's 1 against the bottom scale */}
        <line
          x1={MARGIN + shiftPx}
          y1={44}
          x2={MARGIN + shiftPx}
          y2={150}
          className={cn("stroke-red-500", alignHighlighted && "stroke-[3]")}
          strokeWidth={alignHighlighted ? 3 : 2}
          strokeDasharray="4 3"
        />
      </svg>

      <SliderControl
        label="posun"
        value={Number(offset.toFixed(3))}
        min={0}
        max={1}
        step={0.001}
        onChange={setOffset}
        color="#f59e0b"
      />

      <p className="text-center text-sm text-muted-foreground tabular-nums">
        Nad jedničkou horního pravítka je <strong>{r.alignedValue.toFixed(2).replace(".", ",")}</strong>
      </p>
    </div>
  );
}
```

- [ ] **Step 7: Add it to the canvas router**

In `src/components/lesson/stages/stage-canvas.tsx`, add the import and the case:

```tsx
import { LogSlideRuleStage } from "./log-slide-rule-stage";
```

```tsx
    case "log-slide-rule":
      return <LogSlideRuleStage {...props} />;
```

- [ ] **Step 8: Write the chapter**

Create `src/lib/lessons/math/logarithmic-functions/why-logarithms.ts`:

```ts
import type { StageChapter } from "@/types/chapter";
import type { StageLesson } from "@/types/stage";

const lesson: StageLesson = {
  title: "Proč logaritmy",
  stage: {
    type: "log-slide-rule",
    initial: { offset: 0 },
    readouts: ["alignedValue", "offsetLog"],
  },
  beats: [
    {
      kind: "observe",
      prompt:
        "Tahle pravítka mají divné dělení. Podívej se, kde leží 1, 2, 4 a 8 — mezery mezi nimi jsou stejně velké, i když čísla rostou dvakrát rychleji.",
    },
    {
      kind: "manipulate",
      prompt: "Posuň horní pravítko doprava tak, aby jeho jednička stála přesně nad dolní trojkou.",
      goal: { readout: "alignedValue", target: 3, within: 0.08 },
      onReached:
        "Dobře. A teď to hlavní: podívej se, jaké číslo dolního pravítka leží pod horní čtyřkou. Je to 12 — tedy 3 krát 4.",
      nudge: "Posouvej pomalu doprava. Červená čára ukazuje, na kterém čísle dole horní jednička stojí.",
      highlight: ["aligned"],
    },
    {
      kind: "predict",
      prompt: "Posuneme pravítko dál, až horní jednička stane nad dolní pětkou.",
      question: "Jaké číslo bude ležet pod horní šestkou?",
      options: [
        { label: "11", isCorrect: false },
        { label: "30", isCorrect: true },
        { label: "56", isCorrect: false },
      ],
      then: { offset: 0.69897 },
      reveal:
        "30, tedy 5 krát 6. Posunutí o kus doprava nesčítá čísla — násobí je. Sčítají se vzdálenosti.",
    },
  ],
  naming: {
    observation:
      "Vzdálenost čísla od jedničky je to, co se sčítá, když se čísla násobí. Právě tuhle vzdálenost jsi celou dobu posouval.",
    formula: "\\log(ab) = \\log a + \\log b",
    mapping:
      "Logaritmus **je** ta vzdálenost. Proto se násobení na pravítku dělá sčítáním — a proto se s logaritmy počítalo dřív, než existovaly kalkulačky.",
  },
  apply: [
    {
      type: "multiple-choice",
      question: "Kolik je $\\log(2 \\cdot 50)$, když víš, že $\\log 2 \\doteq 0{,}30$ a $\\log 50 \\doteq 1{,}70$?",
      choices: [
        {
          label: "$0{,}51$",
          isCorrect: false,
          feedback: "To by byl součin logaritmů. Na pravítku se ale vzdálenosti sčítají.",
        },
        {
          label: "$2{,}00$",
          isCorrect: true,
          feedback: "Ano — vzdálenosti se sečtou: $0{,}30 + 1{,}70 = 2{,}00$, a opravdu $2 \\cdot 50 = 100$.",
        },
        {
          label: "$1{,}40$",
          isCorrect: false,
          feedback: "To je rozdíl, který by odpovídal dělení, ne násobení.",
        },
      ],
      explanation:
        "Součin uvnitř logaritmu se venku mění na součet — přesně to posouvání pravítka, které jsi dělal.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Logaritmus je vzdálenost čísla od jedničky na násobící stupnici.",
      "Násobení čísel odpovídá sčítání jejich logaritmů.",
    ],
  },
};

export const chapter: StageChapter = {
  slug: "why-logarithms",
  topicSlug: "logarithmic-functions",
  order: 2,
  format: "stage",
  title: "Proč logaritmy",
  lesson,
};
```

- [ ] **Step 9: Regenerate, validate, verify**

Run: `pnpm build:registry && pnpm validate:content && pnpm exec tsc --noEmit && pnpm test:run && pnpm lint`
Expected: `✓ Content OK: 40 chapters across ...`, everything else clean.

Then `pnpm dev` and open `http://localhost:3000/vzdelej-se/topics/math/logarithmic-functions/why-logarithms/`. Confirm the top ruler slides, the alignment readout tracks it, the goal fires at 3, and the formula first appears on the naming screen.

- [ ] **Step 10: Commit**

```bash
git add src/lib/lesson/stages/log-slide-rule.ts src/lib/lesson/stages/log-slide-rule.test.ts src/lib/lesson/stages/registry.ts src/components/lesson/stages/ src/lib/lessons/math/logarithmic-functions/why-logarithms.ts src/lib/lessons/data.generated.ts
git commit -m "feat(content): add log-slide-rule stage and why-logarithms chapter"
```

---

### Task 14: Pilot chapter 3 — velocity as slope

The physics case, and a controlled comparison: `kinematics` already has a deck chapter, so this gives the same topic in both formats.

**Files:**
- Create: `src/lib/lesson/stages/motion-timeline.ts`
- Test: `src/lib/lesson/stages/motion-timeline.test.ts`
- Create: `src/components/lesson/stages/motion-timeline-stage.tsx`
- Modify: `src/lib/lesson/stages/registry.ts`
- Modify: `src/components/lesson/stages/stage-canvas.tsx`
- Create: `src/lib/lessons/physics/kinematics/velocity-as-slope.ts`

**Interfaces:**
- Consumes: `StageProps` from `@/components/lesson/stages/stage-canvas`.
- Produces: `MOTION_TIMELINE_PARAMS`, `MOTION_TIMELINE_READOUTS`, `readouts` from `@/lib/lesson/stages/motion-timeline`; `MotionTimelineStage` from `@/components/lesson/stages/motion-timeline-stage`.

- [ ] **Step 1: Write the failing readouts test**

Create `src/lib/lesson/stages/motion-timeline.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readouts, MOTION_TIMELINE_PARAMS, MOTION_TIMELINE_READOUTS } from "./motion-timeline";

describe("motion-timeline readouts", () => {
  it("computes position from uniformly accelerated motion", () => {
    // s = v0*t + a*t²/2 with v0 = 0, a = 2, t = 3 → 9
    expect(readouts({ t: 3, h: 1, v0: 0, a: 2 }).position).toBeCloseTo(9, 6);
  });

  it("computes instantaneous velocity", () => {
    // v = v0 + a*t = 1 + 2*3 = 7
    expect(readouts({ t: 3, h: 1, v0: 1, a: 2 }).instantVelocity).toBeCloseTo(7, 6);
  });

  it("computes the secant slope over the interval h", () => {
    // v0 = 0, a = 2, t = 3, h = 1 → (s(4)-s(3))/1 = 16 - 9 = 7
    expect(readouts({ t: 3, h: 1, v0: 0, a: 2 }).secantSlope).toBeCloseTo(7, 6);
  });

  it("closes the gap between secant and tangent as h shrinks", () => {
    const wide = Math.abs(readouts({ t: 3, h: 1, v0: 0, a: 2 }).gapToInstant);
    const narrow = Math.abs(readouts({ t: 3, h: 0.05, v0: 0, a: 2 }).gapToInstant);
    expect(narrow).toBeLessThan(wide);
    expect(narrow).toBeLessThan(0.1);
  });

  it("never divides by zero when h collapses", () => {
    for (const key of MOTION_TIMELINE_READOUTS) {
      expect(Number.isFinite(readouts({ t: 1, h: 0, v0: 0, a: 2 })[key]), key).toBe(true);
    }
  });

  it("declares params and readouts used by the registry", () => {
    expect(MOTION_TIMELINE_PARAMS).toEqual(["t", "h", "v0", "a"]);
    expect(MOTION_TIMELINE_READOUTS).toEqual([
      "position",
      "instantVelocity",
      "secantSlope",
      "gapToInstant",
    ]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run src/lib/lesson/stages/motion-timeline.test.ts`
Expected: FAIL — cannot resolve `./motion-timeline`.

- [ ] **Step 3: Write the readouts**

Create `src/lib/lesson/stages/motion-timeline.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test:run src/lib/lesson/stages/motion-timeline.test.ts`
Expected: PASS, 6 tests.

- [ ] **Step 5: Register the stage and restore exhaustiveness**

In `src/lib/lesson/stages/registry.ts`, add the import and entry:

```ts
import {
  readouts as motionTimelineReadouts,
  MOTION_TIMELINE_PARAMS,
  MOTION_TIMELINE_READOUTS,
} from "./motion-timeline";
```

```ts
  "motion-timeline": {
    params: MOTION_TIMELINE_PARAMS,
    ranges: { t: [0.2, 4], h: [0.05, 2], v0: [0, 10], a: [-5, 5] },
    readouts_declared: MOTION_TIMELINE_READOUTS,
    readouts: motionTimelineReadouts,
  },
```

All three `StageType` members now have entries, so change the declaration back from `Partial<Record<StageType, StageModule>>` to `Record<StageType, StageModule>`. This restores the compile-time guarantee that every declared stage type has a module.

- [ ] **Step 6: Write the stage component**

Create `src/components/lesson/stages/motion-timeline-stage.tsx`:

```tsx
"use client";

import { readouts } from "@/lib/lesson/stages/motion-timeline";
import { SliderControl } from "@/components/lesson/visuals/slider-control";
import type { StageProps } from "./stage-canvas";

const VB = { w: 480, h: 260 };
const PAD = { left: 40, right: 20, top: 20, bottom: 34 };
const T_MAX = 5;
const S_MAX = 30;

function toX(t: number): number {
  return PAD.left + (t / T_MAX) * (VB.w - PAD.left - PAD.right);
}

function toY(s: number): number {
  return VB.h - PAD.bottom - (s / S_MAX) * (VB.h - PAD.top - PAD.bottom);
}

export function MotionTimelineStage({ params, onParamsChange, interactive }: StageProps) {
  const t = params.t ?? 2;
  const h = params.h ?? 1.5;
  const v0 = params.v0 ?? 0;
  const a = params.a ?? 2;
  const r = readouts({ t, h, v0, a });

  const curve: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const ti = (T_MAX * i) / 100;
    curve.push(`${toX(ti).toFixed(2)},${toY(v0 * ti + (a * ti * ti) / 2).toFixed(2)}`);
  }

  const sAtT = v0 * t + (a * t * t) / 2;
  const tEnd = Math.min(T_MAX, t + h);
  const sAtEnd = v0 * tEnd + (a * tEnd * tEnd) / 2;

  return (
    <div className="w-full space-y-3" aria-label="Dráha v čase a její sečna">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto rounded-lg bg-slate-50 dark:bg-slate-900"
        role="img"
      >
        <line x1={PAD.left} y1={toY(0)} x2={VB.w - PAD.right} y2={toY(0)} className="stroke-slate-400 dark:stroke-slate-600" strokeWidth={1.5} />
        <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={toY(0)} className="stroke-slate-400 dark:stroke-slate-600" strokeWidth={1.5} />
        <text x={VB.w - PAD.right} y={toY(0) + 22} textAnchor="end" className="fill-slate-500 text-[11px]">
          čas (s)
        </text>
        <text x={PAD.left - 6} y={PAD.top + 4} textAnchor="end" className="fill-slate-500 text-[11px]">
          dráha (m)
        </text>

        <path d={`M ${curve.join(" L ")}`} fill="none" className="stroke-blue-500" strokeWidth={2.5} />

        {/* The secant between t and t+h */}
        <line x1={toX(t)} y1={toY(sAtT)} x2={toX(tEnd)} y2={toY(sAtEnd)} className="stroke-orange-500" strokeWidth={2.5} />
        <circle cx={toX(t)} cy={toY(sAtT)} r={5} className="fill-emerald-500" />
        <circle cx={toX(tEnd)} cy={toY(sAtEnd)} r={5} className="fill-orange-500" />
      </svg>

      <SliderControl
        label="t"
        value={Number(t.toFixed(2))}
        min={0.2}
        max={4}
        step={0.1}
        unit="s"
        onChange={(v) => interactive && onParamsChange({ ...params, t: v })}
        color="#22c55e"
      />
      <SliderControl
        label="h"
        value={Number(h.toFixed(2))}
        min={0.05}
        max={2}
        step={0.05}
        unit="s"
        onChange={(v) => interactive && onParamsChange({ ...params, h: v })}
        color="#f97316"
      />

      <p className="text-center text-sm text-muted-foreground tabular-nums">
        Sklon sečny: <strong>{r.secantSlope.toFixed(2).replace(".", ",")}</strong> m/s · okamžitá
        rychlost: <strong>{r.instantVelocity.toFixed(2).replace(".", ",")}</strong> m/s
      </p>
    </div>
  );
}
```

- [ ] **Step 7: Add it to the canvas router**

In `src/components/lesson/stages/stage-canvas.tsx`:

```tsx
import { MotionTimelineStage } from "./motion-timeline-stage";
```

```tsx
    case "motion-timeline":
      return <MotionTimelineStage {...props} />;
```

- [ ] **Step 8: Write the chapter**

Create `src/lib/lessons/physics/kinematics/velocity-as-slope.ts`:

```ts
import type { StageChapter } from "@/types/chapter";
import type { StageLesson } from "@/types/stage";

const lesson: StageLesson = {
  title: "Rychlost jako sklon",
  stage: {
    type: "motion-timeline",
    initial: { t: 2, h: 1.5, v0: 0, a: 2 },
    readouts: ["position", "instantVelocity", "secantSlope", "gapToInstant"],
  },
  beats: [
    {
      kind: "observe",
      prompt:
        "Modrá křivka ukazuje, jakou dráhu auto urazilo za daný čas. Oranžová úsečka spojuje dva okamžiky — zelený a oranžový bod.",
    },
    {
      kind: "observe",
      prompt:
        "Posouvej zelený bod pomocí $t$. Všimni si, že čím dál vpravo jsi, tím strmější ta oranžová úsečka je — auto zrychluje.",
    },
    {
      kind: "manipulate",
      prompt:
        "Teď zmenšuj $h$, tedy vzdálenost mezi oběma body. Sleduj obě čísla pod obrázkem a zastav, až budou prakticky stejná.",
      goal: { readout: "gapToInstant", target: 0, within: 0.06 },
      onReached:
        "Přesně tak. Když se body k sobě přiblíží, sklon úsečky přestane být průměrem za nějaký úsek a stane se rychlostí v jediném okamžiku.",
      nudge: "Táhni posuvník $h$ doleva, k co nejmenší hodnotě.",
    },
  ],
  naming: {
    observation:
      "Průměrná rychlost je sklon úsečky mezi dvěma okamžiky. Když ty okamžiky splynou, zbude sklon v jediném bodě — a to je okamžitá rychlost.",
    formula: "v = \\frac{\\Delta s}{\\Delta t}",
    mapping:
      "$\\Delta s$ je svislý rozdíl mezi body, $\\Delta t$ vodorovný — přesně ty dvě vzdálenosti, které jsi zmenšoval. Rychlost je jejich poměr, tedy sklon křivky dráhy.",
  },
  apply: [
    {
      type: "multiple-choice",
      question:
        "Na grafu dráhy je úsek, kde je křivka vodorovná. Co v tu chvíli auto dělá?",
      choices: [
        {
          label: "Stojí",
          isCorrect: true,
          feedback: "Ano — nulový sklon znamená nulovou rychlost.",
        },
        {
          label: "Jede rovnoměrně",
          isCorrect: false,
          feedback: "Rovnoměrná jízda by byla šikmá přímka, ne vodorovná.",
        },
        {
          label: "Zrychluje",
          isCorrect: false,
          feedback: "Zrychlování by křivku ohýbalo vzhůru, sklon by rostl.",
        },
      ],
      explanation:
        "Vodorovná dráha znamená, že se dráha s časem nemění — sklon je nula, tedy rychlost je nula.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Rychlost je sklon grafu dráhy, ne hodnota na něm.",
      "Zmenšením časového úseku přejde průměrná rychlost v okamžitou.",
    ],
  },
};

export const chapter: StageChapter = {
  slug: "velocity-as-slope",
  topicSlug: "kinematics",
  order: 3,
  format: "stage",
  title: "Rychlost jako sklon",
  lesson,
};
```

Before committing, confirm `order: 3` is free in `src/lib/lessons/physics/kinematics/` — that folder already holds two chapters. If 3 is taken, use the next free integer; `validate:content` will fail loudly otherwise.

- [ ] **Step 9: Regenerate, validate, verify**

Run: `pnpm build:registry && pnpm validate:content && pnpm exec tsc --noEmit && pnpm test:run && pnpm lint`
Expected: `✓ Content OK: 41 chapters across ...`, everything else clean.

Then `pnpm dev` and open `http://localhost:3000/vzdelej-se/topics/physics/kinematics/velocity-as-slope/`. Confirm both sliders move the secant, the goal fires as `h` shrinks, and the formula first appears on the naming screen.

- [ ] **Step 10: Verify reduced motion is honored**

In Chrome DevTools: Rendering panel → "Emulate CSS media feature prefers-reduced-motion" → `reduce`. Reload the discriminant chapter and step through beats. Expected: screens change instantly, no spring travel. This is the first reduced-motion support in the codebase.

- [ ] **Step 11: Commit**

```bash
git add src/lib/lesson/stages/motion-timeline.ts src/lib/lesson/stages/motion-timeline.test.ts src/lib/lesson/stages/registry.ts src/components/lesson/stages/ src/lib/lessons/physics/kinematics/velocity-as-slope.ts src/lib/lessons/data.generated.ts
git commit -m "feat(content): add motion-timeline stage and velocity-as-slope chapter"
```

---

## Final verification

- [ ] **Run everything**

```bash
pnpm build:registry && pnpm validate:content && pnpm exec tsc --noEmit && pnpm lint && pnpm test:run && pnpm build
```

Expected: all pass, static export completes.

- [ ] **Check the success criteria from the spec**

1. All three pilot chapters play end to end, formula last, nothing blocking.
2. `pnpm validate:content` rejects a formula leaked into a beat — verify by temporarily pasting `b^2-4ac` into a discriminant beat prompt, running validation, confirming the `[formula-leak]` error, then reverting.
3. The 38 existing chapters are unchanged: `git log --oneline -- src/lib/lessons/math src/lib/lessons/physics` shows only the three new chapter files added.
4. `prefers-reduced-motion` is honored on stage lessons.
5. A judgment call is possible on whether `log-slide-rule` teaches logarithms better than the current deck chapter. **This is the gate for the rollout project** — do not begin converting the remaining chapters until it is answered.
