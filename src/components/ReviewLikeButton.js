import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import CoffidaHelper from "../helpers/CoffidaHelper";
import coffida from "../api/coffida";

const ReviewLikeButton = ({
  review_id,
  location_id,
  getLocationInformation,
  user_information
}) => {
  const [likedReview, setLikedReview] = useState(false);

  useEffect(() => {
    if(user_information !== null) {
      checkIfUserLikedReview();
    }
  }, [user_information]);

  const checkIfUserLikedReview = async () => {
    const { liked_reviews } = user_information;
    for (let i = 0; i < liked_reviews.length; i++) {
      const liked = liked_reviews[i];
      if (liked.review.review_id === review_id) {
        setLikedReview(true);
      }
    }
  };

  const updateLike = async () => {
    // This submits the review to be liked
    const payload = !likedReview
    
    setLikedReview(payload);

    try {
      let response = null
      if(payload) {
        // : need to like the review
        response = await coffida.post(`/location/${location_id}/review/${review_id}/like`)
      } else {
        // : need to delete the review like
        response = await coffida.delete(`/location/${location_id}/review/${review_id}/like`)
      }
    } catch (error) {
      // : failed updating information
      setLikedReview(!payload)
      return;
    }

    // update the information on the location page
    getLocationInformation(location_id);
    console.log(payload ? "USER LIKED THE REVIEW" : "USER REMOVED LIKE ON REVIEW");
  };
  return (
    <TouchableOpacity onPress={() => updateLike()} style={{ alignSelf: "center" }}>
      <AntDesign
        style={{ alignSelf: "center" }}
        name={likedReview ? "heart" : "hearto"}
        size={30}
        color="red"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ReviewLikeButton;
