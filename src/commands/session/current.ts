import { formatDuration } from "@/domain/session.utils.js";
import { currentActiveSession } from "@/services/session.service.js";
import { Command } from "commander";

export const currentSessionCommand = new Command("current")
  .description("Display the current active session")
  .action(async () => {
    const currentSession = await currentActiveSession();

    if (!currentSession) {
      console.log("No active session");
      return;
    }

    const { session, task, durationMs } = currentSession;

    console.log(`Session #${session.id} for Task '${task.name}'`);
    console.log(`Elapsed time ${formatDuration(durationMs)}`);
  });
