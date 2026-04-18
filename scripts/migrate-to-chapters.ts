#!/usr/bin/env tsx
/**
 * One-off migration: moves src/lib/lessons/{subject}/{cs-slug}-v2.ts
 * to   src/lib/lessons/{subject}/{en-slug}/intro.ts
 *
 * - Keeps the lesson content (steps/narrative/summary) byte-identical where possible
 * - Rewrites the export to `export const chapter: ChapterDefinition = { ... }`
 * - Deletes the source file
 *
 * Run once:   pnpm tsx scripts/migrate-to-chapters.ts
 * After successful merge, this script is deleted.
 */
import { readFile, writeFile, mkdir, unlink, stat } from "node:fs/promises";
import path from "node:path";

const LESSONS_DIR = path.resolve("src/lib/lessons");

const MATH_SLUG_MAP: Record<string, string> = {
  "linearni-rovnice": "linear-equations",
  "kvadraticke-rovnice": "quadratic-equations",
  "soustavy-rovnic": "systems-of-equations",
  "nerovnice": "inequalities",
  "vyrazove-upravy": "algebraic-expressions",
  "posloupnosti": "sequences",
  "linearni-funkce": "linear-functions",
  "kvadraticka-funkce": "quadratic-functions",
  "exponencialni-funkce": "exponential-functions",
  "logaritmicka-funkce": "logarithmic-functions",
  "goniometricke-funkce": "trigonometric-functions",
  "absolutni-hodnota": "absolute-value",
  "trojuhelniky": "triangles",
  "kruznice-a-kruhy": "circles",
  "analyticka-geometrie": "analytic-geometry",
  "stereometrie": "solid-geometry",
  "kombinatorika-zaklady": "combinatorics",
  "pravdepodobnost": "probability",
  "limity": "limits",
  "derivace": "derivatives",
  "integraly": "integrals",
};

const PHYSICS_SLUG_MAP: Record<string, string> = {
  "kinematika": "kinematics",
  "dynamika": "dynamics",
  "energie-a-prace": "energy-and-work",
  "hybnost-a-impulz": "momentum-and-impulse",
  "gravitace": "gravity",
  "teplota-a-teplo": "temperature-and-heat",
  "idealni-plyn": "ideal-gas",
  "zakony-termodynamiky": "thermodynamics-laws",
  "elektricke-pole": "electric-field",
  "elektricke-obvody": "electric-circuits",
  "magneticke-pole": "magnetic-field",
  "mechanicke-vlneni": "mechanical-waves",
  "optika": "optics",
  "kvantova-fyzika": "quantum-physics",
};

function extractTitle(source: string): string {
  const match = source.match(/title:\s*"([^"]+)"/);
  return match ? match[1] : "Úvod";
}

function rewriteExport(source: string, enSlug: string, title: string): string {
  const re = /export const \w+:\s*LessonV2\s*=\s*(\{[\s\S]*\});?\s*$/m;
  const match = source.match(re);
  if (!match) throw new Error("Could not find LessonV2 export in file");

  const lessonObj = match[1];

  const importSection = source.slice(0, source.indexOf("export const"));
  const rewrittenImports = importSection
    .replace(/import type \{\s*LessonV2\s*\} from "@\/types\/lesson-v2";?\s*\n?/g, "")
    .trimEnd();

  const prefix = rewrittenImports.length > 0 ? rewrittenImports + "\n" : "";

  return `${prefix}import type { ChapterDefinition } from "@/types/chapter";
import type { LessonV2 } from "@/types/lesson-v2";

const lesson: LessonV2 = ${lessonObj};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "${enSlug}",
  order: 1,
  title: ${JSON.stringify(title)},
  lesson,
};
`;
}

async function migrateOne(subject: "math" | "physics", csSlug: string, enSlug: string) {
  const src = path.join(LESSONS_DIR, subject, `${csSlug}-v2.ts`);
  const destDir = path.join(LESSONS_DIR, subject, enSlug);
  const dest = path.join(destDir, "intro.ts");

  try {
    await stat(src);
  } catch {
    console.log(`  skip: ${subject}/${csSlug}-v2.ts (not found)`);
    return;
  }

  const source = await readFile(src, "utf8");
  const title = extractTitle(source);
  const rewritten = rewriteExport(source, enSlug, title);

  await mkdir(destDir, { recursive: true });
  await writeFile(dest, rewritten, "utf8");
  await unlink(src);
  console.log(`  moved: ${subject}/${csSlug}-v2.ts → ${subject}/${enSlug}/intro.ts`);
}

async function main() {
  console.log("Migrating math lessons…");
  for (const [cs, en] of Object.entries(MATH_SLUG_MAP)) {
    await migrateOne("math", cs, en);
  }
  console.log("\nMigrating physics lessons…");
  for (const [cs, en] of Object.entries(PHYSICS_SLUG_MAP)) {
    await migrateOne("physics", cs, en);
  }
  console.log("\nDone. Remaining step: regenerate data.generated.ts (Task 2.5).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
