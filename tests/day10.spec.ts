import { test, expect } from '@playwright/test';
// 1. Import your JSON data
import testData from '../data/users.json';

test.describe('Day 14: Data-Driven Login Tests', () => {

    // 2. Loop through each object in the JSON array
    for (const user of testData) {
        
        test(`@smoke Login Attempt for: ${user.desc}`, async ({ page }) => {
            await page.goto('https://the-internet.herokuapp.com/login');
            
            await page.locator('#username').fill(user.username);
            await page.locator('#password').fill(user.password);
            await page.getByRole('button', { name: 'Login' }).click();

            if (user.desc === 'Valid User') {
                await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
            } else {
                await expect(page.locator('#flash')).toContainText('is invalid!');
            }
        });
    }
});