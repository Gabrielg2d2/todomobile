type TodoItem = {
  title: string;
  isDone: boolean;
};

export class TodoMain {
  constructor(private todoRepository: TodoRepository) {}

  async addTodo(newTodo: TodoItem): Promise<void> {
    await this.todoRepository.addTodoItem(todoItem);
  }

  async getTodoAll(): Promise<TodoItem[]> {
    return await this.todoRepository.getTodoItems();
  }
}
