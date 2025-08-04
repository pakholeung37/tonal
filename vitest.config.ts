import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/test.ts", "**/*.test.ts"],
    coverage: {
      provider: "v8",
      exclude: ["node_modules/", "dist/", "build/", "coverage/", "site/**"],
    },
  },
});
