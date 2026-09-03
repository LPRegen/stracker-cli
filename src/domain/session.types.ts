import type { sessionsTable } from "@/db/schema.js";

export type CreateSessionInput = typeof sessionsTable.$inferInsert;

export type Session = typeof sessionsTable.$inferSelect;

export type GetSessionDurationInput = {
  startedAt: NonNullable<Session["startedAt"]>;
  endedAt: NonNullable<Session["endedAt"]>;
};
