import { test } from "@playwright/test";

test("Take homepage screenshot", async ({ page }) => {
  await page.goto("https://travellers-handbook.ue.r.appspot.com");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "homepage.png", fullPage: true });
});
