import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import ReviewPhotoCamera from "../components/ReviewPhotoCamera";
import { withNavigation } from "react-navigation";

const ReviewImageScreen = ({ navigation }) => {
  const {
    userReview,
    userReviewAlready,
    location_id,
  } = navigation.state.params;

  const SetPhoto = (p) => {
    // p === uri : location of the image
    // console.log(p);
  };

  const OnImageSuccess = (r) => {
    // Triggered if the image was sent successfully
    console.log("Taking image: " + r.status);
    navigation.navigate("Review", {
      userReviewAlready,
      userReview,
      location_id,
    });
  };

  const OnImageFailed = (r) => {
    // Triggered if the image failed to send
    console.log("Taking image: " + r.status);
  };

  return (
    <View style={{ flex: 1 }}>
      <ReviewPhotoCamera
        AspectRatio="16:9"
        CameraStartingDirection="front"
        ImageQuality={0.6}
        location_id={location_id}
        review_id={userReview.review_id}
        OnImageSuccess={OnImageSuccess}
        OnImageFailed={OnImageFailed}
        setPhotoLocation={SetPhoto}
        AccessDeniedMessage="Please accept permissions!"
        WhilePermissionsNull={
          <View>
            <Text>LOADING...</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default withNavigation(ReviewImageScreen);
