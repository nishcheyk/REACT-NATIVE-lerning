import React, { useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "./screens/AuthScreen";
import AdminHome from "./screens/AdminHome";
import CreateQuiz from "./screens/CreateQuiz";
import UserHome from "./screens/UserHome";
import QuizAttempt from "./screens/QuizAttempt";

const Stack = createNativeStackNavigator();

export const AuthContext = createContext<any>({
  user: null,
  login: (role: string) => {},
  logout: () => {},
});

export default function App() {
  const [user, setUser] = useState<{ role: string } | null>(null);

  const login = (role: string) => setUser({ role });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <NavigationContainer>
        <Stack.Navigator>
          {!user ? (
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
          ) : user.role === "admin" ? (
            <>
              <Stack.Screen
                name="AdminHome"
                component={AdminHome}
                options={{ title: "Admin Dashboard" }}
              />
              <Stack.Screen
                name="CreateQuiz"
                component={CreateQuiz}
                options={{ title: "Create Quiz" }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="UserHome"
                component={UserHome}
                options={{ title: "Quizzes" }}
              />
              <Stack.Screen
                name="QuizAttempt"
                component={QuizAttempt}
                options={{ title: "Attempt Quiz" }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
