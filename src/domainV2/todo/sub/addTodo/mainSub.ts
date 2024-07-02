import { NewTodoType } from "../../../global/types/newTodo";
import { ITypeMessage } from "../../../global/types/typeMessage";
import { Repository } from "./repository/repository";

export class AddTodoSub {
  constructor(private readonly repository = new Repository()) {}

  async execute(newTodo: NewTodoType) {
    try {
      return await this.repository.addTodo(newTodo);
    } catch (error) {
      return {
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Erro ao adicionar novo todo",
      };
    }
  }
}
