import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import Swiper from "react-native-swiper";
import ImageView from "react-native-image-viewing";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  where,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { showMessage } from "react-native-flash-message";
import * as Yup from "yup";
import { Formik } from "formik";
import * as Linking from "expo-linking";

import { colors } from "../constants/colors";
import AppButtonBg from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import AppReviewBox from "../components/AppReviewBox";
import AppFormField from "../components/AppFormField";

import { FavoritesContext } from "../context/context";
import { firestore } from "../../firebaseConfig.js";

const DetailsScreen = ({ route }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(3.5);
  const [reviews, setReviews] = useState([]);
  const navigation = useNavigation();

  const listing = route.params;

  const statusBarHeight = StatusBar.currentHeight;

  const { favorites, saveData } = useContext(FavoritesContext);

  const inFavorites = (listing) => {
    return favorites.some((item) => item.name === listing.name);
  };

  const uploadReview = (name, review, rating) => {
    addDoc(collection(firestore, listing.name), {
      name,
      review,
      rating,
      createdAt: serverTimestamp(),
    })
      .then((documentRef) => {
        if (documentRef) {
          showMessage({
            type: "success",
            message: "Your review has been posted",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const getReviews = () => {
    const ref = collection(firestore, listing.name);

    const documentsQuery = query(ref, orderBy("createdAt", "desc"));
    try {
      const unsubscribe = onSnapshot(documentsQuery, (querySnapshot) => {
        const reviews = [];
        querySnapshot.forEach((doc) => {
          reviews.push({ ...doc.data() });
        });

        setReviews(reviews);
      });

      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    review: Yup.string().required("Enter your review"),
  });

  const showDirections = (address) => {
    const encodedAddress = encodeURI(address);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}&travelmode=driving`;

    Linking.canOpenURL(url)
      .then(() => {
        Linking.openURL(url);
      })
      .catch((err) =>
        console.log("Error occured while trying to open url: ", err)
      );
  };

  useEffect(() => {
    const unsubscribe = getReviews();

    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.images}>
        <Swiper
          style={{ height: "100%" }}
          autoplay={true}
          autoplayTimeout={4}
          activeDotColor={colors.primary}
          // showsButtons={true}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.title}>
            <Text style={[styles.text, { fontWeight: "600", fontSize: 20 }]}>
              {listing.name}
            </Text>
            <AntDesign
              name={inFavorites(listing) ? "heart" : "hearto"}
              color={colors.primary}
              size={24}
              onPress={() => saveData(listing)}
            />
          </View>
          <Text style={styles.text}>Location: {listing.location}</Text>
          <Text style={styles.text}>Address: {listing.address}</Text>
          <AppButtonBg
            text={"Directions"}
            icon={
              <FontAwesome5 name="directions" color={colors.white} size={24} />
            }
            onPress={() => {
              showDirections(listing.name + ", " + listing.address);
            }}
            compStyle={{ width: "35%", textAlign: "center" }}
          />
          <View>
            <Text style={[styles.text, { fontWeight: "600", fontSize: 20 }]}>
              Reviews
            </Text>
          </View>
          {reviews && reviews.length > 0 ? (
            reviews
              .slice(0, 3)
              .map((review, index) => (
                <AppReviewBox
                  name={review.name}
                  review={review.review}
                  rating={review.rating}
                  key={index}
                />
              ))
          ) : (
            <Text style={[styles.text, { opacity: 0.6, textAlign: "center" }]}>
              No Reviews Yet
            </Text>
          )}

          {reviews && reviews.length > 2 && (
            <Text
              style={styles.more}
              onPress={() =>
                navigation.navigate("Reviews", {
                  reviews,
                  listingName: listing.name,
                })
              }
            >
              See more...
            </Text>
          )}
          <View>
            <Text style={[styles.text, { fontWeight: "600", fontSize: 20 }]}>
              Leave a review
            </Text>

            <Formik
              initialValues={{
                name: "",
                review: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                const { name, review } = values;

                uploadReview(name, review, rating);
                resetForm();
              }}
            >
              {({ handleSubmit }) => (
                <>
                  <AppFormField name={"name"} placeholder={"Name"} multiline />
                  <AppFormField
                    placeholder={"Enter review..."}
                    customStyles={{ height: 70 }}
                    multiline
                    name="review"
                  />
                  <View style={styles.ratings}>
                    <Text style={styles.text}>Rating: </Text>
                    <Rating
                      fractions={1}
                      startingValue={3.5}
                      onFinishRating={(rating) => setRating(rating)}
                      imageSize={15}
                      // style={{ marginTop: 0 }}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <Text style={{ color: colors.white }}>Submit</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>

          <AppButtonBg text={"Place an order"} compStyle={{ marginTop: 50 }} />
        </ScrollView>
      </View>
      <ImageView
        images={listing.images.map((image) => ({
          uri: Image.resolveAssetSource(image).uri,
        }))}
        imageIndex={currentImage}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        swipeToCloseEnabled={true}
      />
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
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 30,
    justifyContent: "center",
    width: 50,
  },
  container: {
    flex: 1,
  },
  details: {
    backgroundColor: colors.white,
    // height: "35%",
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  images: {
    height: "55%",
  },
  image: {
    height: 600,
    width: "100%",
  },
  more: {
    color: colors.primary,
    marginTop: 5,
    textAlign: "right",
  },
  ratings: {
    alignItems: "center",
    flexDirection: "row",
    gap: 30,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  title: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topDetails: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default DetailsScreen;
