import { startSession } from "@/services/session.service.js";
import { Command } from "commander";

export const startSessionCommand = new Command("start")
  .description("Start a session for a task")
  .argument("<task>", "Task ID or name")
  .option("-c, --comment <comment>", "Session comment")
  .action(async (task, { comment }) => {
    await startSession(task, comment);
    console.log("Task: ", task);
    console.log("Comment: ", comment);
  });
