import {
  createSession,
  findActiveSession,
} from "@/repositories/session.repository.js";
import { InvalidArgumentError } from "commander";
import { resolveTask } from "./task.service.js";

export async function startSession(taskIdentifier: string, comment?: string) {
  const task = await resolveTask(taskIdentifier);

  if (!task) {
    throw new InvalidArgumentError("Task not found");
  }

  const activeSession = await findActiveSession();

  if (activeSession) {
    console.log(
      `
There is already an active session for task #${activeSession.taskId}
`,
    );
    throw new InvalidArgumentError(
      `There is already an active session for task #${activeSession.taskId}`,
    );
  }

  return createSession({
    taskId: task.id,
    comment,
  });
}
