import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import AuthenticationHelper from "../helpers/AuthenticationHelper";
import coffida from "../api/coffida";

import ReviewCard from "../components/ReviewCard";
import { Divider, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const OwnUserReviewView = ({
  locationReviews,
  containerPadding,
  containerMargin,
}) => {
  const [userReviewAlready, setUserReviewAlready] = useState(false);
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    checkIfUserHasReviewed();
  }, [locationReviews]);

  const checkIfUserHasReviewed = async () => {
    try {
      const userId = await AuthenticationHelper.id_Reducer({ type: "get_id" });
      const userInformation = await coffida.get("/user/" + userId);
      const { reviews } = userInformation.data;
      let USER_REVIEW = null;
      for (let i = 0; i < locationReviews.length; i++) {
        const location_review = locationReviews[i];
        for (let j = 0; j < reviews.length; j++) {
          const user_review = reviews[j].review;
          if (location_review.review_id === user_review.review_id) {
            // USER HAS REVIEWED THE CURRENT LOCATION
            USER_REVIEW = user_review;
            setUserReview(USER_REVIEW);
            setUserReviewAlready(true);
            break;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        margin: containerMargin,
        padding: containerPadding,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          margin: containerMargin,
          padding: containerPadding,
        }}
      >
        <Text style={{ fontSize: 26, fontWeight: "bold" }}>Your Review</Text>
        {userReview !== null ? <ReviewCard review={userReview} /> : null}
        <Button title={userReview !== null ? "Edit Review" : "Post Review"} />
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({});

export default OwnUserReviewView;
