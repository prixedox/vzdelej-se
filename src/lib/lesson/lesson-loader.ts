import { getLesson as getLessonData } from "@/lib/lessons/data";
import type { LessonContent } from "@/types/lesson";
import type { LessonV2 } from "@/types/lesson-v2";

export function getLesson(
  topicSlug: string
): LessonContent | LessonV2 {
  const content = getLessonData(topicSlug);

  if (!content) {
    throw new Error(
      `Lesson not found: ${topicSlug}`
    );
  }

  return content;
}
