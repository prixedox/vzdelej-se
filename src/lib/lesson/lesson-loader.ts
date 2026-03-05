import { db } from "@/lib/db";
import { lessonCache } from "@/lib/db/tables";
import { eq, and } from "drizzle-orm";
import type { LessonContent } from "@/types/lesson";

export async function getLesson(params: {
  topicId: string;
  difficulty: string;
  variant?: number;
}): Promise<{ lessonCacheId: string; content: LessonContent }> {
  const { topicId, difficulty, variant = 1 } = params;

  const cached = await db.query.lessonCache.findFirst({
    where: and(
      eq(lessonCache.topicId, topicId),
      eq(lessonCache.difficulty, difficulty),
      eq(lessonCache.variant, variant)
    ),
  });

  if (!cached) {
    throw new Error(
      `Lesson not found for topic ${topicId}, difficulty ${difficulty}, variant ${variant}`
    );
  }

  return {
    lessonCacheId: cached.id,
    content: cached.content as LessonContent,
  };
}
