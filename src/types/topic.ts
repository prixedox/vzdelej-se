export interface TopicNode {
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  aiContext?: string;
  children?: TopicNode[];
}

export interface TopicTreeData {
  subject: string;
  subjectName: string;
  icon: string;
  topics: TopicNode[];
}

export type Subject = "math" | "physics";
