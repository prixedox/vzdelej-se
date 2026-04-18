import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtemp, rm, mkdir, writeFile, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { buildRegistry } from "./build-registry";

let tmp: string;

beforeEach(async () => {
  tmp = await mkdtemp(path.join(tmpdir(), "registry-test-"));
});

afterEach(async () => {
  await rm(tmp, { recursive: true, force: true });
});

async function writeChapter(p: string, slug: string, topicSlug: string, order: number) {
  await mkdir(path.dirname(p), { recursive: true });
  await writeFile(p, `export const chapter = { slug: "${slug}", topicSlug: "${topicSlug}", order: ${order}, title: "t", lesson: { steps: [], summary: { keyTakeaways: [] } } };\n`);
}

describe("buildRegistry", () => {
  it("generates imports and a keyed registry", async () => {
    await writeChapter(path.join(tmp, "math", "linear-equations", "intro.ts"), "intro", "linear-equations", 1);
    await writeChapter(path.join(tmp, "math", "linear-equations", "word-problems.ts"), "word-problems", "linear-equations", 2);
    await writeChapter(path.join(tmp, "physics", "kinematics", "intro.ts"), "intro", "kinematics", 1);

    await buildRegistry(tmp, path.join(tmp, "data.generated.ts"));
    const out = await readFile(path.join(tmp, "data.generated.ts"), "utf8");

    expect(out).toContain('from "./math/linear-equations/intro"');
    expect(out).toContain('from "./math/linear-equations/word-problems"');
    expect(out).toContain('from "./physics/kinematics/intro"');
    expect(out).toMatch(/"linear-equations\/intro":/);
    expect(out).toMatch(/"linear-equations\/word-problems":/);
    expect(out).toMatch(/"kinematics\/intro":/);
    expect(out).toMatch(/AUTO-GENERATED/);
  });

  it("skips unrelated files", async () => {
    await writeChapter(path.join(tmp, "math", "linear-equations", "intro.ts"), "intro", "linear-equations", 1);
    await writeFile(path.join(tmp, "math", "linear-equations", "README.md"), "# notes");
    await writeFile(path.join(tmp, "math", "linear-equations", "helpers.test.ts"), "// test");

    await buildRegistry(tmp, path.join(tmp, "data.generated.ts"));
    const out = await readFile(path.join(tmp, "data.generated.ts"), "utf8");
    expect(out).not.toContain("README");
    expect(out).not.toContain("helpers.test");
  });

  it("skips .ts files that don't export `chapter`", async () => {
    // A plausible helper file that a future author might add
    await writeChapter(path.join(tmp, "math", "linear-equations", "intro.ts"), "intro", "linear-equations", 1);
    await writeFile(
      path.join(tmp, "math", "linear-equations", "helpers.ts"),
      `export const someHelper = 42;\n`
    );

    await buildRegistry(tmp, path.join(tmp, "data.generated.ts"));
    const out = await readFile(path.join(tmp, "data.generated.ts"), "utf8");
    expect(out).not.toMatch(/linear-equations\/helpers/);
  });

  it("sorts entries deterministically by path", async () => {
    await writeChapter(path.join(tmp, "math", "zeta", "intro.ts"), "intro", "zeta", 1);
    await writeChapter(path.join(tmp, "math", "alpha", "intro.ts"), "intro", "alpha", 1);
    await writeChapter(path.join(tmp, "math", "beta", "intro.ts"), "intro", "beta", 1);

    await buildRegistry(tmp, path.join(tmp, "data.generated.ts"));
    const out = await readFile(path.join(tmp, "data.generated.ts"), "utf8");

    const alphaIdx = out.indexOf("alpha/intro");
    const betaIdx = out.indexOf("beta/intro");
    const zetaIdx = out.indexOf("zeta/intro");
    expect(alphaIdx).toBeLessThan(betaIdx);
    expect(betaIdx).toBeLessThan(zetaIdx);
  });
});
