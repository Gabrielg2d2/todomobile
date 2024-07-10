import { IError } from "../../../../../../global/types/erro";
import { ITypeMessage } from "../../../../../../global/types/typeMessage";
import { ITodoItem } from "../../../../main";
import { Repository } from "./repository/repository";

export class ToggleDoneSub {
  constructor(private readonly repository = new Repository()) {}

  async execute(todo: ITodoItem) {
    try {
      const todoUpdate = {
        id: todo.id,
        title: todo.title,
        isDone: !todo.isDone,
        updatedAt: new Date(),
        createdAt: todo.createdAt,
      };

      return await this.repository.toggleDone(todoUpdate);
    } catch (error: IError) {
      if (error.typeMessage) {
        return {
          data: error.data,
          typeMessage: error.typeMessage,
          message: error.message,
        };
      }

      return {
        data: null,
        typeMessage: ITypeMessage.ERROR,
        message: "Erro ao atualizar o todo",
      };
    }
  }
}
