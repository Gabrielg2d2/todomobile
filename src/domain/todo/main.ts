import { ITodoItem } from "../../global/types/itemTodo";
import { NewTodoType } from "../../global/types/newTodo";
import { ITypeMessage } from "../../global/types/typeMessage";
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

export type IReturnDefault = {
  data: {
    listTodo: ITodoItem[];
    allTodoCompleted: number;
    quantityTodoCreated: number;
  };
  typeMessage: ITypeMessage;
  message: string;
};

type IDataTodo = {
  listTodo: ITodoItem[];
  allTodoCompleted: number;
  quantityTodoCreated: number;
};

export class TodoMain {
  private getListTodoSub = new GetListTodoSub();
  private toggleDoneSub = new ToggleDoneSub();
  private addTodoSub = new AddTodoSub();
  private removeTodoSub = new RemoveTodoSub();

  private dataTodo: IDataTodo = {
    listTodo: [],
    allTodoCompleted: 0,
    quantityTodoCreated: 0,
  };

  constructor(props?: IConstructor) {
    props?.getListTodoSub && (this.getListTodoSub = props.getListTodoSub);
    props?.toggleDoneSub && (this.toggleDoneSub = props.toggleDoneSub);
    props?.addTodoSub && (this.addTodoSub = props.addTodoSub);
    props?.removeTodoSub && (this.removeTodoSub = props.removeTodoSub);
  }

  async getListTodo(): Promise<IReturnDefault> {
    const result = await this.getListTodoSub.execute();
    this.dataTodo = result.data;
    return result;
  }

  async toggleDone(currentTodo: ITodoItem): Promise<IReturnDefault> {
    const result = await this.toggleDoneSub.execute(currentTodo);

    if (result.typeMessage !== ITypeMessage.SUCCESS) {
      return {
        data: this.dataTodo,
        typeMessage: result.typeMessage,
        message: result.message,
      };
    }

    return await this.getListTodo();
  }

  async addTodo(newTodo: NewTodoType): Promise<IReturnDefault> {
    const result = await this.addTodoSub.execute(
      this.dataTodo.listTodo,
      newTodo
    );

    if (result.typeMessage !== ITypeMessage.SUCCESS) {
      return {
        data: this.dataTodo,
        typeMessage: result.typeMessage,
        message: result.message,
      };
    }

    return await this.getListTodo();
  }

  async removeTodo(id: string): Promise<IReturnDefault> {
    const result = await this.removeTodoSub.execute(id);

    if (result.typeMessage !== ITypeMessage.SUCCESS) {
      return {
        data: this.dataTodo,
        typeMessage: result.typeMessage,
        message: result.message,
      };
    }

    return await this.getListTodo();
  }
}
