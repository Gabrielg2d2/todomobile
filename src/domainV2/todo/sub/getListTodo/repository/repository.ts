import { ITypeMessage } from "../../../../../global/types/typeMessage";
import { AdapterLocalStorage } from "../../../../infra/adapters/localStorage/localStorage";

export class Repository {
  constructor(private adapter = new AdapterLocalStorage()) {}

  async getListTodo() {
    try {
      const result = await this.adapter.get();

      return {
        data: result,
        typeMessage: ITypeMessage.SUCCESS,
        message: "",
      };
    } catch (error) {
      throw new Error();
    }
  }
}
