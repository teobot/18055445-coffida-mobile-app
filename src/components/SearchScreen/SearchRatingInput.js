import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Rating } from "react-native-elements";

const SearchRatingInput = ({
  title,
  valueTitle,
  value,
  dispatcher,
  imageSize,
}) => {
  const imageSizeValue = imageSize ? imageSize : 30;
  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ padding: 5 }}>
        <Text>{title}</Text>
        <Rating
          type="custom"
          tintColor="#f2f2f2"
          imageSize={imageSizeValue}
          onFinishRating={(newValue) =>
            dispatcher({ type: `change_${valueTitle}`, payload: newValue })
          }
          showRating={false}
          startingValue={value}
          ratingBackgroundColor="white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchRatingInput;
