# src/app/

Next.js App Router pages.

## Route Groups

- `(app)/` — Main app with sidebar layout (`Sidebar` + `TopBar` + `<main>`)
- `(marketing)/` — Public pages without app chrome

## Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Home / landing |
| `/topics` | Subject cards grid |
| `/topics/[subjectSlug]` | Topic tree |
| `/topics/[subjectSlug]/[topicSlug]` | Difficulty picker |
| `/lessons/[lessonId]?difficulty=&subject=` | Lesson player |

## Rules

- Keep pages thin — delegate to `src/components/`
- `(app)/layout.tsx` already provides sidebar + top bar — don't add duplicate nav
- Use `"use client"` only when the page itself needs hooks (like lesson page with `useParams`)
