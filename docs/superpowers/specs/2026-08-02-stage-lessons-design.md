# Stage Lessons — Derive, Then Name

**Date:** 2026-08-02
**Status:** Design approved, ready for planning

## Problem

The lesson engine teaches like a textbook with buttons. Across all 43 chapters the step
distribution is:

| explain | text-input | multiple-choice | explore | reveal | sort-order | prediction |
|---------|------------|-----------------|---------|--------|------------|------------|
| 166     | 154        | 125             | 44      | 33     | 30         | 12         |

About 75% of every lesson is read-a-paragraph → pick-one → type-a-number. Visuals hang
mostly off passive `explain` steps, so the interactive layer decorates a linear quiz
instead of carrying the lesson.

The target learner is a **struggling student stuck on one specific topic**, arriving
frustrated and low on confidence, whose actual problem is that **the formula is magic** —
they can recite `D = b² − 4ac` but have no idea what it means or where it came from.

Explain-then-drill is precisely what school already did to them. Repeating it with better
typography will not land. Three parts of the current design actively work against this
learner:

<!-- Observations below verified by running the dev server and walking two chapters
     (math/quadratic-equations/intro, math/derivatives/intro) at 1280x900. -->


- `slide-deck.tsx:70` blocks advancing past an unanswered question — the app's response to
  "I don't know" is to lock the door.
- `lesson-complete.tsx` reports "Úspěšnost 62 %" and a Bronze/Silver/Gold tier — someone
  who arrived feeling stupid leaves with a score confirming it.
- The formula is always declared first, then practiced. Magic-ness is never addressed.

Walking the app confirms the diagnosis and adds one more point: **slides are text floating
in a void.** On a 1280x900 desktop, `quadratic-equations/intro` slide 1 is three lines of
prose above roughly 700px of empty white, and it is slide 1 of 23. `derivatives/intro`
slide 2 asks the student to *draw a tangent and predict its slope* — a purely geometric
question — with no picture on screen at all.

### The existing proto-stage

`derivatives/intro` slide 5 renders `interactive-derivative`: curve, secant, two sliders,
live difference-quotient readout. It is already most of what a stage is, and its prompt —
*"Posouvejte h směrem k nule a sledujte, co se děje se sečnou"* — is a `ManipulateBeat` in
all but name. The engine cannot tell whether the student actually did it; it only waits
for a click. That gap is exactly what `Goal` + readouts close, and this component is the
reference implementation to adapt when building the pilot stages.

## Approach

**Derive, then name.** The formula appears *last*, as a name for something the student has
already watched happen under their own hand. A persistent manipulable ("stage") stays on
screen for the whole chapter; a sequence of beats drives attention around it; only after
the pattern has been seen does it get a symbol.

This is delivered as a **second chapter format alongside the existing one**. Nothing
currently working is broken or converted as part of this project.

Scope: the format plus **three pilot topics**, deliberately chosen to differ in how well
they suit visualization. Rolling out to the remaining 40 chapters is a separate project
that must not start until the pilot is judged.

## Data model

`ChapterDefinition` becomes a discriminated union in which `format` is **optional on the
existing variant**, so all 43 current chapter files compile untouched.

```ts
export type ChapterDefinition = DeckChapter | StageChapter;

interface ChapterBase {
  slug: string;
  topicSlug: string;
  order: number;
  title: string;
}

export interface DeckChapter extends ChapterBase {
  format?: "deck";   // absent = deck
  lesson: Lesson;
}

export interface StageChapter extends ChapterBase {
  format: "stage";
  lesson: StageLesson;
}
```

```ts
export interface StageLesson {
  title?: string;
  /** The persistent manipulable. Lives above every beat, never unmounts. */
  stage: StageSpec;
  /** Attention-driving sequence. The formula does NOT appear here. */
  beats: Beat[];
  /** The moment the pattern gets a name. Required, and structurally last. */
  naming: NamingBeat;
  /** Practice after the name exists. Reuses the existing LessonStep union. */
  apply?: LessonStep[];
  summary: { keyTakeaways: string[] };
  nextTopicSuggestion?: string;
}

export interface StageSpec {
  type: StageType;
  /** Starting parameter values. Keys must be params the stage declares. */
  initial: Record<string, number>;
  /** Named quantities the stage computes. Beat goals may only reference these. */
  readouts: string[];
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
  /** Fires the instant the goal holds. */
  onReached: string;
  /** Appears after sustained fiddling without reaching the goal. */
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

export interface Goal {
  /** Must appear in StageSpec.readouts. */
  readout: string;
  target: number;
  within: number;
}

export interface NamingBeat {
  /** The pattern in words, before any symbol. */
  observation: string;
  /** The formula. Its first appearance in the entire lesson. LaTeX. */
  formula: string;
  /** How the symbols map onto what was just seen. */
  mapping: string;
}
```

### Why `naming` is a field, not a beat variant

Making the naming moment a required top-level field rather than one `Beat` kind means a
stage lesson **cannot be authored formula-first**. The pedagogy is enforced by the type
system instead of by the author remembering. This is the central structural decision of
the design.

## Screen architecture

```
┌────────────────────────────┐
│  Stage — sticky, ~45vh     │  never unmounts for the whole chapter
├────────────────────────────┤
│  Beat strip                │  only this swaps
└────────────────────────────┘

StageShell (owns params, beat index, derived readouts)
 ├─ StageCanvas → stages/*   (controlled)
 └─ BeatStrip   → observe | manipulate | predict
      → NamingPanel
      → existing SlideDeck for `apply`
```

### Controlled stages — an inversion of the visuals convention

`src/components/lesson/visuals/CLAUDE.md` requires visuals to own their state
("Self-contained state — nothing leaks to parent"). Stages cannot: a beat must *read*
stage state to detect goals and *write* it to animate presets.

Stages therefore live in a **new `src/components/lesson/stages/` directory** with a
controlled contract. The 27 existing block visuals keep their convention unchanged.

```tsx
export interface StageProps {
  params: Record<string, number>;
  onParamsChange: (p: Record<string, number>) => void;
  highlight?: string[];
  /** false during predict reveal and naming — student watches, cannot drag. */
  interactive: boolean;
}
```

### Pure readouts live in `lib/`

Each stage has a pure readout module with no React import, honoring the existing
`src/lib/` rule and making goal detection unit-testable with zero DOM.

```ts
// src/lib/lesson/stages/parabola-roots.ts
export function readouts(p: Record<string, number>): Record<string, number> {
  const D = p.b * p.b - 4 * p.a * p.c;
  return {
    rootCount: D > 0 ? 2 : D === 0 ? 1 : 0,
    // Signed so the value passes continuously through zero. Overshooting reads
    // negative rather than looking like another "just touching".
    rootGap: (Math.sign(D) * Math.sqrt(Math.abs(D))) / Math.abs(p.a),
    vertexY: p.c - (p.b * p.b) / (4 * p.a),
  };
}
```

A stage registry maps `StageType` → `{ component, readouts, params }`. Validation reads
the registry to check that authored keys exist.

### Sizing

Stages size from their container via `viewBox` + `ResizeObserver`, not the hardcoded
`const W = 460 / const H = 320` pattern in `interactive-function-graph.tsx:38`. A stage is
the page, so it must be responsive.

## What replaces grading

Follows directly from the target learner:

1. **Nothing blocks.** No advance gate in stage format. Every `manipulate` beat exposes an
   "ukaž mi to" that springs the stage to the goal and continues. Being stuck twice in one
   session is what drove this student here; the app must never be the second time.
2. **No score, no percentage, no tier** on stage chapters. The completion screen reports
   what was seen — "Viděl jsi, kdy se dva kořeny slijí v jeden."
3. **`manipulate` has no wrong answer.** The student drags; the stage responds honestly.
   `onReached` fires when the goal holds. No error state exists in this format.
4. Deck chapters keep tier and score exactly as they are. `progress-store` gains a second
   record kind, `derived`, alongside the existing `scored`.

## Motion

Beat transitions animate the stage **parameters** through `useSpring`, not the DOM — the
curve physically travels between configurations, so the student sees the transformation
rather than two pasted-together states. The repo currently contains no `useSpring`,
`useTransform`, `layoutId`, or `MotionConfig`.

Also in scope for stage lessons only:

- `MotionConfig` + `useReducedMotion` at the shell (currently absent repo-wide)
- `pathLength` draw-on for stage curves at first mount

Deck-format transitions, the 8 orphaned visual components, and the static completion
screen are **out of scope** — they belong to the separate animation project.

## Pilot content

Three topics, deliberately chosen to differ in how well they suit visualization. If the
model only works on the easy one, the pilot has succeeded at telling us that.

### 1. `quadratic-equations/discriminant` — the easy case

Stage `parabola-roots`.

```ts
stage: { type: "parabola-roots", initial: { a: 1, b: 0, c: -4 },
         readouts: ["rootCount", "rootGap", "vertexY"] },

beats: [
  { kind: "observe",
    prompt: "Táhni parabolou nahoru a dolů. Sleduj, kde protíná osu." },

  { kind: "manipulate",
    prompt: "Posuň ji tak, aby se osy jen dotýkala.",
    goal: { readout: "rootGap", target: 0, within: 0.15 },
    onReached: "Teď se oba kořeny slily v jeden.",
    nudge: "Zkus zvedat parabolu nahoru — kořeny se k sobě blíží." },

  { kind: "predict",
    prompt: "A když ji zvedneš ještě výš?",
    question: "Kolik bude kořenů?",
    options: [{ label: "Dva", isCorrect: false },
              { label: "Jeden", isCorrect: false },
              { label: "Žádný", isCorrect: true }],
    then: { c: 2 },
    reveal: "Žádný. Parabola se osy vůbec nedotkne." },
],

naming: {
  observation: "Existuje přesná hranice, kde se dva kořeny slijí v jeden a pak zmizí.",
  formula: "D = b^2 - 4ac",
  mapping: "$D$ měří vzdálenost od té hranice. $D>0$ — dva kořeny. $D=0$ — ten dotyk. $D<0$ — mimo.",
},
```

### 2. `logarithmic-functions/why-logarithms` — the hard case

Chosen because logarithms have no obvious picture. Stage `log-slide-rule`: two
log-scaled rulers. Sliding one along the other adds lengths; because the scale is
logarithmic, adding lengths multiplies numbers.

```
observe    → "Všimni si, kde jsou 1, 2, 4, 8." (doubling is evenly spaced)
manipulate → "Posuň horní pravítko tak, aby jeho 1 byla nad dolní 3."
              then: "Teď se podívej, co je nad 4."  → 12
predict    → "Posunu na 5 a podívám se nad 6?"      → 30

naming: observation "Vzdálenost od 1 je to, co se sčítá, když se čísla násobí."
        formula     \log(ab) = \log a + \log b
        mapping     "Logaritmus JE ta vzdálenost."
```

Readouts: `alignedValue`, `product`, `offsetLength`.

**If this stage cannot be made to work, that is the pilot's most valuable output** — it
means the model does not generalize past visually-obvious topics, and the rollout project
should not start.

### 3. `kinematics/velocity-as-slope` — physics, and a controlled comparison

Stage `motion-timeline`: a dot on a track with linked s-t and v-t graphs plus a scrub bar.
Beats build toward *velocity is the slope of position*, named only at the end.

Kinematics already has a deck chapter, so this yields the same topic in both formats for
direct comparison.

## Validation

`scripts/validate-content.ts` gains a `stageChapterSchema` (Zod) plus four cross-checks
that run on `prebuild`:

1. Every `goal.readout` appears in `stage.readouts` — the likeliest authoring mistake.
2. Every key in `initial`, `preset`, and `then` is a param the stage registry declares.
3. `stage.type` exists in the stage registry.
4. **No beat may contain the naming formula's core token.** No beat `prompt`, `reveal`,
   `onReached`, or `nudge` may contain the token.

   The token is derived deterministically: strip all whitespace from `naming.formula`;
   if it contains `=`, split on `=` and take the **longest** resulting side; otherwise
   take the whole string. Comparison strips whitespace from the beat text too.

   - `D = b^2 - 4ac` → token `b^2-4ac`
   - `\log(ab) = \log a + \log b` → token `\log a+\log b` → `\loga+\logb`
   - `E = mc^2` → token `mc^2`

Check 4 is what makes derive-then-name enforced rather than merely encouraged. Types stop
the formula going in the wrong *field*; only this stops it being smuggled into a prompt.

`apply` steps validate through the existing step rules, unchanged.

### Czech diacritic density check (applies to all chapters, both formats)

A scan of the 38 content chapters found five written with no or almost no Czech diacritics:

| chapter | diacritic density |
|---------|-------------------|
| `math/limits/intro.ts` | 0 % |
| `math/probability/intro.ts` | 0 % |
| `math/triangles/intro.ts` | 0 % |
| `math/derivatives/intro.ts` | 1.7 % |
| `math/trigonometric-functions/intro.ts` | 2.7 % |

Czech prose in the healthy chapters runs 7–14 %. The affected text reads as broken to a
Czech student — *"rychlost znamena draha delena casem"*, badge *"Zahadka"* — and some has
degraded grammar beyond the missing accents: *"v pravouhlm trojuhelniku"*
(→ *pravoúhlém trojúhelníku*), *"pocet priznivy vysledku"* (→ *počet příznivých výsledků*).

`validate:content` passes them because Zod only checks structure.

Add a rule: for every chapter, compute diacritic density over user-facing string literals
(excluding LaTeX spans) and **fail the build under 4 %**. This guards the new pilot content
as it is written, not just the existing corpus. Repairing the five chapters above is
tracked separately — see Out of scope.

## Error handling

- **Unknown `stage.type`** → visible Czech fallback with a back link, *not* silence.
  `visual-block.tsx` fails silently because block visuals are decoration; a stage is the
  entire lesson, so silence would render a blank page.
- **`readouts()` never throws.** Non-finite results are treated as "goal not met".
- **`isGoalMet` never throws** — returns boolean, mirroring `answer-evaluator.ts`.
- **Unreachable goal from bad authoring** cannot trap a student, because "ukaž mi to"
  always exists.

## Testing

Mirrors the existing `build-slides.test.ts` pattern. Vitest, pure functions, no DOM.

- `readouts()` per stage, table-driven. Parabola: `D > 0 / = 0 / < 0`, `rootGap` sign
  continuity through zero, `a < 0` opening downward.
- `isGoalMet(goal, readouts)` — tolerance boundaries, non-finite inputs, never throws.
- `build-beats.ts` — `StageLesson` → renderable sequence.
- Validator tests: a leaked formula fails the build; a goal referencing an unknown readout
  fails the build; a preset with an undeclared param fails the build.

No component tests. The repo has none today and this project does not introduce a
component-testing stack.

## Out of scope

Each of these is a separate project with its own spec:

- Converting the remaining 40 deck chapters to stage format
- The 5 empty subjects (chemistry, biology, informatics, history, geography — 126 topics,
  all `comingSoon`)
- Deck-format animation work: slide transitions, the 8 orphaned visual components, the
  static completion screen
- A "I'm stuck on X" search entry point — genuinely right for this learner, since the
  current subject → topic → chapter tree assumes browsing, but independent of this work

### Existing bugs found while walking the app

Real defects in the current deck format, none caused by this work and none fixed by it.
They should be filed and fixed independently; the diacritic *validator* is in scope above,
but repairing the affected chapters is not.

1. **`explore` slide CTA is occluded by the nav bar.** On `derivatives/intro` slide 5 at
   1280x900, the "Hotovo" button renders at y 870–906 while the nav bar occupies y 843–900.
   The control that unblocks the slide sits behind the bar, while the nav reads
   "Odpovězte pro pokračování" with Další disabled. Effectively a soft dead end.
2. **Duplicate question.** `quadratic-equations/intro` slide 2 (prediction) and slide 3
   (multiple-choice) ask the same question with the same three options — the second
   immediately after the first has revealed the answer.
3. **Wrong narrative.** `quadratic-equations/intro` opens with *"Proč matematici vymysleli
   logaritmy?"* on a chapter about quadratics.
4. **Five chapters missing Czech diacritics**, listed in the Validation section.
5. **Stale lock message.** After a prediction option is selected but before "Odhalit
   odpověď" is clicked, the nav still reads "Odpovězte pro pokračování" although the
   student has answered.

## Success criteria

1. All three pilot chapters play end to end, formula last, nothing blocking.
2. `pnpm validate:content` rejects a formula leaked into a beat.
3. The 43 existing chapters are byte-for-byte unchanged and still play.
4. `prefers-reduced-motion` is honored on stage lessons.
5. A judgment call is possible on whether `log-slide-rule` teaches logarithms better than
   the current deck chapter — this is the gate for the rollout project.
