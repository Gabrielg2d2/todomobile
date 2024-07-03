import { ITodoItem } from "../../../../global/types/itemTodo";
import { NewTodoType } from "../../../../global/types/newTodo";
import { ITypeMessage } from "../../../../global/types/typeMessage";
import { Repository } from "./repository/repository";
import { Service } from "./service/service";

export class AddTodoSub {
  constructor(
    private readonly repository = new Repository(),
    private readonly service = new Service()
  ) {}

  async execute(listTodo: ITodoItem[], newTodo: NewTodoType) {
    if (!newTodo.title) {
      return {
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Título do todo não pode ser vazio",
      };
    }

    const isExists = this.service.todoAlreadyExists(listTodo, newTodo);

    if (isExists) {
      return {
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Todo já existe",
      };
    }

    return await this.repository.addTodo(newTodo);
  }
}
