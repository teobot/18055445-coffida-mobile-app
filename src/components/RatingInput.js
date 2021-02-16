import React from "react";
import { View, Text } from "react-native";
import { Rating } from "react-native-elements";

const RatingInput = ({
  title,
  valueTitle,
  value,
  dispatcher,
  containerMargin,
  containerPadding,
  showRating,
}) => {
  return (
    <View
      style={{
        padding: containerPadding !== undefined ? containerPadding : 15,
        marginVertical: containerMargin !== undefined ? containerMargin : 5,
      }}
      key={title}
    >
      <Text>{title}</Text>
      <Rating
        startingValue={value}
        onFinishRating={(newValue) =>
          dispatcher({ type: `change_${valueTitle}`, payload: newValue })
        }
        showRating={showRating !== undefined ? showRating : true}
      />
    </View>
  );
};

export default RatingInput;
