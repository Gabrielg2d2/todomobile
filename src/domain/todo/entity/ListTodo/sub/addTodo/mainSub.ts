import { IError } from "../../../../../../global/types/erro";
import { ITodoItem } from "../../../../../../global/types/itemTodo";
import { NewTodoType } from "../../../../../../global/types/newTodo";
import { ITypeMessage } from "../../../../../../global/types/typeMessage";
import { Repository } from "./repository/repository";
import { Service } from "./service/service";

export class AddTodoSub {
  constructor(
    private readonly repository = new Repository(),
    private readonly service = new Service()
  ) {}

  async execute(listTodo: ITodoItem[], newTodo: NewTodoType) {
    try {
      this.service.todoAlreadyExists(listTodo, newTodo);

      const result = await this.repository.addTodo(newTodo);

      return {
        data: result.data,
        typeMessage: result.typeMessage,
        message: result.message,
      };
    } catch (error: IError<false>) {
      if (error.typeMessage) {
        return {
          data: error.data,
          typeMessage: error.typeMessage,
          message: error.message,
        };
      }

      return {
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Erro ao adicionar todo",
      };
    }
  }
}
