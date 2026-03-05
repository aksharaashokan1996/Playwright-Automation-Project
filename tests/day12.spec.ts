import { test, expect } from '@playwright/test';

test('Check Admin Panel without logging in', async ({ page }) => {
    // Go straight to the internal page
    await page.goto('/web/index.php/admin/viewSystemUsers');
    
    // If the state worked, you won't see the login page!
    await expect(page).toHaveURL(/admin/);
    await expect(page.getByText('User Management')).toBeVisible();
});