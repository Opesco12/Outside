import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";

import AppHeader from "../components/AppHeader";
import AppScreen from "../components/AppScreen";

const ReviewScreen = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {}, []);

  return <AppScreen screen={"Reviews"}></AppScreen>;
};

export default ReviewScreen;
