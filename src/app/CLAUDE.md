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
| `/topics/[subjectSlug]` | Topic tree for the subject |
| `/topics/[subjectSlug]/[topicSlug]` | Chapter list for the topic |
| `/topics/[subjectSlug]/[topicSlug]/[chapterSlug]` | Lesson player for one chapter |

## Rules

- Keep pages thin — delegate to `src/components/`
- `(app)/layout.tsx` already provides sidebar + top bar — don't add duplicate nav
- Use `"use client"` only when the page itself needs hooks (chapter/topic pages use `useParams`)
- There is no `/lessons/[lessonId]` route — chapters are the unit, always addressed as `topicSlug/chapterSlug`
