import { InvalidArgumentError } from "commander";
import type { Priority } from "@/domain/task.types.js";
import type { TaskStatus } from "@/domain/task.constants.js";
import { taskStatuses } from "@/domain/task.constants.js";

const priorities = ["a", "b", "c", "d"] as const;

export const parseProjectId = (id: string): number => {
  const projectId = Number(id);
  if (!Number.isInteger(projectId) || projectId <= 0) {
    throw new InvalidArgumentError("Project ID must be a positive integer");
  }

  return projectId;
};

export const parsePriority = (value: string): Priority => {
  if (!priorities.includes(value as Priority)) {
    throw new InvalidArgumentError("Priority must be a | b | c | d");
  }

  return value as Priority;
};

export const parseDate = (value: string): Date => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new InvalidArgumentError("Invalid date");
  }

  return date;
};

export const parseEstimate = (value: string): number => {
  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?$/);

  if (!match) {
    throw new InvalidArgumentError("Estimate must look like 90m, 2h or 1h30m.");
  }

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);

  const total = hours * 60 + minutes;

  if (total <= 0) {
    throw new InvalidArgumentError("Estimate must be greater than zero.");
  }

  return total;
};

export const parseStatus = (value: string): string => {
  if (!taskStatuses.includes(value as TaskStatus)) {
    throw new InvalidArgumentError(
      "Status must be Not started, In progress, Review, Completed or Canceled",
    );
  }

  return value as TaskStatus;
};
