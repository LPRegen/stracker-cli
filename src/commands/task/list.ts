import { Command } from "commander";
import { listTasks } from "@/repositories/task.repository.js";
import { parsePriority, parseProjectId, parseStatus } from "./parser.js";
import { logTasks } from "./render.js";

export const listTasksCommand = new Command("list")
  .description("List tasks")
  .option("-p, --project-id <id>", "Filter by project", parseProjectId)
  .option("--status <status>", "Filter by status", parseStatus)
  .option("--priority <priority>", "Filter by priority", parsePriority)
  .action(async ({ projectId, status, priority }) => {
    const tasks = await listTasks({
      projectId: projectId,
      status: status,
      priority: priority,
    });

    if (tasks.length === 0) {
      console.log("There are no tasks");
      return;
    }

    logTasks(tasks);
  });
