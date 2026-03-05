import { test, expect } from '@playwright/test';

test('Day 15: Filter users by status', async ({ page }) => {
  // 1. Navigate to Admin
  await page.goto('/web/index.php/admin/viewSystemUsers');
  // Clicking a custom dropdown in OrangeHRM
await page.locator('.oxd-select-text').nth(1).click(); // Click the Status dropdown
await page.getByRole('option', { name: 'Disabled' }).click();
await page.getByRole('button', { name: 'Search' }).click();
const rows = await page.locator('.oxd-table-card').all();
for (const row of rows) {
  await expect(row).toContainText('Disabled');
}

  });
