// vitest.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json"], // Formats for terminal and browser
      include: ["src/**/*.{ts,tsx}"], // Only look for source files to avoid bloat
      exclude: ["src/**/*.test.{ts,tsx}", "src/types/**"], // Exclude test and type-only files
    },
  },
});
