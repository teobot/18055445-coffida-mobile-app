import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider, Button } from "react-native-elements";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

const OwnUserReviewView = ({
  locationResult,
  user_information,
  navigation,
}) => {
  const [userReviewAlready, setUserReviewAlready] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const location_id = locationResult.location_id;

  useEffect(() => {
    checkIfUserHasReviewed();
  }, [user_information]);

  useEffect(() => {
    checkIfUserHasReviewed();
  }, [locationResult]);

  const checkIfUserHasReviewed = async () => {
    if (user_information !== null) {
      try {
        const { reviews } = user_information;
        let USER_REVIEW = null;
        for (let i = 0; i < locationResult.location_reviews.length; i++) {
          const location_review = locationResult.location_reviews[i];
          for (let j = 0; j < reviews.length; j++) {
            const user_review = reviews[j].review;
            if (location_review.review_id === user_review.review_id) {
              // The user has reviewed the location
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
      // : user information is still loading on the parent view
    }
  };

  return (
    <View style={{ padding: 15, margin: 15, justifyContent: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 5 }}>
        Your Review:
      </Text>
      <Button
        icon={
          <Icon
            name={userReview !== null ? "edit" : "plus-circle"}
            size={26}
            color="white"
          />
        }
        onPress={() =>
          navigation.navigate("Review", {
            userReviewAlready,
            userReview,
            location_id,
          })
        }
        disabled={user_information === null || locationResult === null}
        title={userReview !== null ? "Edit Review" : "Post Review"}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default withNavigation(OwnUserReviewView);
