import { test, expect } from '@playwright/test';
import { ApiPage } from '../Pages/apipage';

test('API Challenge: Create Post and Verify Status', async ({ request }) => {
  const apiPage = new ApiPage(request);

  // 1. Send the request
  const response = await apiPage.createPost('Learning Playwright', 'API testing is fun');

  // 2. Assert: Check if the server responded with 201 (Created)
  console.log("Status Received:", response.status());
  expect(response.status()).toBe(201);

  // 3. Assert: Verify the data
  const responseBody = await response.json();
  console.log("Response Body:", responseBody);
  
  expect(responseBody.title).toBe('Learning Playwright');
  expect(responseBody).toHaveProperty('id'); // The server generates this
});