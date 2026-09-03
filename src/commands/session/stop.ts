import { formatDuration } from "@/domain/session.utils.js";
import { stopActiveSession } from "@/services/session.service.js";
import { Command } from "commander";

export const stopSessionCommand = new Command("stop")
  .description("Stop tracking a session")
  .action(async () => {
    const { session, durationMs } = await stopActiveSession();
    console.log(`Session for taskId #${session.taskId} stopped`);
    console.log(`Duration: ${formatDuration(durationMs)}`);
  });
