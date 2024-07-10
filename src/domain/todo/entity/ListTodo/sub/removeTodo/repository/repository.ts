import { ITypeMessage } from "../../../../../../../global/types/typeMessage";
import { AdapterLocalStorage } from "../../../../../../infra/adapters/localStorage/localStorage";

export class Repository {
  constructor(private adapter = new AdapterLocalStorage()) {}

  async removeTodo(id: string) {
    return await this.adapter.delete(id);
  }
}
