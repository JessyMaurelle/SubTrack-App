import test, { expect } from "@playwright/test";

test('should filter subscriptions', async ({ page }) => {
  await page.goto('http://localhost:4200/subscriptions');

  await page.getByPlaceholder(/ex: netflix/i).fill('Netflix');
  //await page.getByLabel('Search').fill('Netflix');

  await expect(page.getByText('Netflix')).toBeVisible();
});