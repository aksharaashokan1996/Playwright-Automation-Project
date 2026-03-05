import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();

  // 1. Instead of waiting for URL, wait for the Dashboard heading to be visible
  // This confirms the page has fully loaded
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 15000 });

  // 2. Double check the URL now that we know the element is there
  await expect(page).toHaveURL(/.*dashboard.*/);

  // 3. Save the state
  await page.context().storageState({ path: authFile });
});