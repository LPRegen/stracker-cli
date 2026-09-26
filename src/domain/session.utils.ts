import type { GetSessionDurationInput } from "@/domain/session.types.js";

/**
 * Function to calculate elapsed time between two dates
 * @param {string} startedAt - Start date
 * @returns { number } Total elapsed time in milliseconds
 */
export function getSessionDuration({
  startedAt,
  endedAt,
}: GetSessionDurationInput): number {
  return endedAt.getTime() - startedAt.getTime();
}

export function formatDuration(durationMs: number): string {
  const totalSeconds = Math.floor(durationMs / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}
