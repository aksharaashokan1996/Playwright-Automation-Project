import { test, expect } from '@playwright/test';

test('Codegen Test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  // Save the storage state (cookies and local storage) to a JSON file
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  await page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2).click();
  await page.getByRole('option', { name: 'ESS' }).click();
  await page.getByText('-- Select --').click();
  await page.getByRole('option', { name: 'Enabled' }).click();
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).press('CapsLock');
  await page.getByRole('textbox').nth(3).fill('Abc@12345');
  await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).press('CapsLock');
  await page.getByRole('textbox').nth(4).fill('Abc@12345');
  await page.locator('div').filter({ hasText: /^Confirm Password$/ }).first().click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('T');
  await page.getByRole('option', { name: 'Timothy Lewis Amiano' }).click();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('Timothy_');
  await page.getByRole('textbox').nth(2).press('CapsLock');
  await page.getByRole('textbox').nth(2).fill('Timothy_Akshara');
  await page.locator('div').filter({ hasText: /^Confirm Password$/ }).nth(2).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
});