import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Image,
} from "react-native";

import { Avatar } from "react-native-elements";

const ReviewCard = ({ review }) => {
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
        width: Dimensions.get("window").width,
        marginBottom: 20,
      }}
    >
      <View style={styles.reviewContainerTop}>
        <View style={styles.reviewTopImageStyle}>
          <Avatar
          size="large"
            rounded
            title=" "
            source={{
              uri: `https://source.unsplash.com/125x125/?profile,person?sig=${review_id}`,
            }}
          />
        </View>
        <View style={styles.reviewDetailsStyle}>
          <View style={{ flex: 1, backgroundColor: "red" }}></View>
          <View style={{ flex: 1, backgroundColor: "blue" }}></View>
        </View>
        <View style={styles.reviewDetailsSpacer}></View>
        <View style={styles.reviewDetailsLikes}></View>
      </View>
      <View style={styles.reviewContainerBottom}>
        <Text>{review_body}</Text>
      </View>
    </View>
  );
};

// Object {
//   "clenliness_rating": 4,
//   "likes": 0,
//   "overall_rating": 4,
//   "price_rating": 5,
//   "quality_rating": 3,
//   "review_body": "I like the coffee",
//   "review_id": 4,
// }

const styles = StyleSheet.create({
  reviewDetailsSubStyle: {
    flex: 1,
    backgroundColor: "red",
  },
  reviewDetailsLikes: {
    flex: 1,
    backgroundColor: "purple",
  },
  reviewDetailsSpacer: {
    flex: 1,
    backgroundColor: "yellow",
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
