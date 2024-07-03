import { ITodoItem } from "../../../../global/types/itemTodo";
import { NewTodoType } from "../../../../global/types/newTodo";
import { ITypeMessage } from "../../../../global/types/typeMessage";
import { TodoItem } from "../../entity/TodoItem/mainEntity";
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
      this.service.todoAlreadyExists(listTodo, newTodo);

      const result = await this.repository.addTodo(newTodo);
      const todoItemEntity = new TodoItem();
      todoItemEntity.create(result.data.id, result.data.title);

      return {
        data: todoItemEntity.getData,
        typeMessage: result.typeMessage,
        message: result.message,
      };
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
