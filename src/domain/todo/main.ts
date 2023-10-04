import { ITodoItem } from "./repository/interfaces";
import { Repository } from "./repository/repository";

export class TodoMain {
  constructor(private repository = new Repository()) {}

  async toggleDone(currentTodo: ITodoItem): Promise<void> {
    const todo = { ...currentTodo };
    todo.isDone = !todo.isDone;
    await this.repository.updateTodoItem(todo);
  }

  async addTodo(newTodo: ITodoItem): Promise<void> {
    // verifica se o título é vazio
    // verifica se o título já existe
    await this.repository.addTodoItem(newTodo);
  }

  async removeTodo(id: string): Promise<void> {
    // verifica se o id existe
    await this.repository.removeTodoItem(id);
  }

  async getTodoAll(): Promise<ITodoItem[]> {
    return await this.repository.getTodoAll();
  }
}
