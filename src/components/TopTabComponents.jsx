import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

import AppBox from "./AppBox";
import { colors } from "../constants/colors";

import { ListingContext } from "../context/listingContext";

const Restaurant = () => {
  const navigation = useNavigation();
  const { listings } = useContext(ListingContext);
  return (
    <View style={[styles.container]}>
      <ScrollView style={{ flex: 1 }}>
        {listings && listings.length > 0 ? (
          listings.map((listing, index) => {
            if (listing.type === "restaurant")
              return (
                <AppBox
                  listing={listing}
                  key={index}
                  onPress={() => navigation.navigate("Details", listing)}
                />
              );
          })
        ) : (
          <ActivityIndicator size={"small"} style={styles.indicator} />
        )}
      </ScrollView>
    </View>
  );
};

const Lodges = () => {
  const navigation = useNavigation();
  const { listings } = useContext(ListingContext);
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {listings && listings.length > 0 ? (
          listings.map((listing, index) => {
            if (listing.type === "lodge")
              return (
                <AppBox
                  listing={listing}
                  key={index}
                  onPress={() => navigation.navigate("Details", listing)}
                />
              );
          })
        ) : (
          <ActivityIndicator size={"small"} style={styles.indicator} />
        )}
      </ScrollView>
    </View>
  );
};

const Resort = () => {
  const navigation = useNavigation();
  const { listings } = useContext(ListingContext);
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {listings && listings.length > 0 ? (
          listings.map((listing, index) => {
            if (listing.type === "resort")
              return (
                <AppBox
                  listing={listing}
                  key={index}
                  onPress={() => navigation.navigate("Details", listing)}
                />
              );
          })
        ) : (
          <ActivityIndicator size={"small"} style={styles.indicator} />
        )}
      </ScrollView>
    </View>
  );
};

const Lounges = () => {
  const navigation = useNavigation();
  const { listings } = useContext(ListingContext);
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {listings && listings.length > 0 ? (
          listings.map((listing, index) => {
            if (listing.type === "lounge")
              return (
                <AppBox
                  listing={listing}
                  key={index}
                  onPress={() => navigation.navigate("Details", listing)}
                />
              );
          })
        ) : (
          <ActivityIndicator size={"small"} style={styles.indicator} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  indicator: {
    alignSelf: "center",
    marginTop: "40%",
  },
});

export { Resort, Restaurant, Lodges, Lounges };
