import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function TodoTemplate() {
  const handleDeleteTask = () => {
    console.log("Task deleted!");
  };

  const handleAddTask = () => {
    console.log("Task added!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../assets/logo/logo.png")} />
      </View>
      <View style={styles.alignInput}>
        <TextInput
          style={styles.inputTodo}
          placeholder="Adicione uma nova tarefa"
          placeholderTextColor={"#808080"}
        />
        <TouchableOpacity style={styles.buttonAddTodo} onPress={handleAddTask}>
          <Text style={styles.textAddTodo}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.informationTodo}>
        <View style={styles.informationTodoAlign}>
          <Text style={styles.informationTodoTextCreate}>Criadas</Text>
          <Text style={styles.informationTodoNumber}>0</Text>
        </View>
        <View style={styles.informationTodoAlign}>
          <Text style={styles.informationTodoTextConcluded}>Concluídas</Text>
          <Text style={styles.informationTodoNumber}>0</Text>
        </View>
      </View>

      <View style={styles.emptyListTodo}>
        <Image source={require("../../assets/clipboard/clip.png")} />
        <Text style={styles.emptyListTodoText}>
          Você ainda não tem tarefas cadastradas
        </Text>
        <Text style={styles.emptyListTodoTextAlert}>
          Crie tarefas e organize seus itens a fazer
        </Text>
      </View>

      <View style={styles.cardTodo}>
        <TouchableOpacity>
          <Image source={require("../../assets/checkFalse/checkFalse.png")} />
        </TouchableOpacity>
        <Text style={styles.cardTodoText}>Lista de tarefas</Text>
        <TouchableOpacity
          style={styles.cardTodoIconTrash}
          onPress={handleDeleteTask}
        >
          <Image source={require("../../assets/trash/trash.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
