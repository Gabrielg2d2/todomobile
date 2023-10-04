import { StatusBar } from "expo-status-bar";
import { Todo } from "./src/screens/Todo";

export default function App() {
  return (
    <>
      <Todo />
      <StatusBar style="light" />
    </>
  );
}
