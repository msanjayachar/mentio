console.log("CONFIG LOADED");

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["apps/backend/tests/**/*.test.ts"],
    globals: true,
    environment: "node",
    setupFiles: "./apps/backend/tests/setup.ts",
    isolate: true,
    fileParallelism: false,
  },
});
