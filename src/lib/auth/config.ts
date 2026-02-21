import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { authConfig } from "./auth.config";

// Lazy-load db and schema (only called server-side, never in Edge)
function getDb() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@/lib/db").db;
}

function getSchema() {
  const isLocalDev =
    !process.env.DATABASE_URL ||
    process.env.DATABASE_URL === "sqlite" ||
    process.env.DATABASE_URL === "pglite";

  if (isLocalDev) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("@/lib/db/schema-sqlite");
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@/lib/db/schema");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    // Keep Google from base config
    ...authConfig.providers.filter(
      (p) => (p as { id?: string }).id !== "credentials"
    ),
    // Override Credentials with real authorize function
    Credentials({
      name: "email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Heslo", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        const email = credentials.email as string;
        const db = getDb();
        const schema = getSchema();

        const existingUser = await db.query.users.findFirst({
          where: eq(schema.users.email, email),
        });

        if (existingUser) {
          return {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            image: existingUser.image,
          };
        }

        // Auto-create user on first login
        const [newUser] = await db
          .insert(schema.users)
          .values({
            email,
            name: email.split("@")[0],
          })
          .returning();

        return {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          image: newUser.image,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;

        try {
          const db = getDb();
          const schema = getSchema();

          const dbUser = await db.query.users.findFirst({
            where: eq(schema.users.id, token.id as string),
          });

          if (dbUser) {
            session.user.subscriptionStatus =
              dbUser.subscriptionStatus ?? "free";
            session.user.xp = dbUser.xp;
            session.user.level = dbUser.level;
            session.user.streak = dbUser.streak;
            session.user.dailyLessonsUsed = dbUser.dailyLessonsUsed;
          }
        } catch {
          // DB not available — return basic session
        }
      }
      return session;
    },
  },
});
