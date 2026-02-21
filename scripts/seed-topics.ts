import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../src/lib/db/schema-sqlite";
import { mathTree } from "../src/lib/topics/math-tree";
import { physicsTree } from "../src/lib/topics/physics-tree";
import type { TopicNode, TopicTreeData } from "../src/types/topic";

const client = createClient({ url: "file:./sqlite.db" });
const db = drizzle(client, { schema });

async function seedTree(tree: TopicTreeData) {
  let order = 0;

  async function seedNode(
    node: TopicNode,
    parentId: string | null,
    subject: string
  ) {
    const isLeaf = !node.children || node.children.length === 0;
    const id = crypto.randomUUID();

    // Use INSERT OR REPLACE for SQLite
    await client.execute({
      sql: `INSERT OR REPLACE INTO topics (id, slug, name, description, subject, parent_id, "order", is_leaf, icon, ai_context, created_at)
            VALUES (
              COALESCE((SELECT id FROM topics WHERE slug = ? AND subject = ?), ?),
              ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now')
            )`,
      args: [
        node.slug, subject, id,
        node.slug, node.name, node.description || null, subject,
        parentId, order++, isLeaf ? 1 : 0,
        node.icon || null, node.aiContext || null,
      ],
    });

    // Get the actual ID (might be existing)
    const row = await client.execute({
      sql: `SELECT id FROM topics WHERE slug = ? AND subject = ?`,
      args: [node.slug, subject],
    });
    const insertedId = row.rows[0]?.id as string;

    console.log(`  ${isLeaf ? "🍃" : "📁"} ${node.name} (${insertedId})`);

    if (node.children) {
      for (const child of node.children) {
        await seedNode(child, insertedId, subject);
      }
    }

    return insertedId;
  }

  console.log(`\nSeeding ${tree.subjectName}...`);
  for (const topicNode of tree.topics) {
    await seedNode(topicNode, null, tree.subject);
  }
}

async function main() {
  console.log("🌱 Seeding topics...");
  await seedTree(mathTree);
  await seedTree(physicsTree);
  console.log("\n✅ Done! Topics seeded successfully.");
}

main().catch(console.error);
