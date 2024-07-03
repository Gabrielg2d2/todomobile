import { describe, expect, test, vi } from "vitest";
import { AddTodoSub } from "../../../../../domain/todo/entity/ListTodo/sub/addTodo/mainSub";
import { ITodoItemEntity } from "../../../../../domain/todo/entity/TodoItem/mainEntity";
import { ITypeMessage } from "../../../../../global/types/typeMessage";

describe("AddTodoSub", () => {
  describe("Error", () => {
    test("Não deveria adicionar um todo que já existe", async () => {
      const repositoryMock = {
        addTodo: vi.fn().mockResolvedValueOnce({
          data: {
            id: "3",
            title: "Teste 2",
            isDone: false,
          },
          typeMessage: ITypeMessage.ERROR,
          message: "Erro ao adicionar novo todo, tente novamente!",
        }),
      } as any;

      const mainSub = new AddTodoSub(repositoryMock);

      const getDataMock = () => ({
        id: "1",
        title: "Teste",
        isDone: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const getDataMock2 = () => ({
        id: "2",
        title: "Teste 2",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const listTodo: ITodoItemEntity[] = [
        {
          toggleDone: vi.fn(),
          getData: getDataMock(),
        },
        {
          toggleDone: vi.fn(),
          getData: getDataMock2(),
        },
      ];

      const newTodo = {
        title: "Teste 2",
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

      const getDataMock = () => ({
        id: "1",
        title: "Teste",
        isDone: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const getDataMock2 = () => ({
        id: "2",
        title: "Teste 2",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const listTodo: ITodoItemEntity[] = [
        {
          toggleDone: vi.fn(),
          getData: getDataMock(),
        },
        {
          toggleDone: vi.fn(),
          getData: getDataMock2(),
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
      const repositoryMock = {
        addTodo: vi.fn().mockResolvedValueOnce({
          data: {
            id: "3",
            title: "Outro teste todo",
            isDone: false,
          },
          typeMessage: ITypeMessage.SUCCESS,
          message: "Novo todo adicionado com sucesso",
        }),
      } as any;

      const mainSub = new AddTodoSub(repositoryMock);

      const getDataMock = () => ({
        id: "1",
        title: "Teste",
        isDone: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const getDataMock2 = () => ({
        id: "2",
        title: "Teste 2",
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const listTodo: ITodoItemEntity[] = [
        {
          toggleDone: vi.fn(),
          getData: getDataMock(),
        },
        {
          toggleDone: vi.fn(),
          getData: getDataMock2(),
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
