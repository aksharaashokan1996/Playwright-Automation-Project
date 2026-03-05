import { test, expect } from '@playwright/test';

test('Check Admin Panel without logging in', async ({ page }) => {
    // Go straight to the internal page
    await page.goto('/web/index.php/admin/viewSystemUsers');
    
    // If the state worked, you won't see the login page!
    await expect(page).toHaveURL(/admin/);
// This targets the heading specifically, ignoring the menu tab
await expect(page.locator('.oxd-topbar-header-breadcrumb h6')).toHaveText('User Management', { timeout: 15000 })});
