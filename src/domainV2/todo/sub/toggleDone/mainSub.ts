import { ITodoItem } from "../../../global/types/itemTodo";
import { Repository } from "./repository/repository";

export class ToggleDoneSub {
  constructor(private readonly repository = new Repository()) {}

  async execute(todoItemUpdate: ITodoItem) {
    return await this.repository.toggleDone(todoItemUpdate);
  }
}
