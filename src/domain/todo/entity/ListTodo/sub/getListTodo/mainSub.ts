import { IError } from "../../../../../../global/types/erro";
import { ITypeMessage } from "../../../../../../global/types/typeMessage";
import { Repository } from "./repository/repository";
import { Service } from "./service/service";

export class GetListTodoSub {
  constructor(
    private readonly repository = new Repository(),
    private readonly service = new Service()
  ) {}

  async execute() {
    try {
      const result = await this.repository.getListTodo();

      const service = this.service.separateTodo(result.data);

      return {
        data: {
          listTodo: result.data,
          allTodoCompleted: service.allTodoCompleted,
          quantityTodoCreated: service.quantityTodoCreated,
        },
        typeMessage: ITypeMessage.SUCCESS,
        message: "",
      };
    } catch (error: IError) {
      if (error.typeMessage) {
        return {
          data: {
            listTodo: [],
            allTodoCompleted: 0,
            quantityTodoCreated: 0,
          },
          typeMessage: error.typeMessage,
          message: error.message,
        };
      }

      return {
        data: {
          listTodo: [],
          allTodoCompleted: 0,
          quantityTodoCreated: 0,
        },
        typeMessage: ITypeMessage.ERROR,
        message: "Erro ao buscar lista de todos, tente novamente mais tarde.",
      };
    }
  }
}
