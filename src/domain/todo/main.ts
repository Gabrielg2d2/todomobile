import { NewTodoType } from "../../global/types/newTodo";
import { ITypeMessage } from "../../global/types/typeMessage";
import { ListTodoEntity } from "./entity/ListTodo/mainEntity";
import { TodoItemEntity } from "./entity/TodoItem/mainEntity";

export type IReturnDefault = {
  data: {
    listTodo: TodoItemEntity[];
    allTodoCompleted: number;
    quantityTodoCreated: number;
  };
  typeMessage: ITypeMessage;
  message: string;
};

export class TodoMain {
  private listTodoEntity = new ListTodoEntity();

  async getListTodo(): Promise<IReturnDefault> {
    return await this.listTodoEntity.getList();
  }

  async addTodo(newTodo: NewTodoType): Promise<IReturnDefault> {
    return await this.listTodoEntity.add(newTodo);
  }

  async removeTodo(id: string): Promise<IReturnDefault> {
    return await this.listTodoEntity.remove(id);
  }

  async toggleDone(currentTodo: TodoItemEntity): Promise<IReturnDefault> {
    await currentTodo.toggleDone();
    return await this.listTodoEntity.getList();
  }
}
