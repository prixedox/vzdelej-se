// Dynamic schema re-exporter — picks SQLite or PostgreSQL tables based on environment
const isLocalDev =
  !process.env.DATABASE_URL ||
  process.env.DATABASE_URL === "sqlite" ||
  process.env.DATABASE_URL === "pglite";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const s = isLocalDev ? require("./schema-sqlite") : require("./schema");

export const users = s.users;
export const accounts = s.accounts;
export const sessions = s.sessions;
export const verificationTokens = s.verificationTokens;
export const topics = s.topics;
export const lessonCache = s.lessonCache;
export const userLessonProgress = s.userLessonProgress;
export const userAnswers = s.userAnswers;
export const dailyActivity = s.dailyActivity;
