import { ITypeMessage } from "./typeMessage";

type IReturnData<DATA> = {
  message: string;
  data: DATA;
  typeMessage: ITypeMessage;
};

export type IReturnDefaultPromise<DATA = null> = Promise<IReturnData<DATA>>;
