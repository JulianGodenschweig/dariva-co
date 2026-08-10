import { test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { ROUTES, BREAKPOINTS } from "./routes";

const DIR = "screenshots";

test.beforeAll(async () => {
  await mkdir(DIR, { recursive: true });
});

/** Four breakpoints × twelve routes — BRIEF.md §11 item 1. */
for (const bp of BREAKPOINTS) {
  test(`screenshots @ ${bp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: bp.width, height: bp.height });
    for (const route of ROUTES) {
      await page.goto(route.path, { waitUntil: "networkidle" });
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `${DIR}/${route.name}__${bp.name}.png`,
        fullPage: true,
      });
    }
  });
}

/** Three scroll states on the hero — BRIEF.md §11 item 2. */
test("hero at start, mid-scroll and end", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  // The hero is 400vh with a sticky viewport inside it, so its scrollable
  // range is height - viewport. Scrolling to a fraction of the raw height
  // overshoots straight past the sequence into the next section.
  const range = await page.evaluate(() => {
    const el = document.querySelector("[data-tier]") as HTMLElement | null;
    return el ? el.clientHeight - window.innerHeight : 0;
  });

  for (const [label, fraction] of [
    ["01-start", 0],
    ["02-mid", 0.5],
    ["03-end", 0.98],
  ] as const) {
    await page.evaluate((y) => window.scrollTo(0, y), range * fraction);
    await page.waitForTimeout(1800);
    await page.screenshot({ path: `${DIR}/hero-scroll-${label}.png` });
  }
});

/** Reduced motion is a designed state — BRIEF.md §11 item 3. */
test("reduced-motion, forced", async ({ browser }) => {
  const context = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  for (const route of ROUTES) {
    await page.goto(route.path, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    await page.screenshot({
      path: `${DIR}/reduced-motion__${route.name}.png`,
      fullPage: true,
    });
  }
  await context.close();
});

/** All three hero tiers, forced, so each can be seen on one machine. */
test("hero tiers A, B and C", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const tier of ["a", "b", "c"] as const) {
    await page.goto(`/?tier=${tier}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${DIR}/hero-tier-${tier}.png` });
  }
});
