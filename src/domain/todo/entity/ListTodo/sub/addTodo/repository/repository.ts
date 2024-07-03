import { NewTodoType } from "../../../../../../../global/types/newTodo";
import { ITypeMessage } from "../../../../../../../global/types/typeMessage";
import { AdapterLocalStorage } from "../../../../../../infra/adapters/localStorage/localStorage";

export class Repository {
  constructor(private adapter = new AdapterLocalStorage()) {}

  async addTodo(newTodo: NewTodoType) {
    try {
      const result = await this.adapter.post(newTodo);

      return {
        data: result.data,
        typeMessage: ITypeMessage.SUCCESS,
        message: "Novo todo adicionado com sucesso",
      };
    } catch (error) {
      throw {
        data: null,
        typeMessage: ITypeMessage.ERROR,
        message: "Erro ao adicionar novo todo, tente novamente!",
      };
    }
  }
}
