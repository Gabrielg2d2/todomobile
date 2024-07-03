import { ITypeMessage } from "../../../../../../../global/types/typeMessage";
import { AdapterLocalStorage } from "../../../../../../infra/adapters/localStorage/localStorage";

export class Repository {
  constructor(private adapter = new AdapterLocalStorage()) {}

  async getListTodo() {
    try {
      const result = await this.adapter.get();

      return {
        data: result.data,
        typeMessage: ITypeMessage.SUCCESS,
        message: "",
      };
    } catch (error) {
      throw {
        data: [],
        typeMessage: ITypeMessage.ERROR,
        message: "Erro ao buscar lista de todos, tente novamente mais tarde.",
      };
    }
  }
}
