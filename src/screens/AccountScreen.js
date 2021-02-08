import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";

import { withNavigation } from "react-navigation";

import coffida from "../api/coffida";
import AuthenticationHelper from "../helpers/AuthenticationHelper";

import LoadingScreen from "../screens/LoadingScreen";
import ResultRow from "../components/ResultRow";
import ReviewCard from "../components/ReviewCard";
import LocationCard from "../components/LocationCard";
import CoffidaHelper from "../helpers/CoffidaHelper"

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AccountScreen = ({ navigation }) => {
  const [userInformation, setUserInformation] = useState(null);

  useEffect(() => {
    const subs = navigation.addListener("didFocus", (payload) => {
      updateUserInformation();
    });
    return () => {
      subs.remove();
    };
  }, []);

  const updateUserInformation = async () => {
    console.log("Get user information fired!");
    try {
      const userData = await CoffidaHelper.getUserInformation()
      const { first_name } = userData;
      navigation.setParams({ title: first_name });
      setUserInformation(userData);
    } catch (error) {
      // TODO: failed getting the user information, display error message here
    }
  };

  const userLikes = () => {
    let likes = 0;
    userInformation.reviews.forEach((review) => {
      likes = likes + review.review.likes;
    });
    return likes;
  };

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
          <Text
            style={{ alignSelf: "center", fontSize: 28, fontWeight: "bold" }}
          >{`${capitalize(userInformation.first_name)} ${capitalize(
            userInformation.last_name
          )}`}</Text>
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
        {/* <ResultRow
          title="My Reviews"
          containerMargin={5}
          containerPadding={5}
          flatListHorizontal={false}
          data={userInformation.reviews}
          keyExtractor={(review) => "" + review.review.review_id}
          renderItem={({ item }) => {
            return <ReviewCard review={item.review} />;
          }}
        /> */}
        <ResultRow
          title="My Favourites"
          containerMargin={5}
          containerPadding={5}
          flatListHorizontal={true}
          data={userInformation.favourite_locations}
          keyExtractor={(result) => `${result.location_id}`}
          renderItem={({ item }) => {
            return <LocationCard item={item} />;
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  statsViewContainer: {
    marginTop: 15,
    flexDirection: "row",
  },
  textStatStyle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  subTextStatStyle: {
    fontSize: 13,
    color: "grey",
    alignSelf: "center",
  },
  StatsTextViewContainer: {
    flex: 1,
    alignItems: "center",
  },
  mainContainerViewStyle: {
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 60,
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
});

AccountScreen.navigationOptions = ({ navigation }) => {
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
