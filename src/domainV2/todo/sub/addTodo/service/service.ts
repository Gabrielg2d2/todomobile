import { ITodoItem } from "../../../../../global/types/itemTodo";
import { NewTodoType } from "../../../../../global/types/newTodo";
import { TodoAlreadyExists } from "./functions/todoAlreadyExists";

export class Service {
  todoAlreadyExists(listTodo: ITodoItem[], newTodo: NewTodoType) {
    const todoAlreadyExists = new TodoAlreadyExists();
    return todoAlreadyExists.execute(listTodo, newTodo);
  }
}
