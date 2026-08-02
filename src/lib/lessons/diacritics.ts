import type { ChapterDefinition } from "@/types/chapter";

/**
 * Object keys whose string values are prose a student reads. Keys not listed
 * here (slug, type, expectedAnswer, ...) are excluded from the count.
 */
export const PROSE_KEYS = new Set([
  "title",
  "narrative",
  "body",
  "question",
  "prompt",
  "scenario",
  "reveal",
  "explanation",
  "feedback",
  "label",
  "callout",
  "misconception",
  "revealedContent",
  "followUpQuestion",
  "caption",
  "keyTakeaways",
  "items",
  "hints",
  "nudge",
  "onReached",
  "observation",
  "mapping",
]);

/**
 * Chapters written without Czech diacritics before the rule existed.
 * These read as broken to a Czech student and must be repaired; delete each
 * entry as it is fixed. Do NOT add to this list — new content must pass.
 */
export const DIACRITIC_EXEMPT = new Set([
  "limits/intro",
  "probability/intro",
  "triangles/intro",
  "derivatives/intro",
  "trigonometric-functions/intro",
]);

export const MIN_DIACRITIC_RATIO = 0.04;
/** Below this much prose the ratio is too noisy to judge. */
export const MIN_LETTERS = 200;

const DIACRITICS = /[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/g;
const LETTERS = /[\p{L}]/gu;

/** Walk a chapter and collect every string sitting under a prose key. */
export function collectProse(value: unknown): string[] {
  const out: string[] = [];
  const walk = (node: unknown, underProseKey: boolean) => {
    if (typeof node === "string") {
      if (underProseKey) out.push(node);
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((child) => walk(child, underProseKey));
      return;
    }
    if (node && typeof node === "object") {
      for (const [key, child] of Object.entries(node as Record<string, unknown>)) {
        walk(child, PROSE_KEYS.has(key));
      }
    }
  };
  walk(value, false);
  return out;
}

function stripLatex(s: string): string {
  return s.replace(/\$\$[\s\S]*?\$\$/g, " ").replace(/\$[^$]*\$/g, " ");
}

export function diacriticRatio(text: string): { letters: number; ratio: number } {
  const plain = stripLatex(text);
  const letters = (plain.match(LETTERS) ?? []).length;
  const marked = (plain.match(DIACRITICS) ?? []).length;
  return { letters, ratio: letters === 0 ? 0 : marked / letters };
}

export function checkDiacritics(key: string, chapter: ChapterDefinition): string[] {
  if (DIACRITIC_EXEMPT.has(key)) return [];
  const { letters, ratio } = diacriticRatio(collectProse(chapter).join(" "));
  if (letters < MIN_LETTERS) return [];
  if (ratio >= MIN_DIACRITIC_RATIO) return [];
  return [
    `[diacritics] ${key}: only ${(ratio * 100).toFixed(1)} % of letters carry Czech diacritics ` +
      `(minimum ${(MIN_DIACRITIC_RATIO * 100).toFixed(0)} %) — the text is missing háčky and čárky`,
  ];
}
