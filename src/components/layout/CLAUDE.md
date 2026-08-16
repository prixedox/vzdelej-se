# src/components/layout/

App chrome. Composed once by `src/app/(app)/layout.tsx` — pages never mount these themselves.

## Files

| File | Role |
|------|------|
| `sidebar.tsx` | Desktop nav, `hidden md:flex`, fixed `md:w-64`. Marks the active item from `usePathname()` |
| `mobile-sidebar.tsx` | Same nav rendered inside the `TopBar` sheet |
| `top-bar.tsx` | Sticky header; the hamburger is `md:hidden` and opens `MobileSidebar` in a `Sheet` |
| `footer.tsx` | Marketing/landing footer — not part of the `(app)` shell |

## The 64/md Contract

`Sidebar` is `md:w-64 md:fixed`, so `(app)/layout.tsx` offsets its content with `md:pl-64`.
Changing the sidebar width means changing that padding in the same commit, or desktop content
slides under the nav.

`md:` (768px) is the single breakpoint that decides sidebar vs. sheet — `Sidebar` hides below
it and the `TopBar` trigger appears. Keep both sides of that switch in step.

## Rules

- Nav items live in one `navItems` array per file — `sidebar.tsx` and `mobile-sidebar.tsx`
  must stay in sync when a route is added
- `"use client"` on everything that reads `usePathname()` or drives the sheet; `footer.tsx`
  stays a server component
- Semantic elements: `<aside>`, `<nav>`, `<header>`, `<footer>`. `<main>` belongs to the layout
- Icon-only buttons need an `sr-only` label (see the `Menu` trigger)
- Czech for all visible text
