import { getSessionDuration } from "@/domain/session.utils.js";
import {
  createSession,
  findActiveSession,
  stopSession,
} from "@/repositories/session.repository.js";
import { findTaskById } from "@/repositories/task.repository.js";
import {
  currentActiveSession,
  startSession,
  stopActiveSession,
} from "@/services/session.service.js";
import { resolveTask } from "@/services/task.service.js";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { taskFixture } from "../../fixtures/task.fixture.js";
import {
  activeSessionFixture,
  sessionFixture,
  stoppedSessionFixture,
} from "../../fixtures/session.fixture.js";

// Domain
vi.mock("@/domain/session.utils.js", () => ({
  getSessionDuration: vi.fn(),
}));

// Repositories
vi.mock("@/repositories/task.repository.js", () => ({
  findTaskById: vi.fn(),
}));
vi.mock("@/repositories/session.repository.js", () => ({
  createSession: vi.fn(),
  findActiveSession: vi.fn(),
  stopSession: vi.fn(),
}));

// Services
vi.mock("@/services/task.service.js", () => ({
  resolveTask: vi.fn(),
}));

const mockedResolveTask = vi.mocked(resolveTask);
const mockedFindActiveSession = vi.mocked(findActiveSession);
const mockedCreateSession = vi.mocked(createSession);
const mockedFindTaskById = vi.mocked(findTaskById);
const mockedGetSessionDuration = vi.mocked(getSessionDuration);
const mockedStopSession = vi.mocked(stopSession);

describe("startSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws when the task does not exist", async () => {
    mockedResolveTask.mockResolvedValue(undefined);

    await expect(startSession("99")).rejects.toThrow("Task not found");

    expect(mockedFindActiveSession).not.toHaveBeenCalled();
    expect(mockedCreateSession).not.toHaveBeenCalled();
  });

  it("throws when there is already an active session", async () => {
    mockedResolveTask.mockResolvedValue(taskFixture);

    mockedFindActiveSession.mockResolvedValue(activeSessionFixture);

    await expect(startSession("4")).rejects.toThrow(
      `There is already an active session for task #${activeSessionFixture.taskId}`,
    );

    expect(mockedCreateSession).not.toHaveBeenCalled();
  });

  it("creates a session when the given task exists and no session is active", async () => {
    mockedResolveTask.mockResolvedValue(taskFixture);

    mockedFindActiveSession.mockResolvedValue(undefined);

    mockedCreateSession.mockResolvedValue(sessionFixture);

    const result = await startSession(
      String(taskFixture.id),
      "testing the CLI",
    );

    expect(mockedCreateSession).toHaveBeenCalledWith({
      taskId: taskFixture.id,
      comment: "testing the CLI",
    });

    expect(result).toEqual(sessionFixture);
  });
});

describe("currentActiveSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws when there is no active session", async () => {
    mockedFindActiveSession.mockResolvedValue(undefined);

    await expect(currentActiveSession()).rejects.toThrow(
      "There is no active session",
    );

    expect(mockedFindTaskById).not.toHaveBeenCalled();
  });

  it("throws when the active session's task does not exist", async () => {
    mockedFindActiveSession.mockResolvedValue(activeSessionFixture);

    mockedFindTaskById.mockResolvedValue(undefined);

    await expect(currentActiveSession()).rejects.toThrow(
      `There is no task with ID #${activeSessionFixture.taskId}`,
    );

    expect(mockedGetSessionDuration).not.toHaveBeenCalled();
  });

  it("returns the active session, task and elapsed duration", async () => {
    mockedFindActiveSession.mockResolvedValue(activeSessionFixture);

    mockedFindTaskById.mockResolvedValue(taskFixture);

    mockedGetSessionDuration.mockReturnValue(95800);

    const result = await currentActiveSession();

    expect(mockedGetSessionDuration).toHaveBeenCalledWith({
      startedAt: activeSessionFixture.startedAt,
      endedAt: expect.any(Date),
    });

    expect(result).toEqual({
      session: activeSessionFixture,
      task: taskFixture,
      durationMs: 95800,
    });
  });
});

describe("stopActiveSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws if there is no active session", async () => {
    mockedFindActiveSession.mockResolvedValue(undefined);

    await expect(stopActiveSession()).rejects.toThrow(
      "There is no active session",
    );

    expect(mockedStopSession).not.toHaveBeenCalled();
  });

  it("throws if it fails to stop the current session", async () => {
    mockedFindActiveSession.mockResolvedValue(activeSessionFixture);

    mockedStopSession.mockResolvedValue(undefined);

    await expect(stopActiveSession()).rejects.toThrow("Failed to stop session");

    expect(mockedGetSessionDuration).not.toHaveBeenCalled();
  });

  it("successfully stops active session", async () => {
    mockedFindActiveSession.mockResolvedValue(activeSessionFixture);

    mockedStopSession.mockResolvedValue(stoppedSessionFixture);

    mockedGetSessionDuration.mockReturnValue(95800);

    const result = await stopActiveSession();

    expect(mockedGetSessionDuration).toHaveBeenCalledWith({
      startedAt: activeSessionFixture.startedAt,
      endedAt: stoppedSessionFixture.endedAt,
    });

    expect(result).toEqual({
      durationMs: 95800,
      session: stoppedSessionFixture,
    });
  });
});
