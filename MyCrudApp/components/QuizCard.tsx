import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function QuizCard({
  quiz,
  onPress,
}: {
  quiz: { id: string; title: string };
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View>
        <Text style={styles.title}>{quiz.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    backgroundColor: "#f5f6fa",
    marginBottom: 12,
    borderRadius: 8,
    elevation: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
