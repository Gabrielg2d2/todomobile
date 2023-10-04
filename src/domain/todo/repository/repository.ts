import { AdapterLocalStorage } from "./adapter-local-storage";
import { IRepository, ITodoItem } from "./interfaces";

export class Repository implements IRepository {
  constructor(private adapter: AdapterLocalStorage) {}

  async addTodoItem(todoItem: ITodoItem): Promise<void> {
    await this.adapter.add(todoItem);
  }
  async removeTodoItem(id: string): Promise<void> {
    await this.adapter.remove(id);
  }
  async updateTodoItem(todoItem: ITodoItem): Promise<void> {
    await this.adapter.update(todoItem);
  }
  async getTodoAll(): Promise<ITodoItem[]> {
    return await this.adapter.getAll();
  }
}
