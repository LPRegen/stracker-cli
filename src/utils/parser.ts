import { InvalidArgumentError } from "commander";

export function parsePositiveInteger(value: string): number {
  const number = Number(value);

  if (!Number.isInteger(number) || number <= 0) {
    throw new InvalidArgumentError(
      `"${value}" is not a valid positive integer`,
    );
  }

  return number;
}

export function parseInstant(value: string) {
  try {
    return Temporal.Instant.from(value);
  } catch {
    throw new InvalidArgumentError(
      `Invalid instant "${value}. Provide an ISO 8601 timestamp with a timezone.`,
    );
  }
}
