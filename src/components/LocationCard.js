import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { withNavigation } from "react-navigation";

const LocationCard = ({ item, navigation }) => {
  const {
    location_name,
    avg_overall_rating,
    location_reviews,
    location_id,
    photo_path,
  } = item;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Location", {
          location_id,
        })
      }
    >
      <View style={styles.container}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: `${photo_path}?sig=${location_name}`,
          }}
        />
        <Text style={styles.name}>{location_name}</Text>
        <Text>
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

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    minWidth: Dimensions.get("window").width * 0.5,
    height: 120,
    borderRadius: 5,
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    margin: 15,
  },
});

export default withNavigation(LocationCard);
