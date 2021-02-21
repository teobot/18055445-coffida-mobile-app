import React, { useState, useEffect, useReducer, useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { Button, Image, Text, Input } from "react-native-elements";

import { withNavigation } from "react-navigation";

import DeleteReview from "../components/DeleteReview";
import RatingInput from "../components/RatingInput";
import SearchRatingInput from "../components/SearchScreen/SearchRatingInput";

import ValidationHelper from "../helpers/ValidationHelper";

import { ThemeContext } from "../context/ThemeContext";
import { ToastContext } from "../context/ToastContext";

import coffida from "../api/coffida";

import ImageHelper from "../helpers/ImageHelper";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const reducer = (state, action) => {
  switch (action.type) {
    case "change_overall_rating":
      return { ...state, overall_rating: action.payload };
    case "change_price_rating":
      return { ...state, price_rating: action.payload };
    case "change_quality_rating":
      return { ...state, quality_rating: action.payload };
    case "change_clenliness_rating":
      return { ...state, clenliness_rating: action.payload };
    case "change_review_body":
      return { ...state, review_body: action.payload };
    default:
      return state;
  }
};

const LocationReviewScreen = ({ navigation }) => {
  const {
    userReview,
    userReviewAlready,
    location_id,
  } = navigation.state.params;
  const [ReviewImage, setReviewImage] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const REVIEW_RATING_IMAGE_SIZE = 50;
  const [state, dispatch] = useReducer(reducer, {
    overall_rating: userReviewAlready ? userReview.overall_rating : 0,
    price_rating: userReviewAlready ? userReview.price_rating : 0,
    quality_rating: userReviewAlready ? userReview.quality_rating : 0,
    clenliness_rating: userReviewAlready ? userReview.clenliness_rating : 0,
    review_body: userReviewAlready ? userReview.review_body : "",
  });

  const {
    showToast,
    show404Toast,
    show500Toast,
    show200Toast,
    showBadInputToast,
    showGoodInputToast,
  } = useContext(ToastContext);

  useEffect(() => {
    const didFocusListener = navigation.addListener("didFocus", (payload) => {
      CheckIfReviewImageExists();
    });
    return () => {
      didFocusListener.remove();
    };
  }, []);

  const CheckIfReviewImageExists = async () => {
    // Function returns review image if exists, otherwise doesn't render any images
    try {
      setReviewImage(null);
      const image = await coffida.get(
        `/location/${location_id}/review/${userReview.review_id}/photo`
      );
      setReviewImage(image.request.responseURL + "?time=" + new Date());
    } catch (error) {
      // Image does not exist but no need to
      // do anything.
    }
  };

  const takeImageHandler = async () => {
    const CAMERA_PERMISSIONS = await Permissions.askAsync(Permissions.CAMERA);
    const MEDIA_LIBRARY_PERMISSIONS = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY
    );

    if (
      CAMERA_PERMISSIONS.status !== "granted" &&
      MEDIA_LIBRARY_PERMISSIONS.status !== "granted"
    ) {
      showBadInputToast({
        topMessage: "Permissions error",
        bottomMessage: "Hey! You have not enabled selected permissions",
      });
    } else {
      const cameraImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.7,
        base64: true,
      });
      postImage(cameraImage);
    }
  };

  const postImage = async (image) => {
    const response = await ImageHelper.onPictureSaved(
      image,
      location_id,
      userReview.review_id
    );
    if (response.status === "OK") {
      // Image posting status is successful
      show200Toast("Image posted");
      await CheckIfReviewImageExists();
    } else {
      show404Toast("Image posting failed");
    }
  };

  const handleReviewImageDelete = async () => {
    // handle review image deletion
    try {
      const response = await coffida.delete(
        `/location/${location_id}/review/${userReview.review_id}/photo`
      );
      show200Toast("Image deleted");
      setReviewImage(null);
    } catch (error) {
      show404Toast("Image could not be deleted");
    }
  };

  const handleSubmit = async () => {
    // This handles the review submission
    setDisableButton(true);

    // Check if the review body is valid
    const review_body_errors = ValidationHelper.validator({
      type: "validate_review_body",
      payload: state.review_body,
    });

    if (review_body_errors !== undefined) {
      // Review body has some errors need to tell user
      console.log(review_body_errors);
      showToast({
        type: "error",
        position: "top",
        text1: "Review error",
        text2: review_body_errors.review_body[0],
        visibilityTime: 4000,
        autoHide: true,
      });
      return;
    }
    try {
      // Post or patch the current location review
      let response = null;
      if (userReviewAlready) {
        // The user has already reviewed so lets patch
        response = await coffida.patch(
          `/location/${location_id}/review/${userReview.review_id}`,
          state
        );
      } else {
        // The user has not posted a review, lets post this one
        response = await coffida.post(`/location/${location_id}/review`, state);
      }
      if (response.status === 200 || response.status === 201) {
        // The review post or patch was successful
        show200Toast("Review was posted");
        navigation.goBack();
      } else {
        // Bad request
        show404Toast();
      }
    } catch (error) {
      // Error within patching or posting review
      show500Toast();
    }
    setDisableButton(false);
  };

  return (
    <ScrollView style={{ paddingHorizontal: 5, marginVertical: 25 }}>
      <View style={{ padding: 30 }}>
        <Text h4>
          {userReviewAlready
            ? "Your Review Image"
            : "You need to review before adding images"}
        </Text>
        {ReviewImage !== null ? (
          <View style={{ alignItems: "center" }}>
            <Image
              source={{
                uri: ReviewImage,
              }}
              style={{
                width: "100%",
                aspectRatio: 16 / 9,
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingTop: 5,
              }}
            >
              <Button
                onPress={takeImageHandler}
                type="outline"
                title="Update Image"
              />
              <Button
                onPress={handleReviewImageDelete}
                type="outline"
                title="Delete Image"
              />
            </View>
          </View>
        ) : (
          <Button
            onPress={takeImageHandler}
            disabled={!userReviewAlready}
            type="outline"
            title="Add Image"
          />
        )}
      </View>

      <SearchRatingInput
        title="Overall Rating"
        valueTitle="overall_rating"
        value={state.overall_rating}
        dispatcher={dispatch}
        imageSize={REVIEW_RATING_IMAGE_SIZE}
      />

      <SearchRatingInput
        title="Price Rating"
        valueTitle="price_rating"
        value={state.price_rating}
        dispatcher={dispatch}
        imageSize={REVIEW_RATING_IMAGE_SIZE}
      />

      <SearchRatingInput
        title="Quality Rating"
        valueTitle="quality_rating"
        value={state.quality_rating}
        dispatcher={dispatch}
        imageSize={REVIEW_RATING_IMAGE_SIZE}
      />

      <SearchRatingInput
        title="Clenliness Rating"
        valueTitle="clenliness_rating"
        value={state.clenliness_rating}
        dispatcher={dispatch}
        imageSize={REVIEW_RATING_IMAGE_SIZE}
      />

      <View style={{ padding: 5, margin: 5 }}>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          value={state.review_body}
          onChangeText={(newVal) =>
            dispatch({ type: "change_review_body", payload: newVal })
          }
          placeholder="Review"
          style={{
            fontSize: 18,
            padding: 5,
            margin: 5,
          }}
        />

        <Button
          type="outline"
          disabled={disableButton}
          title={userReviewAlready ? "Update" : "Post"}
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

LocationReviewScreen.navigationOptions = ({ navigation }) => {
  if (
    navigation.state.params.location_id !== null &&
    navigation.state.params.userReview !== null
  ) {
    return {
      headerRight: () => <DeleteReview navigation={navigation} />,
    };
  }
};

export default withNavigation(LocationReviewScreen);
