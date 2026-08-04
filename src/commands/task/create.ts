import { Command } from "commander";
import { creatTask } from "@/repositories/task.repository.js";
import {
  parseProjectId,
  parsePriority,
  parseEstimate,
  parseDate,
} from "./parser.js";

export const createTaskCommand = new Command("create")
  .description("Create a new task")
  .requiredOption("-p, --project <id>", "Project ID", parseProjectId)
  .requiredOption("-n, --name <name>", "Task name")
  .option("-d, --description <description>", "Task description")
  .option("--priority <priority>", "Task priority", parsePriority)
  .option("--estimate <minutes>", "Estimated duration", parseEstimate)
  .option("--due <date>", "Due date", parseDate)
  .action(async (options) => {
    await creatTask({
      projectId: options.project,
      ...options,
    });
  });
