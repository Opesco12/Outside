import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";

import AppScreen from "../components/AppScreen";
import AppBox from "../components/AppBox";
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
      name: "Pronto Restaurant",
      address: "Ilorin 240102, Kwara",
      Phone: "090155577711",
      images: [require("../assets/IMG-20240611-WA0035.jpg")],
      location: "Ilorin",
    },
  ];
  return (
    <AppScreen screen={"Home"}>
      <Tab.Navigator screenOptions={{ tabBarActiveTintColor: colors.primary }}>
        <Tab.Screen name="Restaurants" component={TestComponent} />
        <Tab.Screen name="Lodges" component={TestComponent} />
      </Tab.Navigator>
      <View>
        {listings.map((listing, index) => (
          <AppBox
            key={index}
            post={listing}
            onPress={() => navigation.navigate("Details", listing)}
          />
        ))}
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
