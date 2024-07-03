import { ITodoItem } from "../../../global/types/itemTodo";

export interface IAdapterRepository {
  post(todoItem: ITodoItem): Promise<{
    data: {
      id: string;
      title: string;
      isDone: boolean;
    };
  }>;
  delete(id: string): Promise<{ data: boolean }>;
  put(todoItem: ITodoItem): Promise<{ data: ITodoItem }>;
  get(): Promise<{
    data: ITodoItem[];
  }>;
}
