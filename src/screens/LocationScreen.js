import React, { useEffect, useState, createRef } from "react";
import { View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";

import coffida from "../api/coffida";

import LoadingScreen from "../screens/LoadingScreen";

import ResultRow from "../components/ResultRow";
import ReviewCard from "../components/ReviewCard";
import LocationLikeButton from "../components/Location/LocationLikeButton";
import LocationQuickStats from "../components/Location/LocationQuickStats";
import LocationRatingStats from "../components/Location/LocationRatingStats";
import OwnUserReviewView from "../components/OwnUserReviewView";

import { Divider, Text } from "react-native-elements";

import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";

import LocationHelper from "../helpers/LocationHelper";
import CoffidaHelper from "../helpers/CoffidaHelper";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LocationScreen = ({ navigation }) => {
  const location_id = navigation.getParam("location_id");

  const [locationResult, setLocationResult] = useState(null);
  const [userInformation, setUserInformation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distanceToLocation, setDistanceToLocation] = useState(null);

  const googleMap = createRef();

  useEffect(() => {
    if (locationResult !== null) {
      GetUserLocation();
      GetDistanceToLocation();
    }
  }, [locationResult]);

  useEffect(() => {
    const subs = navigation.addListener("didFocus", (payload) => {
      UpdateInformation();
    });
    return () => {
      subs.remove();
    };
  }, []);

  const UpdateInformation = async () => {
    GetLocationInformation();
    GetUserInformation();
  };

  const GetUserLocation = async () => {
    const currentUserLocation = await LocationHelper.getLocation();
    setUserLocation(currentUserLocation);
  };

  const GetDistanceToLocation = async () => {
    const distance = await LocationHelper.getDistanceToCoords({
      lat: locationResult.latitude,
      long: locationResult.longitude,
    });
    setDistanceToLocation(distance);
  };

  const GetUserInformation = async () => {
    // Return the user information
    try {
      const userInformation = await CoffidaHelper.getUserInformation();
      setUserInformation(userInformation);
    } catch (error) {
      // TODO: error getting user information
    }
  };

  const GetLocationInformation = async () => {
    console.log("Location making call to get location information");
    try {
      const response = await coffida.get(`/location/${location_id}`);
      navigation.setParams({ title: response.data.location_name });
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
            region={{
              latitude: locationResult.latitude,
              longitude: locationResult.longitude,
              latitudeDelta: 0.15,
              longitudeDelta: 0.15,
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

            <Polyline
              coordinates={[
                {
                  latitude: userLocation !== null ? locationResult.latitude : 0,
                  longitude:
                    userLocation !== null ? locationResult.longitude : 0,
                },
                {
                  latitude:
                    userLocation !== null ? userLocation.coords.latitude : 0,
                  longitude:
                    userLocation !== null ? userLocation.coords.longitude : 0,
                },
              ]}
              strokeWidth={2}
            />
          </MapView>
          <View style={{ width: "100%", padding: 5 }}>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", alignSelf: "center", textDecorationLine: "underline" }}
            >
              {distanceToLocation !== null
                ? `You are ${(distanceToLocation / 1000).toFixed(
                    1
                  )}km away from ${locationResult.location_name}`
                : "Loading...."}
            </Text>
          </View>
          <Divider />

          <OwnUserReviewView
            user_information={userInformation}
            locationResult={locationResult}
          />

          <Divider />

          <ResultRow title="Reviews" containerMargin={5} containerPadding={5}>
            {locationResult.location_reviews.map((item) => (
              <ReviewCard
                key={item.review_id}
                user_information={userInformation}
                location_id={locationResult.location_id}
                review={item}
              />
            ))}
          </ResultRow>
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

LocationScreen.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam("title");
  if (title) {
    return {
      headerTitle: title,
    };
  } else {
    return null;
  }
};

export default withNavigation(LocationScreen);
