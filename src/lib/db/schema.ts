import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
  primaryKey,
  uniqueIndex,
  index,
  real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";

// ─── NextAuth.js Tables ───

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),

  // Subscription
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  stripePriceId: text("stripe_price_id"),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end", {
    mode: "date",
  }),
  subscriptionStatus: text("subscription_status").default("free"), // free | active | canceled | past_due
  role: text("role").default("user").notNull(), // "user" | "admin"

  // Gamification
  xp: integer("xp").default(0).notNull(),
  level: integer("level").default(1).notNull(),
  streak: integer("streak").default(0).notNull(),
  longestStreak: integer("longest_streak").default(0).notNull(),
  lastActiveDate: text("last_active_date"), // YYYY-MM-DD format for easy comparison

  // Daily limits
  dailyLessonsUsed: integer("daily_lessons_used").default(0).notNull(),
  dailyLessonsResetDate: text("daily_lessons_reset_date"), // YYYY-MM-DD

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  ]
);

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationTokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// ─── Topics ───

export const topics = pgTable(
  "topics",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    slug: text("slug").notNull(),
    name: text("name").notNull(), // Czech name
    description: text("description"),
    subject: text("subject").notNull(), // "math" | "physics"
    parentId: text("parent_id"),
    order: integer("order").default(0).notNull(),
    isLeaf: boolean("is_leaf").default(false).notNull(),
    difficulty: text("difficulty"), // null for parent categories
    icon: text("icon"),
    aiContext: text("ai_context"), // Extra context for AI lesson generation
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (topic) => [
    uniqueIndex("topics_slug_subject_idx").on(topic.slug, topic.subject),
    index("topics_parent_idx").on(topic.parentId),
  ]
);

// ─── Lesson Cache ───

export const lessonCache = pgTable(
  "lesson_cache",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    topicId: text("topic_id")
      .notNull()
      .references(() => topics.id, { onDelete: "cascade" }),
    difficulty: text("difficulty").notNull(), // "beginner" | "intermediate" | "advanced"
    variant: integer("variant").default(1).notNull(),
    content: jsonb("content").notNull(), // Full lesson JSON
    model: text("model").notNull(), // e.g. "claude-sonnet-4-5-20250929"
    promptVersion: text("prompt_version").notNull(),
    generatedAt: timestamp("generated_at", { mode: "date" })
      .defaultNow()
      .notNull(),
    generationTimeMs: integer("generation_time_ms"),
    tokenCount: integer("token_count"),
  },
  (lesson) => [
    uniqueIndex("lesson_cache_topic_diff_var_idx").on(
      lesson.topicId,
      lesson.difficulty,
      lesson.variant
    ),
    index("lesson_cache_topic_idx").on(lesson.topicId),
  ]
);

// ─── User Lesson Progress ───

export const userLessonProgress = pgTable(
  "user_lesson_progress",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonCacheId: text("lesson_cache_id")
      .notNull()
      .references(() => lessonCache.id, { onDelete: "cascade" }),
    topicId: text("topic_id")
      .notNull()
      .references(() => topics.id, { onDelete: "cascade" }),
    status: text("status").default("not_started").notNull(), // not_started | in_progress | completed
    score: real("score"), // 0-1 percentage
    xpEarned: integer("xp_earned").default(0).notNull(),
    totalProblems: integer("total_problems").default(0).notNull(),
    correctAnswers: integer("correct_answers").default(0).notNull(),
    hintsUsed: integer("hints_used").default(0).notNull(),
    startedAt: timestamp("started_at", { mode: "date" }),
    completedAt: timestamp("completed_at", { mode: "date" }),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (progress) => [
    uniqueIndex("user_lesson_progress_user_lesson_idx").on(
      progress.userId,
      progress.lessonCacheId
    ),
    index("user_lesson_progress_user_idx").on(progress.userId),
    index("user_lesson_progress_topic_idx").on(progress.topicId),
  ]
);

// ─── User Answers ───

export const userAnswers = pgTable(
  "user_answers",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonProgressId: text("lesson_progress_id")
      .notNull()
      .references(() => userLessonProgress.id, { onDelete: "cascade" }),
    problemIndex: integer("problem_index").notNull(),
    userAnswer: text("user_answer").notNull(),
    isCorrect: boolean("is_correct").notNull(),
    hintsUsedForProblem: integer("hints_used_for_problem").default(0).notNull(),
    timeSpentMs: integer("time_spent_ms"),
    answeredAt: timestamp("answered_at", { mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (answer) => [
    index("user_answers_progress_idx").on(answer.lessonProgressId),
    index("user_answers_user_idx").on(answer.userId),
  ]
);

// ─── Daily Activity ───

export const dailyActivity = pgTable(
  "daily_activity",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    date: text("date").notNull(), // YYYY-MM-DD
    lessonsCompleted: integer("lessons_completed").default(0).notNull(),
    xpEarned: integer("xp_earned").default(0).notNull(),
    problemsSolved: integer("problems_solved").default(0).notNull(),
    correctAnswers: integer("correct_answers").default(0).notNull(),
    timeSpentMs: integer("time_spent_ms").default(0).notNull(),
  },
  (activity) => [
    uniqueIndex("daily_activity_user_date_idx").on(
      activity.userId,
      activity.date
    ),
    index("daily_activity_user_idx").on(activity.userId),
  ]
);

// ─── Relations ───

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  lessonProgress: many(userLessonProgress),
  answers: many(userAnswers),
  dailyActivity: many(dailyActivity),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const topicsRelations = relations(topics, ({ one, many }) => ({
  parent: one(topics, {
    fields: [topics.parentId],
    references: [topics.id],
    relationName: "parentChild",
  }),
  children: many(topics, { relationName: "parentChild" }),
  lessons: many(lessonCache),
}));

export const lessonCacheRelations = relations(lessonCache, ({ one, many }) => ({
  topic: one(topics, {
    fields: [lessonCache.topicId],
    references: [topics.id],
  }),
  progress: many(userLessonProgress),
}));

export const userLessonProgressRelations = relations(
  userLessonProgress,
  ({ one, many }) => ({
    user: one(users, {
      fields: [userLessonProgress.userId],
      references: [users.id],
    }),
    lesson: one(lessonCache, {
      fields: [userLessonProgress.lessonCacheId],
      references: [lessonCache.id],
    }),
    topic: one(topics, {
      fields: [userLessonProgress.topicId],
      references: [topics.id],
    }),
    answers: many(userAnswers),
  })
);

export const userAnswersRelations = relations(userAnswers, ({ one }) => ({
  user: one(users, {
    fields: [userAnswers.userId],
    references: [users.id],
  }),
  lessonProgress: one(userLessonProgress, {
    fields: [userAnswers.lessonProgressId],
    references: [userLessonProgress.id],
  }),
}));

export const dailyActivityRelations = relations(dailyActivity, ({ one }) => ({
  user: one(users, {
    fields: [dailyActivity.userId],
    references: [users.id],
  }),
}));
