import { ITodoItem } from "./repository/interfaces";
import { Repository } from "./repository/repository";

type ReturnProps = {
  errorMessages: string[];
  success: boolean;
};

export class TodoMain {
  listTodo: ITodoItem[] = [];

  constructor(private repository = new Repository()) {}

  async toggleDone(currentTodo: ITodoItem): Promise<ReturnProps> {
    if (!currentTodo.id)
      return {
        errorMessages: ["O id não pode ser vazio"],
        success: false,
      };
    const todo = { ...currentTodo };
    todo.isDone = !todo.isDone;
    await this.repository.updateTodoItem(todo);

    return {
      errorMessages: [],
      success: true,
    };
  }

  async addTodo(newTodo: ITodoItem): Promise<ReturnProps> {
    if (!newTodo.title) {
      return {
        errorMessages: ["O título não pode ser vazio"],
        success: false,
      };
    }

    const todoList = this.listTodo;
    const todoAlreadyExists = todoList.find(
      (todoItem) => todoItem.title === newTodo.title
    );
    if (todoAlreadyExists) {
      return {
        errorMessages: ["O todo já existe"],
        success: false,
      };
    }
    await this.repository.addTodoItem(newTodo);

    return {
      errorMessages: [],
      success: true,
    };
  }

  async removeTodo(id: string): Promise<ReturnProps> {
    if (!id) {
      return {
        errorMessages: ["O id não pode ser vazio"],
        success: false,
      };
    }
    await this.repository.removeTodoItem(id);

    return {
      errorMessages: [],
      success: true,
    };
  }

  async getTodoAll(): Promise<ITodoItem[]> {
    const result = await this.repository.getTodoAll();
    this.listTodo = result;
    return result;
  }
}
