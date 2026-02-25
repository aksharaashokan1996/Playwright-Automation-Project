import { test, expect } from '@playwright/test';
import { InternetPage } from '../Pages/internetpage';


test('Handle Dynamic Loading', async ({ page }) => {
    const internetPage = new InternetPage(page);
    await internetPage.navigateTo('dynamic_loading/1');
   
    await internetPage.waitForDynamicElement();
   
    const helloText = page.locator('#finish h4');
    await expect(helloText).toHaveText('Hello World!');
});

