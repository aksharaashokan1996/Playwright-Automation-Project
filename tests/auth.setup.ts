import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/web/index.php/auth/login');
  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();

  // Wait for the Dashboard title to be visible (more stable than URL)
await page.locator('.oxd-topbar-header-breadcrumb h6').first().waitFor({ state: 'visible', timeout: 15000 });  
  await page.context().storageState({ path: authFile });
});