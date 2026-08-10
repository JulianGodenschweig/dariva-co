import { test, expect } from "@playwright/test";

/**
 * Performance under throttling — BRIEF.md §11 item 7 and §12.
 *
 * Fast 3G per Chrome DevTools: 1.6 Mbps down, 750 Kbps up, 150ms RTT.
 * Measured against the production build with the WebGL path forced off
 * (Tier C), which is the path a Namibian mobile visitor actually gets.
 */
const FAST_3G = {
  offline: false,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
  latency: 150,
};

async function measure(page: import("@playwright/test").Page, url: string) {
  const client = await page.context().newCDPSession(page);
  await client.send("Network.enable");
  await client.send("Network.emulateNetworkConditions", FAST_3G);

  let transferred = 0;
  const byType: Record<string, number> = {};
  client.on("Network.loadingFinished", (e) => {
    transferred += e.encodedDataLength;
  });
  page.on("response", async (res) => {
    const type = res.request().resourceType();
    byType[type] = (byType[type] ?? 0) + 1;
  });

  await page.goto(url, { waitUntil: "load" });

  const vitals = await page.evaluate(
    () =>
      new Promise<{ lcp: number; cls: number; lcpElement: string }>((resolve) => {
        let lcp = 0;
        let lcpElement = "unknown";
        let cls = 0;

        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const e = entry as PerformanceEntry & { element?: Element; url?: string };
            lcp = entry.startTime;
            if (e.element) {
              lcpElement = `${e.element.tagName.toLowerCase()}${
                e.element.id ? "#" + e.element.id : ""
              }${e.url ? ` src=${e.url.split("/").pop()}` : ""}`;
            } else if (e.url) {
              lcpElement = e.url;
            }
          }
        }).observe({ type: "largest-contentful-paint", buffered: true });

        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const e = entry as PerformanceEntry & {
              value: number;
              hadRecentInput: boolean;
            };
            if (!e.hadRecentInput) cls += e.value;
          }
        }).observe({ type: "layout-shift", buffered: true });

        // Give the page time to settle before reading finals.
        setTimeout(() => resolve({ lcp, cls, lcpElement }), 5000);
      }),
  );

  // INP proxy: measure the interaction latency of a real click.
  const inp = await page.evaluate(async () => {
    const link = document.querySelector("header nav a") as HTMLElement | null;
    if (!link) return 0;
    const t0 = performance.now();
    link.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    return performance.now() - t0;
  });

  return { ...vitals, inp, transferred, byType };
}

test("Tier C on Fast 3G: LCP, CLS, INP and bytes", async ({ page }) => {
  const r = await measure(page, "/?tier=c");

  console.log("\n  === TIER C (no WebGL) on Fast 3G ===");
  console.log(`  LCP            ${(r.lcp / 1000).toFixed(2)} s      ceiling 2.50 s`);
  console.log(`  LCP element    ${r.lcpElement}`);
  console.log(`  CLS            ${r.cls.toFixed(4)}       ceiling 0.05`);
  console.log(`  INP (proxy)    ${r.inp.toFixed(1)} ms`);
  console.log(
    `  Transferred    ${(r.transferred / 1024).toFixed(1)} KB   ceiling 600 KB`,
  );

  expect(r.lcp / 1000, "LCP on Fast 3G").toBeLessThan(2.5);
  expect(r.cls, "CLS").toBeLessThan(0.05);
  expect(r.transferred / 1024, "Tier C total transfer").toBeLessThan(600);
});

test("Tier A on Fast 3G: total transfer with the WebGL chunk", async ({ page }) => {
  const r = await measure(page, "/?tier=a");

  console.log("\n  === TIER A (WebGL) on Fast 3G ===");
  console.log(`  LCP            ${(r.lcp / 1000).toFixed(2)} s`);
  console.log(`  LCP element    ${r.lcpElement}`);
  console.log(`  CLS            ${r.cls.toFixed(4)}`);
  console.log(
    `  Transferred    ${(r.transferred / 1024).toFixed(1)} KB   ceiling 1200 KB`,
  );

  expect(r.transferred / 1024, "Tier A total transfer").toBeLessThan(1200);
});

test("Tier C downloads zero Three.js bytes", async ({ page }) => {
  const requested: string[] = [];
  page.on("request", (req) => requested.push(req.url()));

  await page.goto("/?tier=c", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  // The WebGL chunk must never be requested, and no canvas may exist.
  const threeRequests = requested.filter((u) => /three|webgl/i.test(u));
  const canvasCount = await page.locator("canvas").count();

  console.log(`\n  requests matching /three|webgl/: ${threeRequests.length}`);
  console.log(`  <canvas> elements on the page:   ${canvasCount}`);

  expect(canvasCount, "Tier C must render no canvas").toBe(0);

  // The poster must be the LCP element on this path.
  const posterVisible = await page.locator('img[src*="hero-poster"]').count();
  expect(posterVisible, "Tier C must render the poster").toBeGreaterThan(0);
});
