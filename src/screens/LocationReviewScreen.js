import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Button, Overlay } from "react-native-elements";

import { withNavigation } from "react-navigation";

import RatingInput from "../components/RatingInput";
import ValidationHelper from "../helpers/ValidationHelper";
import coffida from "../api/coffida";

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
  const { userReview, userReviewAlready, locationId } = navigation.state.params;
  const [disableButton, setDisableButton] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    overall_rating: userReviewAlready ? userReview.overall_rating : 0,
    price_rating: userReviewAlready ? userReview.price_rating : 0,
    quality_rating: userReviewAlready ? userReview.quality_rating : 0,
    clenliness_rating: userReviewAlready ? userReview.clenliness_rating : 0,
    review_body: userReviewAlready ? userReview.review_body : "",
  });

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
              `/location/${locationId}/review/${userReview.review_id}`
            );
            response = await coffida.patch(
              `/location/${locationId}/review/${userReview.review_id}`,
              state
            );
          } else {
            // POST, user hasn't sent a review before
            console.log(`/location/${locationId}/review`);
            response = await coffida.post(
              `/location/${locationId}/review`,
              state
            );
          }

          console.log(response.data);

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

const DeleteReview = ({ navigation }) => {
  const location_id = navigation.state.params.locationId;
  const review_id = navigation.state.params.userReview.review_id;
  const [overlay, setOverlay] = useState(false);

  const handleReviewDelete = async () => {
    // /location/{loc_id}/review/{rev_id}
    try {
      const response = await coffida.delete(
        `/location/${location_id}/review/${review_id}`
      );
      if (response.status === 200) {
        // Deletion was successful
        navigation.navigate("Location", {
          location_id,
        });
      } else {
        // TODO: Deletion of the review has failed
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      // TODO: Deletion of the review networking has failed
    }
  };
  return (
    <TouchableOpacity style={{ padding: 10 }} onPress={() => setOverlay(true)}>
      <Overlay isVisible={overlay}>
        <View style={{ padding: 5, margin: 5 }}>
          <Text>Are you sure you want to delete your review?</Text>
        </View>
        <View style={{ padding: 5, margin: 5, flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Button
              raised
              buttonStyle={styles.buttonStyle}
              type="outline"
              title="yes"
              onPress={handleReviewDelete}
            />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Button
              buttonStyle={styles.buttonStyle}
              onPress={() => setOverlay(false)}
              type="outline"
              title="no"
              raised
            />
          </View>
        </View>
      </Overlay>
      <MaterialCommunityIcons name="delete-forever" size={36} color="black" />
    </TouchableOpacity>
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
  buttonStyle: {
    padding: 5,
    width: 100,
    color: "red",
  },
});

LocationReviewScreen.navigationOptions = ({ navigation }) => {
  if (
    navigation.state.params.locationId !== null &&
    navigation.state.params.userReview !== null
  ) {
    return {
      headerRight: () => <DeleteReview navigation={navigation} />,
    };
  }
};

export default withNavigation(LocationReviewScreen);
