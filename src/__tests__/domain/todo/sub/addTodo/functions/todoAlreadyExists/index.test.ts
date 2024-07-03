import { describe, expect, test, vi } from "vitest";
import { TodoAlreadyExists } from "../../../../../../../domain/todo/entity/ListTodo/sub/addTodo/service/functions/todoAlreadyExists";
import { TodoItemEntity } from "../../../../../../../domain/todo/entity/TodoItem/mainEntity";

describe("todoAlreadyExists", () => {
  describe("Error", () => {
    test("Não deveria adicionar um todo que já existe, retornando true", () => {
      const todoAlreadyExists = new TodoAlreadyExists();
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

      const listTodo: TodoItemEntity[] = [
        {
          create: vi.fn(),
          toggleDone: vi.fn(),
          getData: getDataMock(),
        } as unknown as TodoItemEntity,
        {
          create: vi.fn(),
          toggleDone: vi.fn(),
          getData: getDataMock2(),
        } as unknown as TodoItemEntity,
      ];

      const newTodo = {
        title: "Teste 2",
        isDone: false,
      };

      const result = todoAlreadyExists.execute(listTodo, newTodo);

      expect(result).toBe(true);
    });
  });

  describe("Success", () => {
    test("Deveria adicionar um todo que não existe, retornando false", () => {
      const todoAlreadyExists = new TodoAlreadyExists();
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

      const listTodo: TodoItemEntity[] = [
        {
          create: vi.fn(),
          toggleDone: vi.fn(),
          getData: getDataMock(),
        } as unknown as TodoItemEntity,
        {
          create: vi.fn(),
          toggleDone: vi.fn(),
          getData: getDataMock2(),
        } as unknown as TodoItemEntity,
      ];

      const newTodo = {
        title: "Teste 3",
        isDone: false,
      };

      const result = todoAlreadyExists.execute(listTodo, newTodo);

      expect(result).toBe(false);
    });
  });
});
