# Vzdělej.se — Feature Plan

## Priority 1: Quick Wins (Low Effort, High Impact) — DONE

### Color-Coded Variable Tracking — DONE
Track the same variable with the same color across all equation steps.
```latex
\color{#e74c3c}{x} + 5 = 12  →  \color{#e74c3c}{x} = 12 - 5  →  \color{#e74c3c}{x} = 7
```
- KaTeX already supports `\color{}` — define a convention in lesson content
- Consistent colors: variables = red, coefficients = blue, constants = green
- Huge clarity win for algebra where students lose track of manipulations
- **Implemented:** Color constants in `src/lib/lesson/math-colors.ts`, applied to 8 lessons

### Misconception-First Lesson Intros — DONE
Start lessons from the most common wrong answer, not the correct one.
- "Most students think heavier objects fall faster. Let's test it."
- Present misconception → show why it fails → build correct understanding
- Research: 218 studies, large effect sizes for conceptual change
- **Implemented:** Optional `misconception` field on ExplainStep, rendered as amber callout with AlertTriangle icon. Applied to 8 lessons.

### Prediction-First Slides — DONE
Before revealing a concept, ask students to predict the outcome.
- Show scenario → student picks from visual options or draws prediction
- Then reveal real answer with animation
- Research: 2x better retention than explain-then-practice
- **Implemented:** New `prediction` step type end-to-end (types → builder → slide component → renderer → deck blocking). Purple-themed UI with animated reveal. Applied to 8 lessons.

### Narrative Framing — DONE
Wrap each topic in 2-3 sentences of story context before theory.
- Physics: "Galileo drops two balls from Pisa tower — which hits first?"
- Math: "A baker needs to split dough equally — how?"
- History: "Why did mathematicians invent logarithms?"
- **Implemented:** Optional `narrative` field on LessonV2, auto-injected as first explain slide with "Příběh" badge. Applied to 8 lessons.

---

## Priority 2: Medium Effort, High Impact — PARTIALLY DONE

### Animated Equation Steps — DONE
Animate transformations between equation steps instead of static display.
- Terms slide from one side to the other
- Canceling terms fade out with a flash
- Variables stay color-coded throughout
- KaTeX renders each step, Motion animates between them
- **Implemented:** New `animated-equation-solver` visual type. Step-by-step reveal with "Další krok" button, numbered steps, color-coded variables. Used in linear equations and quadratic equations lessons.

### Split-Screen Comparison
Two simulations side by side — identical except one variable.
- Left: with friction / Right: without friction
- Left: light mass / Right: heavy mass
- Student sees the isolated effect of one variable
- New visual type: `split-comparison` — two instances of same visual with different props

### Time Scrubber for Physics Simulations
Let students scrub time like a video timeline on physics simulations.
- Slider controls time in projectile/pendulum/collision
- Pause at any moment, inspect velocity/acceleration/force vectors
- Rewind and replay key moments
- Enhancement to existing interactive physics visuals — add time scrubber bar

### Hover-to-Highlight Equation Parts
Hover over any term in an equation → highlight it everywhere it appears.
- Hover `x²` → all `x²` terms glow across the slide
- Tooltip shows meaning: "kvadrát proměnné x"
- Makes dense equations navigable
- Enhancement to `MathText` component — wrap terms in interactive spans

### Spaced Retrieval Practice — PARTIALLY DONE (infrastructure)
Surface problems from past lessons in future ones.
- "Rychlé opakování" slide at the start of a new lesson with 1-2 past problems
- Spacing interval increases each time student answers correctly
- Research: d=0.54 effect size (significant for long-term retention)
- **Implemented:** localStorage progress tracking with spaced interval computation (`progress-store.ts`). Review topic selection with growing intervals (1d → 3d → 7d → 14d → 30d). Actual review slide injection still TODO.

---

## Priority 3: Higher Effort, Very High Impact

### Drag-and-Drop Solution Builder
Give students equation pieces or proof steps to arrange in order.
- Drag operation cards: "+5 na obě strany", "vydělit 2", "rozložit"
- Place in correct order to solve the problem
- Wrong order → visual feedback showing why it fails
- Extends existing `sort-order` concept with richer visual feedback
- New V2 step type: `proof-builder`

### Discovery Sandboxes
Free-play zones where students explore without a specific question.
- "Place charges and see what the field looks like"
- "Draw any function and see its derivative"
- No right/wrong — pure exploration with guiding prompts on the side
- PhET's most effective pattern for building intuition
- Enhancement to `explore-v2` — add sandbox mode with no required answer

### Constraint-Based Interactive Geometry
GeoGebra-style drag-and-discover for geometry.
- Build triangle → drag vertices → see angles, sides, area update live
- Set constraints (fixed side length, right angle) that hold during drag
- Relationships become obvious through manipulation
- Requires constraint solver — significant implementation effort
- New visual type: `interactive-geometry`

### Adaptive Difficulty System
Adjust problem difficulty in real-time based on student performance.
- Track time-to-solve and accuracy per problem
- If >80% accuracy → increase difficulty; if <50% → decrease
- Monitor session length, suggest breaks after ~25 min
- Build personalized weak/strong topic tracking in localStorage
- Requires difficulty metadata on all problems + a selection algorithm

---

## Gamification (Meaningful, Not Cosmetic) — PARTIALLY DONE

### Mastery Gates
- Can't advance to next topic until demonstrating understanding
- Threshold: e.g., 3/4 correct on practice problems
- Already block unanswered questions — extend to mastery percentage

### Challenge Tiers — DONE
- Bronze / Silver / Gold per topic based on accuracy
- Bronze: complete lesson. Silver: 80%+ correct. Gold: 100% + under time
- **Implemented:** Tier computation in `progress-store.ts`, badge display on topic cards, tier shown on lesson complete screen.

### "Aha" Moment Celebration
- When student changes wrong prediction to correct answer, special animation
- Track prediction→correction rate as a learning metric
- More meaningful than generic confetti

### Streak System — DONE (infrastructure)
- Consecutive correct answers unlock harder bonus problems
- Streak counter visible during practice
- Breaking streak is okay — shows "good attempt" not failure
- **Implemented:** Streak tracking in `progress-store.ts`. UI integration TODO.

---

## Visual & UX Enhancements — PARTIALLY DONE

### Micro-Interactions — DONE
- Smooth transitions between slides (not hard cut) — **spring-based slide transitions with scale**
- Button press → subtle scale animation — **whileTap on nav buttons**
- Correct answer → green pulse on input border — **ring-2 ring-green-200 on correct**
- Wrong answer → gentle shake + red flash — **keyframe shake [0, 6, -4, 2, 0] on wrong**

### Click-to-Reveal Term Definitions
- Click any math term → tooltip with Czech definition
- "tg" → "tangens — poměr protilehlé a přilehlé odvěsny"
- Built into `MathText` component

### Multi-Representation Display
- Show equation + graph + table simultaneously for functions
- Highlight corresponding parts across representations
- Change one → others update in sync
- Most effective for function/graph topics

### Dark Mode Polish — PARTIALLY DONE
- Ensure all interactive visuals respect dark mode
- Canvas components need explicit dark-aware color palettes
- KaTeX rendering should use CSS custom properties for colors
- **Implemented:** Dark mode variants added to MC slide, text-input slide, explain slide (misconception callout), prediction slide feedback areas.

---

## Research References

- Spaced repetition: d=0.54 effect size (meta-analysis of 22 reports, 3000+ participants)
- Misconception-driven teaching: 218 studies, 18,051 students, large effect sizes
- Embodied learning: 44 empirical studies show effectiveness, especially in physics
- Peer tutoring: 88% of studies show positive effects on achievement
- Gamification: progressive difficulty + narrative coherence predict completion
- Prediction-first: doubles engagement vs explain-then-practice
- Interactive simulations (PhET model): research-tested with students across 90+ languages
- 3Blue1Brown animation approach: equation morphing, variable tracking, geometric intuition

Sources: MDPI, Springer, Wiley, Frontiers in Education, PhET, Desmos, Mathigon, Brilliant, Khan Academy
