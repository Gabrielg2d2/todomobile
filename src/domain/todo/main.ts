import { ITodoItem, NewTodoType } from "./repository/interfaces";
import { Repository } from "./repository/repository";
import { Service } from "./service/todo";

type ReturnProps = {
  errorMessages: string[];
  success: boolean;
};

class TodoMain {
  listTodo: ITodoItem[] = [];

  constructor(
    private repository = new Repository(),
    private service = Service
  ) {}

  async toggleDone(currentTodo: ITodoItem): Promise<ReturnProps> {
    if (!currentTodo.id || !currentTodo.title) {
      return {
        errorMessages: ["O id ou título não pode ser vazio"],
        success: false,
      };
    }
    const todo = { ...currentTodo };
    todo.isDone = !todo.isDone;
    await this.repository.updateTodoItem(todo);

    return {
      errorMessages: [],
      success: true,
    };
  }

  async addTodo(newTodo: NewTodoType): Promise<ReturnProps> {
    if (!newTodo.title) {
      return {
        errorMessages: ["O título não pode ser vazio"],
        success: false,
      };
    }

    const check = this.service.todoAlreadyExists(this.listTodo, newTodo);
    if (check) {
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

  async getTodoAll() {
    const result = await this.repository.getTodoAll();
    this.listTodo = result;

    const { quantityTodoCreated, allTodoCompleted } =
      this.service.separateTodo(result);

    return {
      listTodo: result,
      quantityTodoCreated,
      allTodoCompleted,
    };
  }
}

export { TodoMain, ITodoItem, NewTodoType };
