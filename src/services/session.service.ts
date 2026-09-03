import {
  createSession,
  findActiveSession,
  stopSession,
} from "@/repositories/session.repository.js";
import { InvalidArgumentError } from "commander";
import { resolveTask } from "./task.service.js";
import { getSessionDuration } from "@/domain/session.utils.js";
import { findTaskById } from "@/repositories/task.repository.js";

export async function startSession(taskIdentifier: string, comment?: string) {
  const task = await resolveTask(taskIdentifier);

  if (!task) {
    throw new InvalidArgumentError("Task not found");
  }

  const activeSession = await findActiveSession();

  if (activeSession) {
    throw new InvalidArgumentError(
      `There is already an active session for task #${activeSession.taskId}`,
    );
  }

  return createSession({
    taskId: task.id,
    comment,
  });
}

export async function stopActiveSession() {
  const activeSession = await findActiveSession();

  if (!activeSession) {
    throw new InvalidArgumentError("There is no active session");
  }

  const stoppedSession = await stopSession(activeSession.id);

  if (!stoppedSession) {
    throw new Error("Failed to stop session");
  }

  const durationMs = getSessionDuration({
    startedAt: stoppedSession.startedAt,
    endedAt: stoppedSession.endedAt!,
  });

  return {
    session: stoppedSession,
    durationMs,
  };
}

export async function currentActiveSession() {
  const activeSession = await findActiveSession();

  if (!activeSession) {
    throw new InvalidArgumentError("There is no active session");
  }

  const task = await findTaskById(activeSession.taskId);

  if (!task) {
    throw new InvalidArgumentError(
      `There is no task with ID #${activeSession.taskId}`,
    );
  }

  const durationMs = getSessionDuration({
    startedAt: activeSession.startedAt,
    endedAt: new Date(),
  });

  return {
    session: activeSession,
    task,
    durationMs,
  };
}
