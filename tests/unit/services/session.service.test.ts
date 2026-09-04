import type { Session } from "@/domain/session.types.js";
import type { Task } from "@/domain/task.types.js";
import {
  createSession,
  findActiveSession,
} from "@/repositories/session.repository.js";
import { startSession } from "@/services/session.service.js";
import { resolveTask } from "@/services/task.service.js";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/repositories/session.repository.js", () => ({
  createSession: vi.fn(),
  findActiveSession: vi.fn(),
}));
vi.mock("@/services/task.service.js", () => ({
  resolveTask: vi.fn(),
}));

const mockedResolveTask = vi.mocked(resolveTask);
const mockedFindActiveSession = vi.mocked(findActiveSession);
const mockedCreateSession = vi.mocked(createSession);

const taskFixture: Task = {
  id: 4,
  projectId: 4,
  name: "task",
  description: "description",
  completedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  estimatedDurationMinutes: 40,
  estimatedEndDate: null,
  status: "review",
  priority: "b",
};

const sessionFixture: Session = {
  id: 9,
  taskId: 4,
  comment: "testing the CLI",
  startedAt: new Date(),
  endedAt: null,
};

describe("startSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws when the task does not exist", async () => {
    mockedResolveTask.mockResolvedValue(undefined);

    await expect(startSession("99")).rejects.toThrow("Task not found");

    expect(findActiveSession).not.toHaveBeenCalled();
    expect(createSession).not.toHaveBeenCalled();
  });

  it("throws when there is already an active session", async () => {
    mockedResolveTask.mockResolvedValue(taskFixture);

    mockedFindActiveSession.mockResolvedValue({
      id: 5,
      taskId: 8,
      comment: null,
      startedAt: new Date(),
      endedAt: null,
    });

    await expect(startSession("4")).rejects.toThrow(
      "There is already an active session for task #8",
    );

    expect(createSession).not.toHaveBeenCalled();
  });

  it("creates a session when the given task exists and no session is active", async () => {
    mockedResolveTask.mockResolvedValue(taskFixture);

    mockedFindActiveSession.mockResolvedValue(undefined);

    mockedCreateSession.mockResolvedValue(sessionFixture);

    const result = await startSession("4", "testing the CLI");

    expect(mockedCreateSession).toHaveBeenCalledWith({
      taskId: 4,
      comment: "testing the CLI",
    });

    expect(result).toEqual(sessionFixture);
  });
});
