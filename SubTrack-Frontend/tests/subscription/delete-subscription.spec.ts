import test, { expect } from "@playwright/test";

test('should delete a new subscription', async ({ page }) => {
    await page.goto('http://localhost:4200/subscriptions');

    // create data first
  await page.getByRole('button', { name: 'Ajouter' }).click();
  await page.locator('input[formcontrolname="name"]').fill('Netflix Delete');
  await page.locator('[formcontrolname="cycle"]').click();
  await page.getByRole('option', { name: /monthly/i }).click();
  await page.locator('input[formcontrolname="price"]').fill('9.99');
  await page.locator('[formcontrolname="status"]').click();
  await page.getByRole('option', { name: /active/i }).click();
  await page.getByRole('button', { name: 'Save' }).click();

    //await expect(page.getByText('MM')).toBeVisible();
    const row = page.getByRole('row', { name: /Netflix delete/i });

    await expect(row).toBeVisible();
    //await page.getByRole('button', { name: 'Delete' }).click();
    await row.locator('button[matTooltip="Delete"]').click();
    await expect(page.getByText('Confirmation')).toBeVisible();
    await page.getByRole('button', { name: 'Delete' }).click();
    //await expect(page.getByText('Playwright Test')).not.toBeVisible();
    await expect(page.getByText(/Netflix Delete/i)).toHaveCount(0);
});