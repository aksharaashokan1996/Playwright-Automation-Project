import { test, expect } from '@playwright/test';

test('Day 14: Web Table Manipulation', async ({ page }) => {
  // 1. Navigate to Admin
  await page.goto('/web/index.php/admin/viewSystemUsers');

  // 2. Locate the Table Rows
  const tableRows = page.locator('.oxd-table-card');
  await tableRows.first().waitFor({ state: 'visible', timeout: 15000 });
  
  // 3. Log the count (Optional, but good for debugging)
  const count = await tableRows.count();
  console.log(`Total users found: ${count}`);

  // 4. Find the row for 'Admin' and click the Edit button
  // Hint: The edit button is usually inside the last cell of the row
  const adminRow = tableRows.filter({ hasText: 'Admin' }).first();
  await adminRow.locator('.bi-pencil-fill').click(); // Adjust selector as needed

  // 5. Verify navigation to the Edit page
// Verify that the 'Edit User' heading appears
await expect(page.getByRole('heading', { name: 'Edit User' })).toBeVisible({ timeout: 10000 });});
