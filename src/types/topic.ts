export interface TopicNode {
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  aiContext?: string;
  children?: readonly TopicNode[];
}

export interface TopicTreeData {
  subject: string;
  subjectName: string;
  icon: string;
  topics: readonly TopicNode[];
}

export type Subject = "math" | "physics";
