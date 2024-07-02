import { ITodoItem } from "../../../../../../global/types/itemTodo";

export class SeparateTodo {
  execute(listTodo: ITodoItem[]) {
    const quantityTodoCreated = listTodo.length;

    const allTodoCompleted = listTodo.filter((todoItem) => todoItem.isDone);

    return {
      quantityTodoCreated,
      allTodoCompleted: allTodoCompleted.length,
    };
  }
}
