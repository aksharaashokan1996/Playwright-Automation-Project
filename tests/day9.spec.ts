import { test, expect } from '@playwright/test';

test.describe('Day 12: Visual Regression Testing', () => {

    test('Visual Snapshot of Login Page', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');

        // REPLACE your old command with this "Tolerant" version:
        await expect(page).toHaveScreenshot('login-page.png', { 
            maxDiffPixels: 100, // Ignores minor glitches
            threshold: 0.2      // 0.2 is a good balance for web UI
        });
    });

});

