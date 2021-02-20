import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { getDistance } from "geolib";
import { withNavigation } from "react-navigation";
import { Icon, Badge, Avatar } from "react-native-elements";

import { LocationContext } from "../../context/LocationContext";
import { ThemeContext } from "../../context/ThemeContext";

const LocationCard = ({ item, navigation }) => {
  const {
    location_name,
    avg_overall_rating,
    location_reviews,
    location_id,
    photo_path,
    distance,
  } = item;

  const { userLocation } = useContext(LocationContext);
  const { Theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Location", {
          location_id,
        })
      }
      style={{
        flexDirection: "column",
        paddingVertical: 2,
        paddingHorizontal: 5,
        margin: 5,
        maxWidth: Dimensions.get("window").width,
      }}
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
              value={`${(distance/1000).toFixed(1)}KM`}
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
    aspectRatio: 16 / 9,
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
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
