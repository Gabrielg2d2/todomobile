import { ITypeMessage } from "../../../../global/types/typeMessage";
import { ToggleDoneSub } from "./sub/toggleDone/mainSub";

export interface ITodoItemEntity {
  getData: {
    id: string;
    title: string;
    isDone: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  toggleDone: () => Promise<{
    data: boolean;
    typeMessage: ITypeMessage;
    message: string;
  }>;
}

export class TodoItemEntity implements ITodoItemEntity {
  constructor(
    private id: string,
    private title: string,
    private isDone: boolean = false,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date()
  ) {
    this.create(id, title);
  }

  private create(id: string, title: string) {
    if (!id) {
      throw {
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Id do todo não pode ser vazio",
      };
    }

    if (!title) {
      throw {
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Título do todo não pode ser vazio",
      };
    }

    this.id = id;
    this.title = title;
    this.isDone = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  toggleDone() {
    if (!this.id || !this.title) {
      throw {
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Todo não encontrado",
      };
    }

    this.isDone = !this.isDone;
    this.updatedAt = new Date();
    const toggleDoneSub = new ToggleDoneSub();
    return toggleDoneSub.execute(this.getData);
  }

  get getData() {
    if (!this.id || !this.title) {
      throw {
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Todo não encontrado",
      };
    }

    return {
      id: this.id,
      title: this.title,
      isDone: this.isDone,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
