import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { getOrGenerateLesson } from "@/lib/ai/lesson-generator";
import { checkDailyLimit, incrementDailyUsage } from "@/lib/rate-limit";
import { db } from "@/lib/db";
import { userLessonProgress, topics } from "@/lib/db/tables";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { topicId, topicSlug, subjectSlug, difficulty, variant = 1 } = body;

  if (!difficulty) {
    return NextResponse.json(
      { error: "Missing difficulty" },
      { status: 400 }
    );
  }

  // Resolve topicId from slug if not provided directly
  let resolvedTopicId = topicId;
  if (!resolvedTopicId && topicSlug && subjectSlug) {
    const topic = await db.query.topics.findFirst({
      where: and(eq(topics.slug, topicSlug), eq(topics.subject, subjectSlug)),
    });
    if (!topic) {
      return NextResponse.json(
        { error: "Téma nenalezeno" },
        { status: 404 }
      );
    }
    resolvedTopicId = topic.id;
  }

  if (!resolvedTopicId) {
    return NextResponse.json(
      { error: "Missing topicId or topicSlug" },
      { status: 400 }
    );
  }

  // Check daily limit for free users
  const limit = await checkDailyLimit(session.user.id);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: "daily_limit_reached",
        message: "Dosáhli jste denního limitu bezplatných lekcí",
        used: limit.used,
        limit: limit.limit,
      },
      { status: 429 }
    );
  }

  try {
    // Generate or fetch from cache
    const { lessonCacheId, content } = await getOrGenerateLesson({
      topicId: resolvedTopicId,
      difficulty,
      variant,
    });

    // Create or update user progress
    const existingProgress = await db.query.userLessonProgress.findFirst({
      where: and(
        eq(userLessonProgress.userId, session.user.id),
        eq(userLessonProgress.lessonCacheId, lessonCacheId)
      ),
    });

    let progressId: string;

    if (existingProgress) {
      progressId = existingProgress.id;
      if (existingProgress.status === "not_started") {
        await db
          .update(userLessonProgress)
          .set({
            status: "in_progress",
            startedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
          .where(eq(userLessonProgress.id, existingProgress.id));
      }
    } else {
      const [progress] = await db
        .insert(userLessonProgress)
        .values({
          userId: session.user.id,
          lessonCacheId,
          topicId: resolvedTopicId,
          status: "in_progress",
          startedAt: new Date().toISOString(),
        })
        .returning();
      progressId = progress.id;

      // Increment daily usage for new lessons
      await incrementDailyUsage(session.user.id);
    }

    return NextResponse.json({
      lessonCacheId,
      progressId,
      content,
      dailyUsage: {
        used: limit.used + (existingProgress ? 0 : 1),
        limit: limit.limit,
        remaining: limit.remaining - (existingProgress ? 0 : 1),
      },
    });
  } catch (error) {
    console.error("Lesson generation failed:", error);
    return NextResponse.json(
      { error: "Generování lekce selhalo. Zkuste to prosím znovu." },
      { status: 500 }
    );
  }
}
