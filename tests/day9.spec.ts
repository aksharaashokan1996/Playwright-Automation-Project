import { test, expect } from '@playwright/test';

test.describe('Day 12: Visual Regression Testing', () => {

    test('Visual Snapshot of Login Page', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');

        // Use a single, highly tolerant expectation for CI/CD environments
        await expect(page).toHaveScreenshot('login-page.png', { 
            maxDiffPixelRatio: 0.2, // Allows 20% of pixels to differ (good for cross-OS)
            threshold: 0.2,         // Color sensitivity
            animations: 'disabled'  // Stops blinking cursors from failing the test
        });
    });

});