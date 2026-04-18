import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtemp, rm, writeFile, readFile, readdir, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createChapter } from "./new-chapter";

let tmp: string;

beforeEach(async () => {
  tmp = await mkdtemp(path.join(tmpdir(), "new-chapter-test-"));
  await mkdir(path.join(tmp, "math", "linear-equations"), { recursive: true });
  await writeFile(
    path.join(tmp, "math", "linear-equations", "intro.ts"),
    `export const chapter = { slug: "intro", topicSlug: "linear-equations", order: 1, title: "Úvod", lesson: { steps: [], summary: { keyTakeaways: [] } } };\n`
  );
});

afterEach(async () => {
  await rm(tmp, { recursive: true, force: true });
});

describe("createChapter", () => {
  it("creates a new chapter file with next order", async () => {
    await createChapter({
      root: tmp,
      subject: "math",
      topicSlug: "linear-equations",
      chapterSlug: "word-problems",
      title: "Slovní úlohy",
      knownTopics: new Set(["linear-equations"]),
    });
    const files = await readdir(path.join(tmp, "math", "linear-equations"));
    expect(files).toContain("word-problems.ts");
    const content = await readFile(
      path.join(tmp, "math", "linear-equations", "word-problems.ts"),
      "utf8"
    );
    expect(content).toContain('slug: "word-problems"');
    expect(content).toContain("order: 2");
    expect(content).toContain('title: "Slovní úlohy"');
  });

  it("rejects unknown topic", async () => {
    await expect(
      createChapter({
        root: tmp,
        subject: "math",
        topicSlug: "nonexistent",
        chapterSlug: "intro",
        title: "t",
        knownTopics: new Set(["linear-equations"]),
      })
    ).rejects.toThrow(/unknown topic/i);
  });

  it("rejects existing chapter slug", async () => {
    await expect(
      createChapter({
        root: tmp,
        subject: "math",
        topicSlug: "linear-equations",
        chapterSlug: "intro",
        title: "t",
        knownTopics: new Set(["linear-equations"]),
      })
    ).rejects.toThrow(/already exists/i);
  });

  it("rejects invalid slug shape", async () => {
    await expect(
      createChapter({
        root: tmp,
        subject: "math",
        topicSlug: "linear-equations",
        chapterSlug: "Word Problems",
        title: "t",
        knownTopics: new Set(["linear-equations"]),
      })
    ).rejects.toThrow(/slug shape/i);
  });
});
