import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import { Rating } from "react-native-elements";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { showMessage } from "react-native-flash-message";
import * as Yup from "yup";

import AppScreen from "../components/AppScreen";
import AppFormField from "../components/AppFormField";
import AppReviewBox from "../components/AppReviewBox";
import { colors } from "../constants/colors.js";

import { firestore } from "../../firebaseConfig.js";

const ReviewScreen = ({ route }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(3.5);

  const reviewsObj = route.params.reviews;
  const listingName = route.params.listingName;
  useEffect(() => {
    setReviews(reviewsObj);
  }, [reviewsObj]);

  const uploadReview = (name, review, rating) => {
    addDoc(collection(firestore, listingName), {
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    review: Yup.string().required("Enter your review"),
  });

  const getReviews = () => {
    const ref = collection(firestore, listingName);

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

  useEffect(() => {
    const unsubscribe = getReviews();

    return unsubscribe;
  }, []);

  return (
    <AppScreen screen={"Reviews"}>
      <View style={styles.ratings}>
        {reviews &&
          reviews.map((review, index) => (
            <AppReviewBox
              name={review.name}
              rating={review.rating}
              review={review.review}
              key={index}
            />
          ))}
      </View>
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
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={{ color: colors.white }}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 30,
    justifyContent: "center",
    width: 50,
  },
  ratings: {
    marginTOp: 5,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default ReviewScreen;
