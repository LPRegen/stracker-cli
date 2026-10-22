import { startSession } from "@/services/session.service.js";
import { Command } from "commander";

export const startSessionCommand = new Command("start")
  .description("Start a session for a task")
  .argument("<task>", "Task ID or name")
  .option("-c, --comment <comment>", "Session comment")
  .action(async (task, { comment }) => {
    const session = await startSession(task, comment);

    // TODO: Return also the name of the task, e.g. `#5 - Exchange Rates`
    if (session) {
      const { id, taskId, startedAt } = session;

      console.log(`
  Session started successfully:
     Session          #${id}
     Associated task: #${taskId}
     Comment:         ${comment ?? "(No comment)"}
     Started:         ${startedAt}
      `);
    }
  });
