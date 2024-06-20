import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./BottomNavigator";
import DetailsScreen from "../screens/Details";

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureDirection: "horizontal" }}
    >
      <Stack.Screen name="Index" component={TabNavigator} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
