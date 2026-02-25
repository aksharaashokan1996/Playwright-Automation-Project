
import { test, expect } from '@playwright/test';
import { InternetPage } from '../Pages/internetpage';


test.describe('Day 6: Advanced Web Interactions', () => {
  let internetPage: InternetPage;


  test.beforeEach(async ({ page }) => {
    internetPage = new InternetPage(page);
  });


  test('Handle JavaScript Alerts', async ({ page }) => {
    await internetPage.navigateTo('javascript_alerts');
    await internetPage.triggerAlert();
   
    // Verify the result text on the page says we clicked OK
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
  });


  test('Handle Multiple Tabs', async ({ page }) => {
    await internetPage.navigateTo('windows');
   
    const newTab = await internetPage.handleNewTab();
   
    // Now we can use 'expect' on the NEW tab
    await expect(newTab).toHaveURL('https://the-internet.herokuapp.com/windows/new');
    await expect(newTab.getByText('New Window')).toBeVisible();
   
    // Clean up: close the new tab
    await newTab.close();
  });
  test('Handle Checkboxes', async ({ page }) => {
    await internetPage.navigateTo('checkboxes');
   
    // Perform the action
    await internetPage.tickFirstCheckbox();
   
    // Verify it worked
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await expect(firstCheckbox).toBeChecked();
  });
test('Uncheck the second checkbox', async ({ page }) => {
    // 1. Navigate
    await internetPage.navigateTo('checkboxes');
   
    // 2. Act
    await internetPage.untickSecondCheckbox();
   
    // 3. Assert (Verify it is NOT checked)
    const secondCheckbox = page.locator('input[type="checkbox"]').last();
    await expect(secondCheckbox).not.toBeChecked();
  });


test('Handle Number Input', async ({ page }) => {
    await internetPage.navigateTo('inputs');
   
    // Act: Type '12345'
    await internetPage.typeNumber('12345');
   
    // Assert: Verify the value is correct
    const inputField = page.locator('input[type="number"]');
    await expect(inputField).toHaveValue('12345');
  });


});

