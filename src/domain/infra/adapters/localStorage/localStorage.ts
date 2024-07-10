import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITodoItem } from "../../../../global/types/itemTodo";
import { NewTodoType } from "../../../../global/types/newTodo";
import { IAdapterRepository } from "../interfaceRepository";

export class AdapterLocalStorage implements IAdapterRepository {
  private readonly key = "todoList";

  async post(todoItem: NewTodoType) {
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

        await AsyncStorage.setItem(this.key, JSON.stringify(todoListCurrent));
        return Promise.resolve({
          data: todoListCurrent,
        });
      }

      await AsyncStorage.setItem(this.key, JSON.stringify([todoEntity]));

      return Promise.resolve({
        data: [todoEntity],
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(id: string) {
    try {
      const result = await AsyncStorage.getItem(this.key);
      if (result) {
        const todoListCurrent = JSON.parse(result);
        const todoListNew = todoListCurrent.filter(
          (todoItem: ITodoItem) => todoItem.id !== id
        );
        await AsyncStorage.setItem(this.key, JSON.stringify(todoListNew));

        return Promise.resolve({
          data: true,
        });
      }

      return Promise.reject();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async put(todoItemUpdate: ITodoItem) {
    try {
      const result = await AsyncStorage.getItem(this.key);
      if (!result) {
        return Promise.reject();
      }

      const todoListCurrent = JSON.parse(result);
      const todoListNew = todoListCurrent.map((todoItemCurrent: ITodoItem) =>
        todoItemCurrent.id === todoItemUpdate.id
          ? todoItemUpdate
          : todoItemCurrent
      );
      await AsyncStorage.setItem(this.key, JSON.stringify(todoListNew));

      return Promise.resolve({
        data: todoItemUpdate,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async get() {
    try {
      const result = await AsyncStorage.getItem(this.key);
      if (result) {
        return Promise.resolve({
          data: JSON.parse(result),
        });
      }

      return Promise.resolve({
        data: [],
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
