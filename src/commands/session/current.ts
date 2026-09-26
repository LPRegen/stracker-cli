import { formatDuration } from "@/domain/session.utils.js";
import { currentActiveSession } from "@/services/session.service.js";
import { Command } from "commander";

export const currentSessionCommand = new Command("current")
  .description("Display the current active session")
  .action(async () => {
    const { session, task, durationMs } = await currentActiveSession();

    console.log(`Session #${session.id} for Task '${task.name}'`);
    console.log(`Elapsed time ${formatDuration(durationMs)}`);
  });
