import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // 1. Go to login
  await page.goto('/web/index.php/auth/login');

  // 2. Login
  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();

  // 3. FIX: Wait for the Dashboard title to appear in the top bar
  // We use a locator that looks for the text 'Dashboard' anywhere in the topbar
  const dashboardHeader = page.locator('.oxd-topbar-header-breadcrumb h6');
  await dashboardHeader.waitFor({ state: 'visible', timeout: 15000 });

  // 4. Verify URL and Save
  await expect(page).toHaveURL(/.*dashboard.*/);
  await page.context().storageState({ path: authFile });
});