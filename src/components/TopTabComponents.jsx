import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AppBox from "./AppBox";

import { data } from "../Data";

const Restaurant = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {data.map((listing, index) => {
          if (listing.type === "restaurant")
            return (
              <AppBox
                listing={listing}
                key={index}
                onPress={() => navigation.navigate("Details", listing)}
              />
            );
        })}
      </ScrollView>
    </View>
  );
};

const Lodges = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {data.map((listing, index) => {
          if (listing.type === "lodge")
            return (
              <AppBox
                listing={listing}
                key={index}
                onPress={() => navigation.navigate("Details", listing)}
              />
            );
        })}
      </ScrollView>
    </View>
  );
};

const Resort = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {data.map((listing, index) => {
          if (listing.type === "resort")
            return (
              <AppBox
                listing={listing}
                key={index}
                onPress={() => navigation.navigate("Details", listing)}
              />
            );
        })}
      </ScrollView>
    </View>
  );
};

const Lounges = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {data.map((listing, index) => {
          if (listing.type === "lounge")
            return (
              <AppBox
                listing={listing}
                key={index}
                onPress={() => navigation.navigate("Details", listing)}
              />
            );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { Resort, Restaurant, Lodges, Lounges };
