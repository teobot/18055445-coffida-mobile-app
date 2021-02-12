import React from "react";
import { View, Text } from "react-native";
import { Rating } from "react-native-elements";

const RatingInput = ({ title, valueTitle, value, dispatcher }) => {
  return (
    <View style={{ padding: 15, marginVertical: 5 }} key={title}>
      <Text>{title}</Text>
      <Rating
        startingValue={value}
        onFinishRating={(val) =>
          dispatcher({ type: `change_${valueTitle}`, payload: val })
        }
        showRating
        startingValue={value}
      />
    </View>
  );
};

export default RatingInput;
