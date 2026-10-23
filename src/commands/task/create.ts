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
    // FIX: create service function to orchestrate repo functions
    const task = await creatTask({
      projectId: options.project,
      ...options,
    });

    if (task) {
      const {
        id,
        name,
        description,
        projectId,
        status,
        priority,
        estimatedDurationMinutes,
        estimatedEndDate,
      } = task;
      console.log(`
  Task created successfully:
     Task                #${id}
     Name:                ${name}
     Associated project: #${projectId}
     Comment:             ${description ?? "(No description)"}
     Status:              ${status}
     Priority:            ${priority}
     Estimated duration:  ${estimatedDurationMinutes}
     Estimated end date:  ${estimatedEndDate}
      `);
    }
  });
