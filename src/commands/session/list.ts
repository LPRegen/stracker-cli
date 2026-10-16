import { Command } from "commander";
import { listSessions } from "@/services/session.service.js";
import { parsePositiveInteger } from "@/utils/parser.js";
import { formatDuration, getSessionDuration } from "@/domain/session.utils.js";

export const listSessionsCommand = new Command("list")
  .description("List sessions")
  .option(
    "-t, --task-id <task_id>",
    "ID of the task to get the sessions from",
    parsePositiveInteger,
  )
  .option(
    "-p, --project-id <project_id>",
    "ID of the project to get the sessions from",
    parsePositiveInteger,
  )
  .action(async ({ taskId, projectId }) => {
    const sessions = await listSessions({ taskId, projectId });
    let totalElapsedTime: number = 0;

    const heading =
      taskId !== undefined
        ? `Sessions for task #${taskId}:`
        : projectId !== undefined
          ? `Sessions for project #${projectId}:`
          : "All sessions:";

    if (sessions.length === 0) {
      console.log(
        taskId !== undefined
          ? `No sessions found for task #${taskId}.`
          : projectId !== undefined
            ? `No sessions found for project #${projectId}.`
            : "No sessions found.",
      );
      return;
    }

    console.log(heading);

    // TODO:
    // - format dates consistently, remember to replace date with temporal
    sessions.forEach(({ id, comment, startedAt, endedAt }) => {
      const timeMs = endedAt ? getSessionDuration({ startedAt, endedAt }) : 0;
      const elapsedTime = endedAt
        ? `Elapsed Time:  ${formatDuration(timeMs)}`
        : "";
      totalElapsedTime += timeMs;

      console.log(`
  #${id}   ${comment ?? "(No comment)"}
       Started: ${startedAt}
       Ended:   ${endedAt ?? "Active"}
       ${elapsedTime}
    `);
    });

    const total = sessions.length;
    console.log(`
  Total Sessions:     ${total} ${total === 1 ? "session" : "sessions"}
  Total Elapsed Time: ${formatDuration(totalElapsedTime)}
    `);
  });
