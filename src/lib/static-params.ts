import { subjectTrees, getLeafTopics, findTopic } from "@/lib/topics";
import { chapters } from "@/lib/lessons/data";

/*
 * Route enumeration for `output: "export"` — every dynamic segment must be
 * known at build time. The content is all static TypeScript, so the full
 * route list falls out of the topic trees and the chapter registry.
 */

export function allSubjectParams() {
  return Object.keys(subjectTrees).map((subjectSlug) => ({ subjectSlug }));
}

export function allTopicParams() {
  return Object.entries(subjectTrees).flatMap(([subjectSlug, tree]) =>
    getLeafTopics(tree).map((topic) => ({ subjectSlug, topicSlug: topic.slug }))
  );
}

export function allChapterParams() {
  const params: { subjectSlug: string; topicSlug: string; chapterSlug: string }[] = [];
  for (const chapter of Object.values(chapters)) {
    for (const [subjectSlug, tree] of Object.entries(subjectTrees)) {
      if (findTopic(tree, chapter.topicSlug)) {
        params.push({
          subjectSlug,
          topicSlug: chapter.topicSlug,
          chapterSlug: chapter.slug,
        });
        break;
      }
    }
  }
  return params;
}
