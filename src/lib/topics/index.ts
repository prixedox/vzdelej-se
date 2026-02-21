import { mathTree } from "./math-tree";
import { physicsTree } from "./physics-tree";
import type { TopicTreeData, TopicNode } from "@/types/topic";

export const subjectTrees: Record<string, TopicTreeData> = {
  math: mathTree,
  physics: physicsTree,
};

export const subjects = [
  {
    slug: "math",
    name: "Matematika",
    description: "Algebra, funkce, geometrie, kombinatorika a analýza",
    icon: "📐",
    color: "from-blue-500 to-indigo-600",
    leafCount: 21,
  },
  {
    slug: "physics",
    name: "Fyzika",
    description: "Mechanika, termodynamika, elektřina, vlnění a moderní fyzika",
    icon: "⚛️",
    color: "from-purple-500 to-pink-600",
    leafCount: 14,
  },
];

export function getLeafTopics(tree: TopicTreeData): TopicNode[] {
  const leaves: TopicNode[] = [];

  function traverse(nodes: TopicNode[]) {
    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      } else {
        leaves.push(node);
      }
    }
  }

  traverse(tree.topics);
  return leaves;
}

export function findTopic(
  tree: TopicTreeData,
  slug: string
): TopicNode | null {
  function search(nodes: TopicNode[]): TopicNode | null {
    for (const node of nodes) {
      if (node.slug === slug) return node;
      if (node.children) {
        const found = search(node.children);
        if (found) return found;
      }
    }
    return null;
  }

  return search(tree.topics);
}
