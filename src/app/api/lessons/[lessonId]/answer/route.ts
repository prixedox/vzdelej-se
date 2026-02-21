import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import {
  userLessonProgress,
  userAnswers,
  users,
  dailyActivity,
} from "@/lib/db/tables";
import { eq, and } from "drizzle-orm";
import { calculateXP, getLevelFromXP, getTodayDateString, isConsecutiveDay, isSameDay } from "@/lib/utils/xp";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId } = await params;
  const body = await req.json();
  const {
    progressId,
    problemIndex,
    userAnswer,
    isCorrect,
    hintsUsed: hintsUsedForProblem,
    timeSpentMs,
    isLastProblem,
    totalProblems,
    correctAnswers: totalCorrectAnswers,
    totalHintsUsed,
  } = body;

  // Save individual answer
  await db.insert(userAnswers).values({
    userId: session.user.id,
    lessonProgressId: progressId,
    problemIndex,
    userAnswer,
    isCorrect,
    hintsUsedForProblem: hintsUsedForProblem || 0,
    timeSpentMs,
  });

  // Update progress
  const progress = await db.query.userLessonProgress.findFirst({
    where: eq(userLessonProgress.id, progressId),
  });

  if (progress) {
    await db
      .update(userLessonProgress)
      .set({
        correctAnswers: (progress.correctAnswers || 0) + (isCorrect ? 1 : 0),
        hintsUsed: (progress.hintsUsed || 0) + (hintsUsedForProblem || 0),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(userLessonProgress.id, progressId));
  }

  // If last problem, complete the lesson and award XP
  if (isLastProblem) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, session.user.id),
    });

    if (user) {
      const xpEarned = calculateXP({
        correctAnswers: totalCorrectAnswers,
        totalProblems,
        hintsUsed: totalHintsUsed,
        streak: user.streak,
      });

      const newXP = (user.xp || 0) + xpEarned;
      const newLevel = getLevelFromXP(newXP);
      const today = getTodayDateString();

      // Update streak
      let newStreak = user.streak;
      if (!isSameDay(user.lastActiveDate, today)) {
        if (isConsecutiveDay(user.lastActiveDate, today)) {
          newStreak = (user.streak || 0) + 1;
        } else {
          newStreak = 1;
        }
      }

      const longestStreak = Math.max(newStreak, user.longestStreak || 0);

      // Update user
      await db
        .update(users)
        .set({
          xp: newXP,
          level: newLevel,
          streak: newStreak,
          longestStreak,
          lastActiveDate: today,
        })
        .where(eq(users.id, session.user.id));

      // Update lesson progress
      const score = totalProblems > 0 ? totalCorrectAnswers / totalProblems : 0;
      await db
        .update(userLessonProgress)
        .set({
          status: "completed",
          score,
          xpEarned,
          totalProblems,
          correctAnswers: totalCorrectAnswers,
          hintsUsed: totalHintsUsed,
          completedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .where(eq(userLessonProgress.id, progressId));

      // Update daily activity
      const existingActivity = await db.query.dailyActivity.findFirst({
        where: and(
          eq(dailyActivity.userId, session.user.id),
          eq(dailyActivity.date, today)
        ),
      });

      if (existingActivity) {
        await db
          .update(dailyActivity)
          .set({
            lessonsCompleted: existingActivity.lessonsCompleted + 1,
            xpEarned: existingActivity.xpEarned + xpEarned,
            problemsSolved: existingActivity.problemsSolved + totalProblems,
            correctAnswers: existingActivity.correctAnswers + totalCorrectAnswers,
          })
          .where(eq(dailyActivity.id, existingActivity.id));
      } else {
        await db.insert(dailyActivity).values({
          userId: session.user.id,
          date: today,
          lessonsCompleted: 1,
          xpEarned,
          problemsSolved: totalProblems,
          correctAnswers: totalCorrectAnswers,
        });
      }

      return NextResponse.json({
        completed: true,
        xpEarned,
        totalXP: newXP,
        level: newLevel,
        streak: newStreak,
        score,
        isPerfect: totalCorrectAnswers === totalProblems,
      });
    }
  }

  return NextResponse.json({ saved: true });
}
