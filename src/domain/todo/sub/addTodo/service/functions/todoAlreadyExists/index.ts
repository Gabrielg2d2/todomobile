import { ITodoItem } from "../../../../../../../global/types/itemTodo";
import { NewTodoType } from "../../../../../../../global/types/newTodo";

export class TodoAlreadyExists {
  execute(listTodo: ITodoItem[], newTodo: NewTodoType) {
    const todoAlreadyExists = listTodo.find(
      (todoItem) =>
        todoItem.title?.trim()?.toLowerCase().replace(/\s/g, "") ===
        newTodo.title?.trim()?.toLowerCase().replace(/\s/g, "")
    );
    return !!todoAlreadyExists;
  }
}
