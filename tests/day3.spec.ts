import { test, expect } from '@playwright/test';
import { TodoPage } from '../Pages/todopage';


test('Day 3: Dynamic Elements and Filtering', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.navigate();


    // 1. Setup
    await todoPage.createTodo('Learn Playwright');
    await todoPage.createTodo('Review POM');
    await todoPage.createTodo('Takes a break');


    // 2. Dynamic Action: Complete only the 'Review POM' item
    await todoPage.markAsCompleted('Review POM');


    // 3. Dynamic Action: Delete 'Take a break'
    await todoPage.deleteTodo('Takes a break');


    // 4. Verification
    // Check that we only have 2 items left
    await expect(todoPage.todoItems).toHaveCount(2);
    // Check that 'Take a break' is truly gone
    await expect(todoPage.todoItems).not.toContainText(['Take a break']);
});
