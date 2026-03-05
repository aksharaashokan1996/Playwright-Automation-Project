import { test, expect } from '@playwright/test';

test('Check Admin Panel', async ({ page }) => {
  // 1. Go directly to the Admin page (Playwright uses the saved cookies automatically)
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');

  // 2. Verify the Heading is there
  await expect(page.getByRole('heading', { name: 'User Management' })).toBeVisible();
  
  // 3. Verify the URL is correct
  await expect(page).toHaveURL(/admin/);
});


