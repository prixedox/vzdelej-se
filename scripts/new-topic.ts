#!/usr/bin/env tsx
/**
 * Scaffolder: pnpm new-topic <subject>/<category>/<topic> "Display Name"
 *
 * 1. Inserts a TopicNode under the given category in the tree file
 * 2. Creates the first chapter (intro.ts) via the new-chapter scaffolder
 *
 * NOTE: This edits the tree file by text manipulation. Review the diff
 * before committing.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createChapter } from "./new-chapter";

const SLUG_RE = /^[a-z0-9-]+$/;

async function insertTopicIntoTree(
  treePath: string,
  categorySlug: string,
  topicSlug: string,
  displayName: string
): Promise<void> {
  const src = await readFile(treePath, "utf8");
  const categoryIdx = src.indexOf(`slug: "${categorySlug}"`);
  if (categoryIdx === -1) {
    throw new Error(`category "${categorySlug}" not found in ${treePath}`);
  }

  const childrenIdx = src.indexOf("children: [", categoryIdx);
  if (childrenIdx === -1) {
    throw new Error(`category "${categorySlug}" has no children array`);
  }

  const insertAt = childrenIdx + "children: [".length;
  const insertion = `
        {
          slug: "${topicSlug}",
          name: ${JSON.stringify(displayName)},
          description: "TODO popis (Czech)",
          aiContext: "TODO aiContext (Czech)",
        },`;

  const next = src.slice(0, insertAt) + insertion + src.slice(insertAt);
  await writeFile(treePath, next, "utf8");
}

async function main() {
  const arg = process.argv[2];
  const displayName = process.argv[3] ?? "TODO";
  if (!arg) {
    console.error('Usage: pnpm new-topic <subject>/<category>/<topic> "Display Name"');
    process.exit(1);
  }
  const parts = arg.split("/");
  if (parts.length !== 3) {
    console.error("Expected <subject>/<category>/<topic>");
    process.exit(1);
  }
  const [subject, categorySlug, topicSlug] = parts;
  if (!SLUG_RE.test(categorySlug)) {
    console.error(`Invalid category slug shape: ${categorySlug}`);
    process.exit(1);
  }
  if (!SLUG_RE.test(topicSlug)) {
    console.error(`Invalid topic slug shape: ${topicSlug}`);
    process.exit(1);
  }

  const treeFileMap: Record<string, string> = {
    math: "math-tree.ts",
    physics: "physics-tree.ts",
    chemistry: "chemistry-tree.ts",
    biology: "biology-tree.ts",
    informatics: "informatics-tree.ts",
    history: "history-tree.ts",
    geography: "geography-tree.ts",
  };
  const treeFile = treeFileMap[subject];
  if (!treeFile) {
    console.error(`Unknown subject: ${subject}`);
    process.exit(1);
  }

  const treePath = path.resolve(`src/lib/topics/${treeFile}`);
  try {
    await insertTopicIntoTree(treePath, categorySlug, topicSlug, displayName);
    console.log(`✓ Added "${topicSlug}" under category "${categorySlug}" in ${treeFile}`);

    const file = await createChapter({
      root: path.resolve("src/lib/lessons"),
      subject,
      topicSlug,
      chapterSlug: "intro",
      title: "Úvod",
      knownTopics: new Set([topicSlug]),
    });
    console.log(`✓ Created intro chapter ${file}`);
    console.log(
      `\nNext: fill description/aiContext in ${treeFile}, edit the chapter file, then pnpm build:registry`
    );
  } catch (e) {
    console.error(`✗ ${(e as Error).message}`);
    process.exit(1);
  }
}

main();
