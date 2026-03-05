# Components

## shadcn/ui Available (`src/components/ui/`)

avatar, badge, button, card, dialog, dropdown-menu, input, label, progress, separator, sheet, sonner (toasts), tabs

Style: "new-york". Use `cn()` from `@/lib/utils` for class merging.

## Layout (`src/components/layout/`)

- `sidebar.tsx` — Fixed left sidebar (hidden on mobile), nav items: Dashboard, Topics, Profile, Subscription
- `mobile-sidebar.tsx` — Sheet-based sidebar for mobile
- `top-bar.tsx` — Sticky header with menu trigger, StreakCounter, XPBar
- `footer.tsx` — Site footer

Master layout in `src/app/(app)/layout.tsx`: Sidebar + TopBar + main content area.

## Lesson Components (`src/components/lesson/`)

**Core flow:** LessonShell → SlideDeck → SlideRenderer → specific slide components

- `lesson-shell.tsx` — Root container, manages answer state, sends answers to API, shows completion
- `slide-deck.tsx` — Slide navigation (keyboard arrows + buttons), prevents advancing without answering
- `slide-renderer.tsx` — Routes slide type to correct component
- `math-display.tsx` — KaTeX rendering. `MathDisplay` for single expressions, `MathText` for markdown+LaTeX. Supports callout blocks: `> [!tip]`, `> [!info]`, `> [!warning]`, `> [!key]`

**Slide components** in `src/components/lesson/slides/`:
concept-slide, practice-slide, walkthrough-step-slide, summary-slide, section-title-slide, walkthrough-intro-slide, walkthrough-result-slide

## Interactive Visuals (`src/components/lesson/visuals/`)

26 visual types. Router: `visual-block.tsx`. Shared control: `slider-control.tsx`.

**Static:** balance-scale, number-line, motion-diagram, velocity-graph, trajectory, graph-st

**Interactive (React state + physics + Canvas/SVG):**
- Mechanics: interactive-motion, interactive-trajectory, interactive-pendulum, interactive-spring-oscillator, interactive-inclined-plane, interactive-collision, interactive-roller-coaster, interactive-orbit
- Thermo: interactive-pv-diagram
- E&M: interactive-electric-field, interactive-circuit
- Waves/Optics: interactive-wave (traveling/standing/interference), interactive-optics
- Modern: interactive-atom

Visual props are `Record<string, unknown>` — each component casts to its own typed props.

## Gotchas

- Animations use `motion` package (framer-motion), imported as `motion/react`
- Keyboard navigation in SlideDeck skips when focus is on input/textarea
- Interactive visuals can be large files (20-35KB) — they contain full physics simulations
- All text in components is Czech
