import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Rating } from "react-native-elements";

const SearchRatingInput = ({
  title,
  valueTitle,
  value,
  dispatcher,
  backgroundColor,
}) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ padding: 5 }}>
        <Text>{title}</Text>
        <Rating
          type="custom"
          tintColor={backgroundColor}
          imageSize={30}
          onFinishRating={(newValue) =>
            dispatcher({ type: `change_${valueTitle}`, payload: newValue })
          }
          showRating={false}
          startingValue={value}
          ratingBackgroundColor="whitesmoke"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchRatingInput;
