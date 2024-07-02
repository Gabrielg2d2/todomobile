import { ITodoItem } from "../../../todo/repository/interfaces";

export interface IAdapterRepository {
  add(todoItem: ITodoItem): Promise<void>;
  remove(id: string): Promise<void>;
  update(todoItem: ITodoItem): Promise<void>;
  getListTodo(): Promise<ITodoItem[]>;
}
