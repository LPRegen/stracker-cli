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
