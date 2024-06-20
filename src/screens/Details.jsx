import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import ImageView from "react-native-image-viewing";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../constants/colors";
import AppButtonBg from "../components/AppButton";

const DetailsScreen = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const statusBarHeight = StatusBar.currentHeight;

  const listing = {
    name: "Pronto Restaurant",
    address: "Ilorin 240102, Kwara",
    Phone: "090155577711",
    images: [require("../assets/IMG-20240611-WA0035.jpg")],
    location: "Ilorin",
  };
  return (
    <View style={styles.container}>
      <View style={styles.images}>
        <Swiper
          style={{ height: "100%" }}
          autoplay={true}
          autoplayTimeout={5}
          activeDotColor={colors.primary}
          showsButtons={true}
        >
          {listing.images.map((image, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                setCurrentImage(index);
                setVisible(true);
              }}
            >
              <Image source={image} style={styles.image} />
            </TouchableWithoutFeedback>
          ))}
        </Swiper>
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View style={[styles.backButton, { top: statusBarHeight + 5 }]}>
          <Ionicons name="arrow-back" size={24} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.details}>
        <Text style={[styles.text, { fontWeight: "600", fontSize: 20 }]}>
          {listing.name}
        </Text>
        <Text style={styles.text}>Location: {listing.location}</Text>
        <Text style={styles.text}>Address: {listing.address}</Text>
        <AppButtonBg text={"Place an order"} compStyle={{ marginTop: 50 }} />
      </View>
      {/* <ImageView
        images={listing.images.map((image) => ({ uri: image }))}
        imageIndex={currentImage}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        swipeToCloseEnabled={true}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 25,
    height: 40,
    justifyContent: "center",
    left: 20,
    // top: 10,
    position: "absolute",
    width: 40,
  },
  container: {
    flex: 1,
  },
  details: {
    backgroundColor: colors.white,
    height: "35%",

    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  images: {
    height: "65%",
  },
  image: {
    height: 600,
    width: "100%",
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  topDetails: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default DetailsScreen;
