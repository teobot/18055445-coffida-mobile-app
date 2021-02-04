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

import coffida from "../api/coffida";

import LoadingScreen from "../screens/LoadingScreen";

import ResultRow from "../components/ResultRow";
import ReviewCard from "../components/ReviewCard";
import LocationLikeButton from "../components/LocationLikeButton";

import { Divider } from "react-native-elements";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// "location_reviews": Array [
//   Object {
//     "clenliness_rating": 4,
//     "likes": 2,
//     "overall_rating": 4,
//     "price_rating": 5,
//     "quality_rating": 3,
//     "review_body": "Great atomosphere, great coffee",
//     "review_id": 1,
//   },
//   Object {
//     "clenliness_rating": 3,
//     "likes": 2,
//     "overall_rating": 3,
//     "price_rating": 3,
//     "quality_rating": 3,
//     "review_body": "Not as good now that they've upped their prices",
//     "review_id": 3,
//   },
//   Object {
//     "clenliness_rating": 4,
//     "likes": 1,
//     "overall_rating": 4,
//     "price_rating": 5,
//     "quality_rating": 3,
//     "review_body": "Great atomosphere, great coffee",
//     "review_id": 7,
//   },
// ],

const LocationScreen = ({ navigation }) => {
  const location_id = navigation.getParam("location_id");
  const [locationResult, setLocationResult] = useState(null);

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
    // Location data is yet to return
    // TODO: return some kind of splash screen or loading
    return <LoadingScreen message="Gathering location information" />;
  }

  return (
    <ScrollView>
      <LocationLikeButton id={location_id} />

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
              top: -110,
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 36,
                color: "white",
                ...styles.textShadow,
              }}
            >
              {locationResult.location_name}
            </Text>

            <View style={{ flexDirection: "row", flex: 1 }}>
              <AntDesign
                name="star"
                style={{ color: "gold", fontSize: 40, alignSelf: "center" }}
              />
              <View
                style={{
                  marginHorizontal: 2,
                  paddingHorizontal: 2,
                  justifyContent: "center",
                  alignSelf: "center",
                  ...styles.textShadow,
                }}
              >
                <Text style={{ fontSize: 14, color: "white" }}>
                  Overall Rating
                </Text>
                <Text style={{ fontSize: 22, color: "white" }}>
                  {locationResult.avg_overall_rating !== null
                    ? locationResult.avg_overall_rating.toFixed(1)
                    : 0}
                </Text>
              </View>
            </View>
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
                {locationResult.avg_clenliness_rating !== null
                  ? locationResult.avg_clenliness_rating.toFixed(1)
                  : 0}
                <AntDesign name="star" style={styles.starIconStyle} />
              </Text>
              <Text style={styles.locationStatSubTextStyle}>
                Cleanliness Rating
              </Text>
            </View>
            <View style={styles.locationStatsStyleContainer}>
              <Text style={styles.locationStatHeaderStyle}>
                {locationResult.avg_price_rating !== null
                  ? locationResult.avg_price_rating.toFixed(1)
                  : 0}
                <AntDesign name="star" style={styles.starIconStyle} />
              </Text>
              <Text style={styles.locationStatSubTextStyle}>Price Rating</Text>
            </View>
            <View style={styles.locationStatsStyleContainer}>
              <Text style={styles.locationStatHeaderStyle}>
                {locationResult.avg_quality_rating !== null
                  ? locationResult.avg_quality_rating.toFixed(1)
                  : "?"}
                <AntDesign name="star" style={styles.starIconStyle} />
              </Text>
              <Text style={styles.locationStatSubTextStyle}>
                Quality Rating
              </Text>
            </View>
          </View>

          <Divider />

          <ResultRow
            title="Reviews"
            data={locationResult.location_reviews}
            renderItem={({ item }) => <ReviewCard review={item} />}
            keyExtractor={(result) => "" + result.review_id}
          />
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
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
  },
});

LocationScreen.navigationOptions = (screenProps) => ({
  headerTitle: screenProps.navigation.getParam("title"),
});

export default withNavigation(LocationScreen);
