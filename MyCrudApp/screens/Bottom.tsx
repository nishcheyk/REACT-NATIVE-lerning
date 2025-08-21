import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import { View, Text } from "react-native";
function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
function ProfileScreen() {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}
export default function Bottomtop() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
