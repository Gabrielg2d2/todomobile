import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { ITodoItem, NewTodoType } from "../../domain/todo/main";
import { ITypeMessage } from "../../domainV2/global/types/typeMessage";
import { TodoMainV2 } from "../../domainV2/todo/main";
import TodoTemplate from "./todoTemplate";

type IResult = {
  data: {
    listTodo: ITodoItem[];
    allTodoCompleted: number;
    quantityTodoCreated: number;
  };
  typeMessage: ITypeMessage;
  message: string;
};

export function Todo() {
  const [todoMain] = useState(new TodoMainV2());
  const [listTodo, setListTodo] = useState<ITodoItem[]>([]);
  const [informationTodos, setInformationTodos] = useState({
    quantityTodoCreated: 0,
    allTodoCompleted: 0,
  });

  function handleResult(result: IResult) {
    if (result.typeMessage !== ITypeMessage.SUCCESS) {
      setListTodo([]);
      setInformationTodos({
        quantityTodoCreated: 0,
        allTodoCompleted: 0,
      });
      if (result.message) Alert.alert("Erro", result.message);
      return;
    }

    setListTodo(result.data.listTodo);
    setInformationTodos({
      quantityTodoCreated: result.data.quantityTodoCreated,
      allTodoCompleted: result.data.allTodoCompleted,
    });
    if (result.message) Alert.alert("Sucesso", result.message);
  }

  const getAllTodo = useCallback(async () => {
    const result = await todoMain.getListTodo();
    handleResult(result);
  }, []);

  async function handleAddTodo(newTodo: NewTodoType) {
    const result = await todoMain.addTodo(newTodo);
    handleResult(result);
  }

  async function handleToggleTodo(todo: ITodoItem) {
    const result = await todoMain.toggleDone(todo);
    handleResult(result);
  }

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
            handleResult(result);
          },
        },
      ],
      { cancelable: false }
    );
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
