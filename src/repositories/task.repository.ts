import { db } from "@/db/client.js";
import { tasksTable } from "@/db/schema.js";
import type { CreateTaskInput } from "@/domain/task.types.js";

export async function creatTask({ projectId, name }: CreateTaskInput) {
  const [task] = await db
    .insert(tasksTable)
    .values({ projectId, name })
    .returning();

  return task;
}
