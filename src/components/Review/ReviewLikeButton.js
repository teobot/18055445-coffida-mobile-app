import React, { useState, useEffect, useContext } from "react";

// React element imports
import { Text, StyleSheet, TouchableOpacity } from "react-native";

// Icon import
import { AntDesign } from "@expo/vector-icons";

// Api import
import coffida from "../../api/coffida";

// Context import
import { ThemeContext } from "../../context/ThemeContext";

const ReviewLikeButton = ({ location_id, user_information, review }) => {
  // This is the like button on the review component, it handles updating and displaying the review likes

  // useState init
  const [likedReview, setLikedReview] = useState(false);
  const [likes, setLikes] = useState(review.likes);

  // Context init
  const { ThemeTextColor } = useContext(ThemeContext);

  useEffect(() => {
    // If the user information changes and is not null then check if the user has liked the review
    if (user_information !== null) {
      checkIfUserLikedReview();
    }
  }, [user_information]);

  const checkIfUserLikedReview = async () => {
    // This function checks if the user has liked the specific review
    const { liked_reviews } = user_information;
    let userLiked = false;
    for (let i = 0; i < liked_reviews.length; i++) {
      // Foreach of the liked reviews in the user information
      const liked = liked_reviews[i];
      // Check if the current review is inside the liked review inside the user information
      if (liked.review.review_id === review.review_id) {
        // set the userLiked to true
        userLiked = true;
      }
    }
    setLikedReview(userLiked);
  };

  const updateLike = async () => {
    // This handles the updating of the like
    const payload = !likedReview;

    // Firstly change the liked button to give instant feedback
    setLikedReview(payload);
    let response = null;
    try {
      if (payload) {
        // The user has not liked the review so we need to like it
        response = await coffida.post(
          `/location/${location_id}/review/${review.review_id}/like`
        );
        // Update the number of likes as the request was successful
        setLikes(likes + 1);
      } else {
        // The user has already liked the review, we need to remove it
        response = await coffida.delete(
          `/location/${location_id}/review/${review.review_id}/like`
        );
        setLikes(likes - 1);
      }
    } catch (error) {
      // The request has failed,
      // here I undo the changes made
      setLikedReview(!payload);
      setLikes(review.likes);
    }
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => updateLike()}
        style={{ alignSelf: "center" }}
      >
        <AntDesign
          style={{ alignSelf: "center" }}
          name={likedReview ? "heart" : "hearto"}
          size={30}
          color="red"
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "bold",
          ...ThemeTextColor,
        }}
      >
        {likes}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({});

export default ReviewLikeButton;
