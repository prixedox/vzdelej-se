import { describe, it, expect } from "vitest";
import { chapters, getChaptersForTopic } from "./data";
import { mathTree } from "@/lib/topics/math-tree";
import { physicsTree } from "@/lib/topics/physics-tree";
import type { TopicNode } from "@/types/topic";

function leaves(topics: readonly TopicNode[]): TopicNode[] {
  const out: TopicNode[] = [];
  const walk = (n: TopicNode) => (n.children?.length ? n.children.forEach(walk) : out.push(n));
  topics.forEach(walk);
  return out;
}

const allLeaves = [
  ...leaves(mathTree.topics as unknown as readonly TopicNode[]),
  ...leaves(physicsTree.topics as unknown as readonly TopicNode[]),
];
const shippedLeaves = allLeaves.filter((l) => !l.comingSoon);
const allLeafSlugs = allLeaves.map((l) => l.slug);

describe("chapter registry", () => {
  it("has at least one chapter for every non-comingSoon leaf topic", () => {
    for (const leaf of shippedLeaves) {
      const list = getChaptersForTopic(leaf.slug);
      expect(list.length, `topic ${leaf.slug}`).toBeGreaterThan(0);
    }
  });

  it("every chapter's topicSlug is a real topic", () => {
    const leafSet = new Set(allLeafSlugs);
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
    for (const slug of allLeafSlugs) {
      const list = getChaptersForTopic(slug);
      for (let i = 1; i < list.length; i++) {
        expect(list[i].order).toBeGreaterThan(list[i - 1].order);
      }
    }
  });
});
