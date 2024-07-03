import { TodoItemEntity } from "../../../../../../TodoItem/mainEntity";

export class SeparateTodo {
  execute(listTodo: TodoItemEntity[]) {
    const quantityTodoCreated = listTodo.length;

    const allTodoCompleted = listTodo.filter(
      (todoItem) => todoItem.getData.isDone
    ).length;

    return {
      quantityTodoCreated,
      allTodoCompleted,
    };
  }
}
