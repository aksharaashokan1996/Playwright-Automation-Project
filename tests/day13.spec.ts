import { test, expect } from '@playwright/test';

test('Check Admin Panel', async ({ page }) => {
  await page.goto('/web/index.php/admin/viewSystemUsers');

  // Using the specific class name to avoid the strict mode error
  await expect(page.locator('.oxd-topbar-header-breadcrumb-level')).toHaveText('User Management', { timeout: 15000 });
  
  await expect(page).toHaveURL(/admin/);
});

