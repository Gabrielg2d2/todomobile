import { describe, expect, test, vi } from "vitest";
import { AddTodoSub } from "./mainSub";
import { ITypeMessage } from "../../../../../../global/types/typeMessage";
import { Service } from "./service/service";
import { Repository } from "./repository/repository";

describe("AddTodoSub", () => {
  describe("Error", () => {
    test("retornar um erro, quando service falhar por qualquer motivo", async () => {
      const serviceMock = {
        todoAlreadyExists: new Error(),
      } as unknown as Service;

      const repositoryMock = {
        addTodo: () => new Error(),
      } as unknown as Repository;

      const sub = new AddTodoSub(repositoryMock, serviceMock);

      const listMock = [
        {
          title: "title",
          isDone: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          id: "123",
        },
      ];

      const newTodo = {
        title: "title",
      };

      const result = await sub.execute(listMock, newTodo);

      expect(result).toEqual({
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Erro ao adicionar todo",
      });
    });

    test("retornar mensagem de erro, quando repository retornar algum erro", async () => {
      const serviceMock = {
        todoAlreadyExists: new Error(),
      } as unknown as Service;

      const repositoryMock = {
        addTodo: () => new Error(),
      } as unknown as Repository;

      const sub = new AddTodoSub(repositoryMock, serviceMock);

      const listMock = [
        {
          title: "title",
          isDone: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          id: "123",
        },
      ];

      const newTodo = {
        title: "title",
      };

      const result = await sub.execute(listMock, newTodo);

      expect(result).toEqual({
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Erro ao adicionar todo",
      });
    });

    test("retornar mensagem de erro, quando o todo já existir", async () => {
      const sub = new AddTodoSub();

      const listMock = [
        {
          title: "title",
          isDone: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          id: "123",
        },
      ];

      const newTodo = {
        title: "title",
      };

      const result = await sub.execute(listMock, newTodo);

      expect(result).toEqual({
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Todo já existe",
      });
    });
  });

  describe("Success", () => {
    test("retornar mensagem de sucesso, quando adicionar um novo todo", async () => {
      const repositoryMock = {
        addTodo: () => ({
          data: true,
          typeMessage: ITypeMessage.SUCCESS,
          message: "Todo adicionado com sucesso",
        }),
      } as unknown as Repository;

      const sub = new AddTodoSub(repositoryMock);

      const listMock = [
        {
          title: "title",
          isDone: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          id: "123",
        },
      ];

      const newTodo = {
        title: "outro Todo",
      };

      const result = await sub.execute(listMock, newTodo);

      expect(result).toEqual({
        data: true,
        typeMessage: ITypeMessage.SUCCESS,
        message: "Todo adicionado com sucesso",
      });
    });
  });
});
