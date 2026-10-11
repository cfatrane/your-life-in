import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://127.0.0.1:3075",
    locale: "fr-FR",
    timezoneId: "Europe/Paris",
  },
  webServer: {
    command: "bun run dev --port 3075",
    url: "http://127.0.0.1:3075",
    reuseExistingServer: !process.env.CI,
  },
});
