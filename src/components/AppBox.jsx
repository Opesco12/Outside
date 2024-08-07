import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { colors } from "../constants/colors";
import { FavoritesContext } from "../context/context";

const AppBox = ({ listing, onPress }) => {
  const { favorites, saveData } = useContext(FavoritesContext);

  const inFavorites = (listing) => {
    return favorites.some((item) => item.name === listing.name);
  };

  const thumbnailImages =
    listing.images.length > 1 ? listing.images.slice(0, 2) : listing.images[0];
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.top}>
          {listing.images.length > 1 ? (
            thumbnailImages.map((image, index) => (
              <Image src={image} key={index} style={styles.images} />
            ))
          ) : (
            <Image src={listing.images[0]} style={styles.image} />
          )}
        </View>
        <View style={styles.bottom}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={[styles.text, { fontWeight: "600" }]}>
              {listing.name}
            </Text>
            <AntDesign
              name={inFavorites(listing) ? "heart" : "hearto"}
              color={colors.primary}
              size={24}
              onPress={() => saveData(listing)}
            />
          </View>
          <Text numberOfLines={1} style={styles.text}>
            Location: {listing.location}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  bottom: {
    marginVertical: 5,
    padding: 7,
  },
  container: {
    backgroundColor: colors.light,
    borderRadius: 15,
    elevation: 2,
    height: 300,
    marginVertical: 10,
    overflow: "hidden",
  },
  images: {
    height: "100%",
    width: "50%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  request: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 5,
    padding: 2,
  },
  top: {
    flexDirection: "row",
    height: "75%",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default AppBox;
