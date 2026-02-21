import {
  sqliteTable,
  text,
  integer,
  real,
  primaryKey,
  uniqueIndex,
  index,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// ─── NextAuth.js Tables ───

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: text("emailVerified"),
  image: text("image"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  stripePriceId: text("stripe_price_id"),
  stripeCurrentPeriodEnd: text("stripe_current_period_end"),
  subscriptionStatus: text("subscription_status").default("free"),
  role: text("role").default("user").notNull(), // "user" | "admin"
  xp: integer("xp").default(0).notNull(),
  level: integer("level").default(1).notNull(),
  streak: integer("streak").default(0).notNull(),
  longestStreak: integer("longest_streak").default(0).notNull(),
  lastActiveDate: text("last_active_date"),
  dailyLessonsUsed: integer("daily_lessons_used").default(0).notNull(),
  dailyLessonsResetDate: text("daily_lessons_reset_date"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const accounts = sqliteTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
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

export const sessions = sqliteTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: text("expires").notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationTokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: text("expires").notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// ─── Topics ───

export const topics = sqliteTable(
  "topics",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    subject: text("subject").notNull(),
    parentId: text("parent_id"),
    order: integer("order").default(0).notNull(),
    isLeaf: integer("is_leaf", { mode: "boolean" }).default(false).notNull(),
    difficulty: text("difficulty"),
    icon: text("icon"),
    aiContext: text("ai_context"),
    createdAt: text("created_at")
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
  },
  (topic) => [
    uniqueIndex("topics_slug_subject_idx").on(topic.slug, topic.subject),
    index("topics_parent_idx").on(topic.parentId),
  ]
);

// ─── Lesson Cache ───

export const lessonCache = sqliteTable(
  "lesson_cache",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    topicId: text("topic_id")
      .notNull()
      .references(() => topics.id, { onDelete: "cascade" }),
    difficulty: text("difficulty").notNull(),
    variant: integer("variant").default(1).notNull(),
    content: text("content", { mode: "json" }).notNull(),
    model: text("model").notNull(),
    promptVersion: text("prompt_version").notNull(),
    generatedAt: text("generated_at")
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
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

export const userLessonProgress = sqliteTable(
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
    status: text("status").default("not_started").notNull(),
    score: real("score"),
    xpEarned: integer("xp_earned").default(0).notNull(),
    totalProblems: integer("total_problems").default(0).notNull(),
    correctAnswers: integer("correct_answers").default(0).notNull(),
    hintsUsed: integer("hints_used").default(0).notNull(),
    startedAt: text("started_at"),
    completedAt: text("completed_at"),
    updatedAt: text("updated_at")
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
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

export const userAnswers = sqliteTable(
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
    isCorrect: integer("is_correct", { mode: "boolean" }).notNull(),
    hintsUsedForProblem: integer("hints_used_for_problem").default(0).notNull(),
    timeSpentMs: integer("time_spent_ms"),
    answeredAt: text("answered_at")
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
  },
  (answer) => [
    index("user_answers_progress_idx").on(answer.lessonProgressId),
    index("user_answers_user_idx").on(answer.userId),
  ]
);

// ─── Daily Activity ───

export const dailyActivity = sqliteTable(
  "daily_activity",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    date: text("date").notNull(),
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
