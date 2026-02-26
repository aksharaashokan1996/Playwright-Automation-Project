import { Page, Locator, expect } from '@playwright/test';


export class InternetPage {
  readonly page: Page;
  // 1. Declare the variables at the top (without assigning them yet)
    readonly startButton: Locator;
    readonly finishText: Locator;


 constructor(page: Page) {
        this.page = page;
        // 2. Initialize them here, now that 'page' exists!
        this.startButton = this.page.locator('button', { hasText: 'Start' });
        this.finishText = this.page.locator('#finish h4');
 }
 async testDynamicLoading() {
        await this.page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
        await this.startButton.click();
        
        // Wait for the hidden text to show up
        await this.finishText.waitFor({ state: 'visible', timeout: 10000 });
        
        return await this.finishText.textContent();
    }
// Inside your InternetPage class...

async clickStart() {
    await this.startButton.click();
}

async getFinishText() {
    await this.finishText.waitFor({ state: 'visible', timeout: 10000 });
    return await this.finishText.textContent();
}

  async navigateTo(path: string) {
    await this.page.goto(`https://the-internet.herokuapp.com/${path}`);
  }


  async triggerAlert() {
    this.page.once('dialog', dialog => dialog.accept());
    await this.page.getByRole('button', { name: 'Click for JS Alert' }).click();
  }
  async tickFirstCheckbox() {
    const firstCheckbox = this.page.locator('input[type="checkbox"]').first();
   
    // Explicitly wait for the element to be ready to be interacted with
    await firstCheckbox.waitFor({ state: 'visible', timeout: 5000 });
    await firstCheckbox.check();
  }
  async untickSecondCheckbox() {
    // Find the second checkbox and uncheck it
    const secondCheckbox = this.page.locator('input[type="checkbox"]').last();
    await secondCheckbox.uncheck();
  }


  // ENSURE THIS IS INSIDE THE CLASS BRACKETS
  async handleNewTab() {
    const pagePromise = this.page.context().waitForEvent('page');
    await this.page.getByText('Click Here').click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    return newPage;
  }


  async typeNumber(value: string) {
    const inputField = this.page.locator('input[type="number"]');
    // .fill() automatically clears whatever was there before and types the new value
    await inputField.fill(value);
  }
  async waitForDynamicElement() {
    // This button starts a 5-second loading process
    await this.page.getByRole('button', { name: 'Start' }).click();
   
    // We wait for the 'Hello World!' text to appear
    // Playwright's expect() has a built-in 5s wait,
    // but we can increase it if the site is slow.
    const helloText = this.page.locator('#finish h4');
    await expect(helloText).toBeVisible({ timeout: 10000 });
  }
  async typeInIframe(message: string) {
    await this.page.goto('https://the-internet.herokuapp.com/iframe');
    
    // 1. Wait for the network to be quiet
    await this.page.waitForLoadState('networkidle');

    // 2. Locate the frame and the editor body
    const frame = this.page.frameLocator('#mce_0_ifr');
    const editor = frame.locator('#tinymce');
    
    // 3. Ensure it is visible
    await editor.waitFor({ state: 'visible', timeout: 5000 });
    
    // 4. FIX: Use evaluate to set the HTML content directly.
    // This works even if the editor is temporarily in a "stubborn" state.
    await editor.evaluate((el, msg) => el.innerHTML = msg, message);
}
  async handleAlert() {
    await this.page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    // This tells Playwright: "Next time an alert pops up, click OK"
    this.page.once('dialog', dialog => dialog.accept());

    await this.page.locator('button', { hasText: 'Click for JS Alert' }).click();
}
} // <--- THIS bracket must be at the very end of the file

