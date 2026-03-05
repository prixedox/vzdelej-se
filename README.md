# Vzdělej.se

Czech interactive educational platform for **math** and **physics**. Lessons use a Brilliant.org-inspired pedagogy: every screen is interactive, questions come before theory, and students learn by exploring.

## Features

- **35 interactive lessons** across 21 math and 14 physics topics
- **6 lesson flavors** — Discovery, Visual-First, Story/Scenario, Prediction→Test, Mystery/Puzzle, Challenge Chain — so each lesson feels different
- **31 interactive visual components** — function graphs, unit circle, triangle explorer, probability simulator, derivative visualizer, physics simulations (pendulum, collisions, orbits, circuits, waves, optics...)
- **Interleaved learning** — flat step-based lessons alternate between explain, multiple-choice, text-input, drag-to-sort, explore (interactive visual), and reveal steps
- **Client-side only** — no database, no auth, no server calls. All content is static TypeScript, answer validation runs in the browser
- **Full KaTeX support** — inline and block LaTeX rendering with Czech math conventions (decimal comma, `tg` instead of `tan`, `⟨a; b⟩` intervals)

## Tech Stack

- **Next.js 16** with App Router and Turbopack
- **React 19** + TypeScript (strict mode)
- **Tailwind CSS 4** + shadcn/ui (New York style)
- **Motion** (Framer Motion) for animations and drag-to-reorder
- **KaTeX** for math rendering
- **Zod** for schema validation

## Getting Started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Commands

```bash
pnpm dev        # Dev server (Turbopack)
pnpm build      # Production build
pnpm lint       # ESLint
```

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (app)/                  # Main app pages (topics, lessons)
│   └── (marketing)/            # Public pages (home, terms)
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   ├── layout/                 # Sidebar, top bar, mobile nav
│   └── lesson/
│       ├── slides/             # Slide components (v1 + v2)
│       └── visuals/            # 31 interactive visual components
├── lib/
│   ├── lessons/                # Static lesson content (TS objects)
│   │   ├── math/               # 21 math topic lessons
│   │   ├── physics/            # 14 physics topic lessons
│   │   └── data.ts             # Lesson registry
│   ├── lesson/                 # Loader, answer evaluator, slide builder
│   └── topics/                 # Topic tree definitions
└── types/                      # TypeScript types (lesson, slide, topic)
```

## How Lessons Work

1. Content is stored as TypeScript objects in `src/lib/lessons/`
2. Each lesson is a flat array of **steps** (explain, MC, text-input, explore, reveal, sort-order)
3. Steps map 1:1 to slides — the `LessonShell` builds slides and manages state
4. Question steps block forward navigation until answered
5. Answer validation is client-side only (`answer-evaluator.ts`)
6. No progress persistence — everything is in-session

## Subjects

### Math (21 topics)
Algebra (lineární rovnice, kvadratické, soustavy, nerovnice, výrazové úpravy, posloupnosti) · Funkce (lineární, kvadratická, exponenciální, logaritmická, goniometrické, absolutní hodnota) · Geometrie (trojúhelníky, kružnice, analytická geometrie, stereometrie) · Kombinatorika (základy, pravděpodobnost) · Analýza (limity, derivace, integrály)

### Physics (14 topics)
Mechanika (kinematika, dynamika, energie a práce, hybnost a impulz, gravitace) · Termodynamika (teplota a teplo, ideální plyn, zákony termodynamiky) · Elektřina a magnetismus (elektrické pole, obvody, magnetické pole) · Vlnění a optika (mechanické vlnění, optika) · Moderní fyzika (kvantová a jaderná fyzika)

## Interactive Visuals

| Category | Components |
|----------|-----------|
| Math | function-graph, unit-circle, triangle, probability, derivative, balance-scale, number-line |
| Mechanics | motion, trajectory, velocity-graph, roller-coaster, inclined-plane, collision, pendulum, spring-oscillator, orbit |
| Thermo | pv-diagram |
| E&M | electric-field, circuit |
| Waves | wave (traveling/standing/interference), optics |
| Modern | atom |

## License

Private project.
