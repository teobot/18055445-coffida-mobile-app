import React, { useState, useEffect, useReducer, useContext } from "react";

// React element imports
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Button, Image, Text, Input } from "react-native-elements";

// Navigation import
import { withNavigation } from "react-navigation";

// Custom component imports
import DeleteReview from "../components/DeleteReview";
import SearchRatingInput from "../components/SearchScreen/SearchRatingInput";

// Helper imports
import ValidationHelper from "../helpers/ValidationHelper";
import ImageHelper from "../helpers/ImageHelper";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

// Context imports
import { ThemeContext } from "../context/ThemeContext";
import { ToastContext } from "../context/ToastContext";

// Api imports
import coffida from "../api/coffida";

// This reducer handles the changing on the location review ratings
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

// Camera options
const CAMERA_QUALITY = 0.7; // 0.0 - 1.0
const CAMERA_ASPECT_RATIO = [16, 9]; // [width, height]
const CAMERA_ALLOW_EDITING = true; // true || false
const CAMERA_BASE64 = true; // true || false - WARNING: has to be TRUE if you want to post to backend

const LocationReviewScreen = ({ navigation }) => {
  // This is the location review screen where the user can post and edit their reviews

  // state and const initialization
  const {
    userReview,
    userReviewAlready,
    location_id,
  } = navigation.state.params;
  const [ReviewImage, setReviewImage] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const REVIEW_RATING_IMAGE_SIZE = 50;

  // React reducer init
  const [state, dispatch] = useReducer(reducer, {
    overall_rating: userReviewAlready ? userReview.overall_rating : 0,
    price_rating: userReviewAlready ? userReview.price_rating : 0,
    quality_rating: userReviewAlready ? userReview.quality_rating : 0,
    clenliness_rating: userReviewAlready ? userReview.clenliness_rating : 0,
    review_body: userReviewAlready ? userReview.review_body : "",
  });

  // Context inits
  const {
    showToast,
    show404Toast,
    show500Toast,
    show200Toast,
    showBadInputToast,
  } = useContext(ToastContext);
  const { ThemeTextColor } = useContext(ThemeContext);

  useEffect(() => {
    // Init a didFocus listener to update the review image
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
      const image = await coffida.get(
        `/location/${location_id}/review/${userReview.review_id}/photo`
      );
      setReviewImage(image.request.responseURL + "?time=" + new Date());
    } catch (error) {
      // Image does not exist
    }
  };

  const takeImageHandler = async () => {
    // The function handles the taking of the picture

    // Ask for camera and media library permissions
    const CAMERA_PERMISSIONS = await Permissions.askAsync(Permissions.CAMERA);
    const MEDIA_LIBRARY_PERMISSIONS = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY
    );

    if (
      CAMERA_PERMISSIONS.status !== "granted" &&
      MEDIA_LIBRARY_PERMISSIONS.status !== "granted"
    ) {
      // If the user has denied either permission show a message
      showBadInputToast({
        topMessage: "Permissions error",
        bottomMessage: "Hey! You have not enabled selected permissions",
      });
    } else {
      // If the user has allowed camera and media library permissions
      // Force aspect ration 16:9
      const cameraImage = await ImagePicker.launchCameraAsync({
        allowsEditing: CAMERA_ALLOW_EDITING,
        aspect: CAMERA_ASPECT_RATIO,
        quality: CAMERA_QUALITY,
        base64: CAMERA_BASE64,
      });
      postImage(cameraImage);
    }
  };

  const postImage = async (image) => {
    // This handles the posting of the image to the coffida backend
    const response = await ImageHelper.onPictureSaved(
      image,
      location_id,
      userReview.review_id
    );
    if (response.status === "OK") {
      // Image posting status is successful
      show200Toast("Image posted");
      CheckIfReviewImageExists();
    } else {
      // Image posting failed
      show404Toast("Image posting failed");
    }
  };

  const handleReviewImageDelete = async () => {
    // Handles review image deletion
    try {
      const response = await coffida.delete(
        `/location/${location_id}/review/${userReview.review_id}/photo`
      );
      // Image is deleted, display message and clear the state
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
    const { review_body } = state;
    const errors = ValidationHelper.validator({ review_body });
    if (errors !== undefined) {
      // Review body has some errors need to tell user
      let error_message = "";
      errors.forEach((error) => {
        error_message += error + "\n";
      });
      // Display all error message to the user
      showToast({
        type: "error",
        position: "top",
        text1: "Review error",
        text2: error_message,
        visibilityTime: 4000,
        autoHide: true,
      });
      setDisableButton(false);
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
        <Text h4 style={ThemeTextColor}>
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
          inputStyle={ThemeTextColor}
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

LocationReviewScreen.navigationOptions = ({ navigation }) => {
  // This handles the review deletion,
  // I send the location_id and review_id to the deleteReview Component
  if (
    navigation.state.params.location_id !== null &&
    navigation.state.params.userReview !== null
  ) {
    return {
      headerRight: () => (
        <DeleteReview
          location_id={navigation.state.params.location_id}
          review_id={navigation.state.params.userReview.review_id}
        />
      ),
    };
  }
};

export default withNavigation(LocationReviewScreen);
