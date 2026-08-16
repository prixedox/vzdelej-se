# src/components/topic/

Topic browsing UI — the cards on `/topics/*`.

## Files

| File | Role |
|------|------|
| `topic-card.tsx` | One card per `TopicNode`: name, description, child/chapter count, earned tier badge |

## Reading Progress Without Hydration Mismatch

Progress lives in `localStorage`, which does not exist during static export. `TopicCard`
reads it through `useSyncExternalStore`:

- the server snapshot is always `null`, so the exported HTML never contains a tier
- the client snapshot calls `getTopicAggregateProgress(topic.slug, chapterSlugs)` after mount
- `subscribe` listens for `"storage"`, so a tier earned in another tab updates this one

Do not read `localStorage` directly in render, and do not gate it behind a `useEffect` +
`useState` pair — that reintroduces the flash this pattern exists to avoid.

## Rules

- `"use client"` — required by `useSyncExternalStore`
- `chapterSlugs` is only passed for leaf topics that link to a chapter list; without it the
  card shows no tier rather than a wrong one
- A tier is never conveyed by colour alone — `TIER_CONFIG` pairs each with a letter
- Czech for all visible text; `href` and slugs stay English
