import test, { expect } from "@playwright/test";

test('should edit a subscription', async ({ page }) => {
  await page.goto('http://localhost:4200/subscriptions');

    // create data first
  await page.getByRole('button', { name: 'Ajouter' }).click();
  await page.locator('input[formcontrolname="name"]').fill('Netflix Edit');
  await page.locator('[formcontrolname="cycle"]').click();
  await page.getByRole('option', { name: /monthly/i }).click();
  await page.locator('input[formcontrolname="price"]').fill('9.99');
  await page.locator('[formcontrolname="status"]').click();
  await page.getByRole('option', { name: /active/i }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  //await page.getByText('Netflix').click();
  const row = page.getByRole('row', { name: /Netflix edit/i });

    await expect(row).toBeVisible();

  await row.locator('button[matTooltip="Update"]').click();
  await expect(page.getByText('Edit a Subscription')).toBeVisible();

  await page.locator('input[formcontrolname="name"]').fill('Amazon Prime Video');

  await page.getByRole('button', { name: /save/i }).click();

  await expect(page.getByText('Amazon Prime Video')).toBeVisible();
});