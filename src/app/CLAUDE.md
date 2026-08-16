# src/app/

Next.js App Router pages.

## Route Groups

- `(app)/` — Main app with sidebar layout (`Sidebar` + `TopBar` + `<main>`)
- `(marketing)/` — Public pages without app chrome (`/terms`)
- The landing page sits outside both groups at `src/app/page.tsx`, under the root `layout.tsx`

## Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Home / landing |
| `/topics` | Subject cards grid |
| `/topics/[subjectSlug]` | Topic tree for the subject |
| `/topics/[subjectSlug]/[topicSlug]` | Chapter list for the topic |
| `/topics/[subjectSlug]/[topicSlug]/[chapterSlug]` | Lesson player for one chapter (deck or stage) |
| `/terms` | Terms page, no app chrome |

## Static Export

`next.config.ts` sets `output: "export"` + `basePath: "/vzdelej-se"` — the site ships to GitHub Pages as plain files. Consequences for anything you add here:

- Every dynamic segment needs `generateStaticParams()`. Use the helpers in `@/lib/static-params` (`allSubjectParams`, `allTopicParams`, `allChapterParams`), which enumerate routes from the topic trees + chapter registry.
- No server runtime: no route handlers, no server actions, no `dynamic = "force-dynamic"`, no request-time data.
- When a dynamic route needs client hooks, `page.tsx` stays a server component that only exports `generateStaticParams` and renders a sibling client component reading `useParams` — see `[chapterSlug]/page.tsx` → `chapter-page.tsx` and `[topicSlug]/page.tsx` → `topic-page.tsx`. Routes that need no hooks render directly (`[subjectSlug]/page.tsx`).

## Rules

- Keep pages thin — delegate to `src/components/`
- `(app)/layout.tsx` already provides sidebar + top bar — don't add duplicate nav
- Push `"use client"` down to the sibling component, not the routed `page.tsx` — the page has to stay static-exportable
- There is no `/lessons/[lessonId]` route — chapters are the unit, always addressed as `topicSlug/chapterSlug`
