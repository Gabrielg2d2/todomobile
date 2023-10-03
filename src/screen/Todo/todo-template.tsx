import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { styles } from "./styles";

export default function TodoTemplate() {
  const handleAddTask = () => {
    console.log("Task added!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../assets/logo.png")} />
      </View>
      <View style={styles.alignInput}>
        <TextInput
          style={styles.inputTodo}
          placeholder="Adicione uma nova tarefa"
        />
        <TouchableOpacity style={styles.buttonAddTodo} onPress={handleAddTask}>
          <Text style={styles.textAddTodo}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.informationTodo}>
        <View>
          <Text>Criadas</Text>
          <Text>0</Text>
        </View>
        <View>
          <Text>Concluídas</Text>
          <Text>0</Text>
        </View>
      </View>

      <View style={styles.cardTodo}>
        <TouchableOpacity>
          <Image
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
        </TouchableOpacity>
        <Text>Lista de tarefas</Text>
        <TouchableOpacity>
          <Image
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
