import { test, expect } from '@playwright/test';
import { InternetPage } from '../Pages/internetpage';

test.describe('Day 10: Framework Optimization', () => {
    let internetPage: InternetPage;

    // 1. The Hook - ONLY for setup
    test.beforeEach(async ({ page }) => {
        internetPage = new InternetPage(page);
    }); // <--- Make sure this is CLOSED before starting tests

    // 2. standalone test for Dynamic Data
    test('Scenario 4: Using Dynamic Data', async () => {
        const randomName = `User_${Math.floor(Math.random() * 1000)}`;
        const randomEmail = `test_${Date.now()}@gmail.com`;
        
        console.log(`Registering: ${randomName} with email: ${randomEmail}`);
        // Add your logic here
    });

    test('Scenario 1: Wait for Dynamic Loading', async () => {
        // No need to define internetPage here anymore!
        await internetPage.navigateTo('dynamic_loading/1');
        await internetPage.clickStart();
        
        const result = await internetPage.getFinishText();
        expect(result).toBe('Hello World!');
    });

    test('Scenario 2: Interact with iFrame', async () => {
        // Use a random number so the message is unique every time
        const myMessage = `Test Message ID: ${Math.floor(Math.random() * 10000)}`;
        
        await internetPage.typeInIframe(myMessage);
        
        // Use the 'page' object directly from the test arguments if needed for global locators
        const frame = internetPage.page.frameLocator('#mce_0_ifr');
        await expect(frame.locator('#tinymce')).toHaveText(myMessage);
    });

    test('Scenario 3: Handle JavaScript Alert', async () => {
        await internetPage.handleAlert();
        
        const resultText = internetPage.page.locator('#result');
        await expect(resultText).toHaveText('You successfully clicked an alert');
    });
});