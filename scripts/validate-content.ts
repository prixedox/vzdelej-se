#!/usr/bin/env tsx
/**
 * Validates every chapter file with the Zod schema and cross-checks
 * against the topic tree. Runs in `prebuild`. Fails the build on any
 * violation.
 */
import { chapterSchema } from "@/lib/lessons/schema";
import { chapters } from "@/lib/lessons/data";
import { mathTree } from "@/lib/topics/math-tree";
import { physicsTree } from "@/lib/topics/physics-tree";
import type { TopicNode } from "@/types/topic";

function collectLeafSlugs(topics: readonly TopicNode[]): Set<string> {
  const out = new Set<string>();
  const walk = (node: TopicNode) => {
    if (!node.children || node.children.length === 0) out.add(node.slug);
    else node.children.forEach(walk);
  };
  topics.forEach(walk);
  return out;
}

function main() {
  const errors: string[] = [];
  const mathLeaves = collectLeafSlugs(mathTree.topics);
  const physicsLeaves = collectLeafSlugs(physicsTree.topics);

  // Registry keys are `${topicSlug}/${chapterSlug}` (no subject prefix), so
  // any cross-subject topic-slug collision would silently overwrite entries.
  // Enforce global uniqueness explicitly.
  for (const slug of mathLeaves) {
    if (physicsLeaves.has(slug)) {
      errors.push(
        `[slug-collision] topic slug "${slug}" appears in both math and physics trees — must be globally unique`
      );
    }
  }

  const leafSlugs = new Set([...mathLeaves, ...physicsLeaves]);

  const chaptersByTopic = new Map<string, Map<number, string>>();
  for (const [key, chapter] of Object.entries(chapters)) {
    const parsed = chapterSchema.safeParse(chapter);
    if (!parsed.success) {
      errors.push(
        `[schema] ${key}: ${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`
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

  for (const slug of leafSlugs) {
    if (!chaptersByTopic.has(slug)) {
      errors.push(`[missing-chapter] topic "${slug}" has no chapters registered`);
    }
  }

  if (errors.length) {
    console.error(`\nContent validation failed with ${errors.length} error(s):\n`);
    for (const e of errors) console.error("  " + e);
    process.exit(1);
  }

  console.log(`✓ Content OK: ${Object.keys(chapters).length} chapters across ${chaptersByTopic.size} topics`);
}

main();
