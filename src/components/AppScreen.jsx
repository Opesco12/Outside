import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import { colors } from "../constants/colors";
import AppHeader from "./AppHeader";

const AppScreen = ({ children, customStyles, screen }) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const onPress = (screen) => {
    if (screen === "Details") {
      return goBack;
    }
  };

  return (
    <View style={[styles.container, customStyles]}>
      <AppHeader
        backgroundColor={colors.primary}
        leftComponent={{
          icon: screen === "Details" && "arrow-back",
          color: colors.white,
          onPress: onPress(screen),
        }}
        centerComponent={{
          text: screen,
          style: { color: colors.white, fontSize: 18 },
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 10 }}
      >
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    // paddingTop: StatusBarHeight,
    // paddingHorizontal: 10,
    // paddingBottom: 10,
  },
});

export default AppScreen;
