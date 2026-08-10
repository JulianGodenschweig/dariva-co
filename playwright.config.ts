import { defineConfig, devices } from "@playwright/test";

/**
 * Verification harness — BRIEF.md §11.
 *
 * Runs against a production build, not the dev server: dev ships unminified
 * bundles and no compression, so every byte and timing number would be wrong.
 */
// Each verification run gets its own rate-limit namespace. Without this the
// per-IP limiter carries over between runs and fails honest tests.
process.env.IP_HASH_SALT = `verify-${Date.now()}`;

export default defineConfig({
  testDir: "./tests",
  outputDir: "./test-results",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"], ["json", { outputFile: "test-results/report.json" }]],
  timeout: 90_000,
  use: {
    baseURL: process.env.VERIFY_URL ?? "http://127.0.0.1:3000",
    trace: "off",
    launchOptions: {
      // This container ships Chromium build 1194; @playwright/test 1.62 expects
      // 1234 and would try to download it. Point at the installed binary.
      executablePath:
        process.env.CHROME_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
      // Software GL so the Tier A/B WebGL path can actually be exercised in a
      // headless container. Without this getContext('webgl2') returns null and
      // every run would silently verify only Tier C.
      args: [
        "--use-gl=angle",
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
        "--no-sandbox",
      ],
    },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.VERIFY_URL
    ? undefined
    : {
        command: "npm run start",
        url: "http://127.0.0.1:3000",
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
