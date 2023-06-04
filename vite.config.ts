import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    globals: true,
    setupFiles: ["dotenv/config"], //this line,
  },
});
