import { ITodoItem } from "../../../../global/types/itemTodo";
import { NewTodoType } from "../../../../global/types/newTodo";
import { ITypeMessage } from "../../../../global/types/typeMessage";
import { Repository } from "./repository/repository";
import { Service } from "./service/service";

type IError =
  | {
      data: boolean;
      typeMessage: ITypeMessage;
      message: string;
    }
  | any;

export class AddTodoSub {
  constructor(
    private readonly repository = new Repository(),
    private readonly service = new Service()
  ) {}

  async execute(listTodo: ITodoItem[], newTodo: NewTodoType) {
    try {
      if (!newTodo.title) {
        throw {
          data: false,
          typeMessage: ITypeMessage.ERROR,
          message: "Título do todo não pode ser vazio",
        };
      }

      const isExists = this.service.todoAlreadyExists(listTodo, newTodo);

      if (isExists) {
        throw {
          data: false,
          typeMessage: ITypeMessage.ERROR,
          message: "Todo já existe",
        };
      }

      return await this.repository.addTodo(newTodo);
    } catch (error: IError) {
      if (error.typeMessage) {
        return {
          data: error.data,
          typeMessage: error.TypeMessage,
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
