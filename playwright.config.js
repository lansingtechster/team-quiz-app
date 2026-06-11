// Playwright configuration for the end-to-end tests.
// `npm run test:e2e` starts a small web server, opens the quiz in a
// real (headless) Chromium browser, and plays through it like a student would.

const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:8080",
    trace: "on-first-retry",
  },
  retries: process.env.CI ? 1 : 0,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npx http-server -p 8080 -c-1 --silent",
    url: "http://localhost:8080",
    reuseExistingServer: !process.env.CI,
  },
});
