import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
testDir: './tests',
fullyParallel: true,
reporter: 'html',

use: {
    // 1. This uses your "Badge" (session) automatically for every test
    storageState: 'playwright/.auth/user.json',
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
},
{
name: 'chromium',
dependencies: ['setup'],
use: {
...devices['Desktop Chrome'],
storageState: 'playwright/.auth/user.json',
},
},
],
});