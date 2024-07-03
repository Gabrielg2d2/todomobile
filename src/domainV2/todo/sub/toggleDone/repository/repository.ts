import { ITodoItem } from "../../../../../global/types/itemTodo";
import { ITypeMessage } from "../../../../../global/types/typeMessage";
import { AdapterLocalStorage } from "../../../../infra/adapters/localStorage/localStorage";

export class Repository {
  constructor(private adapter = new AdapterLocalStorage()) {}

  async toggleDone(todoItemUpdate: ITodoItem) {
    try {
      await this.adapter.put(todoItemUpdate);

      return {
        data: true,
        typeMessage: ITypeMessage.SUCCESS,
        message: "",
      };
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
