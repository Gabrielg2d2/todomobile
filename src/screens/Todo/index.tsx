import { useState } from "react";
import TodoTemplate from "./todo-template";

export function Todo() {
  const [listTodo, setListTodo] = useState([
    {
      title: "Lista de tarefas 1",
      isDone: false,
    },
    {
      title: "Lista de tarefas 2",
      isDone: true,
    },
    {
      title: "Lista de tarefas 3",
      isDone: false,
    },
    {
      title: "Lista de tarefas 4",
      isDone: true,
    },
    {
      title: "Lista de tarefas 5",
      isDone: false,
    },
    {
      title: "Lista de tarefas 6",
      isDone: false,
    },
    {
      title: "Lista de tarefas 7",
      isDone: false,
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
