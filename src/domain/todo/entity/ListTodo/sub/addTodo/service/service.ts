import { NewTodoType } from "../../../../../../../global/types/newTodo";
import { ITypeMessage } from "../../../../../../../global/types/typeMessage";
import { ITodoItem } from "../../../../../main";
import { TodoAlreadyExists } from "./functions/todoAlreadyExists";

export class Service {
  todoAlreadyExists(listTodo: ITodoItem[], newTodo: NewTodoType) {
    const todoAlreadyExists = new TodoAlreadyExists();
    const isExists = todoAlreadyExists.execute(listTodo, newTodo);

    if (isExists) {
      throw {
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Todo já existe",
      };
    }
  }
}
