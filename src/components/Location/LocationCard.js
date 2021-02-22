import React, { useContext, useEffect } from "react";

// React element imports
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Icon, Badge } from "react-native-elements";

// Navigation import
import { withNavigation } from "react-navigation";

// Context import
import { ThemeContext } from "../../context/ThemeContext";

const LocationCard = ({ item, navigation }) => {
  // This is the location card for displaying the location information and directing the user towards the location screen

  // Destructor location item
  const {
    location_name,
    avg_overall_rating,
    location_reviews,
    location_id,
    photo_path,
    distance,
  } = item;

  // Context init
  const { ThemeTextColor } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    imageStyle: {
      aspectRatio: 16 / 9,
      borderRadius: 10,
      width: "100%",
      alignSelf: "center",
    },
    locationNameText: {
      fontWeight: "bold",
      fontSize: 16,
      ...ThemeTextColor,
    },
    locationDetailsText: {
      ...ThemeTextColor,
    },
    container: {
      margin: 15,
    },
    touchableContainer: {
      flexDirection: "column",
      paddingVertical: 2,
      paddingHorizontal: 5,
      margin: 5,
      maxWidth: Dimensions.get("window").width,
    },
  });

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Location", {
          location_id,
        })
      }
      style={styles.touchableContainer}
    >
      <View style={{ flex: 3 }}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: `${photo_path}?sig=${location_name}`,
          }}
        />
        {distance !== null ? (
          <View style={{ position: "absolute", right: 0, bottom: 0 }}>
            <Icon
              reverse
              reverseColor="#222222"
              color="white"
              name="location-outline"
              type="ionicon"
            />
            <Badge
              status="primary"
              value={`${(distance / 1000).toFixed(
                distance / 1000 > 9999 ? 0 : 1
              )}KM`}
              containerStyle={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
              }}
              badgeStyle={{ backgroundColor: "white" }}
              textStyle={{ fontWeight: "bold", color: "#222222" }}
            />
          </View>
        ) : null}
      </View>
      <View style={{ flex: 1, paddingVertical: 5 }}>
        <Text style={styles.locationNameText}>{location_name}</Text>
        <Text style={styles.locationDetailsText}>
          {avg_overall_rating === null
            ? `Not yet rated`
            : `${avg_overall_rating.toFixed(1)} Stars`}
          ,{" "}
          {location_reviews.length === 0
            ? "No Reviews"
            : `${location_reviews.length} Reviews`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default withNavigation(LocationCard);
