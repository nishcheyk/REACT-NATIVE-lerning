import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { AuthContext } from "../App";

export default function AuthScreen() {
  const [name, setName] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    if (!name.trim()) return;
    login(name.toLowerCase() === "admin" ? "admin" : "user");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Enter 'admin' or your name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        autoCapitalize="none"
      />
      <PrimaryButton
        title="Login"
        onPress={handleLogin}
        disabled={!name.trim()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
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
