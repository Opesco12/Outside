import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./BottomNavigator";
import DetailsScreen from "../screens/Details";
import ReviewScreen from "../screens/ReviewScreen";

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Index" component={TabNavigator} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Reviews" component={ReviewScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
