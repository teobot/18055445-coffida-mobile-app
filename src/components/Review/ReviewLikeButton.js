import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import coffida from "../../api/coffida";

const ReviewLikeButton = ({ location_id, user_information, review }) => {
  const [likedReview, setLikedReview] = useState(false);
  const [likes, setLikes] = useState(review.likes);

  useEffect(() => {
    if (user_information !== null) {
      checkIfUserLikedReview();
    }
  }, [user_information]);

  const checkIfUserLikedReview = async () => {
    const { liked_reviews } = user_information;
    let userLiked = false;
    for (let i = 0; i < liked_reviews.length; i++) {
      const liked = liked_reviews[i];
      if (liked.review.review_id === review.review_id) {
        userLiked = true;
      }
    }
    setLikedReview(userLiked);
  };

  const updateLike = async () => {
    // This submits the review to be liked
    const payload = !likedReview;
    setLikedReview(payload);
    let response = null;
    try {
      if (payload) {
        // : need to like the review
        response = await coffida.post(
          `/location/${location_id}/review/${review.review_id}/like`
        );
        setLikes(likes + 1);
      } else {
        // : need to delete the review like
        response = await coffida.delete(
          `/location/${location_id}/review/${review.review_id}/like`
        );
        setLikes(likes - 1);
      }
    } catch (error) {
      // : failed updating information
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
      <Text style={{ fontSize: 12, fontWeight: "bold" }}>{likes}</Text>
    </>
  );
};

const styles = StyleSheet.create({});

export default ReviewLikeButton;
