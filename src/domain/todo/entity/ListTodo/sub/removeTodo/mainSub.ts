import { ITypeMessage } from "../../../../../../global/types/typeMessage";
import { Repository } from "./repository/repository";

export class RemoveTodoSub {
  constructor(private repository = new Repository()) {}

  async execute(id: string) {
    try {
      const result = await this.repository.removeTodo(id);

      return {
        data: result.data,
        typeMessage: ITypeMessage.SUCCESS,
        message: "",
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
