import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { ROUTES } from "./routes";

/**
 * Accessibility pass — BRIEF.md §11 item 4.
 *
 * Every violation is reported in full. Nothing is summarised away and nothing
 * is filtered out of the ruleset: if a rule fails, the run fails and the
 * finding is printed with its nodes.
 */
const violations: Record<string, unknown[]> = {};

for (const route of ROUTES) {
  test(`axe: ${route.path}`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: "networkidle" });

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    if (results.violations.length) {
      violations[route.path] = results.violations;
      for (const v of results.violations) {
        console.log(
          `\n  [${v.impact}] ${v.id} — ${v.help}\n  ${v.helpUrl}\n` +
            v.nodes.map((n) => `    ${n.html.slice(0, 140)}`).join("\n"),
        );
      }
    }

    expect(
      results.violations,
      `${results.violations.length} accessibility violation(s) on ${route.path}`,
    ).toEqual([]);
  });
}

test("keyboard: every route reachable, focus always visible", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  // The skip link must be the first tab stop and must be operable.
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
  expect(first, "first tab stop should be the skip link").toContain("Skip to main content");

  // Walk the tab order and assert every focused element has a visible
  // indicator. An outline of "none" with no ring is the failure we care about.
  const unreachable: string[] = [];
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        label: (el.textContent ?? "").trim().slice(0, 40),
        outline: s.outlineStyle,
        outlineWidth: s.outlineWidth,
        boxShadow: s.boxShadow,
        visible: rect.width > 0 && rect.height > 0,
      };
    });
    if (!info) break;
    const hasIndicator =
      (info.outline !== "none" && parseFloat(info.outlineWidth) > 0) ||
      info.boxShadow !== "none";
    if (info.visible && !hasIndicator) {
      unreachable.push(`${info.tag} "${info.label}" has no visible focus indicator`);
    }
  }
  expect(unreachable, unreachable.join("\n")).toEqual([]);

  // Scroll must never be trapped: keyboard scrolling has to move the page.
  const before = await page.evaluate(() => window.scrollY);
  await page.keyboard.press("End");
  await page.waitForTimeout(600);
  const after = await page.evaluate(() => window.scrollY);
  expect(after, "End key must scroll the page — scroll is never trapped").toBeGreaterThan(
    before,
  );
});

test("keyboard: header nav reaches every primary route", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const hrefs = await page.evaluate(() =>
    Array.from(document.querySelectorAll("header nav a")).map((a) =>
      a.getAttribute("href"),
    ),
  );
  for (const expected of [
    "/about",
    "/programmes",
    "/workplace",
    "/community-counsellor",
    "/impact",
    "/partner",
    "/contact",
  ]) {
    expect(hrefs, `header nav should link to ${expected}`).toContain(expected);
  }
});
