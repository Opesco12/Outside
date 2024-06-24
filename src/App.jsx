import { View, Text, StatusBar } from "react-native";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import * as SplashScreen from "expo-splash-screen";

import DetailsScreen from "./screens/Details";
import Navigator from "./navigation/Navigator";

import FavoritesProvider from "./context/context";

const App = () => {
  useEffect(() => {
    const prepare = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  return (
    <FavoritesProvider>
      <StatusBar translucent={false} />
      <Navigator />
      <FlashMessage position={"top"} style={{ marginTop: 30 }} />
    </FavoritesProvider>
  );
};

export default App;
