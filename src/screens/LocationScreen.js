import React, { useEffect, useState, createRef } from "react";
import { View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";

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
import CoffidaHelper from "../helpers/CoffidaHelper";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LocationScreen = ({ navigation }) => {
  const location_id = navigation.getParam("location_id");

  const [locationResult, setLocationResult] = useState(null);
  const [userInformation, setUserInformation] = useState(null);

  const googleMap = createRef();

  useEffect(() => {
    const subs = navigation.addListener("didFocus", (payload) => {
      UpdateInformation();
    });
    return () => {
      subs.remove();
    };
  }, []);

  const UpdateInformation = () => {
    GetLocationInformation();
    GetUserInformation();
    LocationHelper.getLocation();
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
