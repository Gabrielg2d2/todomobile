import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAdapterRepository, ITodoItem } from "./interfaces";

export class AdapterLocalStorage implements IAdapterRepository {
  key = "todoList";

  async add(todoItem: ITodoItem): Promise<void> {
    try {
      const result = await AsyncStorage.getItem(this.key);
      if (result) {
        const todoListCurrent = JSON.parse(result);
        todoListCurrent.push(todoItem);
        await AsyncStorage.setItem(this.key, JSON.stringify(todoListCurrent));
      }

      await AsyncStorage.setItem(this.key, JSON.stringify([todoItem]));
    } catch (error) {
      console.error("add-adapter: ", error);
    }
  }

  async remove(id: string): Promise<void> {
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
      console.error("remove-adapter: ", error);
    }
  }

  async update(todoItemUpdate: ITodoItem): Promise<void> {
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
      console.error("update-adapter: ", error);
    }
  }

  async getAll(): Promise<ITodoItem[]> {
    try {
      const result = await AsyncStorage.getItem(this.key);
      if (result) {
        return JSON.parse(result);
      }
      return [];
    } catch (error) {
      console.error("getAll-adapter: ", error);
      return [];
    }
  }
}