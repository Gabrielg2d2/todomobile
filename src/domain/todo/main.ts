import { ITodoItem } from "./repository/interfaces";
import { Repository } from "./repository/repository";

type ReturnProps = {
  errorMessages: string[];
  success: boolean;
};

export class TodoMain {
  constructor(private repository = new Repository()) {}

  async toggleDone(currentTodo: ITodoItem): Promise<void> {
    const todo = { ...currentTodo };
    todo.isDone = !todo.isDone;
    await this.repository.updateTodoItem(todo);
  }

  async addTodo(newTodo: ITodoItem): Promise<ReturnProps> {
    if (!newTodo.title) {
      return {
        errorMessages: ["O título não pode ser vazio"],
        success: false,
      };
    }

    const todoList = await this.repository.getTodoAll();
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

  async removeTodo(id: string): Promise<void> {
    // verifica se o id existe
    await this.repository.removeTodoItem(id);
  }

  async getTodoAll(): Promise<ITodoItem[]> {
    return await this.repository.getTodoAll();
  }
}
