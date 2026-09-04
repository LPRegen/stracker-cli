import { parsePriority } from "@/commands/task/parser.js";
import { describe, expect, it } from "vitest";

describe("parsePriority", () => {
  it("accepts valid priorities", () => {
    expect(parsePriority("a")).toBe("a");
  });

  it("ignores capital letters", () => {
    expect(parsePriority("A")).toBe("a");
  });

  it("rejects invalid priorities", () => {
    expect(() => parsePriority("now")).toThrow();
  });
});
