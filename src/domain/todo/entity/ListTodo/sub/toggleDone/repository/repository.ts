import { NewTodoType } from "../../../../../../../global/types/newTodo";
import { ITypeMessage } from "../../../../../../../global/types/typeMessage";
import { AdapterLocalStorage } from "../../../../../../infra/adapters/localStorage/localStorage";
import { ITodoItem } from "../../../../../main";

export class Repository {
  constructor(private adapter = new AdapterLocalStorage()) {}

  async toggleDone(todoUpdate: ITodoItem) {
    try {
      const result = await this.adapter.put(todoUpdate);

      return {
        data: result.data,
        typeMessage: ITypeMessage.SUCCESS,
        message: "",
      };
    } catch (error) {
      throw {
        data: null,
        typeMessage: ITypeMessage.ERROR,
        message: "API: Erro ao atualizar todo",
      };
    }
  }
}
