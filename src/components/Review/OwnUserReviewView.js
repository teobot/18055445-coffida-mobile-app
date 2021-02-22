import React, { useState, useEffect, useContext } from "react";

// React elements import
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

// Navigation import
import { withNavigation } from "react-navigation";

// Icon import
import Icon from "react-native-vector-icons/FontAwesome";

// Context import
import { ThemeContext } from "../../context/ThemeContext";

const OwnUserReviewView = ({
  locationResult,
  user_information,
  navigation,
}) => {
  // This is the component that handles the own users review

  // useState init
  const [userReviewAlready, setUserReviewAlready] = useState(false);
  const [userReview, setUserReview] = useState(null);

  // Context init
  const { Theme, ThemeTextColor } = useContext(ThemeContext);

  // Variable init
  const location_id = locationResult.location_id;

  useEffect(() => {
    // If the user information has changed
    checkIfUserHasReviewed();
  }, [user_information]);

  useEffect(() => {
    // If the location information has changed
    checkIfUserHasReviewed();
  }, [locationResult]);

  const checkIfUserHasReviewed = async () => {
    // Check if the user has reviewed the given location
    if (user_information !== null) {
      try {
        const { reviews } = user_information;
        let USER_REVIEW = null;

        for (let i = 0; i < locationResult.location_reviews.length; i++) {
          // Foreach of the location reviews from the location information
          const location_review = locationResult.location_reviews[i];
          for (let j = 0; j < reviews.length; j++) {
            // Foreach of the review that the user information method has returned
            const user_review = reviews[j].review;
            // See if the location review is matches any user review
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
        // Error determining if the user has already reviewed
        setUserReview(null);
        setUserReviewAlready(null);
      }
    } else {
      // : user information is still loading on the parent view
    }
  };

  return (
    <View style={{ padding: 15, margin: 15, justifyContent: "center" }}>
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          marginBottom: 5,
          ...ThemeTextColor,
        }}
      >
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

export default withNavigation(OwnUserReviewView);
