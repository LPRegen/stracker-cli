export const taskStatuses = [
  "Not started",
  "In progress",
  "Review",
  "Completed",
  "Canceled",
] as const;

export type TaskStatus = (typeof taskStatuses)[number];

export const taskPriorities = ["Low", "Medium", "High"] as const;

export type TaskPriority = (typeof taskPriorities)[number];
