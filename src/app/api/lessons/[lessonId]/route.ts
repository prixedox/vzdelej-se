import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { lessonCache, userLessonProgress } from "@/lib/db/tables";
import { eq, and } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId } = await params;

  const lesson = await db.query.lessonCache.findFirst({
    where: eq(lessonCache.id, lessonId),
    with: {
      topic: true,
    },
  });

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  // Get user progress
  const progress = await db.query.userLessonProgress.findFirst({
    where: and(
      eq(userLessonProgress.userId, session.user.id),
      eq(userLessonProgress.lessonCacheId, lessonId)
    ),
  });

  return NextResponse.json({
    lesson,
    progress,
  });
}
