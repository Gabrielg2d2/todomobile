import { TodoItem, TodoRepository } from "./@types";

export class TodoMain {
  constructor(private repository: TodoRepository) {}

  async toggleDone(currentTodo: TodoItem): Promise<void> {
    const todo = { ...currentTodo };
    todo.isDone = !todo.isDone;
    await this.repository.updateTodoItem(todo);
  }

  async addTodo(newTodo: TodoItem): Promise<void> {
    // verifica se o título é vazio
    // verifica se o título já existe
    await this.repository.addTodoItem(newTodo);
  }

  async removeTodo(id: string): Promise<void> {
    // verifica se o id existe
    await this.repository.removeTodoItem(id);
  }

  async getTodoAll(): Promise<TodoItem[]> {
    return await this.repository.getTodoAll();
  }
}
