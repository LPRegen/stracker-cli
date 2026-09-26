import type { Task } from "@/domain/task.types.js";

export const taskFixture: Task = {
  id: 4,
  projectId: 4,
  name: "task",
  description: "description",
  completedAt: null,
  createdAt: new Date("2026-09-07T00:00:00.000Z"),
  updatedAt: new Date("2026-09-07T00:00:00.000Z"),
  estimatedDurationMinutes: 40,
  estimatedEndDate: null,
  status: "review",
  priority: "b",
};
