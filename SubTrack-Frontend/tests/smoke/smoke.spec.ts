import { test, expect } from '@playwright/test'

test('app loads successfully', async ({page}) => {
    await page.goto('http://localhost:4200');

    //await expect(page).toHaveTitle(/SubtrackApp/i)
    await expect(page.getByText(/SubtrackApp/i)).toBeVisible();
})
