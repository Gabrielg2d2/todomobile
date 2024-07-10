import { describe, expect, test, vi } from "vitest";
import { ToggleDoneSub } from "./mainSub";
import { Repository } from "./repository/repository";
import { ITypeMessage } from "../../../../../../global/types/typeMessage";

describe("ToggleDoneSub", () => {
  describe("ToggleDoneSub", () => {
    describe("Error", () => {
      test("retornar uma mensagem de erro, sempre que o repository falhar", async () => {
        const repositoryMock = {
          toggleDone: vi.fn().mockRejectedValue(new Error()),
        } as unknown as Repository;

        const toggleDoneSub = new ToggleDoneSub(repositoryMock);
        const todo = {
          id: "1",
          title: "title",
          description: "description",
          isDone: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await toggleDoneSub.execute(todo);

        expect(result).toEqual({
          message: "Erro ao atualizar o todo",
          typeMessage: ITypeMessage.ERROR,
          data: null,
        });
      });
    });

    describe("Sucess", () => {
      test("deveria retornar uma mensagem de sucesso e atualizar o todo", async () => {
        const repositoryMock = {
          toggleDone: vi.fn().mockResolvedValue({
            data: {
              id: "1",
              title: "title",
              description: "description",
              isDone: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            message: "",
            typeMessage: ITypeMessage.SUCCESS,
          }),
        } as unknown as Repository;

        const toggleDoneSub = new ToggleDoneSub(repositoryMock);
        const todo = {
          id: "1",
          title: "title",
          description: "description",
          isDone: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await toggleDoneSub.execute(todo);

        expect(result.data).toEqual({
          id: "1",
          title: "title",
          description: "description",
          isDone: true,
          createdAt: todo.createdAt,
          updatedAt: todo.updatedAt,
        });
      });
    });
  });
});
