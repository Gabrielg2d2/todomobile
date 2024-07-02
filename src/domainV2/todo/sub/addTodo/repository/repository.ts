import { NewTodoType } from "../../../../global/types/newTodo";
import { ITypeMessage } from "../../../../global/types/typeMessage";
import { AdapterLocalStorage } from "../../../../infra/adapters/localStorage/localStorage";

export class Repository {
  constructor(private adapter = new AdapterLocalStorage()) {}

  async addTodo(newTodo: NewTodoType) {
    try {
      await this.adapter.add(newTodo);

      return {
        data: true,
        typeMessage: ITypeMessage.SUCCESS,
        message: "Novo todo adicionado com sucesso",
      };
    } catch (error) {
      return {
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Erro ao adicionar novo todo",
      };
    }
  }
}
