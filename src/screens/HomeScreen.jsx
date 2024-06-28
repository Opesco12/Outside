import React, { useEffect, useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

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

import ListingContext from '../context/listingContext'
import ListingProvider from '../context/listingContext'

const HomeScreen = () => {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <ListingProvider>
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
      </ListingProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default HomeScreen;
