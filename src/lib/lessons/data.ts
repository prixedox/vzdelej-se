import type { ChapterDefinition } from "@/types/chapter";
import type { TopicNode } from "@/types/topic";
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

export interface SubjectProgress {
  totalTopics: number;
  topicsWithContent: number;
  comingSoonTopics: number;
  percentComplete: number;
}

/**
 * Compute shipping progress for a subject's topic tree.
 * A topic counts as "with content" if it has ≥1 registered chapter.
 */
export function getSubjectProgress(topics: readonly TopicNode[]): SubjectProgress {
  const leaves: TopicNode[] = [];
  const walk = (n: TopicNode) => (n.children?.length ? n.children.forEach(walk) : leaves.push(n));
  topics.forEach(walk);

  const totalTopics = leaves.length;
  const topicsWithContent = leaves.filter((l) =>
    Object.values(chapters).some((c) => c.topicSlug === l.slug)
  ).length;
  const comingSoonTopics = leaves.filter((l) => l.comingSoon).length;
  const percentComplete = totalTopics > 0 ? Math.round((topicsWithContent / totalTopics) * 100) : 0;

  return { totalTopics, topicsWithContent, comingSoonTopics, percentComplete };
}
