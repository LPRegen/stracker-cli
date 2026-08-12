import { db } from "@/db/client.js";
import { sessionsTable } from "@/db/schema.js";
import type { CreateSessionInput } from "@/domain/session.types.js";
import { isNull } from "drizzle-orm";

export const findActiveSession = async () => {
  const [activeSession] = await db
    .select()
    .from(sessionsTable)
    .where(isNull(sessionsTable.endedAt))
    .limit(1);

  return activeSession;
};

export const createSession = async (input: CreateSessionInput) => {
  const [session] = await db.insert(sessionsTable).values(input).returning();

  return session;
};
