export interface TopicNode {
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  aiContext?: string;
  /** Marks a topic as "content being prepared" — no chapters required; UI renders a placeholder. */
  comingSoon?: boolean;
  children?: readonly TopicNode[];
}

export interface TopicTreeData {
  subject: string;
  subjectName: string;
  icon: string;
  topics: readonly TopicNode[];
}

export type Subject = "math" | "physics";
