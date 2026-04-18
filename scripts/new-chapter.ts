#!/usr/bin/env tsx
/**
 * Scaffolder: pnpm new-chapter <subject>/<topic>/<chapter> [title]
 *
 * Creates a new chapter file from a template, computes the next `order`
 * within the topic. Run `pnpm build:registry` afterwards (or it runs
 * automatically on next `pnpm dev`/`pnpm build`).
 */
import { readdir, readFile, stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const SLUG_RE = /^[a-z0-9-]+$/;

export interface CreateChapterParams {
  root: string;
  subject: string;
  topicSlug: string;
  chapterSlug: string;
  title: string;
  knownTopics: ReadonlySet<string>;
}

async function nextOrder(topicDir: string): Promise<number> {
  let maxOrder = 0;
  try {
    const files = await readdir(topicDir);
    for (const f of files) {
      if (!f.endsWith(".ts") || f.endsWith(".test.ts")) continue;
      const src = await readFile(path.join(topicDir, f), "utf8");
      const m = src.match(/order:\s*(\d+)/);
      if (m) maxOrder = Math.max(maxOrder, Number(m[1]));
    }
  } catch {
    // topic dir doesn't exist yet — this is the first chapter
  }
  return maxOrder + 1;
}

function template(topicSlug: string, chapterSlug: string, order: number, title: string): string {
  return `import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  narrative: "TODO: 2–3 sentence story/framing (Czech)",
  steps: [
    {
      type: "explain",
      body: "TODO: 2–3 sentence explanation (Czech, $...$ for inline LaTeX)",
    },
  ],
  summary: {
    keyTakeaways: ["TODO: first takeaway"],
  },
};

export const chapter: ChapterDefinition = {
  slug: "${chapterSlug}",
  topicSlug: "${topicSlug}",
  order: ${order},
  title: ${JSON.stringify(title)},
  lesson,
};
`;
}

export async function createChapter(p: CreateChapterParams): Promise<string> {
  if (!SLUG_RE.test(p.chapterSlug)) {
    throw new Error(`invalid slug shape: ${p.chapterSlug} (expected ${SLUG_RE})`);
  }
  if (!p.knownTopics.has(p.topicSlug)) {
    throw new Error(`unknown topic: ${p.topicSlug}`);
  }
  const topicDir = path.join(p.root, p.subject, p.topicSlug);
  await mkdir(topicDir, { recursive: true });
  const target = path.join(topicDir, `${p.chapterSlug}.ts`);
  const exists = await stat(target).then(() => true).catch(() => false);
  if (exists) throw new Error(`chapter already exists: ${target}`);

  const order = await nextOrder(topicDir);
  await writeFile(target, template(p.topicSlug, p.chapterSlug, order, p.title), "utf8");
  return target;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const arg = process.argv[2];
  const title = process.argv[3] ?? "TODO název";
  if (!arg) {
    console.error("Usage: pnpm new-chapter <subject>/<topic>/<chapter> [title]");
    process.exit(1);
  }
  const parts = arg.split("/");
  if (parts.length !== 3) {
    console.error("Expected <subject>/<topic>/<chapter>");
    process.exit(1);
  }
  const [subject, topicSlug, chapterSlug] = parts;

  (async () => {
    const { subjectTrees } = await import("../src/lib/topics");
    type MinimalNode = { slug: string; children?: readonly MinimalNode[] };
    const collect = (topics: readonly MinimalNode[]): string[] => {
      const out: string[] = [];
      const walk = (n: MinimalNode) => {
        if (!n.children?.length) out.push(n.slug);
        else n.children.forEach(walk);
      };
      topics.forEach(walk);
      return out;
    };
    const known = new Set<string>();
    for (const tree of Object.values(subjectTrees)) {
      for (const slug of collect(tree.topics as unknown as readonly MinimalNode[])) {
        known.add(slug);
      }
    }

    try {
      const file = await createChapter({
        root: path.resolve("src/lib/lessons"),
        subject,
        topicSlug,
        chapterSlug,
        title,
        knownTopics: known,
      });
      console.log(`✓ Created ${file}`);
      console.log("Next: edit the file, then run `pnpm build:registry`");
    } catch (e) {
      console.error(`✗ ${(e as Error).message}`);
      process.exit(1);
    }
  })();
}
