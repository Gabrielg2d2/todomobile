export type ITodoItem = {
  id: string;
  title: string;
  isDone: boolean;
};

export type NewTodoType = Omit<ITodoItem, "id">;

export interface IRepository {
  addTodoItem(todoItem: ITodoItem): Promise<void>;
  removeTodoItem(id: string): Promise<void>;
  updateTodoItem(todoItem: ITodoItem): Promise<void>;
  getTodoAll(): Promise<ITodoItem[]>;
}

export interface IAdapterRepository {
  add(todoItem: ITodoItem): Promise<void>;
  remove(id: string): Promise<void>;
  update(todoItem: ITodoItem): Promise<void>;
  getAll(): Promise<ITodoItem[]>;
}
