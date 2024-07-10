import { IData } from "../../../repository/repository";

export class SeparateTodo {
  execute(listTodo: IData) {
    const quantityTodoCreated = listTodo.length;

    const allTodoCompleted = listTodo.filter(
      (todoItem) => todoItem.isDone
    ).length;

    return {
      quantityTodoCreated,
      allTodoCompleted,
    };
  }
}
