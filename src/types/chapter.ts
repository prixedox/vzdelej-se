import type { Lesson } from "./lesson";

/** A single learnable unit within a topic. */
export interface ChapterDefinition {
  /** URL fragment. Must match filename (sans .ts) and `^[a-z0-9-]+$`. */
  slug: string;
  /** Parent topic's slug. Must match parent directory name and exist in the tree. */
  topicSlug: string;
  /** Sort order within a topic. Unique per topic. */
  order: number;
  /** Display title (Czech). */
  title: string;
  /** The lesson content (steps, narrative, summary). */
  lesson: Lesson;
}
