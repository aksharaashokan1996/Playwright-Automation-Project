import { APIRequestContext } from '@playwright/test';

export class ApiPage {
  constructor(private request: APIRequestContext) {}

  async createPost(title: string, body: string) {
    // This API is very stable and doesn't need a key!
    return await this.request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: title,
        body: body,
        userId: 1
      }
    });
  }
}