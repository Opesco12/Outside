import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AppScreen from "../components/AppScreen";
import { FavoritesContext } from "../context/context";
import AppBox from "../components/AppBox";

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const { favorites } = useContext(FavoritesContext);

  return (
    <AppScreen screen={"Favorites"}>
      {favorites &&
        favorites.length > 0 &&
        favorites.map((listing, index) => (
          <AppBox
            listing={listing}
            onPress={() => navigation.navigate("Details", listing)}
            key={index}
          />
        ))}
    </AppScreen>
  );
};

const styles = StyleSheet.create({});

export default FavoritesScreen;
