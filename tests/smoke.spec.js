import { test, expect } from "@playwright/test";

test("App loads successfully", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Traveller's")).toBeVisible();
  await expect(page.getByText("Handbook")).toBeVisible();
});

test("Holidays page shows dropdown and reacts to selection", async ({ page }) => {
  await page.goto("/");

  const holidaysLink = page.getByRole("link", { name: /holidays/i });
  if (await holidaysLink.count()) {
    await holidaysLink.first().click();
  }

  const dropdown = page.locator("select").first();
  await expect(dropdown).toBeVisible();

  await dropdown.selectOption({ label: "Telangana" });

  await expect(
    page.getByRole("button", { name: /view|itinerary|explore/i })
  ).toBeVisible();
});
