import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  View,
  Text,
  ScrollView,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Bottom from "./screens/Bottom";
function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
function ProfileScreen({ navigation }) {
  return (
    <ScrollView>
      <Text>Lots of content here...</Text>

      <View>
        <Text> Welcome to react Native!</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate("Details")}
        />
        <TouchableOpacity onPress={() => alert("TouchableOpacity Tapped!")}>
          <Text
            style={{ color: "white", backgroundColor: "purple", padding: 16 }}
          >
            Tap Here
          </Text>
        </TouchableOpacity>
        <TouchableNativeFeedback
          onPress={() => alert("TouchableOpacity Tapped!")}
        >
          <Text
            style={{ color: "white", backgroundColor: "purple", padding: 16 }}
          >
            Tap Here
          </Text>
        </TouchableNativeFeedback>
        <TouchableHighlight onPress={() => alert("TouchableOpacity Tapped!")}>
          <Text
            style={{ color: "white", backgroundColor: "purple", padding: 16 }}
          >
            Tap Here
          </Text>
        </TouchableHighlight>

        <Text>
          {Platform.OS === "android" ? "Hello iOS!" : "Hello Android!"}
        </Text>
      </View>
    </ScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Bottomtop" component={Bottom} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
