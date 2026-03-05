# Database

## Setup

- PostgreSQL (Neon serverless) + Drizzle ORM
- Schema source of truth: `src/lib/db/schema.ts`
- Connection: `src/lib/db/index.ts` (lazy singleton, uses node-postgres Pool)
- Config: `drizzle.config.ts` (dialect: postgresql, out: ./drizzle)
- After schema changes: run `pnpm db:push` (dev) or `pnpm db:generate && pnpm db:migrate` (prod)

## Tables

**users** — id (UUID), email (unique), name, image, emailVerified, createdAt, role (user|admin)
- Stripe: stripeCustomerId, stripeSubscriptionId, stripePriceId, stripeCurrentPeriodEnd, subscriptionStatus (free|active|canceled|past_due|trialing)
- Gamification: xp (default 0), level (default 1), streak, longestStreak, lastActiveDate (TEXT YYYY-MM-DD)
- Daily limits: dailyLessonsUsed, dailyLessonsResetDate (TEXT YYYY-MM-DD)

**topics** — id (UUID), slug, name (Czech), description, subject (math|physics), parentId (self-join), order, isLeaf, difficulty, icon, aiContext
- Unique index: (slug, subject)

**lessonCache** — id, topicId, difficulty, variant, content (JSONB), model, promptVersion, generatedAt, generationTimeMs, tokenCount
- Unique index: (topicId, difficulty, variant)

**userLessonProgress** — id, userId, lessonCacheId, topicId, status (not_started|in_progress|completed), score (0-1), xpEarned, totalProblems, correctAnswers, hintsUsed, startedAt, completedAt
- Unique: (userId, lessonCacheId)

**userAnswers** — id, userId, lessonProgressId, problemIndex, userAnswer, isCorrect, hintsUsedForProblem, timeSpentMs, answeredAt

**dailyActivity** — id, userId, date (TEXT YYYY-MM-DD), lessonsCompleted, xpEarned, problemsSolved, correctAnswers, timeSpentMs
- Unique: (userId, date)

**accounts, sessions, verificationTokens** — NextAuth.js adapter tables

## Gotchas

- Dates stored as TEXT (YYYY-MM-DD) to avoid timezone issues — use string comparison
- All UUIDs use `crypto.randomUUID()` as default
- `lessonCache.content` is JSONB — Drizzle handles serialization automatically
- Cascade deletes: deleting a user cascades to accounts, sessions, progress, answers, activity
- DB is lazy-loaded with `require()` in auth config to avoid Edge runtime issues
