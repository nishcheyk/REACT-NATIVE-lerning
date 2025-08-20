import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "./AuthScreen";
import CrudScreen from "./CurdScreen";
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
