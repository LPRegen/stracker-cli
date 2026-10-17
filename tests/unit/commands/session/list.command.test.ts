import { beforeEach, describe, expect, it, vi } from "vitest";
import { listSessionsCommand } from "@/commands/session/list.js";
import { listSessions } from "@/services/session.service.js";
import { InvalidArgumentError } from "commander";

vi.mock("@/services/session.service.js", () => ({
  listSessions: vi.fn(),
}));

const mockedListSessions = vi.mocked(listSessions);

describe("session list command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls `listSessions()` without options", async () => {
    mockedListSessions.mockResolvedValue([]);

    await listSessionsCommand.parseAsync(["node", "stracker"]);

    expect(mockedListSessions).toHaveBeenCalledWith({
      taskId: undefined,
      projectId: undefined,
    });
  });
  it("calls `listSessions()` with undefined `projectId` and supplied `taskId`", async () => {
    mockedListSessions.mockResolvedValue([]);

    await listSessionsCommand.parseAsync([
      "node",
      "stracker",
      "--task-id",
      "2",
    ]);

    expect(mockedListSessions).toHaveBeenCalledWith({
      taskId: 2,
      projectId: undefined,
    });
  });
  it("calls `listSessions()` with undefined `taskId` and supplied `projectId`", async () => {
    mockedListSessions.mockResolvedValue([]);

    await listSessionsCommand.parseAsync([
      "node",
      "stracker",
      "--project-id",
      "2",
    ]);

    expect(mockedListSessions).toHaveBeenCalledWith({
      taskId: undefined,
      projectId: 2,
    });
  });

  it("throws when `listSessions()` receives multiple options", async () => {
    mockedListSessions.mockRejectedValue(
      new InvalidArgumentError(
        "Specify either a task ID or a project ID, not both.",
      ),
    );

    await expect(
      listSessionsCommand.parseAsync([
        "node",
        "stracker",
        "--project-id",
        "2",
        "--task-id",
        "4",
      ]),
    ).rejects.toThrow("Specify either a task ID or a project ID, not both.");
  });
});
