const isLocalDev =
  !process.env.DATABASE_URL ||
  process.env.DATABASE_URL === "sqlite" ||
  process.env.DATABASE_URL === "pglite";

function createDb() {
  if (isLocalDev) {
    const { createClient } = require("@libsql/client");
    const { drizzle } = require("drizzle-orm/libsql");
    const schema = require("./schema-sqlite");
    const client = createClient({ url: "file:./sqlite.db" });
    return drizzle(client, { schema });
  }

  const { neon } = require("@neondatabase/serverless");
  const { drizzle } = require("drizzle-orm/neon-http");
  const schema = require("./schema");
  const sql = neon(process.env.DATABASE_URL);
  return drizzle(sql, { schema });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db: any = createDb();
