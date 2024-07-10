import { ITodoItem } from "../../../../../../../global/types/itemTodo";
import { ITypeMessage } from "../../../../../../../global/types/typeMessage";
import { AdapterLocalStorage } from "../../../../../../infra/adapters/localStorage/localStorage";

export type IData = ITodoItem[];

export class Repository {
  constructor(private adapter = new AdapterLocalStorage()) {}

  async getListTodo() {
    try {
      const result = await this.adapter.get();

      return {
        data: result.data as IData,
        typeMessage: ITypeMessage.SUCCESS,
        message: "",
      };
    } catch (error) {
      throw {
        data: [],
        typeMessage: ITypeMessage.ERROR,
        message:
          "Erro ao buscar lista de todos, tente novamente mais tarde.123",
      };
    }
  }
}
