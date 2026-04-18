import { mathTree } from "./math-tree";
import { physicsTree } from "./physics-tree";
import { chemistryTree } from "./chemistry-tree";
import { biologyTree } from "./biology-tree";
import { informaticsTree } from "./informatics-tree";
import { historyTree } from "./history-tree";
import { geographyTree } from "./geography-tree";
import type { TopicTreeData, TopicNode } from "@/types/topic";

export const subjectTrees: Record<string, TopicTreeData> = {
  math: mathTree,
  physics: physicsTree,
  chemistry: chemistryTree,
  biology: biologyTree,
  informatics: informaticsTree,
  history: historyTree,
  geography: geographyTree,
};

export const subjects = [
  {
    slug: "math",
    name: "Matematika",
    description: "Algebra, funkce, geometrie, kombinatorika a analýza",
    icon: "📐",
    color: "from-blue-500 to-indigo-600",
    leafCount: 26,
  },
  {
    slug: "physics",
    name: "Fyzika",
    description: "Mechanika, termodynamika, elektřina, vlnění a moderní fyzika",
    icon: "⚛️",
    color: "from-purple-500 to-pink-600",
    leafCount: 19,
  },
  {
    slug: "chemistry",
    name: "Chemie",
    description: "Obecná, anorganická, organická chemie a biochemie",
    icon: "🧪",
    color: "from-emerald-500 to-teal-600",
    leafCount: 28,
  },
  {
    slug: "biology",
    name: "Biologie",
    description: "Buňka, rostliny, živočichové, člověk, genetika, ekologie",
    icon: "🌿",
    color: "from-green-500 to-lime-600",
    leafCount: 28,
  },
  {
    slug: "informatics",
    name: "Informatika",
    description: "Algoritmy, programování, databáze, bezpečnost, AI",
    icon: "💻",
    color: "from-amber-500 to-orange-600",
    leafCount: 29,
  },
  {
    slug: "history",
    name: "Dějepis",
    description: "Pravěk, starověk, středověk, novověk, 20. století",
    icon: "📜",
    color: "from-stone-500 to-amber-700",
    leafCount: 22,
  },
  {
    slug: "geography",
    name: "Zeměpis",
    description: "Fyzická a socioekonomická geografie, regiony, mapy",
    icon: "🌍",
    color: "from-sky-500 to-cyan-600",
    leafCount: 20,
  },
];

export function getLeafTopics(tree: TopicTreeData): TopicNode[] {
  const leaves: TopicNode[] = [];

  function traverse(nodes: readonly TopicNode[]) {
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
  function search(nodes: readonly TopicNode[]): TopicNode | null {
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

export type { MathTopicSlug } from "./math-tree";
export type { PhysicsTopicSlug } from "./physics-tree";
export type { ChemistryTopicSlug } from "./chemistry-tree";
export type { BiologyTopicSlug } from "./biology-tree";
export type { InformaticsTopicSlug } from "./informatics-tree";
export type { HistoryTopicSlug } from "./history-tree";
export type { GeographyTopicSlug } from "./geography-tree";
import type { MathTopicSlug } from "./math-tree";
import type { PhysicsTopicSlug } from "./physics-tree";
import type { ChemistryTopicSlug } from "./chemistry-tree";
import type { BiologyTopicSlug } from "./biology-tree";
import type { InformaticsTopicSlug } from "./informatics-tree";
import type { HistoryTopicSlug } from "./history-tree";
import type { GeographyTopicSlug } from "./geography-tree";
export type TopicSlug =
  | MathTopicSlug
  | PhysicsTopicSlug
  | ChemistryTopicSlug
  | BiologyTopicSlug
  | InformaticsTopicSlug
  | HistoryTopicSlug
  | GeographyTopicSlug;
