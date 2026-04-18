import type { ChapterDefinition } from "@/types/chapter";
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
