import { useCallback, useEffect, useState } from "react";
import TodoTemplate from "./todo-template";
import { ITodoItem, NewTodoType, TodoMain } from "../../domain/todo/main";
import { Alert } from "react-native";

export function Todo() {
  const [todoMain] = useState(new TodoMain());
  const [listTodo, setListTodo] = useState<ITodoItem[]>([]);

  async function getAllTodo() {
    const result = await todoMain.getTodoAll();
    setListTodo(result);
  }

  async function handleDeleteTodo(id: string) {
    const result = await todoMain.removeTodo(id);
    if (result.success) {
      return getAllTodo();
    }

    result.errorMessages.forEach((message) => {
      Alert.alert("Erro", message);
    });
  }

  async function handleAddTodo(newTodo: NewTodoType) {
    const result = await todoMain.addTodo(newTodo);
    if (result.success) {
      return getAllTodo();
    }

    result.errorMessages.forEach((message) => {
      Alert.alert("Erro", message);
    });
  }

  async function handleToggleTodo(todo: ITodoItem) {
    const result = await todoMain.toggleDone(todo);

    if (result.success) {
      return getAllTodo();
    }

    result.errorMessages.forEach((message) => {
      Alert.alert("Erro", message);
    });
  }

  useEffect(() => {
    getAllTodo();
  }, [listTodo]);

  const templateProps = {
    listTodo,
    handleDeleteTodo,
    handleAddTodo,
    handleToggleTodo,
  };

  return <TodoTemplate {...templateProps} />;
}
