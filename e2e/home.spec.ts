import { test, expect } from "@playwright/test";

test("homepage renders the site title", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Deep Dive AI" }),
  ).toBeVisible();
});
