// playwright.config.js
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 1,
  use: {
    headless: true,
    baseURL: "https://travellers-handbook.ue.r.appspot.com",
  },
  reporter: [["list"]],
});
