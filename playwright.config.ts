import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',

  use: {
    // REMOVE storageState from here!
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    headless: true,
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth.setup.ts/,
      // Force setup to NOT look for a file that doesn't exist yet
      use: { storageState: { cookies: [], origins: [] } }, 
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        // Keep storageState HERE ONLY
        storageState: 'playwright/.auth/user.json',
      },
    },
  ],
});