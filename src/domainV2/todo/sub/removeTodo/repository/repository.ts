import { AdapterLocalStorage } from "../../../../infra/adapters/localStorage/localStorage";
import { ITypeMessage } from "../../../global/types/typeMessage";

export class Repository {
  constructor(private adapter = new AdapterLocalStorage()) {}

  async removeTodo(id: string) {
    try {
      await this.adapter.delete(id);

      return {
        data: true,
        typeMessage: ITypeMessage.SUCCESS,
        message: "Todo removido com sucesso",
      };
    } catch (error) {
      return {
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Erro ao remover todo",
      };
    }
  }
}
