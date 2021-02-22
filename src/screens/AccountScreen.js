import React, { useState, useEffect, useContext } from "react";

// React element imports
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";

// Navigation imports
import { withNavigation } from "react-navigation";

// Custom component imports
import LoadingScreen from "../screens/LoadingScreen";
import ResultRow from "../components/ResultRow";
import ReviewCard from "../components/Review/ReviewCard";
import LocationCard from "../components/Location/LocationCard";
import CoffidaHelper from "../helpers/CoffidaHelper";

// Context imports
import { ThemeContext } from "../context/ThemeContext";
import { LocationContext } from "../context/LocationContext";
import { ToastContext } from "../context/ToastContext";

// Library imports
import { getDistance } from "geolib";

const capitalize = (s) => {
  // This function capsulizes the first characters of a string
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// Window dimension const
const windowHeight = Dimensions.get("window").height;

const AccountScreen = ({ navigation }) => {
  // This is the user account information screen

  // useState inits
  const [userInformation, setUserInformation] = useState(null);

  // Context inits
  const { userLocation } = useContext(LocationContext);
  const { Theme, ThemeTextColor, ThemeBackgroundColor } = useContext(
    ThemeContext
  );
  const { showBadInputToast } = useContext(ToastContext);

  useEffect(() => {
    // Add a didFocus listener to update the account information
    const subs = navigation.addListener("didFocus", (payload) => {
      updateUserInformation();
    });
    return () => {
      // Remove listener on unmount
      subs.remove();
    };
  }, []);

  const updateUserInformation = async () => {
    // This function handles the updating of the user information
    try {
      // Gather the user information
      let userData = await CoffidaHelper.getUserInformation();
      const { first_name } = userData;

      // Set navigation params
      navigation.setParams({ title: first_name });
      if (userLocation !== null) {
        // user location is valid,
        // We can give each location a distance to the user
        userData.favourite_locations.forEach((location) => {
          if (userLocation !== null) {
            // add the location distance
            location["distance"] = getDistance(
              {
                latitude: location.latitude,
                longitude: location.longitude,
              },
              {
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
              }
            );
          } else {
            location["distance"] = null;
          }
        });
      }
      setUserInformation(userData);
    } catch (error) {
      // : failed getting the user information, display error message here
      showBadInputToast({
        topMessage: "Networking issue",
        bottomMessage: "Please close the app and try again",
      });
    }
  };

  const userLikes = () => {
    // This calculates the amount of likes the user has
    let likes = 0;
    userInformation.reviews.forEach((review) => {
      likes = likes + review.review.likes;
    });
    return likes;
  };

  // I declare the styling here as I can interact with the context Theme props
  const styles = StyleSheet.create({
    statsViewContainer: {
      marginTop: 15,
      flexDirection: "row",
    },
    textStatStyle: {
      fontSize: 20,
      fontWeight: "bold",
      alignSelf: "center",
      ...ThemeTextColor,
    },
    subTextStatStyle: {
      fontSize: 13,
      color: "grey",
      alignSelf: "center",
      ...ThemeTextColor,
    },
    StatsTextViewContainer: {
      flex: 1,
      alignItems: "center",
    },
    mainContainerViewStyle: {
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      paddingTop: 60,
      ...ThemeBackgroundColor,
    },
    profileImageStyle: {
      height: 120,
      width: 115,
      alignSelf: "center",
      borderRadius: 10,
      marginTop: windowHeight * 0.15,
      bottom: -50,
      zIndex: 1,
    },
    UsernameTextStyle: {
      alignSelf: "center",
      fontSize: 28,
      fontWeight: "bold",
      ...ThemeTextColor,
    },
  });

  if (userInformation === null) {
    // Loading screen here as the user information is yet to return
    return <LoadingScreen message="Loading account information" />;
  }
  return (
    <ScrollView style={{ backgroundColor: "rgb(30,34,52)" }}>
      <Image
        style={styles.profileImageStyle}
        source={{
          uri: `https://source.unsplash.com/200x200/?person,profile`,
        }}
      />

      <View style={styles.mainContainerViewStyle}>
        <View style={{ backgroundColor: "transparent" }}>
          <Text style={styles.UsernameTextStyle}>{`${capitalize(
            userInformation.first_name
          )} ${capitalize(userInformation.last_name)}`}</Text>
        </View>

        <View style={styles.statsViewContainer}>
          <View style={styles.StatsTextViewContainer}>
            <Text style={styles.textStatStyle}>
              {userInformation.reviews.length}
            </Text>
            <Text style={styles.subTextStatStyle}>reviews</Text>
          </View>
          <View style={styles.StatsTextViewContainer}>
            <Text style={styles.textStatStyle}>{userLikes()}</Text>
            <Text style={styles.subTextStatStyle}>likes</Text>
          </View>
        </View>

        <View style={{ padding: 10, margin: 10 }}>
          <Button
            onPress={() =>
              navigation.navigate("UpdateUser", {
                userInformation,
              })
            }
            type="outline"
            title="Update Account"
          />
        </View>

        <ResultRow
          title="My Favorites"
          containerMargin={5}
          containerPadding={5}
        >
          <FlatList
            horizontal
            data={userInformation.favourite_locations}
            keyExtractor={(result) => `${result.location_id}`}
            renderItem={({ item }) => {
              return <LocationCard item={item} />;
            }}
          />
        </ResultRow>

        <ResultRow title="My Reviews" containerMargin={5} containerPadding={5}>
          {userInformation.reviews.map((item) => (
            <TouchableOpacity
              key={item.review.review_id}
              onPress={() =>
                navigation.navigate("Location", {
                  location_id: item.location.location_id,
                })
              }
            >
              <ReviewCard
                user_information={userInformation}
                location_id={item.location.location_id}
                review={item.review}
              />
            </TouchableOpacity>
          ))}
        </ResultRow>
      </View>
    </ScrollView>
  );
};

AccountScreen.navigationOptions = ({ navigation }) => {
  // Here I am setting the title of the navigation bar to the users name
  const name = navigation.getParam("title");
  if (name) {
    return {
      headerTitle: `Welcome, ${capitalize(name)}.`,
    };
  } else {
    return null;
  }
};

export default withNavigation(AccountScreen);
