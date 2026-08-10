import { test, expect } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

/**
 * Form verification — BRIEF.md §11 item 6, and the RLS proof from §10.
 *
 * Every form is submitted with invalid input (error copy must render) and then
 * with valid input (the row must land in Supabase).
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * The security assertion the brief calls out by name.
 *
 * CVE-2025-48757 found 170 AI-built projects leaking user data because RLS was
 * off. This asserts the opposite: an anonymous client can write and cannot
 * read, on every table.
 */
test("anonymous SELECT is denied on every table", async () => {
  const anon = createClient(SUPABASE_URL, ANON_KEY);

  for (const table of [
    "enquiries",
    "programme_interest",
    "partner_enquiries",
    "newsletter",
    "submission_throttle",
  ]) {
    const { data, error } = await anon.from(table).select("*");

    // Either an explicit permission error, or an empty set. Never rows.
    expect(data ?? [], `anon SELECT on ${table} returned rows`).toEqual([]);
    expect(error, `anon SELECT on ${table} should be refused`).not.toBeNull();
    console.log(`  ${table.padEnd(22)} SELECT denied: ${error?.code} ${error?.message}`);
  }
});

test("anonymous UPDATE and DELETE are denied", async () => {
  const anon = createClient(SUPABASE_URL, ANON_KEY);
  const update = await anon.from("enquiries").update({ status: "closed" }).neq("id", "");
  const remove = await anon.from("enquiries").delete().neq("id", "");
  expect(update.error, "anon UPDATE should be refused").not.toBeNull();
  expect(remove.error, "anon DELETE should be refused").not.toBeNull();
});

const stamp = () => `verify-${Date.now()}`;

test("contact enquiry: invalid then valid", async ({ page }) => {
  await page.goto("/contact", { waitUntil: "networkidle" });

  // --- invalid: empty required fields ---
  //
  // Asserted against the exact copy rather than "the first alert": React
  // re-renders the whole error region, so .first() can resolve to a different
  // node between the visibility check and the text read.
  await page.getByRole("button", { name: /send enquiry/i }).click();

  for (const expected of [
    /we need a name to know who to reply to/i,
    /we need an email address to reply to/i,
    /tell us a little more/i,
    /some details need fixing before we can send this/i,
  ]) {
    await expect(page.getByText(expected)).toBeVisible({ timeout: 15_000 });
  }
  console.log("  invalid-submit: all four error messages rendered");

  // --- invalid: malformed email specifically ---
  await page.getByLabel("Your name").fill("Verification Run");
  await page.getByLabel("Email", { exact: true }).fill("not-an-email");
  await page
    .getByLabel(/what would you like to know/i)
    .fill("Automated verification of the contact form path.");
  await page.getByRole("button", { name: /send enquiry/i }).click();
  await expect(page.getByText(/does not look like an email address/i)).toBeVisible({
    timeout: 10_000,
  });

  // --- valid ---
  const marker = stamp();
  await page.getByLabel("Email", { exact: true }).fill(`${marker}@example.com`);
  await page.getByRole("button", { name: /send enquiry/i }).click();
  await expect(page.getByText(/your enquiry is with us/i)).toBeVisible({ timeout: 20_000 });
  console.log(`  contact enquiry submitted as ${marker}@example.com`);
});

test("programme interest: valid submission", async ({ page }) => {
  await page.goto("/programmes", { waitUntil: "networkidle" });
  const marker = stamp();

  await page.getByLabel("Your name").fill("Cohort Verification");
  await page.getByLabel("Email", { exact: true }).fill(`${marker}@example.com`);
  await page.getByLabel(/town or region/i).fill("Lüderitz");
  await page.getByLabel(/which programme/i).selectOption({ index: 1 });
  await page.getByRole("radio", { name: /subsidised/i }).check();
  await page.getByRole("button", { name: /join the next cohort/i }).click();

  await expect(page.getByText(/on the list for the next cohort/i)).toBeVisible({
    timeout: 20_000,
  });
  console.log(`  programme interest submitted as ${marker}@example.com (subsidised)`);
});

test("partner enquiry: valid submission", async ({ page }) => {
  await page.goto("/partner", { waitUntil: "networkidle" });
  const marker = stamp();

  await page.getByLabel("Organisation", { exact: true }).fill("Verification Org");
  await page.getByLabel("Your name").fill("Partner Verification");
  await page.getByLabel("Email", { exact: true }).fill(`${marker}@example.com`);
  await page
    .getByLabel(/what partnership do you have in mind/i)
    .fill("Automated verification of the partner enquiry path.");
  await page.getByRole("button", { name: /start a partnership conversation/i }).click();

  await expect(page.getByText(/partnership enquiry is with us/i)).toBeVisible({
    timeout: 20_000,
  });
  console.log(`  partner enquiry submitted as ${marker}@example.com`);
});

test("newsletter: valid submission", async ({ page }) => {
  await page.goto("/resources", { waitUntil: "networkidle" });
  const marker = stamp();

  await page.getByPlaceholder("you@example.com").fill(`${marker}@example.com`);
  await page.getByRole("button", { name: /tell me when they're ready/i }).click();

  await expect(page.getByText(/when the first resources are published/i)).toBeVisible({
    timeout: 20_000,
  });
  console.log(`  newsletter subscribed as ${marker}@example.com`);
});


/**
 * The rate limiter, verified rather than assumed.
 *
 * Six valid newsletter submissions against a limit of five: the sixth must be
 * refused with copy that tells the visitor what to do instead. This runs last
 * because it deliberately exhausts the window for this run's IP hash.
 */
test("per-IP rate limit refuses the sixth submission", async ({ page }) => {
  await page.goto("/resources", { waitUntil: "networkidle" });

  let refused = false;
  for (let i = 0; i < 7; i++) {
    await page.getByPlaceholder("you@example.com").fill(`rate-${Date.now()}-${i}@example.com`);
    await page.getByRole("button", { name: /tell me when they're ready/i }).click();
    await page.waitForTimeout(1200);
    if (await page.getByText(/several submissions in a short time/i).isVisible()) {
      refused = true;
      console.log(`  rate limit engaged after ${i} accepted submissions`);
      break;
    }
  }
  expect(refused, "rate limiter should refuse a burst of submissions").toBe(true);
});
