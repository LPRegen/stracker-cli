export const taskStatuses = [
  "not started",
  "in progress",
  "review",
  "completed",
  "canceled",
] as const;

export type TaskStatus = (typeof taskStatuses)[number];

export const taskPriorities = ["a", "b", "c", "d"] as const;

export type TaskPriority = (typeof taskPriorities)[number];
