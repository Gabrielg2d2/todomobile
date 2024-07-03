import { NewTodoType } from "../../global/types/newTodo";
import { ITypeMessage } from "../../global/types/typeMessage";
import { ListTodoEntity } from "./entity/ListTodo/mainEntity";
import { ITodoItemEntity, TodoItemEntity } from "./entity/TodoItem/mainEntity";

type IReturnDefault = {
  data: {
    listTodo: ITodoItemEntity[];
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
  toggleDone: (currentTodo: TodoItemEntity) => Promise<IReturnDefault>;
}

export { IReturnDefault, ITodoItemEntity };

export class TodoMain implements ITodoMain {
  constructor(private listTodoEntity = new ListTodoEntity()) {}

  async getListTodo() {
    return await this.listTodoEntity.getList();
  }

  async addTodo(newTodo: NewTodoType) {
    return await this.listTodoEntity.add(newTodo);
  }

  async removeTodo(id: string) {
    return await this.listTodoEntity.remove(id);
  }

  // TODO: talvez o toggleDone não precise retornar a lista de todos
  async toggleDone(currentTodo: TodoItemEntity) {
    await currentTodo.toggleDone();
    return await this.listTodoEntity.getList();
  }
}
