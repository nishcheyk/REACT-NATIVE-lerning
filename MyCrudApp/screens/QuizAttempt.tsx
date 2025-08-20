import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import QuestionCard from "../components/QuestionCard";

const sampleQuiz = {
  id: "1",
  title: "Math Quiz",
  questions: [
    {
      id: "q1",
      text: "2 + 2 = ?",
      options: ["3", "4", "5", "6"],
      answer: 1,
    },
    {
      id: "q2",
      text: "5 * 3 = ?",
      options: ["15", "10", "18", "12"],
      answer: 0,
    },
  ],
};

export default function QuizAttempt({ route, navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const question = sampleQuiz.questions[currentIndex];

  const handleSelect = (index: number) => {
    if (index === question.answer) setScore(score + 1);
    if (currentIndex + 1 < sampleQuiz.questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert(
        `Quiz finished! Score: ${score + (index === question.answer ? 1 : 0)} / ${sampleQuiz.questions.length}`
      );
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sampleQuiz.title}</Text>
      <QuestionCard question={question} onSelect={handleSelect} />
      <Text style={styles.score}>
        Score: {score} / {sampleQuiz.questions.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
});
