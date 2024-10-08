import React, { useCallback, useEffect, useState } from "react";
import { IReturnDefault, ITodoItem, TodoMain } from "../../domain/todo/main";
import { toastCustom } from "../../global/functions/toastCustom";
import { NewTodoType } from "../../global/types/newTodo";
import { ITypeMessage } from "../../global/types/typeMessage";
import TodoTemplate from "./template";

export function Todo() {
  const [todoMain] = useState(new TodoMain());
  const [listTodo, setListTodo] = useState<ITodoItem[]>([]);
  const [informationTodos, setInformationTodos] = useState({
    quantityTodoCreated: 0,
    allTodoCompleted: 0,
  });

  function handleResult(result: IReturnDefault) {
    toastCustom({ typeMessage: result.typeMessage, message: result.message });

    if (result.typeMessage !== ITypeMessage.SUCCESS) return;
    setListTodo(result.data.listTodo);
    setInformationTodos({
      quantityTodoCreated: result.data.quantityTodoCreated,
      allTodoCompleted: result.data.allTodoCompleted,
    });
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
    const result = await todoMain.removeTodo(id);
    handleResult(result);
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
