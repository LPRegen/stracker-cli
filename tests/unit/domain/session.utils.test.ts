import { formatDuration, getSessionDuration } from "@/domain/session.utils.js";
import { describe, expect, it } from "vitest";

describe("getSessionDuration", () => {
  it("calculates elapsed time between two dates", () => {
    const startedAt = new Date("2026-09-03T10:00:00");
    const endedAt = new Date("2026-09-03T11:30:00");

    expect(getSessionDuration({ startedAt, endedAt })).toBe(90 * 60 * 1000);
  });
});

describe("formatDuration", () => {
  it("formats milliseconds as hours, minutes and seconds", () => {
    expect(
      formatDuration(1 * 60 * 60 * 1000 + 23 * 60 * 1000 + 42 * 1000),
    ).toBe("1h 23m 42s");
  });

  it("handles duration shorter than one hour", () => {
    expect(formatDuration(3 * 60 * 1000 + 5 * 1000)).toBe("0h 3m 5s");
  });

  it("handles zero duration", () => {
    expect(formatDuration(0)).toBe("0h 0m 0s");
  });
});
