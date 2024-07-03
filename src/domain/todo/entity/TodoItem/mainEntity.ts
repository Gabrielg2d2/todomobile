import { ITypeMessage } from "../../../../global/types/typeMessage";

export interface ITodoItemEntity {
  id: string;
  title: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class TodoItem {
  private id: string = "";
  private title: string = "";
  private isDone: boolean = false;
  private createdAt: Date = new Date();
  private updatedAt: Date = new Date();

  create(id: string, title: string): boolean {
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

    return true;
  }

  toggleDone(): void {
    if (!this.id || !this.title) {
      throw {
        data: false,
        typeMessage: ITypeMessage.ERROR,
        message: "Todo não encontrado",
      };
    }

    this.isDone = !this.isDone;
    this.updatedAt = new Date();
  }

  get getData(): ITodoItemEntity {
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
