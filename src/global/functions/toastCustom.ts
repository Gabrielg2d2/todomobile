import { Alert } from "react-native";
import { ITypeMessage } from "../types/typeMessage";

type IToastCustomProps = {
  typeMessage: ITypeMessage;
  message: string;
};

export function toastCustom({ typeMessage, message }: IToastCustomProps) {
  if (typeMessage !== ITypeMessage.SUCCESS) {
    if (message) Alert.alert("Erro", message);
    return;
  }
  if (message) Alert.alert("Sucesso", message);
}
