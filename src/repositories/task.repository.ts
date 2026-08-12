import { db } from "@/db/client.js";
import { tasksTable } from "@/db/schema.js";
import type { CreateTaskInput, TaskFilters } from "@/domain/task.types.js";
import { and, eq } from "drizzle-orm";

export async function findTaskById(id: number) {
  const [task] = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.id, id));

  return task;
}

export async function findTasksByName(name: string) {
  const tasks = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.name, name));

  return tasks;
}

export async function creatTask({ projectId, name }: CreateTaskInput) {
  const [task] = await db
    .insert(tasksTable)
    .values({ projectId, name })
    .returning();

  return task;
}

export async function listTasks({
  projectId,
  status,
  priority,
}: TaskFilters = {}) {
  const conditions = [];

  if (projectId !== undefined)
    conditions.push(eq(tasksTable.projectId, projectId));
  if (status !== undefined) conditions.push(eq(tasksTable.status, status));
  if (priority !== undefined)
    conditions.push(eq(tasksTable.priority, priority));

  const query = db.select().from(tasksTable);

  if (conditions.length > 0) query.where(and(...conditions));

  return query;
}
