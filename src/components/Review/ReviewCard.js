import React, { useEffect, useState, useContext } from "react";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet, Modal, ActivityIndicator } from "react-native";
import { Image, Avatar } from "react-native-elements";

import ImageViewer from "react-native-image-zoom-viewer";

import LocationRatingStats from "../Location/LocationRatingStats";
import ReviewLikeButton from "./ReviewLikeButton";
import coffida from "../../api/coffida";
import { TouchableOpacity } from "react-native";

import { ThemeContext } from "../../context/ThemeContext";

const ReviewCard = ({ review, location_id, user_information }) => {
  const [ReviewImage, setReviewImage] = useState(null);
  const [ModelVisible, setModelVisible] = useState(false);

  const { Theme } = useContext(ThemeContext);

  const CheckIfReviewImageExists = async () => {
    // Function returns review image if exists, otherwise doesn't render any images
    try {
      const image = await coffida.get(
        `/location/${location_id}/review/${review.review_id}/photo`
      );
      setReviewImage(image.request.responseURL + "?time=" + new Date());
    } catch (error) {
      // Image does not exist
      setReviewImage(null);
    }
  };

  useEffect(() => {
    CheckIfReviewImageExists();
  }, [user_information]);

  return (
    <View
      style={{
        width: "100%",
        marginBottom: 40,
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
              uri: `https://source.unsplash.com/125x125/?profile,person?sig=${review.review_id}`,
            }}
          />
        </View>
        <View style={{ flex: 4 }}>
          <LocationRatingStats
            paddingSpace={5}
            ratingRows={[
              {
                title: "clean",
                rating: review.clenliness_rating,
              },
              {
                title: "price",
                rating: review.price_rating,
              },
              {
                title: "quality",
                rating: review.quality_rating,
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
          <ReviewLikeButton
            user_information={user_information}
            location_id={location_id}
            review={review}
          />
        </View>
      </View>

      {ReviewImage !== null ? (
        <View style={{ paddingHorizontal: 10 }}>
          <Modal visible={ModelVisible} transparent={true}>
            <ImageViewer
              enableSwipeDown
              onSwipeDown={() => setModelVisible(false)}
              imageUrls={[{ url: ReviewImage }]}
            />
          </Modal>
          <TouchableOpacity onPress={() => setModelVisible(true)}>
            <Image
              source={{
                uri: ReviewImage,
              }}
              style={{
                width: Dimensions.get("window").width / 2,
                aspectRatio: 16 / 9,
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={{ flex: 1, padding: 10 }}>
        <Text>{review.review_body}</Text>
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
