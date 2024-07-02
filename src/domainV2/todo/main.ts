import { ITodoItem } from "../global/types/itemTodo";
import { NewTodoType } from "../global/types/newTodo";
import { GetListTodoSub } from "./sub/getListTodo/subMain";
import { ToggleDoneSub } from "./sub/toggleDone/mainSub";

type IConstructor = {
  getListTodoSub: GetListTodoSub;
  toggleDoneSub: ToggleDoneSub;
};

type IDataTodo = {
  listTodo: ITodoItem[];
  allTodoCompleted: number;
  quantityTodoCreated: number;
};

export class TodoMainV2 {
  private getListTodoSub = new GetListTodoSub();
  private toggleDoneSub = new ToggleDoneSub();

  constructor(props?: IConstructor) {
    props?.getListTodoSub && (this.getListTodoSub = props.getListTodoSub);
    props?.toggleDoneSub && (this.toggleDoneSub = props.toggleDoneSub);
  }

  async getListTodo() {
    return await this.getListTodoSub.execute();
  }

  async toggleDone(currentTodo: ITodoItem) {
    await this.toggleDoneSub.execute(currentTodo);
    return await this.getListTodo();
  }

  async addTodo(newTodo: NewTodoType) {
    return await this.getListTodo();
  }

  async removeTodo(id: string) {
    return await this.getListTodo();
  }
}
