import { describe, it, expect } from "vitest";
import { chapters, getChaptersForTopic } from "./data";
import { mathTree } from "@/lib/topics/math-tree";
import { physicsTree } from "@/lib/topics/physics-tree";
import type { TopicNode } from "@/types/topic";

function leafSlugs(topics: readonly TopicNode[]): string[] {
  const out: string[] = [];
  const walk = (n: TopicNode) => (n.children?.length ? n.children.forEach(walk) : out.push(n.slug));
  topics.forEach(walk);
  return out;
}

const allLeaves = [
  ...leafSlugs(mathTree.topics),
  ...leafSlugs(physicsTree.topics),
];

describe("chapter registry", () => {
  it("has at least one chapter for every leaf topic", () => {
    for (const slug of allLeaves) {
      const list = getChaptersForTopic(slug);
      expect(list.length, `topic ${slug}`).toBeGreaterThan(0);
    }
  });

  it("every chapter's topicSlug is a real topic", () => {
    const leafSet = new Set(allLeaves);
    for (const [key, ch] of Object.entries(chapters)) {
      expect(leafSet.has(ch.topicSlug), `${key} has unknown topicSlug "${ch.topicSlug}"`).toBe(true);
    }
  });

  it("order is unique within each topic", () => {
    const byTopic = new Map<string, Set<number>>();
    for (const ch of Object.values(chapters)) {
      const set = byTopic.get(ch.topicSlug) ?? new Set<number>();
      expect(set.has(ch.order), `topic ${ch.topicSlug} has duplicate order ${ch.order}`).toBe(false);
      set.add(ch.order);
      byTopic.set(ch.topicSlug, set);
    }
  });

  it("getChaptersForTopic returns sorted by order", () => {
    for (const slug of allLeaves) {
      const list = getChaptersForTopic(slug);
      for (let i = 1; i < list.length; i++) {
        expect(list[i].order).toBeGreaterThan(list[i - 1].order);
      }
    }
  });
});
