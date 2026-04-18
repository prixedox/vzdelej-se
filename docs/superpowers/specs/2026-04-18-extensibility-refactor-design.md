# Extensibility Refactor — Design

**Date:** 2026-04-18
**Status:** Approved, ready for implementation planning
**Scope:** One large-ish refactor to prepare the Vzdělej.se content pipeline for many more chapters without friction.

## Motivation

The current content pipeline works for 35 lessons but has visible friction for scale. Specific problems (see code review on `aaa7204..75afecd`):

1. Manual registry in `src/lib/lessons/data.ts` — O(N) boilerplate imports + record entries
2. Slug correlation across four places (tree, filename, export, registry) is unchecked — typos silently become 404s
3. No "chapter" layer — one lesson per topic is a hard constraint
4. No runtime/build-time content validation — malformed lesson data can ship
5. Vestigial `V2` / `Beginner` naming from retired systems
6. No test framework
7. Czech-language slugs in paths and code mix with English keywords and hurt tool integration

## Goals

- Adding a new chapter is: create one file, run one script, done. Zero edits to central registries.
- Typos in topic or chapter slugs fail the **build**, not at runtime.
- Multiple chapters per topic become possible and trivial.
- Lesson content is validated (Zod) on every build.
- Tests exist (Vitest) and run on every build.
- Slugs, paths, and code identifiers are English. User-facing text stays Czech.
- V1 (legacy) lesson system is gone.

## Non-Goals

- Changing the Lesson V2 step type catalog (explain, multiple-choice, etc. stay as-is)
- Changing visual components
- Adding server-side rendering beyond current static behavior
- Adding a real database or auth
- i18n (single-locale app, Czech)

---

## Architecture

### Terminology

| Term | Meaning |
|------|---------|
| **Subject** | Top level of the tree: `math`, `physics` |
| **Category** | Non-leaf node under a subject: e.g. `algebra`, `mechanics` |
| **Topic** | Leaf in the tree: e.g. `linear-equations`, `kinematics` |
| **Chapter** | One learnable unit within a topic. Each has its own URL. (NEW concept — replaces "one lesson per topic") |
| **`Lesson`** | The data structure of a chapter's content (renamed from `LessonV2`) |

### File structure

```
src/
├── types/
│   ├── lesson.ts              # Lesson type (renamed from LessonV2)
│   ├── slide.ts               # Slide type (renamed from SlideV2)
│   ├── chapter.ts             # NEW: ChapterDefinition type
│   └── topic.ts               # TopicNode (unchanged shape)
│
├── lib/
│   ├── topics/
│   │   ├── math-tree.ts       # All English slugs + derived MathTopicSlug union
│   │   ├── physics-tree.ts    # All English slugs + derived PhysicsTopicSlug union
│   │   └── index.ts           # exports + TopicSlug union
│   │
│   ├── lessons/
│   │   ├── data.ts            # Hand-written shim: re-exports + getChapter() helpers
│   │   ├── data.generated.ts  # CODEGEN: one import per chapter, keyed registry
│   │   ├── schema.ts          # Zod schemas for Lesson + Chapter
│   │   ├── math/
│   │   │   ├── linear-equations/
│   │   │   │   ├── intro.ts              # exports `chapter: ChapterDefinition`
│   │   │   │   └── word-problems.ts      # (future)
│   │   │   ├── quadratic-equations/
│   │   │   │   └── intro.ts
│   │   │   └── … (21 topic folders)
│   │   └── physics/
│   │       └── … (14 topic folders)
│   │
│   └── lesson/
│       ├── build-slides.ts    # (renamed from build-slides-v2.ts; V1 version deleted)
│       ├── answer-evaluator.ts
│       ├── math-colors.ts
│       └── progress-store.ts  # Per-chapter keys; storage version bumped
│
├── components/
│   └── lesson/
│       ├── lesson-shell.tsx   # V1 branch deleted
│       ├── slide-deck.tsx     # (renamed from slide-deck-v2.tsx; V1 deleted)
│       ├── slide-renderer.tsx # (renamed from slide-renderer-v2.tsx; V1 deleted)
│       ├── slides/…           # V2 slides kept, V1 slides deleted
│       └── visuals/…          # Unchanged
│
└── app/
    └── (app)/
        └── topics/
            ├── [subjectSlug]/
            │   ├── [topicSlug]/
            │   │   ├── [chapterSlug]/
            │   │   │   └── page.tsx      # NEW: lesson player
            │   │   └── page.tsx          # CHANGED: lists chapters instead of redirecting
            │   └── page.tsx              # Unchanged: categories/topics

scripts/
├── build-registry.ts          # NEW: scans lessons/ → data.generated.ts
├── validate-content.ts        # NEW: Zod-validates every chapter + cross-checks tree
├── new-chapter.ts             # NEW: scaffolding CLI
├── new-topic.ts               # NEW: scaffolding CLI
└── migrate-to-chapters.ts     # ONE-OFF: moves 35 files to new structure (deleted after)

docs/
└── superpowers/
    └── specs/
        └── 2026-04-18-extensibility-refactor-design.md   # this file

Also deleted:
- src/app/(app)/lessons/[lessonId]/page.tsx
- src/types/lesson.ts V1 fields (LessonContent, PracticeProblem, Difficulty)
- src/types/slide.ts (V1)
- src/lib/lesson/build-slides.ts (V1 — V2 gets this name after rename)
- src/components/lesson/slide-deck.tsx (V1)
- src/components/lesson/slide-renderer.tsx (V1)
- src/components/lesson/slides/*.tsx (V1-only: concept-slide, practice-slide, walkthrough-*, exploration-slide, knowledge-check-slide, section-title-slide, summary-slide [V1 version])
- src/components/lesson/practice-problem.tsx (V1-only)
- src/components/lesson/confetti-burst.tsx IF unused after V1 delete (check)
```

### Chapter file shape

```ts
// src/lib/lessons/math/linear-equations/intro.ts
import type { ChapterDefinition } from "@/types/chapter";

export const chapter: ChapterDefinition = {
  slug: "intro",                      // URL fragment; must match filename
  topicSlug: "linear-equations",      // must match parent directory name
  order: 1,                           // sort within topic
  title: "Úvod do lineárních rovnic", // Czech; display text
  lesson: {
    narrative: "…",
    steps: [ /* … */ ],
    summary: { keyTakeaways: ["…"] },
    nextTopicSuggestion: "…",         // optional
  },
};
```

Every chapter file exports an identifier named `chapter` (not a unique camelCase name). The codegen imports under an alias per chapter.

### Type definitions

```ts
// src/types/chapter.ts
import type { Lesson } from "./lesson";

export interface ChapterDefinition {
  slug: string;          // URL fragment
  topicSlug: string;     // must exist in a tree
  order: number;         // unique within a topic
  title: string;         // Czech display name
  lesson: Lesson;
}

// src/types/lesson.ts (renamed from lesson-v2.ts; V1 content deleted)
export interface Lesson {
  narrative?: string;
  steps: LessonStep[];
  summary: { keyTakeaways: string[] };
  nextTopicSuggestion?: string;
}

export type LessonStep = ExplainStep | MultipleChoiceStep | /* … */ | PredictionStep;
// (step interfaces unchanged)
```

### Type-level slug correlation

Tree files export `as const`; slug unions are derived at type level:

```ts
// src/lib/topics/math-tree.ts
export const mathTree = { /* ... */ } as const;

type Flatten<T extends readonly unknown[]> = /* recursive leaf extractor */;
export type MathTopicSlug = Flatten<typeof mathTree.topics>;
// = "linear-equations" | "quadratic-equations" | …
```

The codegen registry type:
```ts
type ChapterRegistry = {
  [topic in TopicSlug]: Record<string, ChapterDefinition>;
};
```

### Routing

| Path | Renders |
|------|---------|
| `/` | Marketing |
| `/topics` | Subject list |
| `/topics/{subject}` | Category tree (unchanged) |
| `/topics/{subject}/{topic}` | **Chapter list** (CHANGED behavior) |
| `/topics/{subject}/{topic}/{chapter}` | **Lesson player** (NEW route) |

`/lessons/[lessonId]` is **deleted**.

Single-chapter topics still render the chapter list (one card shown). This keeps URLs and UX consistent. Small UX concession now for simplicity.

---

## Auto-Registry (codegen)

**`scripts/build-registry.ts`:**

1. Walks `src/lib/lessons/{math,physics}/*/*.ts`
2. For each file, derives expected `topicSlug` from parent folder and `chapterSlug` from filename (no `.ts`)
3. Generates `src/lib/lessons/data.generated.ts`:
   ```ts
   // AUTO-GENERATED by scripts/build-registry.ts — do not edit.
   import { chapter as math__linear_equations__intro } from "./math/linear-equations/intro";
   import { chapter as math__linear_equations__word_problems } from "./math/linear-equations/word-problems";
   // … one line per chapter

   export const chapters = {
     "linear-equations/intro": math__linear_equations__intro,
     "linear-equations/word-problems": math__linear_equations__word_problems,
     // …
   } as const;
   ```
4. Output is **committed** — PR diffs show new chapters explicitly, no runtime glob surprises
5. Fast: ~50ms on a dev laptop, runs in `predev` and `prebuild`

**`src/lib/lessons/data.ts` (thin shim):**
```ts
export { chapters } from "./data.generated";

export function getChapter(topicSlug: string, chapterSlug: string) {
  return chapters[`${topicSlug}/${chapterSlug}`] ?? null;
}

export function getChaptersForTopic(topicSlug: string): ChapterDefinition[] {
  return Object.values(chapters)
    .filter((c) => c.topicSlug === topicSlug)
    .sort((a, b) => a.order - b.order);
}

export function hasChapter(topicSlug: string, chapterSlug: string): boolean {
  return `${topicSlug}/${chapterSlug}` in chapters;
}
```

---

## Validation (Zod)

**`src/lib/lessons/schema.ts`:**

- `lessonStepSchema` — discriminated union on `type`, validates every variant
- Additional refinements:
  - Multiple choice must have **exactly one** `isCorrect: true`
  - Text input with `numericTolerance` must have `expectedAnswer` that parses as a number
  - Prediction must have ≥2 options with exactly one correct
  - Sort-order must have ≥2 items
- `lessonSchema` — composes step schema, requires `steps.length ≥ 1`
- `chapterSchema` — composes lesson schema, validates slug shape (`^[a-z0-9-]+$`)

**`scripts/validate-content.ts`:**

1. For each file in `src/lib/lessons/{math,physics}/*/*.ts`:
   - Validate with `chapterSchema`
   - Assert `slug` matches filename (without `.ts`)
   - Assert `topicSlug` matches parent folder
2. Cross-check against trees:
   - Every topic slug in the tree has ≥1 chapter
   - Every chapter's `topicSlug` resolves to a real topic
3. Cross-check within topic: `order` values are unique
4. On any violation: print a readable error and `process.exit(1)`

Runs in `prebuild` (before Next build). Failures block production builds.

---

## Tests (Vitest)

**`vitest.config.ts`** with the `@/` alias matching `tsconfig.json`.

**Test files (co-located, next to source):**

| File | Checks |
|------|--------|
| `src/lib/lessons/schema.test.ts` | Accept valid; reject MC with 0/2 correct; reject text-input with `numericTolerance` but non-numeric answer; reject prediction with 1 option; reject sort-order with 1 item; reject empty `steps`; reject invalid slug shape |
| `src/lib/lessons/data.test.ts` | Every topic in tree has ≥1 chapter; every chapter's `topicSlug` exists; no duplicate slugs; unique `order` per topic; `getChaptersForTopic()` returns sorted by order |
| `src/lib/lessons/registry-build.test.ts` | Run `build-registry` against a temp fixture dir; check generated imports and keys |
| `src/lib/lesson/build-slides.test.ts` | `buildSlides()` with narrative: narrative prepended with `stepIndex=0`; `stepIndex` and `totalSteps` monotonic; summary + complete appended; factory handles every step variant |
| `src/lib/lesson/progress-store.test.ts` | `loadProgress()` returns defaults on corrupted shape (null, missing fields, wrong types); tier never downgrades; spaced intervals grow as documented |
| `scripts/new-chapter.test.ts` | Scaffolder writes correct file; rejects existing slug; rejects unknown topic; picks next `order` |

**`pnpm test`** (watch), **`pnpm test:run`** (one-shot, CI-ready).

---

## Scaffolding CLIs

### `pnpm new-chapter <subject>/<topic>/<chapter> [title]`

```bash
pnpm new-chapter math/linear-equations/graphing "Grafy lineárních funkcí"
```

1. Validate `subject` in `["math", "physics"]`
2. Validate `topic` exists in tree
3. Reject if file already exists
4. Compute next `order` = max(existing orders) + 1
5. Write `src/lib/lessons/{subject}/{topic}/{chapter}.ts` from template
6. Run `pnpm build:registry` automatically
7. Print next-steps hint ("edit file, run `pnpm dev`")

### `pnpm new-topic <subject>/<category>/<topic> [name]`

```bash
pnpm new-topic math/algebra/polynomials "Polynomy"
```

1. Validate subject + category exist
2. Insert `TopicNode` into the tree under that category
3. Create folder + first chapter `intro.ts` from template
4. Run `pnpm build:registry`

---

## Progress Store Changes

- `STORAGE_KEY` bumps to `"vzdelej-se-progress-v2"` — old data orphaned (acceptable pre-launch)
- Progress keys change: `topicSlug` → `"${topicSlug}/${chapterSlug}"`
- Tier is per-chapter
- Topic-level progress is derived on read: `completedChapters / totalChapters`; overall tier = **worst** chapter tier (gold only if all chapters gold)
- New helper: `getTopicAggregateProgress(topicSlug)` returns `{ completedChapters, totalChapters, overallTier }`

---

## CLAUDE.md Updates

### Pass 1 — before code, covering new concepts

| File | Scope |
|------|-------|
| `CLAUDE.md` (root) | Commands section: add `pnpm test`, `pnpm new-chapter`, `pnpm new-topic`; strike reference to difficulty again if lingering; update architecture diagram to show chapters |
| `src/lib/lessons/CLAUDE.md` | Rewrite: chapter structure, `ChapterDefinition` shape, codegen, validation, slug rules |
| `src/lib/lessons/math/CLAUDE.md` | NEW: chapters per topic, naming conventions |
| `src/lib/lessons/physics/CLAUDE.md` | NEW: same |
| `src/lib/lesson/CLAUDE.md` | Rename V2→default (file renamed), drop V1 references |
| `src/types/CLAUDE.md` | Remove V1 types; add `ChapterDefinition`, simplify |
| `src/components/lesson/CLAUDE.md` | Drop V1 component references |
| `src/components/lesson/slides/CLAUDE.md` | Drop V1 slide list |
| `scripts/CLAUDE.md` | NEW: purpose of each script (codegen, validation, scaffolding, one-off migration) |
| `.claude/rules/lessons.md` | Major rewrite: chapter layer, new adding-a-lesson flow |
| `.claude/rules/topics.md` | Update slugs to English; chapter reference |

### Pass 2 — after code

Quick polish: verify example code in each CLAUDE.md matches the final API, file paths match what got built, commands produce the documented output.

---

## Migration Plan

### Slug rename table (full)

**Math topics:**
```
linearni-rovnice       → linear-equations
kvadraticke-rovnice    → quadratic-equations
soustavy-rovnic        → systems-of-equations
nerovnice              → inequalities
vyrazove-upravy        → algebraic-expressions
posloupnosti           → sequences
linearni-funkce        → linear-functions
kvadraticka-funkce     → quadratic-functions
exponencialni-funkce   → exponential-functions
logaritmicka-funkce    → logarithmic-functions
goniometricke-funkce   → trigonometric-functions
absolutni-hodnota      → absolute-value
trojuhelniky           → triangles
kruznice-a-kruhy       → circles
analyticka-geometrie   → analytic-geometry
stereometrie           → solid-geometry
kombinatorika-zaklady  → combinatorics
pravdepodobnost        → probability
limity                 → limits
derivace               → derivatives
integraly              → integrals
```

**Math categories:**
```
algebra                → algebra
funkce                 → functions
geometrie              → geometry
kombinatorika          → combinatorics-and-probability
zaklady-analyzy        → calculus
```

**Physics topics:**
```
kinematika             → kinematics
dynamika               → dynamics
energie-a-prace        → energy-and-work
hybnost-a-impulz       → momentum-and-impulse
gravitace              → gravity
teplota-a-teplo        → temperature-and-heat
idealni-plyn           → ideal-gas
zakony-termodynamiky   → thermodynamics-laws
elektricke-pole        → electric-field
elektricke-obvody      → electric-circuits
magneticke-pole        → magnetic-field
mechanicke-vlneni      → mechanical-waves
optika                 → optics
kvantova-fyzika        → quantum-physics
```

**Physics categories:**
```
mechanika              → mechanics
termodynamika          → thermodynamics
elektromagnetismus     → electromagnetism
vlneni-a-optika        → waves-and-optics
moderni-fyzika         → modern-physics
```

### One-off migration script

`scripts/migrate-to-chapters.ts` automates:

1. For each old file `src/lib/lessons/{subject}/{old-cs-slug}-v2.ts`:
   - Parse imports (keep them)
   - Parse the exported `LessonV2` object
   - Map old slug → new English topic slug via the table above
   - Create directory `src/lib/lessons/{subject}/{new-en-slug}/`
   - Write `intro.ts` with the new chapter shape wrapping the existing `Lesson` content
2. Update tree files (`math-tree.ts`, `physics-tree.ts`) with English slugs
3. **Delete the old file**

Script is committed in case we need to re-run, but **deleted after the PR merges** — it's a one-off.

### Data loss concerns

- localStorage `"vzdelej-se-progress"` keys will orphan. Acceptable — app is pre-launch, no real users yet. New key `"vzdelej-se-progress-v2"` starts fresh.
- No database, no external integrations — nothing else to worry about.

---

## Execution Order & Commit Plan

Four commits (logical split for `git bisect`):

### Commit 1 — Foundations (no lesson changes)
- Add Vitest + tsx devDeps
- `vitest.config.ts` with `@/` alias
- `pnpm test` + `pnpm test:run` scripts
- Write tests against **existing** code as a safety net for later refactors:
  - `src/lib/lesson/progress-store.test.ts` (shape guard, tier rules, spaced intervals)
  - `src/lib/lesson/build-slides-v2.test.ts` (narrative injection, stepIndex/totalSteps consistency)

No type renames, no structural changes — commit 1 is purely additive.

### Commit 2 — Content migration
- Zod schemas in `src/lib/lessons/schema.ts`
- Codegen script `scripts/build-registry.ts`
- Validation script `scripts/validate-content.ts`
- One-off migration script `scripts/migrate-to-chapters.ts`
- Run the migration: 35 files move, tree files become English
- New `types/chapter.ts`
- Rename `LessonV2 → Lesson` at type level; update all imports
- `data.ts` becomes thin shim over `data.generated.ts`
- Wire `pnpm build` / `pnpm dev` to run codegen + validation
- Tests: schema, data, registry-build

### Commit 3 — Routes + V1 deletion
- New route `app/(app)/topics/[subject]/[topic]/[chapter]/page.tsx`
- Update `app/(app)/topics/[subject]/[topic]/page.tsx` to list chapters
- Delete `app/(app)/lessons/[lessonId]/page.tsx`
- Progress store: per-chapter keys, bump `STORAGE_KEY`
- **Delete all V1 code**: types (`LessonContent`, `PracticeProblem`, `Difficulty`, V1 slide types), V1 components (slide-deck.tsx V1, slide-renderer.tsx V1, V1 slide variants, practice-problem.tsx), V1 builder (`build-slides.ts` V1)
- Rename V2 files to default names (`slide-deck-v2.tsx → slide-deck.tsx` etc.)
- `lesson-shell.tsx` — V1 branch removed, `topicSlug` renamed to per-chapter args

### Commit 4 — CLIs + CLAUDE.md
- `scripts/new-chapter.ts`, `scripts/new-topic.ts` + tests
- Package.json scripts for both
- Pass 2 CLAUDE.md updates across the tree
- Delete `scripts/migrate-to-chapters.ts` (one-off, no longer needed)

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Migration script corrupts a lesson file | Script is pure (reads → writes new); old files committed first, so `git restore` recovers |
| Codegen file gets out of sync with source | Runs on `predev` and `prebuild`; CI runs build; generated file committed, diff is obvious |
| Type-level slug unions balloon type-check time | Unions are small (~35 members); negligible cost |
| Next 16 dynamic route handling differs from old `[lessonId]` | Route file pattern follows current App Router conventions; tested via `pnpm build` + browser smoke |
| V1 deletion breaks some import I missed | `pnpm build` and `pnpm lint` catch missing imports immediately |
| Vitest config conflicts with Next 16 bundler | Vitest is decoupled from Next bundler — runs in Node. Standard setup, no conflict expected |

---

## Open Questions

**None outstanding.** User has approved:
- Chapter layer (option b)
- Uniform migration of all 35 lessons
- English slugs/paths/code, Czech display
- Vitest
- V1 deletion
- 4-commit split

---

## Success Criteria

- `pnpm build` succeeds with zero changes to `data.ts` when a new chapter is added via `pnpm new-chapter`
- `pnpm test` passes, ≥ 80% of the new validation logic covered
- Typo in a topic slug fails `pnpm build` (not 404 at runtime)
- All 35 existing chapters accessible at `/topics/{subject}/{topic}/intro`
- No V1 code remains
- No Czech slugs remain in code/paths
- All user-facing text still Czech
