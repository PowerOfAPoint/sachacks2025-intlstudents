import { defineConfig } from "drizzle-kit";
if (!process.env.DATABASE_PUBLIC_URL)
  throw new Error("DATABASE_PUBLIC_URL is not set");

export default defineConfig({
  schema: "./src/lib/db/schema.ts",

  dbCredentials: {
    url: process.env.DATABASE_PUBLIC_URL,
  },

  verbose: true,
  strict: true,
  dialect: "postgresql",
});
