import { ITodoItem, NewTodoType } from "../repository/interfaces";

export class Service {
  static todoAlreadyExists(listTodo: ITodoItem[], newTodo: NewTodoType) {
    const todoAlreadyExists = listTodo.find(
      (todoItem) => todoItem.title === newTodo.title
    );
    return !!todoAlreadyExists;
  }
}
