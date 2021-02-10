import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import AuthenticationHelper from "../helpers/AuthenticationHelper";
import coffida from "../api/coffida";

import ReviewCard from "../components/ReviewCard";
import { Divider, Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

const OwnUserReviewView = ({
  locationReviews,
  containerPadding,
  containerMargin,
  navigation,
  locationId,
  user_information,
  getLocationInformation,
}) => {
  const [userReviewAlready, setUserReviewAlready] = useState(false);
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    checkIfUserHasReviewed();
  }, [locationReviews]);

  useEffect(() => {
    checkIfUserHasReviewed();
  }, [user_information]);

  const checkIfUserHasReviewed = async () => {
    if (user_information !== null) {
      try {
        const { reviews } = user_information;
        let USER_REVIEW = null;
        for (let i = 0; i < locationReviews.length; i++) {
          const location_review = locationReviews[i];
          for (let j = 0; j < reviews.length; j++) {
            const user_review = reviews[j].review;
            if (location_review.review_id === user_review.review_id) {
              // USER HAS REVIEWED THE CURRENT LOCATION
              console.log("USER HAS REVIEW THE CURRENT LOCATION");
              USER_REVIEW = user_review;
              break;
            }
          }
        }
        // Set the user information if the user has review the location, 
        setUserReview(USER_REVIEW);
        setUserReviewAlready(USER_REVIEW !== null);
      } catch (error) {
        console.log(error);
      }
    } else {
      // TODO: user information is still loading on the parent view
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
        {userReview !== null ? (
          <ReviewCard
            user_information={user_information}
            getLocationInformation={getLocationInformation}
            location_id={locationId}
            review={userReview}
          />
        ) : null}
        <Button
          onPress={() =>
            navigation.navigate("Review", {
              userReviewAlready,
              userReview,
              locationId,
            })
          }
          title={userReview !== null ? "Edit Review" : "Post Review"}
        />
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({});

export default withNavigation(OwnUserReviewView);
