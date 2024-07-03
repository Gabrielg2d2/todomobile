import { describe, expect, test } from "vitest";
import { ITodoItem } from "../../../../../global/types/itemTodo";
import { AddTodoSub } from "../../../../todo/sub/addTodo/mainSub";

describe("AddTodoSub", () => {
  describe("Error", () => {
    test("Não deveria adicionar um todo sem título", async () => {
      const mainSub = new AddTodoSub();

      const listTodo: ITodoItem[] = [
        {
          id: "1",
          title: "Teste",
          isDone: true,
        },
        {
          id: "2",
          title: "Teste 2",
          isDone: false,
        },
      ];

      const newTodo = {
        title: "",
        isDone: false,
      };

      const result = await mainSub.execute(listTodo, newTodo);

      expect(result.message).toBe("Título do todo não pode ser vazio");
    });

    test("Não deveria adicionar um todo que já existe", async () => {
      const mainSub = new AddTodoSub();

      const listTodo: ITodoItem[] = [
        {
          id: "1",
          title: "Teste",
          isDone: true,
        },
        {
          id: "2",
          title: "Teste 2",
          isDone: false,
        },
      ];

      const newTodo = {
        title: "Teste",
        isDone: false,
      };

      const result = await mainSub.execute(listTodo, newTodo);

      expect(result.message).toBe("Todo já existe");
    });

    test("Repository deveria retornar erro ao adicionar um novo todo", async () => {
      const repositoryMock = {
        addTodo: () => Promise.reject(new Error()),
      } as any;

      const mainSub = new AddTodoSub(repositoryMock);

      const listTodo: ITodoItem[] = [
        {
          id: "1",
          title: "Teste",
          isDone: true,
        },
        {
          id: "2",
          title: "Teste 2",
          isDone: false,
        },
      ];

      const newTodo = {
        title: "Outro teste todo",
        isDone: false,
      };

      const result = await mainSub.execute(listTodo, newTodo);

      expect(result.message).toBe("Erro ao adicionar todo");
      expect(result.typeMessage).toBe("error");
      expect(result.data).toBe(false);
    });
  });

  describe("Success", () => {
    test("Deveria adicionar um novo todo", async () => {
      const mainSub = new AddTodoSub();

      const listTodo: ITodoItem[] = [
        {
          id: "1",
          title: "Teste",
          isDone: true,
        },
        {
          id: "2",
          title: "Teste 2",
          isDone: false,
        },
      ];

      const newTodo = {
        title: "Outro teste todo",
        isDone: false,
      };

      const result = await mainSub.execute(listTodo, newTodo);

      expect(result.message).toBe("Novo todo adicionado com sucesso");
    });
  });
});
