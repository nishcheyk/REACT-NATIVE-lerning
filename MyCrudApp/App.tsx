import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

interface Item {
  id: string;
  value: string;
}

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOrUpdate = () => {
    if (text.trim() === "") {
      Alert.alert("Please enter text.");
      return;
    }

    if (editingId !== null) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editingId ? { id: item.id, value: text } : item
        )
      );
      setEditingId(null);
    } else {
      setItems((prevItems) => [
        ...prevItems,
        { id: Date.now().toString(), value: text },
      ]);
    }

    setText("");
  };

  const handleDelete = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleEdit = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setText(item.value);
      setEditingId(id);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>React Native CRUD Demo - TypeScript</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter item"
          value={text}
          onChangeText={setText}
        />
        <Button
          title={editingId !== null ? "Update" : "Add"}
          onPress={handleAddOrUpdate}
        />
      </View>
      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item.value}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => handleEdit(item.id)}
                style={[styles.btn, styles.editBtn]}
              >
                <Text style={styles.btnText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={[styles.btn, styles.deleteBtn]}
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No items yet
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#fff" },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputRow: { flexDirection: "row", marginBottom: 20, alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  list: { flex: 1 },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: { fontSize: 18 },
  buttons: { flexDirection: "row" },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  editBtn: { backgroundColor: "#4CAF50" },
  deleteBtn: { backgroundColor: "#F44336" },
  btnText: { color: "#fff", fontWeight: "bold" },
});
