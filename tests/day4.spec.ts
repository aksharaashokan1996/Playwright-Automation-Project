import { test, expect } from '@playwright/test';
import { TodoPage } from '../Pages/todopage';


// 1. We declare the variable outside so all tests can see it
let todoPage: TodoPage;


test.beforeEach(async ({ page }) => {
  // 2. This runs ONCE before every single test block
  todoPage = new TodoPage(page);
  await todoPage.navigate();
});


test('Add items and check count', async () => {
  // Notice: No navigation needed here! It already happened.
  await todoPage.createTodo('Task 1');
  await todoPage.createTodo('Task 2');
  await expect(todoPage.todoItems).toHaveCount(2);
});


test('Complete an item', async () => {
  // This test starts with a FRESH, empty page because of the Hook
  await todoPage.createTodo('Buy Milk');
  await todoPage.markAsCompleted('Buy Milk');
 
  // Verify the checkbox is actually checked
  const checkbox = todoPage.todoItems.filter({ hasText: 'Buy Milk' }).getByRole('checkbox');
  await expect(checkbox).toBeChecked();
});
