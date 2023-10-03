import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  header: {
    height: 150,
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
    borderBottomWidth: 1,
    borderColor: "#333",
    height: 50,
  },
  cardTodo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
