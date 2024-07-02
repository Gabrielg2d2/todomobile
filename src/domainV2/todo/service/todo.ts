import { ITodoItem, NewTodoType } from "../repository/interfaces";

export class Service {
  static todoAlreadyExists(listTodo: ITodoItem[], newTodo: NewTodoType) {
    const todoAlreadyExists = listTodo.find(
      (todoItem) => todoItem.title === newTodo.title
    );
    return !!todoAlreadyExists;
  }

  static separateTodo(listTodo: ITodoItem[]) {
    const quantityTodoCreated = listTodo.length;

    const allTodoCompleted = listTodo.filter((todoItem) => todoItem.isDone);

    return {
      quantityTodoCreated,
      allTodoCompleted: allTodoCompleted.length,
    };
  }
}
