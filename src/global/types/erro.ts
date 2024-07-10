import { ITypeMessage } from "./typeMessage";

export type IError<DATA = null> =
  | {
      data: DATA;
      typeMessage: ITypeMessage;
      message: string;
    }
  | any;
