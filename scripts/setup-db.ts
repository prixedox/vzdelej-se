import "dotenv/config";
import { createClient } from "@libsql/client";

async function main() {
  console.log("🗄️  Setting up SQLite database at ./sqlite.db");
  const client = createClient({ url: "file:./sqlite.db" });

  console.log("Creating tables...\n");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      emailVerified TEXT,
      image TEXT,
      stripe_customer_id TEXT,
      stripe_subscription_id TEXT,
      stripe_price_id TEXT,
      stripe_current_period_end TEXT,
      subscription_status TEXT DEFAULT 'free',
      xp INTEGER NOT NULL DEFAULT 0,
      level INTEGER NOT NULL DEFAULT 1,
      streak INTEGER NOT NULL DEFAULT 0,
      longest_streak INTEGER NOT NULL DEFAULT 0,
      last_active_date TEXT,
      daily_lessons_used INTEGER NOT NULL DEFAULT 0,
      daily_lessons_reset_date TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  console.log("  ✅ users");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS accounts (
      userId TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type TEXT NOT NULL,
      provider TEXT NOT NULL,
      providerAccountId TEXT NOT NULL,
      refresh_token TEXT,
      access_token TEXT,
      expires_at INTEGER,
      token_type TEXT,
      scope TEXT,
      id_token TEXT,
      session_state TEXT,
      PRIMARY KEY (provider, providerAccountId)
    )
  `);
  console.log("  ✅ accounts");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS sessions (
      sessionToken TEXT PRIMARY KEY,
      userId TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires TEXT NOT NULL
    )
  `);
  console.log("  ✅ sessions");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS verificationTokens (
      identifier TEXT NOT NULL,
      token TEXT NOT NULL,
      expires TEXT NOT NULL,
      PRIMARY KEY (identifier, token)
    )
  `);
  console.log("  ✅ verificationTokens");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS topics (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      subject TEXT NOT NULL,
      parent_id TEXT,
      "order" INTEGER NOT NULL DEFAULT 0,
      is_leaf INTEGER NOT NULL DEFAULT 0,
      difficulty TEXT,
      icon TEXT,
      ai_context TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS topics_slug_subject_idx ON topics(slug, subject)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS topics_parent_idx ON topics(parent_id)`);
  console.log("  ✅ topics");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS lesson_cache (
      id TEXT PRIMARY KEY,
      topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
      difficulty TEXT NOT NULL,
      variant INTEGER NOT NULL DEFAULT 1,
      content TEXT NOT NULL,
      model TEXT NOT NULL,
      prompt_version TEXT NOT NULL,
      generated_at TEXT NOT NULL DEFAULT (datetime('now')),
      generation_time_ms INTEGER,
      token_count INTEGER
    )
  `);
  await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS lesson_cache_topic_diff_var_idx ON lesson_cache(topic_id, difficulty, variant)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS lesson_cache_topic_idx ON lesson_cache(topic_id)`);
  console.log("  ✅ lesson_cache");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS user_lesson_progress (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      lesson_cache_id TEXT NOT NULL REFERENCES lesson_cache(id) ON DELETE CASCADE,
      topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
      status TEXT NOT NULL DEFAULT 'not_started',
      score REAL,
      xp_earned INTEGER NOT NULL DEFAULT 0,
      total_problems INTEGER NOT NULL DEFAULT 0,
      correct_answers INTEGER NOT NULL DEFAULT 0,
      hints_used INTEGER NOT NULL DEFAULT 0,
      started_at TEXT,
      completed_at TEXT,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS user_lesson_progress_user_lesson_idx ON user_lesson_progress(user_id, lesson_cache_id)`);
  console.log("  ✅ user_lesson_progress");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS user_answers (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      lesson_progress_id TEXT NOT NULL REFERENCES user_lesson_progress(id) ON DELETE CASCADE,
      problem_index INTEGER NOT NULL,
      user_answer TEXT NOT NULL,
      is_correct INTEGER NOT NULL,
      hints_used_for_problem INTEGER NOT NULL DEFAULT 0,
      time_spent_ms INTEGER,
      answered_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  console.log("  ✅ user_answers");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS daily_activity (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      date TEXT NOT NULL,
      lessons_completed INTEGER NOT NULL DEFAULT 0,
      xp_earned INTEGER NOT NULL DEFAULT 0,
      problems_solved INTEGER NOT NULL DEFAULT 0,
      correct_answers INTEGER NOT NULL DEFAULT 0,
      time_spent_ms INTEGER NOT NULL DEFAULT 0
    )
  `);
  await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS daily_activity_user_date_idx ON daily_activity(user_id, date)`);
  console.log("  ✅ daily_activity");

  console.log("\n✅ All tables created successfully!");
}

main().catch(console.error);
