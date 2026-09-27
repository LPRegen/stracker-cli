import { currentSessionCommand } from "@/commands/session/current.js";
import { currentActiveSession } from "@/services/session.service.js";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { activeSessionFixture } from "../../../fixtures/session.fixture.js";
import { taskFixture } from "../../../fixtures/task.fixture.js";

vi.mock("@/services/session.service.js", () => ({
  currentActiveSession: vi.fn(),
}));

const mockedCurrentActiveSession = vi.mocked(currentActiveSession);

describe("current command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("logs current active session successfully", async () => {
    mockedCurrentActiveSession.mockResolvedValue({
      session: activeSessionFixture,
      task: taskFixture,
      durationMs: 95800,
    });

    const consoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

    await currentSessionCommand.parseAsync(["node", "stracker"]);

    expect(mockedCurrentActiveSession).toHaveBeenCalledOnce();

    expect(consoleLog).toHaveBeenNthCalledWith(
      1,
      `Session #${activeSessionFixture.id} for Task '${taskFixture.name}'`,
    );

    expect(consoleLog).toHaveBeenNthCalledWith(2, `Elapsed time 0h 1m 35s`);

    consoleLog.mockRestore();
  });

  it("throws when there is no active session", async () => {
    mockedCurrentActiveSession.mockRejectedValue(
      new Error("There is no active session"),
    );

    await expect(
      currentSessionCommand.parseAsync(["node", "stracker"]),
    ).rejects.toThrow("There is no active session");
  });
});
