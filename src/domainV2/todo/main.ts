import { ITodoItem } from "../global/types/itemTodo";
import { IReturnDefaultPromise } from "../global/types/returnPromisseDefault";
import { GetListTodoSub } from "./sub/getListTodo/subMain";

type IConstructor = {
  getListTodoSub: GetListTodoSub;
};

export class TodoMainV2 {
  private listTodo: ITodoItem[] = [];
  private getListTodoSub = new GetListTodoSub();

  constructor(props?: IConstructor) {
    props?.getListTodoSub && (this.getListTodoSub = props.getListTodoSub);
  }

  async getListTodo() {
    return await this.getListTodoSub.execute();
  }

  async toggleDone(currentTodo: ITodoItem): IReturnDefaultPromise {}

  async addTodo(newTodo: NewTodoType): IReturnDefaultPromise {}

  async removeTodo(id: string): IReturnDefaultPromise {}
}
