import { NewTodoType } from "../../../../../../../../../global/types/newTodo";
import { ITodoItemEntity } from "../../../../../../TodoItem/mainEntity";

export class TodoAlreadyExists {
  execute(listTodo: ITodoItemEntity[], newTodo: NewTodoType) {
    const todoAlreadyExists = listTodo.find((todoItem) => {
      return (
        todoItem.getData.title?.trim()?.toLowerCase().replace(/\s/g, "") ===
        newTodo.title?.trim()?.toLowerCase().replace(/\s/g, "")
      );
    });

    return !!todoAlreadyExists;
  }
}
