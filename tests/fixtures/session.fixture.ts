import type { Session } from "@/domain/session.types.js";

export const sessionFixture: Session = {
  id: 9,
  taskId: 4,
  comment: "testing the CLI",
  startedAt: new Date("2026-09-07T00:00:00.000Z"),
  endedAt: null,
};

export const activeSessionFixture: Session = {
  id: 5,
  taskId: 4,
  comment: null,
  startedAt: new Date("2026-09-07T00:00:00.000Z"),
  endedAt: null,
};

export const stoppedSessionFixture: Session = {
  ...activeSessionFixture,
  endedAt: new Date("2026-09-07T00:00:10.000Z"),
};
