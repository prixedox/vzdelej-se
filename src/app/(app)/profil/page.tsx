import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users, userLessonProgress } from "@/lib/db/tables";
import { eq, count } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { xpProgressInLevel } from "@/lib/utils/xp";
import { Progress } from "@/components/ui/progress";
import { User, Mail, Calendar, Star, Trophy, BookOpen } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/prihlaseni");

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!user) redirect("/prihlaseni");

  // Count completed lessons
  const [lessonStats] = await db
    .select({ count: count() })
    .from(userLessonProgress)
    .where(eq(userLessonProgress.userId, session.user.id));

  const xpProgress = xpProgressInLevel(user.xp);

  const statusLabels: Record<string, string> = {
    free: "Zdarma",
    active: "Premium",
    trialing: "Zkušební období",
    canceled: "Zrušeno",
    past_due: "Nezaplaceno",
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Profil</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Osobní údaje</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Jméno</p>
              <p className="font-medium">{user.name || "Nenastaveno"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Registrace</p>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString("cs-CZ")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Předplatné</p>
              <Badge variant={user.subscriptionStatus === "active" ? "default" : "secondary"}>
                {statusLabels[user.subscriptionStatus ?? "free"] || "Zdarma"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Statistiky</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Level */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">
                Úroveň {user.level}
              </span>
              <span className="text-sm text-muted-foreground">
                {xpProgress.current} / {xpProgress.required} XP
              </span>
            </div>
            <Progress value={xpProgress.percentage} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{user.xp}</p>
                <p className="text-sm text-muted-foreground">Celkem XP</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{lessonStats?.count || 0}</p>
                <p className="text-sm text-muted-foreground">Lekcí</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{user.streak}</p>
                <p className="text-sm text-muted-foreground">Aktuální série</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{user.longestStreak}</p>
                <p className="text-sm text-muted-foreground">Nejdelší série</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
