import React, { useContext } from "react";

// React element imports
import { View, StyleSheet } from "react-native";
import { Text, Rating } from "react-native-elements";

// Context imports
import { ThemeContext } from "../../context/ThemeContext";

const SearchRatingInput = ({
  title,
  valueTitle,
  value,
  dispatcher,
  imageSize,
}) => {
  // This component handles a rating input with label

  // init variables
  const imageSizeValue = imageSize ? imageSize : 30;

  // context init
  const { ThemeTextColor, Theme } = useContext(ThemeContext);

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ padding: 5 }}>
        <Text style={ThemeTextColor}>{title}</Text>
        <Rating
          type="custom"
          tintColor={Theme === "light" ? "#f2f2f2" : "black"}
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
