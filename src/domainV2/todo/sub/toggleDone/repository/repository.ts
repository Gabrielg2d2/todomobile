import { ITodoItem } from "../../../../global/types/itemTodo";
import { ITypeMessage } from "../../../../global/types/typeMessage";
import { AdapterLocalStorage } from "../../../../infra/adapters/localStorage/localStorage";

export class Repository {
  constructor(private adapter = new AdapterLocalStorage()) {}

  async toggleDone(todoItemUpdate: ITodoItem) {
    try {
      await this.adapter.update(todoItemUpdate);

      return {
        data: true,
        typeMessage: ITypeMessage.SUCCESS,
        message: "",
      };
    } catch (error) {
      throw new Error();
    }
  }
}
