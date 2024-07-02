import { ITodoItem } from "../../../global/types/itemTodo";
import { ITypeMessage } from "../../../global/types/typeMessage";
import { Repository } from "./repository/repository";

export class ToggleDoneSub {
  constructor(private readonly repository = new Repository()) {}

  async execute(todoItemUpdate: ITodoItem) {
    try {
      return await this.repository.toggleDone(todoItemUpdate);
    } catch (error) {
      return {
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message:
          "Erro ao atualizar o status do todo, tente novamente mais tarde.",
      };
    }
  }
}
