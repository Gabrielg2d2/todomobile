import { ITodoItem } from "../../global/types/itemTodo";
import { NewTodoType } from "../../global/types/newTodo";
import { ITypeMessage } from "../../global/types/typeMessage";
import { ListTodoEntity } from "./entity/ListTodo/mainEntity";

type IReturnDefault = {
  data: {
    listTodo: ITodoItem[];
    allTodoCompleted: number;
    quantityTodoCreated: number;
  };
  typeMessage: ITypeMessage;
  message: string;
};

interface ITodoMain {
  getListTodo: () => Promise<IReturnDefault>;
  addTodo: (newTodo: NewTodoType) => Promise<IReturnDefault>;
  removeTodo: (id: string) => Promise<IReturnDefault>;
  toggleDone: (currentTodo: ITodoItem) => Promise<IReturnDefault>;
}

type IDataTodo = {
  listTodo: ITodoItem[];
  allTodoCompleted: number;
  quantityTodoCreated: number;
};

export type { IReturnDefault, ITodoItem };

export class TodoMain implements ITodoMain {
  private dataTodo: IDataTodo = {
    listTodo: [],
    allTodoCompleted: 0,
    quantityTodoCreated: 0,
  };

  constructor(private readonly listTodoEntity = new ListTodoEntity()) {}

  async getListTodo() {
    const result = await this.listTodoEntity.actions.list();
    this.dataTodo = result.data;
    return result;
  }

  async addTodo(newTodo: NewTodoType) {
    const result = await this.listTodoEntity.actions.add(
      this.dataTodo.listTodo,
      newTodo
    );
    if (result.typeMessage !== ITypeMessage.SUCCESS) {
      {
        return {
          data: this.dataTodo,
          typeMessage: result.typeMessage,
          message: result.message,
        };
      }
    }

    return await this.getListTodo();
  }

  async removeTodo(id: string) {
    const result = await this.listTodoEntity.actions.remove(id);
    if (result.typeMessage !== ITypeMessage.SUCCESS) {
      {
        return {
          data: this.dataTodo,
          typeMessage: result.typeMessage,
          message: result.message,
        };
      }
    }

    return await this.getListTodo();
  }

  async toggleDone(currentTodo: ITodoItem) {
    const result = await this.listTodoEntity.actions.toggle(currentTodo);

    if (result.typeMessage !== ITypeMessage.SUCCESS) {
      {
        return {
          data: this.dataTodo,
          typeMessage: result.typeMessage,
          message: result.message,
        };
      }
    }
    return await this.getListTodo();
  }
}
