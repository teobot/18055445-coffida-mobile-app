import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Image,
} from "react-native";

import { Avatar } from "react-native-elements";

import LocationRatingStats from "../components/LocationRatingStats";
import ReviewLikeButton from "./ReviewLikeButton";

const ReviewCard = ({ review, location_id, getLocationInformation, user_information }) => {
  const [likedReview, setLikedReview] = useState(false)
  const {
    clenliness_rating,
    likes,
    overall_rating,
    price_rating,
    quality_rating,
    review_body,
    review_id,
  } = review;
  return (
    <View
      style={{
        width: "100%",
        marginBottom: 20,
      }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Avatar
            size={"medium"}
            rounded
            title=" "
            source={{
              uri: `https://source.unsplash.com/125x125/?profile,person?sig=${review_id}`,
            }}
          />
        </View>
        <View style={{ flex: 4 }}>
          <LocationRatingStats
            paddingSpace={5}
            ratingRows={[
              {
                title: "clean",
                rating: clenliness_rating,
              },
              {
                title: "price",
                rating: price_rating,
              },
              {
                title: "quality",
                rating: quality_rating,
              },
            ]}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReviewLikeButton user_information={user_information} getLocationInformation={getLocationInformation} review_id={review_id} location_id={location_id}/>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>{likes}</Text>
        </View>
      </View>

      <View style={{ flex: 1, padding: 10 }}>
        <Text>{review_body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewDetailsSubStyle: {
    flex: 1,
  },
  reviewDetailsLikes: {
    flex: 1,
  },
  reviewDetailsSpacer: {
    flex: 1,
  },
  reviewDetailsStyle: {
    flex: 2,
  },
  reviewTopImageStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewContainerTop: {
    flexDirection: "row",
    flex: 1,
  },
  reviewContainerBottom: {
    flex: 1,
    padding: 5,
  },
});

export default ReviewCard;
