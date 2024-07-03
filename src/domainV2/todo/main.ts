import { ITodoItem } from "../global/types/itemTodo";
import { NewTodoType } from "../global/types/newTodo";
import { AddTodoSub } from "./sub/addTodo/mainSub";
import { GetListTodoSub } from "./sub/getListTodo/mainSub";
import { RemoveTodoSub } from "./sub/removeTodo/mainSub";
import { ToggleDoneSub } from "./sub/toggleDone/mainSub";

type IConstructor = {
  getListTodoSub: GetListTodoSub;
  toggleDoneSub: ToggleDoneSub;
  addTodoSub: AddTodoSub;
  removeTodoSub: RemoveTodoSub;
};

export class TodoMainV2 {
  private getListTodoSub = new GetListTodoSub();
  private toggleDoneSub = new ToggleDoneSub();
  private addTodoSub = new AddTodoSub();
  private removeTodoSub = new RemoveTodoSub();

  private listTodo: ITodoItem[] = [];

  constructor(props?: IConstructor) {
    props?.getListTodoSub && (this.getListTodoSub = props.getListTodoSub);
    props?.toggleDoneSub && (this.toggleDoneSub = props.toggleDoneSub);
    props?.addTodoSub && (this.addTodoSub = props.addTodoSub);
    props?.removeTodoSub && (this.removeTodoSub = props.removeTodoSub);
  }

  async getListTodo() {
    const result = await this.getListTodoSub.execute();
    this.listTodo = result.data.listTodo;
    return result;
  }

  async toggleDone(currentTodo: ITodoItem) {
    await this.toggleDoneSub.execute(currentTodo);
    return await this.getListTodo();
  }

  async addTodo(newTodo: NewTodoType) {
    await this.addTodoSub.execute(this.listTodo, newTodo);
    return await this.getListTodo();
  }

  async removeTodo(id: string) {
    await this.removeTodoSub.execute(id);
    return await this.getListTodo();
  }
}
