import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_PUBLIC_URL)
  throw new Error("DATABASE_PUBLIC_URL is not set");
const client = postgres(process.env.DATABASE_PUBLIC_URL);

export const db = drizzle(client, { schema });
