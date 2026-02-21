import { getAnthropicClient } from "./client";
import { SYSTEM_PROMPT } from "./prompts/system";
import { getLessonPrompt } from "./prompts/lesson-template";
import { lessonContentSchema } from "./schemas/lesson";
import { db } from "@/lib/db";
import { lessonCache, topics } from "@/lib/db/tables";
import { eq, and } from "drizzle-orm";
import { LESSON_MODEL, PROMPT_VERSION } from "@/lib/utils/constants";
import type { LessonContent } from "@/types/lesson";

export async function getOrGenerateLesson(params: {
  topicId: string;
  difficulty: string;
  variant?: number;
}): Promise<{ lessonCacheId: string; content: LessonContent }> {
  const { topicId, difficulty, variant = 1 } = params;

  // Check cache first
  const cached = await db.query.lessonCache.findFirst({
    where: and(
      eq(lessonCache.topicId, topicId),
      eq(lessonCache.difficulty, difficulty),
      eq(lessonCache.variant, variant)
    ),
  });

  if (cached) {
    return {
      lessonCacheId: cached.id,
      content: cached.content as LessonContent,
    };
  }

  // Get topic details
  const topic = await db.query.topics.findFirst({
    where: eq(topics.id, topicId),
  });

  if (!topic) {
    throw new Error(`Topic not found: ${topicId}`);
  }

  // Generate with Claude
  const content = await generateLessonContent({
    topicName: topic.name,
    subject: topic.subject === "matematika" ? "matematiky" : "fyziky",
    difficulty,
    aiContext: topic.aiContext || topic.description || topic.name,
    variant,
  });

  // Store in cache
  const [saved] = await db
    .insert(lessonCache)
    .values({
      topicId,
      difficulty,
      variant,
      content: content as unknown as Record<string, unknown>,
      model: LESSON_MODEL,
      promptVersion: PROMPT_VERSION,
    })
    .returning();

  return {
    lessonCacheId: saved.id,
    content,
  };
}

async function generateLessonContent(params: {
  topicName: string;
  subject: string;
  difficulty: string;
  aiContext: string;
  variant: number;
}): Promise<LessonContent> {
  const client = getAnthropicClient();
  const prompt = getLessonPrompt(params);

  const startTime = Date.now();

  const response = await client.messages.create({
    model: LESSON_MODEL,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: prompt }],
  });

  const elapsed = Date.now() - startTime;
  console.log(
    `Lesson generated in ${elapsed}ms for ${params.topicName} (${params.difficulty}, variant ${params.variant})`
  );

  // Extract text content
  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content in AI response");
  }

  // Parse JSON
  let parsed: unknown;
  try {
    // Try to extract JSON from potential markdown code blocks
    let jsonText = textBlock.text.trim();
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }
    parsed = JSON.parse(jsonText);
  } catch (e) {
    console.error("Failed to parse AI response as JSON:", textBlock.text);
    throw new Error("AI response is not valid JSON");
  }

  // Validate with Zod
  const result = lessonContentSchema.safeParse(parsed);
  if (!result.success) {
    console.error("Lesson validation failed:", result.error.issues);
    throw new Error(
      `Lesson content validation failed: ${result.error.issues.map((i) => i.message).join(", ")}`
    );
  }

  return result.data as LessonContent;
}
