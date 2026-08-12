import {
  findTaskById,
  findTasksByName,
} from "@/repositories/task.repository.js";
import { InvalidArgumentError } from "commander";

export async function resolveTask(identifier: string) {
  const id = Number(identifier);

  if (Number.isInteger(id) && id > 0) {
    return findTaskById(id);
  }

  const tasks = await findTasksByName(identifier);

  if (tasks.length === 0) {
    return undefined;
  }

  if (tasks.length > 1) {
    throw new InvalidArgumentError(
      `Multiple tasks found with the name "${identifier}"`,
    );
  }

  return tasks[0];
}
