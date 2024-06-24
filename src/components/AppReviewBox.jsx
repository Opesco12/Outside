import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Rating } from "react-native-elements";
// import { Rating } from "react-native-ratings";

import { colors } from "../constants/colors";

const AppReviewBox = ({ name, review, rating }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userIcon}>
        <AntDesign name="user" size={20} />
      </View>
      <View>
        <Text style={[styles.text, { fontWeight: "500" }]}>{name}</Text>
        <View style={styles.review}>
          <Text numberOfLines={2} style={[styles.text, { width: "65%" }]}>
            {review}
          </Text>
          <View>
            <Rating
              imageSize={15}
              // fractions="{1}"
              startingValue={rating}
              readonly
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    marginVertical: 5,
  },
  review: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userIcon: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
});

export default AppReviewBox;
