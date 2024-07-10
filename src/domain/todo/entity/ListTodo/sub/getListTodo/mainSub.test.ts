import { describe, expect, test, vi } from "vitest";
import { GetListTodoSub } from "./mainSub";
import { ITypeMessage } from "../../../../../../global/types/typeMessage";
import { Repository } from "./repository/repository";
import { Service } from "./service/service";
import { ITodoItem } from "../../../../../../global/types/itemTodo";

describe("GetListTodoSub", () => {
  describe("Error", () => {
    test("quando o respoitory retornar algum erro, deveria retornar um objeto com uma mensagem de erro", async () => {
      const respoitoryMock = {
        getListTodo: async () => {
          throw new Error();
        },
      } as unknown as Repository;

      const sub = new GetListTodoSub(respoitoryMock);

      const result = await sub.execute();

      expect(result).toEqual({
        data: {
          listTodo: [],
          allTodoCompleted: 0,
          quantityTodoCreated: 0,
        },
        typeMessage: ITypeMessage.ERROR,
        message: "Erro ao buscar lista de todos, tente novamente mais tarde.",
      });
    });

    test("quando ocorrer algum erro no service, deveria retornar um objeto com uma mensagem de erro", async () => {
      const respoitoryMock = {
        getListTodo: vi.fn().mockResolvedValue({
          data: [],
        }),
      } as unknown as Repository;

      const serviceMock = {
        separateTodo: () => {
          throw new Error();
        },
      } as unknown as Service;

      const sub = new GetListTodoSub(respoitoryMock, serviceMock);

      const result = await sub.execute();

      expect(result).toEqual({
        data: {
          listTodo: [],
          allTodoCompleted: 0,
          quantityTodoCreated: 0,
        },
        typeMessage: ITypeMessage.ERROR,
        message: "Erro ao buscar lista de todos, tente novamente mais tarde.",
      });
    });
  });

  describe("Sucess", () => {
    test("quando tudo ocorrer bem, deveria retornar um objeto com os dados da lista de todos", async () => {
      const dataMock: ITodoItem[] = [
        {
          id: "1",
          title: "title 1",
          isDone: false,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: "2",
          title: "title 2",
          isDone: true,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ];

      const respoitoryMock = {
        getListTodo: vi.fn().mockResolvedValue({
          data: dataMock,
        }),
      } as unknown as Repository;

      const sub = new GetListTodoSub(respoitoryMock);

      const result = await sub.execute();

      expect(result).toEqual({
        data: {
          listTodo: dataMock,
          allTodoCompleted: 1,
          quantityTodoCreated: 2,
        },
        typeMessage: ITypeMessage.SUCCESS,
        message: "",
      });
    });
  });
});
