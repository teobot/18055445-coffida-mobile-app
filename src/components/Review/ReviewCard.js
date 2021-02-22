import React, { useEffect, useState, useContext } from "react";

// React element imports
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Image, Avatar } from "react-native-elements";

// React image zoomer import
import ImageViewer from "react-native-image-zoom-viewer";

// Custom component imports
import LocationRatingStats from "../Location/LocationRatingStats";
import ReviewLikeButton from "./ReviewLikeButton";

// Api import
import coffida from "../../api/coffida";

// Context import
import { ThemeContext } from "../../context/ThemeContext";

const ReviewCard = ({ review, location_id, user_information }) => {
  // The ReviewCard component displays a review object

  // useState init
  const [ReviewImage, setReviewImage] = useState(null);
  const [ModelVisible, setModelVisible] = useState(false);

  // Context init
  const { Theme, ThemeTextColor } = useContext(ThemeContext);

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
    // On user information change check if review has a image
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
        <Text style={ThemeTextColor}>{review.review_body}</Text>
      </View>
    </View>
  );
};

export default ReviewCard;
