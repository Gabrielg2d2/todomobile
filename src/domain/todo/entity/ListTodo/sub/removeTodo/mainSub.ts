import { Repository } from "./repository/repository";

export class RemoveTodoSub {
  constructor(private repository = new Repository()) {}

  async execute(id: string) {
    return await this.repository.removeTodo(id);
  }
}
