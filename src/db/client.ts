import { mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

const dataHome =
  process.env.XDG_DATA_HOME || join(homedir(), ".local", "share");

const dataDirectory = join(dataHome, "stracker");

mkdirSync(dataDirectory, { recursive: true });

const databasePath = join(dataDirectory, "stracker.db");
const client = new Database(databasePath);

// Enable WAL mode
client.pragma("journal_mode = WAL");

export const db = drizzle({
  client,
});
