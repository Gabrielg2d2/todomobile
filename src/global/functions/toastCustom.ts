import { Alert } from "react-native";
import { ITypeMessage } from "../../domainV2/todo/global/types/typeMessage";

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
