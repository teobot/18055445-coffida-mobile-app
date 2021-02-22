import React from "react";

// React element import
import { View, Text, StyleSheet } from "react-native";

// Icon import
import { AntDesign } from "@expo/vector-icons";

const LocationQuickStats = ({ name, rating, ratingTitle, styles }) => {
  // This displays the title with a small rating/label
  return (
    <View style={{ ...styles, ...view_styles.statsContainerStyle }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            ...view_styles.nameContainerStyle,
            ...view_styles.textShadow,
          }}
        >
          {name}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <AntDesign
          name="star"
          style={{
            color: "gold",
            fontSize: 40,
            alignSelf: "flex-start",
          }}
        />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "white",
                ...view_styles.textShadow,
              }}
            >
              {ratingTitle}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                ...view_styles.textShadow,
                fontSize: 22,
                color: "white",
              }}
            >
              {rating !== null ? rating.toFixed(1) : 0}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const view_styles = StyleSheet.create({
  statsContainerStyle: {
    position: "absolute",
    width: "100%",
    alignSelf: "flex-end",
  },
  nameContainerStyle: {
    fontSize: 36,
    color: "white",
  },
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
  },
});
export default LocationQuickStats;
