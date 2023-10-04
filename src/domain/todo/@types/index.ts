export type TodoItem = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodoRepository = {
  addTodoItem(todoItem: TodoItem): Promise<void>;
  removeTodoItem(id: string): Promise<void>;
  updateTodoItem(todoItem: TodoItem): Promise<void>;
  getTodoAll(): Promise<TodoItem[]>;
};
