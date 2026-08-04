import type { tasksTable } from "@/db/schema.js";

export type CreateTaskInput = typeof tasksTable.$inferInsert;
export type Priority = "low" | "medium" | "high";
