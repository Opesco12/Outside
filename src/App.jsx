import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";

import DetailsScreen from "./screens/Details";
import Navigator from "./navigation/Navigator";

import FavoritesProvider from "./context/context";

const App = () => {
  return (
    <FavoritesProvider>
      <StatusBar translucent={false} />
      <Navigator />
      <FlashMessage position={"top"} />
    </FavoritesProvider>
  );
};

export default App;
