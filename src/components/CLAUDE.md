# src/components/

React components organized by domain.

| Directory | Purpose |
|-----------|---------|
| `ui/` | shadcn/ui primitives — never edit manually, use `pnpm dlx shadcn@latest add <name>` |
| `layout/` | App shell: sidebar (desktop), mobile-sidebar (sheet), top-bar, footer |
| `lesson/` | Lesson player: shell → slide deck → slide renderer → slides + visuals |
| `topic/` | Topic browsing: topic-card |

## Design Rules

- One component per file, PascalCase filename = export name
- Single responsibility — rendering + complex logic? Extract logic to a hook or `src/lib/`
- Props down, callbacks up — parent owns state, child signals changes
- Minimize `"use client"` — only on components that use hooks/browser APIs
- All user-visible text in Czech; identifiers stay English
