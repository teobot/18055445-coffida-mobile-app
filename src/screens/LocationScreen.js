import React, { useEffect, useState, createRef, useContext } from "react";

// React element imports
import { View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import { Divider, Text } from "react-native-elements";

// Api imports
import coffida from "../api/coffida";

// Custom Component imports
import LoadingScreen from "../screens/LoadingScreen";
import ResultRow from "../components/ResultRow";
import ReviewCard from "../components/Review/ReviewCard";
import LocationLikeButton from "../components/Location/LocationLikeButton";
import LocationQuickStats from "../components/Location/LocationQuickStats";
import LocationRatingStats from "../components/Location/LocationRatingStats";
import OwnUserReviewView from "../components/Review/OwnUserReviewView";

// Library imports
import { getDistance } from "geolib";

// React native maps imports
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";

// Helper imports
import CoffidaHelper from "../helpers/CoffidaHelper";

// Context imports
import { ThemeContext } from "../context/ThemeContext";
import { LocationContext } from "../context/LocationContext";
import { ToastContext } from "../context/ToastContext";

// Device dimension const
const windowWidth = Dimensions.get("window").width;

const LocationScreen = ({ navigation }) => {
  // This screen is a location information display
  // It displays the information on the selected location

  // state and const initialization
  const location_id = navigation.getParam("location_id");
  const [locationResult, setLocationResult] = useState(null);
  const [userInformation, setUserInformation] = useState(null);

  // Context import
  const { userLocation } = useContext(LocationContext);
  const { Theme, ThemeBackgroundColor } = useContext(
    ThemeContext
  );
  const { show500Toast } = useContext(ToastContext);

  // Google map reference
  const googleMap = createRef();

  useEffect(() => {
    // Init the didFocus listener for updating the location information
    const subs = navigation.addListener("didFocus", (payload) => {
      UpdateInformation();
    });
    return () => {
      subs.remove();
    };
  }, []);

  const UpdateInformation = async () => {
    // This functions calls all the required functions to re render on useEffect
    GetLocationInformation();
    GetUserInformation();
  };

  const GetUserInformation = async () => {
    // This function handles the gathering of the user information
    try {
      const userInformation = await CoffidaHelper.getUserInformation();
      setUserInformation(userInformation);
    } catch (error) {
      // : error getting user information
      show500Toast("Please close the app and try again");
    }
  };

  const GetLocationInformation = async () => {
    // This function handles the rendering of the location information
    try {
      const response = await coffida.get(`/location/${location_id}`);
      navigation.setParams({ title: response.data.location_name });
      setLocationResult(response.data);
    } catch (error) {
      // : error getting the location information
      show500Toast("Please close the app and try again");
    }
  };

  if (locationResult === null) {
    // Location data is yet to return
    // : return splash or loading screen
    return <LoadingScreen message="Gathering location information" />;
  }

  return (
    <ScrollView>
      <LocationLikeButton id={location_id} />

      <View style={{ flex: 1 }}>
        <Image
          style={{ height: windowWidth * 1.1, width: windowWidth }}
          source={{
            uri: locationResult.photo_path,
          }}
        />
        <LocationQuickStats
          styles={styles.LocationQuickStatStyle}
          name={locationResult.location_name}
          rating={locationResult.avg_overall_rating}
          ratingTitle="Overall Rating"
        />
      </View>

      <View
        style={{
          flex: 1,
          ThemeBackgroundColor,
        }}
      >
        <View
          style={{
            backgroundColor: Theme === "light" ? "white" : "#222222",
            ...styles.LocationRatingContainerStyle,
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
              coordinates={
                userLocation !== null
                  ? [
                      {
                        latitude: locationResult.latitude,
                        longitude: locationResult.longitude,
                      },
                      {
                        latitude: userLocation.coords.latitude,
                        longitude: userLocation.coords.longitude,
                      },
                    ]
                  : null
              }
              strokeWidth={2}
            />
          </MapView>
          <View style={{ width: "100%", padding: 5 }}>
            <Text style={styles.UserDistanceViewStyle}>
              {userLocation !== null
                ? `You are ${`${(
                    getDistance(
                      {
                        latitude: userLocation.coords.latitude,
                        longitude: userLocation.coords.longitude,
                      },
                      {
                        latitude: locationResult.latitude,
                        longitude: locationResult.longitude,
                      }
                    ) / 1000
                  ).toFixed(1)}KM`} away from ${locationResult.location_name}`
                : null}
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
  LocationRatingContainerStyle: {
    marginHorizontal: 10,
    top: -10,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
  },
  UserDistanceViewStyle: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
    textDecorationLine: "underline",
  },
  LocationQuickStatStyle: {
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 10,
  },
});

LocationScreen.navigationOptions = ({ navigation }) => {
  // This handles the changing of the navigation title to the location name
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
