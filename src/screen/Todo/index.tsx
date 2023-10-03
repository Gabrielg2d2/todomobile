import { useState } from "react";
import TodoTemplate from "./todo-template";

export function Todo() {
  const [listTodo, setListTodo] = useState([
    {
      value: "Lista de tarefas 1",
      todo: false,
    },
    {
      value: "Lista de tarefas 2",
      todo: true,
    },
    {
      value: "Lista de tarefas 3",
      todo: false,
    },
    {
      value: "Lista de tarefas 4",
      todo: true,
    },
    {
      value: "Lista de tarefas 5",
      todo: false,
    },
    {
      value: "Lista de tarefas 6",
      todo: false,
    },
    {
      value: "Lista de tarefas 7",
      todo: false,
    },
  ]);

  const handleDeleteTodo = () => {
    console.log("Task deleted!");
  };

  const handleAddTodo = () => {
    console.log("Task added!");
  };

  const templateProps = {
    listTodo,
    handleDeleteTodo,
    handleAddTodo,
  };

  return <TodoTemplate {...templateProps} />;
}
