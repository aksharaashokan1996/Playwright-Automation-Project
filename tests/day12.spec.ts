import { test, expect } from '@playwright/test';

test('Check Admin Panel without logging in', async ({ page }) => {
    // Go straight to the internal page
    await page.goto('/web/index.php/admin/viewSystemUsers');
    
    // If the state worked, you won't see the login page!
    await expect(page).toHaveURL(/admin/);
// This targets the heading specifically, ignoring the menu tab
// Target the specific 'level' breadcrumb to avoid strict mode error
await expect(page.locator('.oxd-topbar-header-breadcrumb-level')).toHaveText('User Management', { timeout: 15000 })});