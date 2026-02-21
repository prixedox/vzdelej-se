import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/lib/db/schema";
import { eq, and } from "drizzle-orm";
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "../src/lib/ai/prompts/system";
import { getLessonPrompt } from "../src/lib/ai/prompts/lesson-template";
import { lessonContentSchema } from "../src/lib/ai/schemas/lesson";
import { LESSON_MODEL, PROMPT_VERSION } from "../src/lib/utils/constants";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const DIFFICULTIES = ["beginner", "intermediate", "advanced"];

async function generateLesson(
  topic: typeof schema.topics.$inferSelect,
  difficulty: string,
  variant: number
) {
  // Check if already cached
  const existing = await db.query.lessonCache.findFirst({
    where: and(
      eq(schema.lessonCache.topicId, topic.id),
      eq(schema.lessonCache.difficulty, difficulty),
      eq(schema.lessonCache.variant, variant)
    ),
  });

  if (existing) {
    console.log(`  ⏭️  Already cached: ${topic.name} (${difficulty}, v${variant})`);
    return;
  }

  const subject = topic.subject === "math" ? "matematiky" : "fyziky";
  const prompt = getLessonPrompt({
    topicName: topic.name,
    subject,
    difficulty,
    aiContext: topic.aiContext || topic.description || topic.name,
    variant,
  });

  console.log(`  🤖 Generating: ${topic.name} (${difficulty}, v${variant})...`);
  const startTime = Date.now();

  const response = await client.messages.create({
    model: LESSON_MODEL,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: prompt }],
  });

  const elapsed = Date.now() - startTime;

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    console.error(`  ❌ No text in response for ${topic.name}`);
    return;
  }

  let jsonText = textBlock.text.trim();
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    console.error(`  ❌ Invalid JSON for ${topic.name}: ${jsonText.slice(0, 100)}`);
    return;
  }

  const result = lessonContentSchema.safeParse(parsed);
  if (!result.success) {
    console.error(`  ❌ Validation failed for ${topic.name}:`, result.error.issues);
    return;
  }

  await db.insert(schema.lessonCache).values({
    topicId: topic.id,
    difficulty,
    variant,
    content: result.data as unknown as Record<string, unknown>,
    model: LESSON_MODEL,
    promptVersion: PROMPT_VERSION,
    generationTimeMs: elapsed,
    tokenCount: response.usage?.output_tokens,
  });

  console.log(`  ✅ ${topic.name} (${difficulty}, v${variant}) — ${elapsed}ms`);
}

async function main() {
  console.log("🎓 Pre-generating all lesson variants...\n");

  const leafTopics = await db.query.topics.findMany({
    where: eq(schema.topics.isLeaf, true),
  });

  console.log(`Found ${leafTopics.length} leaf topics.\n`);

  let total = 0;
  let generated = 0;
  let skipped = 0;
  let errors = 0;

  for (const topic of leafTopics) {
    console.log(`\n📚 ${topic.name} (${topic.subject})`);

    for (const difficulty of DIFFICULTIES) {
      total++;
      try {
        const existing = await db.query.lessonCache.findFirst({
          where: and(
            eq(schema.lessonCache.topicId, topic.id),
            eq(schema.lessonCache.difficulty, difficulty),
            eq(schema.lessonCache.variant, 1)
          ),
        });

        if (existing) {
          skipped++;
          console.log(`  ⏭️  Already cached: ${difficulty}`);
          continue;
        }

        await generateLesson(topic, difficulty, 1);
        generated++;

        // Rate limiting — wait between requests
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (err) {
        errors++;
        console.error(`  ❌ Error for ${topic.name} (${difficulty}):`, err);
      }
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`📊 Summary:`);
  console.log(`   Total variants: ${total}`);
  console.log(`   Generated: ${generated}`);
  console.log(`   Skipped (cached): ${skipped}`);
  console.log(`   Errors: ${errors}`);
  console.log(`\n✅ Done!`);
}

main().catch(console.error);
