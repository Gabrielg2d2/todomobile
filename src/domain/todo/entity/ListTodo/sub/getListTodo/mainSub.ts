import { ITypeMessage } from "../../../../../../global/types/typeMessage";
import { TodoItemEntity } from "../../../TodoItem/mainEntity";
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

      const listTodoEntity: TodoItemEntity[] = result.data.map((todo: any) => {
        return new TodoItemEntity(todo.id, todo.title);
      });

      return {
        data: {
          listTodo: listTodoEntity,
          allTodoCompleted: service.allTodoCompleted,
          quantityTodoCreated: service.quantityTodoCreated,
        },
        typeMessage: ITypeMessage.SUCCESS,
        message: "",
      };
    } catch (error) {
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
