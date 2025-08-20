import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function QuestionCard({
  question,
  onSelect,
}: {
  question: { id: string; text: string; options: string[] };
  onSelect: (index: number) => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.text}</Text>
      {question.options.map((opt, i) => (
        <TouchableOpacity
          key={i}
          style={styles.option}
          onPress={() => onSelect(i)}
          activeOpacity={0.7}
        >
          <Text>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f5f6fa",
  },
  question: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: "bold",
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
