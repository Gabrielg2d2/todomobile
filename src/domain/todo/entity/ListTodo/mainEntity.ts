import { ITodoItem } from "../../../../global/types/itemTodo";
import { NewTodoType } from "../../../../global/types/newTodo";
import { AddTodoSub } from "./sub/addTodo/mainSub";
import { GetListTodoSub } from "./sub/getListTodo/mainSub";
import { RemoveTodoSub } from "./sub/removeTodo/mainSub";
import { ToggleDoneSub } from "./sub/toggleDone/mainSub";

export class ListTodoEntity {
  private async getList() {
    const getListTodoSub = new GetListTodoSub();
    return await getListTodoSub.execute();
  }

  private async add(listTodo: any, newTodo: NewTodoType) {
    const addTodoSub = new AddTodoSub();
    return await addTodoSub.execute(listTodo, newTodo);
  }

  private async remove(id: string) {
    const removeTodoSub = new RemoveTodoSub();
    return await removeTodoSub.execute(id);
  }

  private async toggle(todo: ITodoItem) {
    const toggleDoneSub = new ToggleDoneSub();
    return await toggleDoneSub.execute(todo);
  }

  actions = {
    list: this.getList,
    add: this.add,
    remove: this.remove,
    toggle: this.toggle,
  };
}
