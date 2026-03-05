# Gamification & Rate Limiting

## XP System (`src/lib/utils/xp.ts`, `src/lib/utils/constants.ts`)

**XP Award Formula:**
- Base: XP_BASE_LESSON per completed lesson
- Per correct answer: + XP_PER_CORRECT
- Perfect score (all correct): + XP_PERFECT_BONUS
- No hints used: + XP_NO_HINTS_BONUS
- Streak multiplier (streak >= threshold): * STREAK_MULTIPLIER

**Levels:** Level N requires `(N-1)^2 * 100` total XP. Non-linear — later levels are exponentially harder.

Key functions: `calculateXP()`, `getLevelFromXP()`, `xpForLevel()`, `xpProgressInLevel()`

## Streaks

- Tracked via `lastActiveDate` (TEXT YYYY-MM-DD) on users table
- `isConsecutiveDay()` checks if today is exactly 1 day after lastActiveDate
- `isSameDay()` prevents double-counting same day
- `longestStreak` updated when current streak exceeds it
- Streak reset to 1 if gap > 1 day

## Daily Lesson Limits (`src/lib/rate-limit/index.ts`)

NOT a traditional rate limiter — DB-backed daily quota.

- Free users: 3 lessons/day (FREE_DAILY_LESSONS constant)
- Premium (active|trialing) and admin: unlimited
- Resets on new day (compares dailyLessonsResetDate to today's YYYY-MM-DD)
- `checkDailyLimit(userId)` → `{ allowed, used, limit, remaining }`
- `incrementDailyUsage(userId)` — called after lesson delivery

## Gamification Components

- `src/components/gamification/` — StreakCounter, XPBar (used in TopBar)
- `src/components/lesson/lesson-complete.tsx` — XP/level/streak results after lesson
- `src/components/dashboard/` — Dashboard stats display
