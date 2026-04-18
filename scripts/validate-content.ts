#!/usr/bin/env tsx
/**
 * Validates every chapter file with the Zod schema and cross-checks
 * against the topic trees. Runs in `prebuild`. Fails the build on any
 * violation.
 */
import { chapterSchema } from "@/lib/lessons/schema";
import { chapters } from "@/lib/lessons/data";
import { subjectTrees } from "@/lib/topics";
import type { TopicNode, TopicTreeData } from "@/types/topic";

function collectLeaves(topics: readonly TopicNode[]): TopicNode[] {
  const out: TopicNode[] = [];
  const walk = (node: TopicNode) => {
    if (!node.children || node.children.length === 0) out.push(node);
    else node.children.forEach(walk);
  };
  topics.forEach(walk);
  return out;
}

function main() {
  const errors: string[] = [];

  // Global slug uniqueness: registry keys are `${topicSlug}/${chapterSlug}`
  // with no subject prefix, so cross-subject collisions would silently
  // overwrite entries. Detect and reject.
  const slugToSubjects = new Map<string, string[]>();
  const leavesBySubject = new Map<string, TopicNode[]>();
  for (const [subjectSlug, tree] of Object.entries(subjectTrees) as Array<
    [string, TopicTreeData]
  >) {
    const leaves = collectLeaves(tree.topics);
    leavesBySubject.set(subjectSlug, leaves);
    for (const leaf of leaves) {
      const subjects = slugToSubjects.get(leaf.slug) ?? [];
      subjects.push(subjectSlug);
      slugToSubjects.set(leaf.slug, subjects);
    }
  }
  for (const [slug, subjects] of slugToSubjects) {
    if (subjects.length > 1) {
      errors.push(
        `[slug-collision] topic slug "${slug}" appears in multiple subjects: ${subjects.join(", ")} — must be globally unique`
      );
    }
  }

  const leafSlugs = new Set(slugToSubjects.keys());
  const comingSoonSlugs = new Set<string>();
  for (const leaves of leavesBySubject.values()) {
    for (const leaf of leaves) {
      if (leaf.comingSoon) comingSoonSlugs.add(leaf.slug);
    }
  }

  const chaptersByTopic = new Map<string, Map<number, string>>();
  for (const [key, chapter] of Object.entries(chapters)) {
    const parsed = chapterSchema.safeParse(chapter);
    if (!parsed.success) {
      errors.push(
        `[schema] ${key}: ${parsed.error.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; ")}`
      );
      continue;
    }
    const expectedKey = `${chapter.topicSlug}/${chapter.slug}`;
    if (key !== expectedKey) {
      errors.push(`[key-mismatch] registry key ${key} does not match chapter ${expectedKey}`);
    }
    if (!leafSlugs.has(chapter.topicSlug)) {
      errors.push(`[unknown-topic] ${key}: topicSlug "${chapter.topicSlug}" is not in any tree`);
    }
    const byOrder = chaptersByTopic.get(chapter.topicSlug) ?? new Map<number, string>();
    const existing = byOrder.get(chapter.order);
    if (existing) {
      errors.push(
        `[duplicate-order] topic "${chapter.topicSlug}" has two chapters with order=${chapter.order}: ${existing}, ${chapter.slug}`
      );
    } else {
      byOrder.set(chapter.order, chapter.slug);
    }
    chaptersByTopic.set(chapter.topicSlug, byOrder);
  }

  // Every non-comingSoon leaf topic must have at least one chapter
  for (const slug of leafSlugs) {
    if (comingSoonSlugs.has(slug)) continue;
    if (!chaptersByTopic.has(slug)) {
      errors.push(`[missing-chapter] topic "${slug}" has no chapters registered`);
    }
  }

  if (errors.length) {
    console.error(`\nContent validation failed with ${errors.length} error(s):\n`);
    for (const e of errors) console.error("  " + e);
    process.exit(1);
  }

  const totalTopics = leafSlugs.size;
  const shippedTopics = totalTopics - comingSoonSlugs.size;
  const pendingSuffix = comingSoonSlugs.size > 0 ? ` (+${comingSoonSlugs.size} připravujeme)` : "";
  console.log(
    `✓ Content OK: ${Object.keys(chapters).length} chapters across ${shippedTopics} topics${pendingSuffix}`
  );
}

main();
