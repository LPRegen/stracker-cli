import type { tasksTable } from "@/db/schema.js";
import type { TaskPriority, TaskStatus } from "@/domain/task.constants.js";

export type CreateTaskInput = typeof tasksTable.$inferInsert;
export type Priority = "a" | "b" | "c" | "d";

export interface TaskFilters {
  projectId?: number;
  status?: TaskStatus;
  priority?: TaskPriority;
}
