import { describe, expect, test, vi } from "vitest";
import { RemoveTodoSub } from "./mainSub";
import { Repository } from "./repository/repository";
import { ITypeMessage } from "../../../../../../global/types/typeMessage";

describe("RemoveTodoSub", () => {
  describe("Error", () => {
    test("retornar um erro, quando repository falhar por qualquer motivo", async () => {
      const repositoryMock = {
        removeTodo: vi.fn().mockRejectedValue(new Error()),
      } as unknown as Repository;

      const sub = new RemoveTodoSub(repositoryMock);

      const id = "123";

      const result = await sub.execute(id);

      expect(result).toEqual({
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Erro ao remover todo",
      });
    });
  });

  describe("Success", () => {
    test("retornar mensagem de sucesso, quando repository remover com sucesso", async () => {
      const repositoryMock = {
        removeTodo: vi.fn().mockResolvedValueOnce({
          data: true,
          typeMessage: ITypeMessage.SUCCESS,
          message: "Todo removido com sucesso",
        }),
      } as unknown as Repository;

      const sub = new RemoveTodoSub(repositoryMock);

      const id = "123";

      const result = await sub.execute(id);

      expect(result).toEqual({
        data: true,
        typeMessage: ITypeMessage.SUCCESS,
        message: "Todo removido com sucesso",
      });
    });
  });
});
