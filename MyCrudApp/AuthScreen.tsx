// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";

// type RootStackParamList = {
//   Auth: undefined;
//   Crud: undefined;
// };

// type Props = NativeStackScreenProps<RootStackParamList, "Auth">;

// export default function AuthScreen({ navigation }: Props) {
//   const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email.trim());

//   const isFormValid = () => {
//     if (!isEmailValid(email)) return false;
//     if (password.length < 6) return false;
//     if (!isLogin && password !== confirmPassword) return false;
//     return true;
//   };

//   const authenticateUser = () => {
//     if (!isFormValid()) {
//       Alert.alert(
//         "Invalid input",
//         isLogin
//           ? "Please enter a valid email and a password with at least 6 characters."
//           : "Please enter valid email, passwords with at least 6 characters, and make sure passwords match."
//       );
//       return;
//     }

//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);

//       if (isLogin) {
//         if (email === "test@example.com" && password === "password") {
//           Alert.alert("Login successful!");
//           navigation.replace("Crud");
//         } else {
//           Alert.alert("Invalid credentials", "Please try again.");
//         }
//       } else {
//         Alert.alert("Signup successful! Please login.");
//         setIsLogin(true);
//         setPassword("");
//         setConfirmPassword("");
//       }
//     }, 1500);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>{isLogin ? "Login" : "Sign Up"}</Text>

//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//         style={styles.input}
//         editable={!loading}
//       />

//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={styles.input}
//         editable={!loading}
//       />

//       {!isLogin && (
//         <TextInput
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           secureTextEntry
//           style={styles.input}
//           editable={!loading}
//         />
//       )}

//       <TouchableOpacity
//         style={[
//           styles.button,
//           !isFormValid() || loading ? styles.buttonDisabled : null,
//         ]}
//         onPress={authenticateUser}
//         disabled={!isFormValid() || loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => {
//           if (loading) return;
//           setIsLogin((prev) => !prev);
//           setEmail("");
//           setPassword("");
//           setConfirmPassword("");
//         }}
//       >
//         <Text style={styles.toggleText}>
//           {isLogin
//             ? "Don't have an account? Sign Up"
//             : "Already have an account? Login"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 24,
//     backgroundColor: "#fff",
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 30,
//     textAlign: "center",
//     color: "#222",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 14,
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: "#2e64e5",
//     padding: 15,
//     borderRadius: 6,
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   buttonDisabled: {
//     backgroundColor: "#aac1f8",
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 18,
//   },
//   toggleText: {
//     color: "#2e64e5",
//     textAlign: "center",
//     marginTop: 15,
//     fontSize: 16,
//   },
// });
