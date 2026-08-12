import type { sessionsTable } from "@/db/schema.js";

export type CreateSessionInput = typeof sessionsTable.$inferInsert;
