import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITodoItem } from "../../../todo/global/types/itemTodo";
import { NewTodoType } from "../../../todo/global/types/newTodo";
import { IAdapterRepository } from "../interfaceRepository";

export class AdapterLocalStorage implements IAdapterRepository {
  private readonly key = "todoList";

  async post(todoItem: NewTodoType): Promise<void> {
    try {
      const todoEntity = {
        id: Math.random().toString(),
        title: todoItem.title,
        isDone: false,
      };
      const result = await AsyncStorage.getItem(this.key);
      if (result) {
        const todoListCurrent = JSON.parse(result);
        todoListCurrent.push(todoEntity);

        return await AsyncStorage.setItem(
          this.key,
          JSON.stringify(todoListCurrent)
        );
      }

      await AsyncStorage.setItem(this.key, JSON.stringify([todoEntity]));
    } catch (error) {
      console.error("post: ", error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await AsyncStorage.getItem(this.key);
      if (result) {
        const todoListCurrent = JSON.parse(result);
        const todoListNew = todoListCurrent.filter(
          (todoItem: ITodoItem) => todoItem.id !== id
        );
        await AsyncStorage.setItem(this.key, JSON.stringify(todoListNew));
      }
    } catch (error) {
      console.error("delete: ", error);
    }
  }

  async put(todoItemUpdate: ITodoItem): Promise<void> {
    try {
      const result = await AsyncStorage.getItem(this.key);
      if (result) {
        const todoListCurrent = JSON.parse(result);
        const todoListNew = todoListCurrent.map((todoItemCurrent: ITodoItem) =>
          todoItemCurrent.id === todoItemUpdate.id
            ? todoItemUpdate
            : todoItemCurrent
        );
        await AsyncStorage.setItem(this.key, JSON.stringify(todoListNew));
      }
    } catch (error) {
      console.error("put: ", error);
    }
  }

  async get(): Promise<ITodoItem[]> {
    try {
      const result = await AsyncStorage.getItem(this.key);
      if (result) {
        return JSON.parse(result);
      }
      return [];
    } catch (error) {
      console.error("get: ", error);
      return [];
    }
  }
}
