import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import DetailsScreen from "./screens/Details";
import Navigator from "./navigation/Navigator";

const App = () => {
  return (
    <>
      {/* <NavigationContainer> */}
      <StatusBar translucent={false} />
      {/* <DetailsScreen /> */}
      <Navigator />
      {/* </NavigationContainer> */}
    </>
  );
};

export default App;
