import { NewTodoType } from "../../../global/types/newTodo";
import { Repository } from "./repository/repository";

export class AddTodoSub {
  constructor(private readonly repository = new Repository()) {}

  async execute(newTodo: NewTodoType) {
    return await this.repository.addTodo(newTodo);
  }
}
