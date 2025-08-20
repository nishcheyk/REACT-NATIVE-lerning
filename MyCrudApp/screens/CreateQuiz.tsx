import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

export default function CreateQuiz({ navigation }: any) {
  const [title, setTitle] = useState("");

  const createQuiz = () => {
    if (!title.trim()) return;
    alert(`Quiz "${title}" created (stub)`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Quiz</Text>
      <TextInput
        style={styles.input}
        placeholder="Quiz Title"
        value={title}
        onChangeText={setTitle}
      />
      <PrimaryButton
        title="Create"
        onPress={createQuiz}
        disabled={!title.trim()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
});
