import { test, expect } from '@playwright/test';
import { TodoPage } from '../Pages/todopage';


test('Day 3 Final: POM Success', async ({ page }) => {
  const todoPage = new TodoPage(page);


  // This will now clear the state before adding anything
  await todoPage.navigate();


  // Adding exactly 3 items
  await todoPage.createTodo('Buy Milk');
  await todoPage.createTodo('Clean the kitchen');
  await todoPage.createTodo('Master Playwright');


  // Verify the count is exactly 3
  await expect(todoPage.todoItems).toHaveCount(3);
});
