import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString:
      process.env.DATABASE_URL ??
      "postgres://postgres.dizkqkzahdkunwpjlyst:5QWW33VUfhIar1sP@aws-0-us-west-1.pooler.supabase.com:5432/postgres",
  },
} satisfies Config;
