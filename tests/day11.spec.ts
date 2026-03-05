import { test, expect } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } }); // Clear state

test('Codegen Test', async ({ page }) => {
  await page.goto('/web/index.php/auth/login');
  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();

  // Give the CI 15 seconds to reach the dashboard
  await expect(page).toHaveURL(/.*dashboard.*/, { timeout: 15000 });
});