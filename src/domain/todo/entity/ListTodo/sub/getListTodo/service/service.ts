import { IData } from "../repository/repository";
import { SeparateTodo } from "./functions/separateTodo";

export class Service {
  separateTodo(listTodo: IData) {
    const separateTodo = new SeparateTodo();
    return separateTodo.execute(listTodo);
  }
}
