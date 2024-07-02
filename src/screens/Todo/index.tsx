import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { ITodoItem, NewTodoType, TodoMain } from "../../domain/todo/main";
import { ITypeMessage } from "../../domainV2/global/types/typeMessage";
import { TodoMainV2 } from "../../domainV2/todo/main";
import TodoTemplate from "./todoTemplate";

export function Todo() {
  const [todoMain] = useState(new TodoMain());
  const [todoMainV2] = useState(new TodoMainV2());
  const [listTodo, setListTodo] = useState<ITodoItem[]>([]);
  const [informationTodos, setInformationTodos] = useState({
    quantityTodoCreated: 0,
    allTodoCompleted: 0,
  });

  const getAllTodo = useCallback(async () => {
    const result = await todoMainV2.getListTodo();

    if (result.typeMessage !== ITypeMessage.SUCCESS) {
      setListTodo([]);
      setInformationTodos({
        quantityTodoCreated: 0,
        allTodoCompleted: 0,
      });
      Alert.alert("Erro", result.message);
      return;
    }

    setListTodo(result.data.listTodo);
    setInformationTodos({
      quantityTodoCreated: result.data.quantityTodoCreated,
      allTodoCompleted: result.data.allTodoCompleted,
    });
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
    informationTodos,
    handleDeleteTodo,
    handleAddTodo,
    handleToggleTodo,
  };

  return <TodoTemplate {...templateProps} />;
}
