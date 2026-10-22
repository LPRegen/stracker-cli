import { formatDuration } from "@/domain/session.utils.js";
import { stopActiveSession } from "@/services/session.service.js";
import { Command } from "commander";

export const stopSessionCommand = new Command("stop")
  .description("Stop tracking a session")
  .action(async () => {
    const { session, durationMs } = await stopActiveSession();

    const { id, taskId, comment, startedAt, endedAt } = session;

    console.log(`
  Session stoped successfully:
     Session          #${id}
     Associated task: #${taskId}
     Comment:         ${comment ?? "(No comment)"}
     Started:         ${startedAt}
     Ended:           ${endedAt}
     Elapsed time:    ${formatDuration(durationMs)}
      `);
  });
