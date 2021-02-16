import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { Button, Image } from "react-native-elements";

import { withNavigation } from "react-navigation";

import DeleteReview from "../components/DeleteReview";
import RatingInput from "../components/RatingInput";
import ValidationHelper from "../helpers/ValidationHelper";
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
  const [state, dispatch] = useReducer(reducer, {
    overall_rating: userReviewAlready ? userReview.overall_rating : 0,
    price_rating: userReviewAlready ? userReview.price_rating : 0,
    quality_rating: userReviewAlready ? userReview.quality_rating : 0,
    clenliness_rating: userReviewAlready ? userReview.clenliness_rating : 0,
    review_body: userReviewAlready ? userReview.review_body : "",
  });

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
      console.log(image.request.responseURL);
      setReviewImage(image.request.responseURL + "?time=" + new Date());
    } catch (error) {
      // Image does not exist
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
      console.log("Hey! You have not enabled selected permissions");
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
    console.log(response);
    if (response.status === "OK") {
      await CheckIfReviewImageExists();
    }
  };

  const handleReviewImageDelete = async () => {
    // handle review image deletion
    try {
      const response = await coffida.delete(
        `/location/${location_id}/review/${userReview.review_id}/photo`
      );
      console.log(response);
      setReviewImage(null);
    } catch (error) {}
  };

  const handleSubmit = async () => {
    setDisableButton(true);
    if (ValidationHelper.IsObjectProfane(state)) {
      // TODO: Review information is profane
    } else {
      // Review information is clean
      if (state.review_body.length > 10) {
        // Review body is more than 10 characters we can post or patch

        try {
          let response = null;
          if (userReviewAlready) {
            // PATCH, user already review,
            console.log(
              `/location/${location_id}/review/${userReview.review_id}`
            );
            response = await coffida.patch(
              `/location/${location_id}/review/${userReview.review_id}`,
              state
            );
          } else {
            // POST, user hasn't sent a review before
            console.log(`/location/${location_id}/review`);
            response = await coffida.post(
              `/location/${location_id}/review`,
              state
            );
          }

          if (response.status === 200 || response.status === 201) {
            // The review post or patch was successful
            navigation.goBack();
          } else {
            // TODO: The post or patch was unsuccessful
          }
        } catch (error) {
          // TODO: Error patching or posting review information
          console.log(error);
        }
      } else {
        // TODO: Review body is too short
      }
    }

    setDisableButton(false);
  };

  return (
    <ScrollView>
      <View style={{ width: "100%", padding: 15, marginVertical: 5 }}>
        <Text>
          {userReviewAlready
            ? "Your review image"
            : "You need to review before adding images! :)"}
        </Text>
        {ReviewImage !== null ? (
          <View style={{ alignItems: "center" }}>
            <Image
              source={{
                uri: ReviewImage,
              }}
              style={{
                width: Dimensions.get("window").width - 30,
                maxWidth: Dimensions.get("window").width - 30,
                maxHeight: 300,
                height: 300,
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
                type="solid"
                title="Update Image"
              />
              <Button
                onPress={handleReviewImageDelete}
                type="solid"
                title="Delete Image"
              />
            </View>
          </View>
        ) : (
          <Button
            onPress={takeImageHandler}
            disabled={!userReviewAlready}
            type="solid"
            title="Add Image"
          />
        )}
      </View>

      <RatingInput
        title="Overall Rating"
        valueTitle="overall_rating"
        value={state.overall_rating}
        dispatcher={dispatch}
      />

      <RatingInput
        title="Price Rating"
        valueTitle="price_rating"
        value={state.price_rating}
        dispatcher={dispatch}
      />

      <RatingInput
        title="Quality Rating"
        valueTitle="quality_rating"
        value={state.quality_rating}
        dispatcher={dispatch}
      />

      <RatingInput
        title="Clenliness Rating"
        valueTitle="clenliness_rating"
        value={state.clenliness_rating}
        dispatcher={dispatch}
      />

      <View style={{ padding: 10, margin: 10, marginBottom: 100 }}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={state.review_body}
          onChangeText={(newVal) =>
            dispatch({ type: "change_review_body", payload: newVal })
          }
          placeholder="Review"
          style={styles.inputStyle}
        />

        <Button
          disabled={disableButton}
          title={userReviewAlready ? "Update" : "Post"}
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 18,
    borderColor: "black",
    borderWidth: 2,
    padding: 5,
    margin: 5,
  },
});

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
