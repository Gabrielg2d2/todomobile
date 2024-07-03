import { NewTodoType } from "../../../../global/types/newTodo";
import { TodoItemEntity } from "../TodoItem/mainEntity";
import { AddTodoSub } from "./sub/addTodo/mainSub";
import { GetListTodoSub } from "./sub/getListTodo/mainSub";
import { RemoveTodoSub } from "./sub/removeTodo/mainSub";

type IDataTodo = {
  listTodo: TodoItemEntity[];
  allTodoCompleted: number;
  quantityTodoCreated: number;
};

export class ListTodoEntity {
  private dataTodo: IDataTodo = {
    listTodo: [],
    allTodoCompleted: 0,
    quantityTodoCreated: 0,
  };

  async getList() {
    const getListTodoSub = new GetListTodoSub();
    const result = await getListTodoSub.execute();
    this.dataTodo = result.data;
    return result;
  }

  async add(newTodo: NewTodoType) {
    const addTodoSub = new AddTodoSub();
    addTodoSub.execute(this.dataTodo.listTodo, newTodo);
    return this.getList();
  }

  async remove(id: string) {
    const removeTodoSub = new RemoveTodoSub();
    await removeTodoSub.execute(id);
    return this.getList();
  }
}
