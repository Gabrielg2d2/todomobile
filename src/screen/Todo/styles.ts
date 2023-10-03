import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
  },
  header: {
    height: 150,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  alignInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -26,
  },
  inputTodo: {
    width: "75%",
    height: 50,
    backgroundColor: "#262626",
    color: "#fff",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 16,
    borderColor: "#5E60CE",
    borderWidth: 1,
  },
  buttonAddTodo: {
    width: 50,
    height: 50,
    backgroundColor: "#1E6F9F",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  textAddTodo: {
    color: "#fff",
    fontSize: 20,
  },
  informationTodo: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "90%",
    height: 50,
    marginTop: 20,
  },
  informationTodoNumber: {
    color: "#D9D9D9",
    fontSize: 14,
    backgroundColor: "#333",
    width: 20,
    height: 22,
    borderRadius: 8,
    textAlign: "center",
    marginLeft: 10,
  },
  informationTodoAlign: {
    flexDirection: "row",
    alignItems: "center",
  },
  informationTodoTextCreate: {
    color: "#4EA8DE",
    fontSize: 14,
    fontWeight: "bold",
  },
  informationTodoTextConcluded: {
    color: "#8284FA",
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyListTodo: {
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "#333",
    paddingTop: 40,
    width: "90%",
  },
  emptyListTodoText: {
    color: "#808080",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  emptyListTodoTextAlert: {
    color: "#808080",
    fontSize: 14,
  },
  cardTodo: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#262626",
    width: "90%",
  },
  cardTodoText: {
    color: "#F2F2F2",
    fontSize: 14,
    marginLeft: 10,
    maxWidth: "75%",
  },
  cardTodoIconTrash: {
    marginLeft: "auto",
  },
});
