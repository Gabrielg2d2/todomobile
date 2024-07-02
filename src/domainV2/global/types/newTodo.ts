import { ITodoItem } from "./itemTodo";

export type NewTodoType = Omit<ITodoItem, "id">;
