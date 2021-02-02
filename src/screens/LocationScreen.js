import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { withNavigation } from "react-navigation";
import { AntDesign } from "@expo/vector-icons";
import { Rating, AirbnbRating } from "react-native-ratings";

import coffida from "../api/coffida";

const LocationScreen = ({ navigation }) => {
  const location_id = navigation.getParam("location_id");
  const [locationResult, setLocationResult] = useState(null);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    getLocationInformation(location_id);
  }, []);

  const getLocationInformation = async (id) => {
    try {
      const response = await coffida.get(`/location/${id}`);
      setLocationResult(response.data);
    } catch (error) {
      // TODO: error getting the location information
      console.log(error);
    }
  };

  if (locationResult === null) {
    //   TODO: return some kind of splash screen or loading
    return null;
  }

  return (
    <ScrollView>
      <Image
        style={{ height: windowWidth * 1.1, width: windowWidth }}
        source={{
          uri: `https://source.unsplash.com/400x450/?coffee,shop?sig=${locationResult.location_id}`,
        }}
      />
      <View style={{ flex: 1, backgroundColor: "#e4e4e4" }}>
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: 10,
            top: -10,
            borderTopEndRadius: 15,
            borderTopStartRadius: 15,
            height: windowHeight * 2,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: -90,
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 36,
                color: "white",
                textShadowColor: "rgba(0, 0, 0, 0.9)",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 20,
              }}
            >
              {locationResult.location_name}
            </Text>
            <Text style={{ fontSize: 22, color: "white" }}>
              <Rating
                minValue={0}
                startingValue={locationResult.avg_overall_rating}
                style={{ backgroundColor: "transparent" }}
                imageSize={25}
              />
            </Text>
          </View>
          <View
            style={{
              margin: 5,
              padding: 5,
              flexDirection: "row",
            }}
          >
            <View style={styles.locationStatsStyleContainer}>
              <Text style={styles.locationStatHeaderStyle}>
                {locationResult.avg_clenliness_rating}
                <AntDesign name="star" style={styles.starIconStyle} />
              </Text>
              <Text style={styles.locationStatSubTextStyle}>
                Cleanliness Rating
              </Text>
            </View>
            <View style={styles.locationStatsStyleContainer}>
              <Text style={styles.locationStatHeaderStyle}>
                {locationResult.avg_price_rating}
                <AntDesign name="star" style={styles.starIconStyle} />
              </Text>
              <Text style={styles.locationStatSubTextStyle}>Price Rating</Text>
            </View>
            <View style={styles.locationStatsStyleContainer}>
              <Text style={styles.locationStatHeaderStyle}>
                {locationResult.avg_quality_rating}
                <AntDesign name="star" style={styles.starIconStyle} />
              </Text>
              <Text style={styles.locationStatSubTextStyle}>
                Quality Rating
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  locationStatsStyleContainer: {
    flex: 1,
  },
  locationStatHeaderStyle: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    padding: 10,
  },
  locationStatSubTextStyle: {
    fontSize: 12,
    alignSelf: "center",
  },
  starIconStyle: {
    color: "gold",
    alignSelf: "center",
    fontSize: 20,
  },
});

LocationScreen.navigationOptions = (screenProps) => ({
  headerTitle: screenProps.navigation.getParam("title"),
});

export default withNavigation(LocationScreen);
