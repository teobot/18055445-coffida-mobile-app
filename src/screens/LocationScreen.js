import React, { useEffect, useState, useRef } from "react";
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
import LocationQuickStats from "../components/LocationQuickStats";
import LocationRatingStats from "../components/LocationRatingStats";
import OwnUserReviewView from "../components/OwnUserReviewView";

import { Divider } from "react-native-elements";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import LocationHelper from "../helpers/LocationHelper";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LocationScreen = ({ navigation }) => {
  const location_id = navigation.getParam("location_id");
  const [locationResult, setLocationResult] = useState(null);
  const googleMap = useRef(null);

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

      <View style={{ flex: 1 }}>
        <Image
          style={{ height: windowWidth * 1.1, width: windowWidth }}
          source={{
            uri: `https://source.unsplash.com/400x450/?coffee,shop?sig=${locationResult.location_id}`,
          }}
        />
        <LocationQuickStats
          styles={{ position: 0, bottom: 10, paddingHorizontal: 10 }}
          name={locationResult.location_name}
          rating={locationResult.avg_overall_rating}
          ratingTitle="Overall Rating"
        />
      </View>

      <View style={{ flex: 1, backgroundColor: "#e4e4e4" }}>
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: 10,
            top: -10,
            borderTopEndRadius: 15,
            borderTopStartRadius: 15,
          }}
        >
          <LocationRatingStats
            paddingSpace={12}
            ratingRows={[
              {
                title: "cleanliness",
                rating: locationResult.avg_clenliness_rating,
              },
              {
                title: "price",
                rating: locationResult.avg_price_rating,
              },
              {
                title: "quality",
                rating: locationResult.avg_quality_rating,
              },
            ]}
          />

          <Divider />
          <MapView
            ref={googleMap}
            provider={PROVIDER_GOOGLE}
            style={{ height: 300 }}
            showsUserLocation
            followsUserLocation
            region={{
              latitude: locationResult.latitude,
              longitude: locationResult.longitude,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}
          >
            <Marker
              key="1"
              coordinate={{
                latitude: locationResult.latitude,
                longitude: locationResult.longitude,
              }}
              title={locationResult.location_name}
            />
          </MapView>

          <Divider />

          <OwnUserReviewView
            containerMargin={5}
            containerPadding={5}
            locationReviews={locationResult.location_reviews}
          />

          <Divider />

          <ResultRow
            title="Reviews"
            containerMargin={5}
            containerPadding={5}
            flatListHorizontal={false}
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
