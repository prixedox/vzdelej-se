import {
  XP_BASE_LESSON,
  XP_PER_CORRECT,
  XP_PERFECT_BONUS,
  XP_NO_HINTS_BONUS,
  STREAK_MULTIPLIER_THRESHOLD,
  STREAK_MULTIPLIER,
} from "./constants";

export function calculateXP(params: {
  correctAnswers: number;
  totalProblems: number;
  hintsUsed: number;
  streak: number;
}): number {
  const { correctAnswers, totalProblems, hintsUsed, streak } = params;

  let xp = XP_BASE_LESSON;
  xp += correctAnswers * XP_PER_CORRECT;

  if (correctAnswers === totalProblems) {
    xp += XP_PERFECT_BONUS;
  }

  if (hintsUsed === 0) {
    xp += XP_NO_HINTS_BONUS;
  }

  // Streak multiplier
  if (streak >= STREAK_MULTIPLIER_THRESHOLD) {
    xp = Math.round(xp * STREAK_MULTIPLIER);
  }

  return xp;
}

export function getLevelFromXP(totalXP: number): number {
  // Level N requires (N-1)² × 100 total XP
  let level = 1;
  while (xpForLevel(level + 1) <= totalXP) {
    level++;
  }
  return level;
}

export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return (level - 1) * (level - 1) * 100;
}

export function xpProgressInLevel(totalXP: number): {
  current: number;
  required: number;
  percentage: number;
} {
  const level = getLevelFromXP(totalXP);
  const currentLevelXP = xpForLevel(level);
  const nextLevelXP = xpForLevel(level + 1);
  const required = nextLevelXP - currentLevelXP;
  const current = totalXP - currentLevelXP;

  return {
    current,
    required,
    percentage: required > 0 ? Math.min((current / required) * 100, 100) : 100,
  };
}

export function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

export function isConsecutiveDay(
  lastActiveDate: string | null,
  today: string
): boolean {
  if (!lastActiveDate) return false;

  const last = new Date(lastActiveDate);
  const now = new Date(today);
  const diffMs = now.getTime() - last.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  return diffDays === 1;
}

export function isSameDay(
  lastActiveDate: string | null,
  today: string
): boolean {
  return lastActiveDate === today;
}
