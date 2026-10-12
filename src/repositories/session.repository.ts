import { db } from "@/db/client.js";
import { sessionsTable, tasksTable } from "@/db/schema.js";
import type { CreateSessionInput } from "@/domain/session.types.js";
import { asc, desc, eq, isNull } from "drizzle-orm";

export const findSessionById = async (id: number) => {
  const [session] = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.id, id));

  return session;
};

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

export const deleteSession = async (id: number) => {
  const [session] = await db
    .delete(sessionsTable)
    .where(eq(sessionsTable.id, id))
    .returning();

  return session;
};

export const listAllSessions = async () => {
  const sessions = await db.select().from(sessionsTable);
  return sessions;
};

export const listSessionsByProjectId = async (id: number) => {
  const sessions = await db
    .select({
      id: sessionsTable.id,
      taskId: sessionsTable.taskId,
      comment: sessionsTable.comment,
      startedAt: sessionsTable.startedAt,
      endedAt: sessionsTable.endedAt,
    })
    .from(sessionsTable)
    .orderBy(desc(sessionsTable.startedAt))
    .innerJoin(tasksTable, eq(sessionsTable.taskId, tasksTable.id))
    .where(eq(tasksTable.projectId, id));

  return sessions;
};

export const listSessionsByTaskId = async (taskId: number) => {
  const sessions = await db
    .select({
      id: sessionsTable.id,
      taskId: sessionsTable.taskId,
      comment: sessionsTable.comment,
      startedAt: sessionsTable.startedAt,
      endedAt: sessionsTable.endedAt,
    })
    .from(sessionsTable)
    .orderBy(desc(sessionsTable.startedAt))
    .where(eq(sessionsTable.taskId, taskId));

  return sessions;
};
