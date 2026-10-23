import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

const client = new Database("./data/stracker.db");

// Enable WAL mode
client.pragma("journal_mode = WAL");

export const db = drizzle({
  client,
});
