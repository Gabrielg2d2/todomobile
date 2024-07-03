import { ITodoItem } from "../../todo/global/types/itemTodo";

export interface IAdapterRepository {
  post(todoItem: ITodoItem): Promise<void>;
  delete(id: string): Promise<void>;
  put(todoItem: ITodoItem): Promise<void>;
  get(): Promise<ITodoItem[]>;
}
