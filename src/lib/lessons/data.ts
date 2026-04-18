import type { ChapterDefinition } from "@/types/chapter";
import type { LessonV2 } from "@/types/lesson-v2";
import { chapters } from "./data.generated";

export { chapters };

export function getChapter(topicSlug: string, chapterSlug: string): ChapterDefinition | null {
  return chapters[`${topicSlug}/${chapterSlug}`] ?? null;
}

export function hasChapter(topicSlug: string, chapterSlug: string): boolean {
  return `${topicSlug}/${chapterSlug}` in chapters;
}

export function getChaptersForTopic(topicSlug: string): ChapterDefinition[] {
  return Object.values(chapters)
    .filter((c) => c.topicSlug === topicSlug)
    .sort((a, b) => a.order - b.order);
}

/**
 * Back-compat shims: for existing single-chapter callers during the
 * commit-2 → commit-3 transition. Removed in commit 3 when routes are
 * updated to use chapter slugs.
 */
export function getLesson(topicSlug: string): LessonV2 | null {
  const ch = getChapter(topicSlug, "intro");
  return ch?.lesson ?? null;
}

export function hasLesson(topicSlug: string): boolean {
  return hasChapter(topicSlug, "intro");
}
