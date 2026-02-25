import { Page, Locator } from '@playwright/test';


export class TodoPage {
  readonly page: Page;
  readonly todoInput: Locator;
  readonly todoItems: Locator;


  constructor(page: Page) {
    this.page = page;
    this.todoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.locator('.todo-list li');
  }


  async navigate() {
    await this.page.goto('https://demo.playwright.dev/todomvc/');
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await this.page.reload();
  }


  async createTodo(text: string) {
    await this.todoInput.fill(text);
    await this.todoInput.press('Enter');
  }


  // --- NEW FUNCTIONS MUST BE INSIDE THIS BRACKET ---


  async markAsCompleted(todoText: string) {
    const todoRow = this.todoItems.filter({ hasText: todoText });
    await todoRow.getByRole('checkbox').check();
  }


  async deleteTodo(todoText: string) {
    const todoRow = this.todoItems.filter({ hasText: todoText });
    // Hover over the row to make the 'X' button visible
    await todoRow.hover();
    // Click the delete button (often called 'Destroy' or has a hidden label)
    await todoRow.getByRole('button', { name: 'Delete' }).click();
  }
} // <--- THIS is the final bracket that closes the class










