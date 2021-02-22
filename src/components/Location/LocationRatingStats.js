import React, { useContext } from "react";

// React elements imports
import { View, Text, StyleSheet } from "react-native";

// Icon import
import { AntDesign } from "@expo/vector-icons";

// Context import
import { ThemeContext } from "../../context/ThemeContext";

const LocationRatingStats = ({ ratingRows, paddingSpace }) => {
  // The is the rating stat component for displaying a rating
  
  const { ThemeTextColor } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    sectionContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    },
    locationStatsStyleContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    },
    locationStatHeaderStyle: {
      fontSize: 18,
      fontWeight: "bold",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      ...ThemeTextColor
    },
    locationStatSubTextStyle: {
      fontSize: 12,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      ...ThemeTextColor
    },
    starIconStyle: {
      color: "gold",
      alignSelf: "center",
      fontSize: 20,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    },
  });
  return (
    <View style={{ padding: paddingSpace, flexDirection: "row" }}>
      {ratingRows.map(({ rating, title }) => (
        <View
          key={`${title}${rating}`}
          style={{
            ...styles.locationStatsStyleContainer,
            padding: paddingSpace,
          }}
        >
          <View styles={styles.sectionContainer}>
            <Text style={styles.locationStatHeaderStyle}>
              {rating === undefined
                ? "?"
                : rating !== null
                ? rating.toFixed(1)
                : 0}
              <AntDesign name="star" style={styles.starIconStyle} />
            </Text>
          </View>
          <View styles={styles.sectionContainer}>
            <Text style={styles.locationStatSubTextStyle}>{title}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
export default LocationRatingStats;
