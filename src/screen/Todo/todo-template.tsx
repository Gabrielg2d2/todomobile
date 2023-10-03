import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

type TodoTemplateProps = {
  listTodo: Array<{
    value: string;
    todo: boolean;
  }>;
  handleDeleteTodo: () => void;
  handleAddTodo: () => void;
};

export default function TodoTemplate(props: TodoTemplateProps) {
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
        <TouchableOpacity
          style={styles.buttonAddTodo}
          onPress={props.handleAddTodo}
        >
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

      {!props.listTodo.length && (
        <View style={styles.emptyListTodo}>
          <Image source={require("../../assets/clipboard/clip.png")} />
          <Text style={styles.emptyListTodoText}>
            Você ainda não tem tarefas cadastradas
          </Text>
          <Text style={styles.emptyListTodoTextAlert}>
            Crie tarefas e organize seus itens a fazer
          </Text>
        </View>
      )}

      <FlatList
        style={styles.listTodo}
        data={props.listTodo}
        renderItem={({ item }) => (
          <View key={item.value} style={styles.cardTodo}>
            <TouchableOpacity>
              {item.todo ? (
                <Image
                  source={require("../../assets/checkTrue/checkTrue.png")}
                />
              ) : (
                <Image
                  source={require("../../assets/checkFalse/checkFalse.png")}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.cardTodoText}>{item.value}</Text>
            <TouchableOpacity
              style={styles.cardTodoIconTrash}
              onPress={props.handleDeleteTodo}
            >
              <Image source={require("../../assets/trash/trash.png")} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
