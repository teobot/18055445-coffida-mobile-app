import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Rating } from "react-native-elements";
import { ThemeContext } from "../../context/ThemeContext";

const SearchRatingInput = ({
  title,
  valueTitle,
  value,
  dispatcher,
  imageSize,
}) => {
  const imageSizeValue = imageSize ? imageSize : 30;
  const { Theme } = useContext(ThemeContext);
  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ padding: 5 }}>
        <Text style={{ color: Theme === "dark" ? "whitesmoke" : "#222222" }}>
          {title}
        </Text>
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
