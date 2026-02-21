import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users, userLessonProgress, dailyActivity } from "@/lib/db/tables";
import { eq, and, desc } from "drizzle-orm";
import { DailySummary } from "@/components/dashboard/daily-summary";
import { ContinueLearning } from "@/components/dashboard/continue-learning";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { xpProgressInLevel } from "@/lib/utils/xp";
import { getTodayDateString } from "@/lib/utils/xp";
import { isSubscriptionActive } from "@/lib/stripe/helpers";
import { Star, Trophy, Flame } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/prihlaseni");

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!user) redirect("/prihlaseni");

  const today = getTodayDateString();

  // Get today's activity
  const todayActivity = await db.query.dailyActivity.findFirst({
    where: and(
      eq(dailyActivity.userId, session.user.id),
      eq(dailyActivity.date, today)
    ),
  });

  // Get recent lessons
  const recentProgress = await db.query.userLessonProgress.findMany({
    where: eq(userLessonProgress.userId, session.user.id),
    orderBy: [desc(userLessonProgress.updatedAt)],
    limit: 5,
    with: {
      lesson: {
        with: {
          topic: true,
        },
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recentLessons = recentProgress.map((p: any) => ({
    id: p.id,
    topicName: p.lesson?.topic?.name || "Neznámé téma",
    difficulty: p.lesson?.difficulty || "",
    score: p.score,
    status: p.status,
  }));

  const isPremium = isSubscriptionActive({
    subscriptionStatus: user.subscriptionStatus,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
  });

  const xpProgress = xpProgressInLevel(user.xp);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Ahoj, {user.name || "studente"}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Zde je tvůj dnešní přehled
        </p>
      </div>

      {/* Level progress */}
      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xl font-bold">
              {user.level}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">Úroveň {user.level}</span>
                <span className="text-sm text-muted-foreground">
                  {xpProgress.current} / {xpProgress.required} XP
                </span>
              </div>
              <Progress value={xpProgress.percentage} className="h-3" />
              <p className="text-xs text-muted-foreground mt-1">
                Celkem {user.xp} XP
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily stats */}
      <DailySummary
        lessonsToday={todayActivity?.lessonsCompleted || 0}
        xpToday={todayActivity?.xpEarned || 0}
        streak={user.streak}
        isPremium={isPremium}
        dailyLessonsUsed={user.dailyLessonsUsed}
      />

      {/* Recent lessons */}
      <ContinueLearning recentLessons={recentLessons} />

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-5 text-center">
            <Trophy className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{user.longestStreak}</p>
            <p className="text-sm text-muted-foreground">Nejdelší série</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{user.xp}</p>
            <p className="text-sm text-muted-foreground">Celkem XP</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 text-center">
            <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{user.streak}</p>
            <p className="text-sm text-muted-foreground">Aktuální série</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
