import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtemp, rm, writeFile, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { insertTopicIntoTree, createTopic, TREE_FILE_BY_SUBJECT } from "./new-topic";

let tmp: string;
let treePath: string;

const TREE_FIXTURE = `import type { TopicTreeData } from "@/types/topic";

export const mathTree: TopicTreeData = {
  subject: "math",
  name: "Matematika",
  icon: "📐",
  topics: [
    {
      slug: "algebra",
      name: "Algebra",
      children: [
        {
          slug: "linear-equations",
          name: "Lineární rovnice",
        },
      ],
    },
  ],
};
`;

beforeEach(async () => {
  tmp = await mkdtemp(path.join(tmpdir(), "new-topic-test-"));
  treePath = path.join(tmp, "math-tree.ts");
  await writeFile(treePath, TREE_FIXTURE);
});

afterEach(async () => {
  await rm(tmp, { recursive: true, force: true });
});

describe("insertTopicIntoTree", () => {
  it("inserts the node as the first child of the named category", async () => {
    await insertTopicIntoTree(treePath, "algebra", "polynomials", "Polynomy");
    const out = await readFile(treePath, "utf8");

    expect(out).toContain('slug: "polynomials"');
    expect(out).toContain('name: "Polynomy"');
    // The pre-existing sibling must survive.
    expect(out).toContain('slug: "linear-equations"');
    // New node lands inside the category's children, ahead of the old one.
    expect(out.indexOf('slug: "polynomials"')).toBeGreaterThan(out.indexOf('slug: "algebra"'));
    expect(out.indexOf('slug: "polynomials"')).toBeLessThan(out.indexOf('slug: "linear-equations"'));
  });

  it("scaffolds the Czech placeholder fields", async () => {
    await insertTopicIntoTree(treePath, "algebra", "polynomials", "Polynomy");
    const out = await readFile(treePath, "utf8");
    expect(out).toContain("description:");
    expect(out).toContain("aiContext:");
  });

  it("escapes the display name rather than breaking the literal", async () => {
    await insertTopicIntoTree(treePath, "algebra", "polynomials", 'Ro"zklad');
    const out = await readFile(treePath, "utf8");
    expect(out).toContain('name: "Ro\\"zklad"');
  });

  it("throws when the category does not exist", async () => {
    await expect(
      insertTopicIntoTree(treePath, "nonexistent", "polynomials", "Polynomy")
    ).rejects.toThrow(/category "nonexistent" not found/);
  });

  it("leaves the tree untouched when the category is missing", async () => {
    await expect(
      insertTopicIntoTree(treePath, "nonexistent", "polynomials", "Polynomy")
    ).rejects.toThrow();
    expect(await readFile(treePath, "utf8")).toBe(TREE_FIXTURE);
  });

  it("throws when the category has no children array", async () => {
    const flat = path.join(tmp, "flat-tree.ts");
    await writeFile(flat, `export const t = { topics: [{ slug: "algebra", name: "Algebra" }] };\n`);
    await expect(insertTopicIntoTree(flat, "algebra", "x", "X")).rejects.toThrow(
      /no children array/
    );
  });
});

describe("createTopic", () => {
  // These reject before any filesystem access, so they never touch the real tree.
  it("rejects an invalid topic slug", async () => {
    await expect(
      createTopic({
        subject: "math",
        categorySlug: "algebra",
        topicSlug: "Bad_Slug",
        displayName: "X",
      })
    ).rejects.toThrow(/Invalid topic slug shape/);
  });

  it("rejects an invalid category slug", async () => {
    await expect(
      createTopic({
        subject: "math",
        categorySlug: "Bad Category",
        topicSlug: "polynomials",
        displayName: "X",
      })
    ).rejects.toThrow(/Invalid category slug shape/);
  });

  it("rejects an unknown subject and names the valid ones", async () => {
    await expect(
      createTopic({
        subject: "astrology",
        categorySlug: "algebra",
        topicSlug: "polynomials",
        displayName: "X",
      })
    ).rejects.toThrow(/Unknown subject: astrology/);
  });
});

describe("TREE_FILE_BY_SUBJECT", () => {
  it("covers every subject tree file", () => {
    expect(Object.keys(TREE_FILE_BY_SUBJECT).sort()).toEqual([
      "biology",
      "chemistry",
      "geography",
      "history",
      "informatics",
      "math",
      "physics",
    ]);
  });
});
