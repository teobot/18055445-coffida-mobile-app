import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  ScrollView,
} from "react-native";

import { withNavigation } from "react-navigation";

import RatingInput from "../components/RatingInput";
import ValidationHelper from "../helpers/ValidationHelper"
import coffida from "../api/coffida"

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

const LocationReviewScreen = ({ navigation, }) => {
  const { userReview, userReviewAlready, locationId } = navigation.state.params;
  const [disableButton, setDisableButton] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    overall_rating: userReviewAlready ? userReview.overall_rating : 0,
    price_rating: userReviewAlready ? userReview.price_rating : 0,
    quality_rating: userReviewAlready ? userReview.quality_rating : 0,
    clenliness_rating: userReviewAlready ? userReview.clenliness_rating : 0,
    review_body: userReviewAlready ? userReview.review_body : "",
  });

  const handleSubmit = async () => {
    setDisableButton(true)
    if(ValidationHelper.IsObjectProfane(state)) {
      // TODO: Review information is profane
    } else {
      // Review information is clean
      if(state.review_body.length > 10) {
        // Review body is more than 10 characters we can post or patch
        
        try {
          let response = null
          if(userReviewAlready) {
            // PATCH, user already review,
            console.log(`/location/${locationId}/review/${userReview.review_id}`);
            response = await coffida.patch(`/location/${locationId}/review/${userReview.review_id}`, state)
          } else {
            // POST, user hasn't sent a review before
            console.log(`/location/${locationId}/review`);
            response = await coffida.post(`/location/${locationId}/review`, state)
          }

          console.log(response.data);
          
          if(response.status === 200 || response.status === 201) {
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


    setDisableButton(false)
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

      <View style={{padding: 10, margin: 10, marginBottom: 100}}>
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

        <Button disabled={disableButton} title="Submit" onPress={handleSubmit} />
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

export default withNavigation(LocationReviewScreen);
