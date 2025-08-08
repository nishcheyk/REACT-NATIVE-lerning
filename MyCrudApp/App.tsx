// App.tsx
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "./AuthScreen"; // Your login/signup screen
import CrudScreen from "./CurdScreen"; // Your CRUD screen (the code you shared)

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Initial screen is Auth */}
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        {/* CRUD screen after login */}
        <Stack.Screen
          name="Crud"
          component={CrudScreen}
          options={{ title: "Your To-Do List" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
