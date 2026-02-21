import { db } from "@/lib/db";
import { users } from "@/lib/db/tables";
import { eq } from "drizzle-orm";
import { FREE_DAILY_LESSONS } from "@/lib/utils/constants";
import { getTodayDateString } from "@/lib/utils/xp";

export async function checkDailyLimit(userId: string): Promise<{
  allowed: boolean;
  used: number;
  limit: number;
  remaining: number;
}> {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    return { allowed: false, used: 0, limit: FREE_DAILY_LESSONS, remaining: 0 };
  }

  // Premium users and admins have unlimited access
  if (
    user.role === "admin" ||
    user.subscriptionStatus === "active" ||
    user.subscriptionStatus === "trialing"
  ) {
    return { allowed: true, used: 0, limit: Infinity, remaining: Infinity };
  }

  const today = getTodayDateString();

  // Reset counter if it's a new day
  if (user.dailyLessonsResetDate !== today) {
    await db
      .update(users)
      .set({
        dailyLessonsUsed: 0,
        dailyLessonsResetDate: today,
      })
      .where(eq(users.id, userId));

    return {
      allowed: true,
      used: 0,
      limit: FREE_DAILY_LESSONS,
      remaining: FREE_DAILY_LESSONS,
    };
  }

  const used = user.dailyLessonsUsed;
  const remaining = Math.max(0, FREE_DAILY_LESSONS - used);

  return {
    allowed: used < FREE_DAILY_LESSONS,
    used,
    limit: FREE_DAILY_LESSONS,
    remaining,
  };
}

export async function incrementDailyUsage(userId: string): Promise<void> {
  const today = getTodayDateString();

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) return;

  // Premium users and admins don't need tracking
  if (
    user.role === "admin" ||
    user.subscriptionStatus === "active" ||
    user.subscriptionStatus === "trialing"
  ) {
    return;
  }

  if (user.dailyLessonsResetDate !== today) {
    await db
      .update(users)
      .set({
        dailyLessonsUsed: 1,
        dailyLessonsResetDate: today,
      })
      .where(eq(users.id, userId));
  } else {
    await db
      .update(users)
      .set({
        dailyLessonsUsed: (user.dailyLessonsUsed || 0) + 1,
      })
      .where(eq(users.id, userId));
  }
}
