# src/

All source code. `@/` import alias points here.

## Directory Map

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js App Router — pages and layouts only, keep them thin |
| `components/` | React components: `ui/`, `layout/`, `lesson/`, `topic/` |
| `lib/` | Pure logic and data — no React imports allowed |
| `types/` | Shared TypeScript interfaces and discriminated unions |

## Import Rules

- `types/` ← imported by everything
- `lib/` ← imports `types/`, never `components/` or `app/`
- `components/` ← imports `types/` and `lib/`, never `app/`
- `app/` ← imports everything, but only composes — no business logic here
