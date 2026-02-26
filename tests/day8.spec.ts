import { test, expect } from '@playwright/test';
import { InternetPage } from '../Pages/internetpage';

test.describe('Day 9: Advanced UI Interactions', () => {

    test('Scenario 1: Wait for Dynamic Loading', async ({ page }) => {
        const internetPage = new InternetPage(page);
        
        await internetPage.navigateTo('dynamic_loading/1');
        await internetPage.clickStart();
        
        const result = await internetPage.getFinishText();
        expect(result).toBe('Hello World!');
    });

    test('Scenario 2: Interact with iFrame', async ({ page }) => {
        const internetPage = new InternetPage(page);
        const myMessage = 'Hello from the other side of the Frame!';
        
        await internetPage.typeInIframe(myMessage);
        
        // Validation: Verify the text was actually typed
        const frame = page.frameLocator('#mce_0_ifr');
        await expect(frame.locator('#tinymce')).toHaveText(myMessage);
    });

    test('Scenario 3: Handle JavaScript Alert', async ({ page }) => {
        const internetPage = new InternetPage(page);
        
        await internetPage.handleAlert();
        
        // Validation: The page shows a result text after you click 'OK' on an alert
        const resultText = page.locator('#result');
        await expect(resultText).toHaveText('You successfully clicked an alert');
    });

});