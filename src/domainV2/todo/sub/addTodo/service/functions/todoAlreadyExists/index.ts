import { ITodoItem } from "../../../../../global/types/itemTodo";
import { NewTodoType } from "../../../../../global/types/newTodo";

export class TodoAlreadyExists {
  execute(listTodo: ITodoItem[], newTodo: NewTodoType) {
    const todoAlreadyExists = listTodo.find(
      (todoItem) => todoItem.title === newTodo.title
    );
    return !!todoAlreadyExists;
  }
}
