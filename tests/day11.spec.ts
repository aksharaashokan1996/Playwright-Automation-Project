import { test, expect } from '@playwright/test';

// Add this line to tell Playwright NOT to use the saved user.json for THIS test file
test.use({ storageState: { cookies: [], origins: [] } });

test('Codegen Test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
  // Now that cookies are cleared, the login page will actually show up
  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();

  // Verify login was successful
  await expect(page).toHaveURL(/dashboard/);
});