import type { Lesson } from "./lesson";
import type { StageLesson } from "./stage";

interface ChapterBase {
  /** URL fragment. Must match filename (sans .ts) and `^[a-z0-9-]+$`. */
  slug: string;
  /** Parent topic's slug. Must match parent directory name and exist in the tree. */
  topicSlug: string;
  /** Sort order within a topic. Unique per topic. */
  order: number;
  /** Display title (Czech). */
  title: string;
}

/** The original format. `format` is optional so existing files need no edits. */
export interface DeckChapter extends ChapterBase {
  format?: "deck";
  lesson: Lesson;
}

/** Derive-then-name format: persistent stage + beats + required naming. */
export interface StageChapter extends ChapterBase {
  format: "stage";
  lesson: StageLesson;
}

export type ChapterDefinition = DeckChapter | StageChapter;
