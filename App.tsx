import { StatusBar } from "expo-status-bar";
import { Todo } from "./src/screen/Todo";

export default function App() {
  return (
    <>
      <Todo />
      <StatusBar style="light" />
    </>
  );
}
