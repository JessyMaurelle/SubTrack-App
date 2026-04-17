import test, { expect } from "@playwright/test";

test('should create a new subscription', async ({ page }) => {
    //await expect(page).toHaveURL('http://localhost:4200/dashboard');
    await page.goto('http://localhost:4200/subscriptions');
    //await page.getByRole('button', { name: 'Subscriptions' }).click();
    await page.getByRole('button', { name: 'Ajouter' }).click();
    await expect(page.getByText('New Subscription')).toBeVisible();
    //await page.getByLabel('Name').fill('Netflix');
    await page.locator('input[formcontrolname="name"]').fill('Netflix');
    await page.locator('[formcontrolname="cycle"]').click();
        await page.getByRole('option', { name: /Monthly/i }).click();
    await page.locator('input[formcontrolname="price"]').fill('9.99');
    await page.locator('[formcontrolname="status"]').click();
        await page.getByRole('option', { name: /Active/i }).click();
    
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByText('Netflix')).toBeVisible();

});