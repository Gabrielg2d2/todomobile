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

  const handleDeleteTask = () => {
    console.log("Task deleted!");
  };

  const handleAddTask = () => {
    console.log("Task added!");
  };

  const templateProps = {
    listTodo,
    handleDeleteTask,
    handleAddTask,
  };

  return <TodoTemplate {...templateProps} />;
}
