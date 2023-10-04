import { useCallback, useEffect, useState } from "react";
import TodoTemplate from "./todo-template";
import { ITodoItem, NewTodoType, TodoMain } from "../../domain/todo/main";
import { Alert } from "react-native";

export function Todo() {
  const [todoMain] = useState(new TodoMain());
  const [listTodo, setListTodo] = useState<ITodoItem[]>([]);

  const getAllTodo = useCallback(async () => {
    const result = await todoMain.getTodoAll();
    setListTodo(result);
  }, []);

  async function handleDeleteTodo(id: string) {
    Alert.alert(
      "Excluir",
      "Deseja realmente excluir este item?",
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            const result = await todoMain.removeTodo(id);
            if (result.success) {
              return getAllTodo();
            }

            result.errorMessages.forEach((message) => {
              Alert.alert("Erro", message);
            });
          },
        },
      ],
      { cancelable: false }
    );
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
  }, [getAllTodo]);

  const templateProps = {
    listTodo,
    handleDeleteTodo,
    handleAddTodo,
    handleToggleTodo,
  };

  return <TodoTemplate {...templateProps} />;
}
