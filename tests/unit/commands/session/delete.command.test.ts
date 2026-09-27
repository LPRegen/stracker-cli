import { deleteSessionCommand } from "@/commands/session/delete.js";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { deleteSession } from "@/services/session.service.js";
import { deletedSessionFixture } from "../../../fixtures/session.fixture.js";
import { InvalidArgumentError } from "commander";

vi.mock("@/services/session.service.js", () => ({
  deleteSession: vi.fn(),
}));

const mockedDeleteSession = vi.mocked(deleteSession);

describe("delete session command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deletes the specified session and displays its data", async () => {
    const sessionId = deletedSessionFixture.id;

    mockedDeleteSession.mockResolvedValue(deletedSessionFixture);

    const consoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

    await deleteSessionCommand.parseAsync(["node", "stracker", "5"]);

    expect(deleteSession).toHaveBeenCalledWith(sessionId);
    expect(consoleLog).toHaveBeenCalledWith(`Deleted session #${sessionId}`);

    consoleLog.mockRestore();
  });

  it("propagates error when the session cannot be deleted", async () => {
    mockedDeleteSession.mockRejectedValue(
      new InvalidArgumentError("There is no session with ID #99"),
    );

    await expect(
      deleteSessionCommand.parseAsync(["node", "stracker", "99"]),
    ).rejects.toThrow("There is no session with ID #99");

    expect(deleteSession).toHaveBeenCalledWith(99);
  });
});
