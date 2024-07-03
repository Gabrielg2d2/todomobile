import { TodoItemEntity } from "../../../entity/TodoItem/mainEntity";
import { SeparateTodo } from "./functions/separateTodo";

export class Service {
  separateTodo(listTodo: TodoItemEntity[]) {
    const separateTodo = new SeparateTodo();
    return separateTodo.execute(listTodo);
  }
}
