import { createTable } from "@/utils/table.js";
import type { tasksTable } from "@/db/schema.js";

export function logTasks(tasks: (typeof tasksTable.$inferSelect)[]) {
  const table = createTable(["ID", "Name", "Status", "Priority"]);
  const rows = tasks.map((task) => [
    task.id,
    task.name,
    task.status,
    task.priority,
  ]);
  table.push(...rows);
  console.log(table.toString());
}
