import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";

import AppScreen from "../components/AppScreen";
import AppBox from "../components/AppBox";
import AppHeader from "../components/AppHeader";
import {
  Resort,
  Restaurant,
  Lodges,
  Lounges,
} from "../components/TopTabComponents";
import { colors } from "../constants/colors";

const TestComponent = () => {
  return (
    <View>
      <Text>Checking to see if it works</Text>
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const listings = [
    {
      name: "The Place",
      type: "restaurant",
      address: "148 Umar Audi Road, GRA, Oko Erin 240102, Kwara",
      phone: "07041765290",
      images: [require("../assets/Outside/The place.jpeg")],
      imagesPath: ["../assets/Outside/The place.jpeg"],
      location: "Oko Erin",
    },
    {
      name: "Pronto Restaurant",
      address: "Ilorin 240102, Kwara",
      Phone: "090155577711",
      images: [require("../assets/Outside/pronto.jpg")],
      location: "Ilorin",
    },

    {
      name: "T and K Restaurant",
      type: "restaurant",
      address: "60,University Road, Tanke, Ilorin, 240102, Kwara",
      phone: "08074515980",
      images: [require("../assets/Outside/T and K restaurant .jpeg")],
      imagesPath: ["../assets/Outside/T and K restaurant .jpeg"],
      location: "Tanke, Ilorin",
    },
  ];
  return (
    <>
      <View style={styles.container}>
        <AppHeader
          backgroundColor={colors.primary}
          centerComponent={{
            text: "Home",
            style: { color: colors.white, fontSize: 18 },
          }}
        />
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: colors.primary,
              tabBarLabelStyle: { fontSize: 10 },
            }}
          >
            <Tab.Screen name="Restaurants" component={Restaurant} />
            <Tab.Screen name="Lodges" component={Lodges} />
            <Tab.Screen name="Resorts" component={Resort} />
            <Tab.Screen name="Lounges" component={Lounges} />
          </Tab.Navigator>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default HomeScreen;
