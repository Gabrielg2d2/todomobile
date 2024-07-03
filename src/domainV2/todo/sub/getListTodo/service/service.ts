import { ITodoItem } from "../../../global/types/itemTodo";
import { SeparateTodo } from "./functions/separateTodo";

export class Service {
  separateTodo(listTodo: ITodoItem[]) {
    const separateTodo = new SeparateTodo();
    return separateTodo.execute(listTodo);
  }
}
