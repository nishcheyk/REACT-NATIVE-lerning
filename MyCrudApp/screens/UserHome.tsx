import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import QuizCard from "../components/QuizCard";

const quizzes = [
  { id: "1", title: "Math Quiz" },
  { id: "2", title: "Science Quiz" },
];

export default function UserHome({ navigation }: any) {
  return (
    <View style={styles.container}>
      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <QuizCard
            quiz={item}
            onPress={() =>
              navigation.navigate("QuizAttempt", { quizId: item.id })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
