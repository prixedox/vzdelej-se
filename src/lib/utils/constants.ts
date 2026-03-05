// Free tier limits
export const FREE_DAILY_LESSONS = 3;

// Subscription prices
export const MONTHLY_PRICE_CZK = 199;
export const YEARLY_PRICE_CZK = 1490;
export const YEARLY_SAVINGS_PERCENT = 38;

// Gamification
export const XP_BASE_LESSON = 50;
export const XP_PER_CORRECT = 10;
export const XP_PERFECT_BONUS = 25;
export const XP_NO_HINTS_BONUS = 15;
export const STREAK_MULTIPLIER_THRESHOLD = 7; // 7+ day streak = 1.5x
export const STREAK_MULTIPLIER = 1.5;

// Seed script only (scripts/seed-lessons.ts)
export const LESSON_MODEL = "claude-sonnet-4-5-20250929";
export const PROMPT_VERSION = "1.0";

// Difficulties
export const DIFFICULTIES = [
  { value: "beginner" as const, label: "Začátečník", color: "bg-green-100 text-green-800" },
  { value: "intermediate" as const, label: "Středně pokročilý", color: "bg-yellow-100 text-yellow-800" },
  { value: "advanced" as const, label: "Pokročilý", color: "bg-red-100 text-red-800" },
];
