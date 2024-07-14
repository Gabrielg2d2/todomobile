import { Analytics, logEvent } from "firebase/analytics";

import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ITodoItem } from "../../global/types/itemTodo";
import { NewTodoType } from "../../global/types/newTodo";
import { styles } from "./styles";

type TodoTemplateProps = {
  listTodo: ITodoItem[];
  informationTodos: {
    quantityTodoCreated: number;
    allTodoCompleted: number;
  };
  handleDeleteTodo: (id: string) => Promise<void>;
  handleAddTodo: (newTodo: NewTodoType) => Promise<void>;
  handleToggleTodo: (todo: ITodoItem) => Promise<void>;
};

export default function TodoTemplate(props: TodoTemplateProps) {
  const [valueInputTodo, setValueInputTodo] = useState("");
  let analyticsModule: Analytics | null = null;

  function handleInputTodoChange(text: string) {
    setValueInputTodo(text);
  }

  async function loadAnalyticsModule() {
    if (process.env.NODE_ENV === "production") {
      const { initializeApp } = await import("firebase/app");
      const { getAnalytics } = await import("firebase/analytics");

      const firebaseConfig = {
        apiKey: "AIzaSyCfaaSLIc21Y_otQCF74oeLh1bLH0YnY5w",
        authDomain: "todo-7da3d.firebaseapp.com",
        projectId: "todo-7da3d",
        storageBucket: "todo-7da3d.appspot.com",
        messagingSenderId: "757827181944",
        appId: "1:757827181944:web:faa4de7146d6b93e86bc8d",
        measurementId: "G-W6JGP1RPJP",
      };

      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);

      analyticsModule = analytics;

      console.log("Firebase Analytics initialized");
    }
  }

  async function AnalyticDeleteTodo() {
    try {
      // Certifique-se de que o módulo de analytics foi carregado
      if (!analyticsModule) {
        await loadAnalyticsModule();
      }

      if (analyticsModule) {
        // Correção: Usar logEvent com o objeto analyticsModule
        logEvent(analyticsModule, "deleteTodo", {
          id: 3745092,
          item: "analytics",
          description: "delete todo",
        });
        console.log("deleteTodo event logged successfully");
      } else {
        console.log(
          "Analytics not initialized, running in non-production environment"
        );
      }
    } catch (error) {
      console.error("Failed to log deleteTodo event", error);
    }
  }

  function deleteTodo(id: string) {
    Alert.alert(
      "Excluir",
      "Deseja realmente excluir este item?",
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            await props.handleDeleteTodo(id);
            AnalyticDeleteTodo();
          },
        },
      ],
      { cancelable: false }
    );
  }

  const emptyListTodoComponent = useMemo(
    () =>
      !props.listTodo?.length && (
        <View style={styles.emptyListTodo}>
          <Image source={require("../../assets/clipboard/clip.png")} />
          <Text style={styles.emptyListTodoText}>
            Você ainda não tem tarefas cadastradas
          </Text>
          <Text style={styles.emptyListTodoTextAlert}>
            Crie tarefas e organize seus itens a fazer
          </Text>
        </View>
      ),
    [props.listTodo]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../assets/logo/logo.png")} />
      </View>
      <View style={styles.alignInput}>
        <TextInput
          style={valueInputTodo ? styles.inputTodoFocus : styles.inputTodo}
          placeholder="Adicione uma nova tarefa"
          placeholderTextColor={"#808080"}
          value={valueInputTodo}
          onChangeText={handleInputTodoChange}
        />
        <TouchableOpacity
          disabled={!valueInputTodo}
          style={styles.buttonAddTodo}
          onPress={() => {
            props.handleAddTodo({
              title: valueInputTodo,
            });
            setValueInputTodo("");
          }}
        >
          <Text style={styles.textAddTodo}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.informationTodo}>
        <View style={styles.informationTodoAlign}>
          <Text style={styles.informationTodoTextCreate}>Criadas</Text>
          <Text style={styles.informationTodoNumber}>
            {props.informationTodos.quantityTodoCreated}
          </Text>
        </View>
        <View style={styles.informationTodoAlign}>
          <Text style={styles.informationTodoTextConcluded}>Concluídas</Text>
          <Text style={styles.informationTodoNumber}>
            {props.informationTodos.allTodoCompleted}
          </Text>
        </View>
      </View>

      {emptyListTodoComponent}

      <FlatList
        style={styles.listTodo}
        data={props.listTodo}
        renderItem={({ item }) => (
          <View key={item.title} style={styles.cardTodo}>
            <TouchableOpacity
              style={styles.cardTodoToggle}
              onPress={() => props.handleToggleTodo(item)}
            >
              {item.isDone ? (
                <Image
                  source={require("../../assets/checkTrue/checkTrue.png")}
                />
              ) : (
                <Image
                  source={require("../../assets/checkFalse/checkFalse.png")}
                />
              )}

              <Text style={styles.cardTodoText}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardTodoIconTrash}
              onPress={() => deleteTodo(item.id)}
            >
              <Image source={require("../../assets/trash/trash.png")} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
