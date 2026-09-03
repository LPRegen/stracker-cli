import { db } from "@/db/client.js";
import { sessionsTable } from "@/db/schema.js";
import type { CreateSessionInput } from "@/domain/session.types.js";
import { eq, isNull } from "drizzle-orm";

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

export const stopSession = async (id: number) => {
  const [session] = await db
    .update(sessionsTable)
    .set({ endedAt: new Date() })
    .where(eq(sessionsTable.id, id))
    .returning();

  return session;
};
