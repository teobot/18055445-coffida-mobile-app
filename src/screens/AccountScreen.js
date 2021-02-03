import React, { useState, useEffect } from "react";
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

import coffida from "../api/coffida";

import AuthenticationHelper from "../helpers/AuthenticationHelper";

import { withNavigation } from "react-navigation";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AccountScreen = ({ navigation }) => {
  const [userInformation, setUserInformation] = useState(null);

  useEffect(() => {
    getUserInformation();
  }, []);

  const getUserInformation = async () => {
    try {
      const user_id = await AuthenticationHelper.id_Reducer({ type: "get_id" });
      const response = await coffida.get(`/user/${user_id}`);
      const { first_name } = response.data;
      navigation.setParams({ title: first_name });

      setUserInformation(response.data);
    } catch (error) {}
  };

  const userLikes = () => {
    let likes = 0;
    userInformation.reviews.forEach(review => {
      likes = likes + review.review.likes;
    });
    return likes;
  }

  if (userInformation === null) {
    // TODO: Loading screen here as the user information is yet to return
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "lightgrey",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>LOADING...</Text>
      </View>
    );
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
            <Text style={styles.textStatStyle}>{userInformation.reviews.length}</Text>
            <Text style={styles.subTextStatStyle}>reviews</Text>
          </View>
          <View style={styles.StatsTextViewContainer}>
            <Text style={styles.textStatStyle}>{userLikes()}</Text>
            <Text style={styles.subTextStatStyle}>likes</Text>
          </View>
        </View>

        <View style={{height: windowHeight * 0.4, marginVertical: 15, borderColor: "lightgrey", borderTopWidth: 1, marginHorizontal: 15, paddingVertical: 10}}>
            <Text style={{fontSize: 26, fontWeight: "bold"}}>Reviews</Text>
        </View>


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
    height: windowHeight * 2,
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
// {
//   "email": "bashley.williams@mmu.ac.uk",
//   "first_name": "bashley",
//   "last_name": "Williams",
//   "user_id": 13,
//   "liked_reviews": Array [],
//   "reviews": Array [
//     Object {
//       "location": Object {
//         "avg_clenliness_rating": 3,
//         "avg_overall_rating": 3,
//         "avg_price_rating": 3,
//         "avg_quality_rating": 3,
//         "latitude": 80,
//         "location_id": 3,
//         "location_name": "Mary's",
//         "location_town": "London",
//         "longitude": 0,
//         "photo_path": "http://cdn.dummyphoto.com",
//       },
//       "review": Object {
//         "clenliness_rating": 3,
//         "likes": 0,
//         "overall_rating": 3,
//         "price_rating": 3,
//         "quality_rating": 3,
//         "review_body": "Not as good now that they've upped their prices",
//         "review_id": 9,
//       },
//     },
//   ],
//   "favourite_locations": Array [
//     Object {
//       "avg_clenliness_rating": 2,
//       "avg_overall_rating": 2.5,
//       "avg_price_rating": 3,
//       "avg_quality_rating": 2,
//       "latitude": 80,
//       "location_id": 2,
//       "location_name": "Coffee",
//       "location_reviews": Array [
//         Object {
//           "likes": 0,
//           "review_body": "I like the coffee",
//           "review_clenlinessrating": 4,
//           "review_id": 4,
//           "review_location_id": 2,
//           "review_overallrating": 4,
//           "review_pricerating": 5,
//           "review_qualityrating": 3,
//           "review_user_id": 3,
//         },
//       ],
//       "location_town": "Manchester",
//       "longitude": 0,
//       "photo_path": "http://cdn.dummyphoto.com",
//     },
//   ],
// }

// {
//   "email": "bashley.williams@mmu.ac.uk",
//   "favourite_locations": Array [
//     Object {
//       "avg_clenliness_rating": 2,
//       "avg_overall_rating": 2.5,
//       "avg_price_rating": 3,
//       "avg_quality_rating": 2,
//       "latitude": 80,
//       "location_id": 2,
//       "location_name": "Coffee",
//       "location_reviews": Array [
//         Object {
//           "likes": 0,
//           "review_body": "I like the coffee",
//           "review_clenlinessrating": 4,
//           "review_id": 4,
//           "review_location_id": 2,
//           "review_overallrating": 4,
//           "review_pricerating": 5,
//           "review_qualityrating": 3,
//           "review_user_id": 3,
//         },
//         Object {
//           "likes": 0,
//           "review_body": "Grim, and expensive",
//           "review_clenlinessrating": 0,
//           "review_id": 8,
//           "review_location_id": 2,
//           "review_overallrating": 1,
//           "review_pricerating": 1,
//           "review_qualityrating": 1,
//           "review_user_id": 13,
//         },
//       ],
//       "location_town": "Manchester",
//       "longitude": 0,
//       "photo_path": "http://cdn.dummyphoto.com",
//     },
//     Object {
//       "avg_clenliness_rating": 3.6667,
//       "avg_overall_rating": 3.6667,
//       "avg_price_rating": 4.3333,
//       "avg_quality_rating": 3,
//       "latitude": 80,
//       "location_id": 1,
//       "location_name": "Just Coffee",
//       "location_reviews": Array [
//         Object {
//           "likes": 2,
//           "review_body": "Great atomosphere, great coffee",
//           "review_clenlinessrating": 4,
//           "review_id": 1,
//           "review_location_id": 1,
//           "review_overallrating": 4,
//           "review_pricerating": 5,
//           "review_qualityrating": 3,
//           "review_user_id": 1,
//         },
//         Object {
//           "likes": 2,
//           "review_body": "Not as good now that they've upped their prices",
//           "review_clenlinessrating": 3,
//           "review_id": 3,
//           "review_location_id": 1,
//           "review_overallrating": 3,
//           "review_pricerating": 3,
//           "review_qualityrating": 3,
//           "review_user_id": 1,
//         },
//         Object {
//           "likes": 0,
//           "review_body": "Great atomosphere, great coffee",
//           "review_clenlinessrating": 4,
//           "review_id": 7,
//           "review_location_id": 1,
//           "review_overallrating": 4,
//           "review_pricerating": 5,
//           "review_qualityrating": 3,
//           "review_user_id": 13,
//         },
//       ],
//       "location_town": "London",
//       "longitude": 0,
//       "photo_path": "http://cdn.dummyphoto.com",
//     },
//     Object {
//       "avg_clenliness_rating": 3,
//       "avg_overall_rating": 3,
//       "avg_price_rating": 3,
//       "avg_quality_rating": 3,
//       "latitude": 80,
//       "location_id": 3,
//       "location_name": "Mary's",
//       "location_reviews": Array [
//         Object {
//           "likes": 0,
//           "review_body": "Not as good now that they've upped their prices",
//           "review_clenlinessrating": 3,
//           "review_id": 9,
//           "review_location_id": 3,
//           "review_overallrating": 3,
//           "review_pricerating": 3,
//           "review_qualityrating": 3,
//           "review_user_id": 13,
//         },
//       ],
//       "location_town": "London",
//       "longitude": 0,
//       "photo_path": "http://cdn.dummyphoto.com",
//     },
//     Object {
//       "avg_clenliness_rating": 3,
//       "avg_overall_rating": 3.3333,
//       "avg_price_rating": 3.6667,
//       "avg_quality_rating": 3,
//       "latitude": 80,
//       "location_id": 4,
//       "location_name": "Ben's Diner",
//       "location_reviews": Array [
//         Object {
//           "likes": 3,
//           "review_body": "Grim, and expensive",
//           "review_clenlinessrating": 0,
//           "review_id": 2,
//           "review_location_id": 4,
//           "review_overallrating": 1,
//           "review_pricerating": 1,
//           "review_qualityrating": 1,
//           "review_user_id": 1,
//         },
//         Object {
//           "likes": 0,
//           "review_body": "Not sure what the problem is, I love it here",
//           "review_clenlinessrating": 5,
//           "review_id": 5,
//           "review_location_id": 4,
//           "review_overallrating": 5,
//           "review_pricerating": 5,
//           "review_qualityrating": 5,
//           "review_user_id": 6,
//         },
//         Object {
//           "likes": 0,
//           "review_body": "I like the coffee",
//           "review_clenlinessrating": 4,
//           "review_id": 10,
//           "review_location_id": 4,
//           "review_overallrating": 4,
//           "review_pricerating": 5,
//           "review_qualityrating": 3,
//           "review_user_id": 13,
//         },
//       ],
//       "location_town": "London",
//       "longitude": 0,
//       "photo_path": "http://cdn.dummyphoto.com",
//     },
//   ],
//   "first_name": "bashley",
//   "last_name": "Williams",
//   "liked_reviews": Array [],
//   "reviews": Array [
//     Object {
//       "location": Object {
//         "avg_clenliness_rating": 3,
//         "avg_overall_rating": 3,
//         "avg_price_rating": 3,
//         "avg_quality_rating": 3,
//         "latitude": 80,
//         "location_id": 3,
//         "location_name": "Mary's",
//         "location_town": "London",
//         "longitude": 0,
//         "photo_path": "http://cdn.dummyphoto.com",
//       },
//       "review": Object {
//         "clenliness_rating": 3,
//         "likes": 0,
//         "overall_rating": 3,
//         "price_rating": 3,
//         "quality_rating": 3,
//         "review_body": "Not as good now that they've upped their prices",
//         "review_id": 9,
//       },
//     },
//     Object {
//       "location": Object {
//         "avg_clenliness_rating": 4.5,
//         "avg_overall_rating": 4.5,
//         "avg_price_rating": 5,
//         "avg_quality_rating": 4,
//         "latitude": 80,
//         "location_id": 5,
//         "location_name": "Just Coffee",
//         "location_town": "Manchester",
//         "longitude": 0,
//         "photo_path": "http://cdn.dummyphoto.com",
//       },
//       "review": Object {
//         "clenliness_rating": 5,
//         "likes": 0,
//         "overall_rating": 5,
//         "price_rating": 5,
//         "quality_rating": 5,
//         "review_body": "Not sure what the problem is, I love it here",
//         "review_id": 11,
//       },
//     },
//     Object {
//       "location": Object {
//         "avg_clenliness_rating": 3,
//         "avg_overall_rating": 3.3333,
//         "avg_price_rating": 3.6667,
//         "avg_quality_rating": 3,
//         "latitude": 80,
//         "location_id": 4,
//         "location_name": "Ben's Diner",
//         "location_town": "London",
//         "longitude": 0,
//         "photo_path": "http://cdn.dummyphoto.com",
//       },
//       "review": Object {
//         "clenliness_rating": 4,
//         "likes": 0,
//         "overall_rating": 4,
//         "price_rating": 5,
//         "quality_rating": 3,
//         "review_body": "I like the coffee",
//         "review_id": 10,
//       },
//     },
//     Object {
//       "location": Object {
//         "avg_clenliness_rating": 4,
//         "avg_overall_rating": 4,
//         "avg_price_rating": 5,
//         "avg_quality_rating": 3,
//         "latitude": 53.480759,
//         "location_id": 6,
//         "location_name": "Better Beans",
//         "location_town": "Manchester",
//         "longitude": -2.242633,
//         "photo_path": "http://cdn.dummyphoto.com",
//       },
//       "review": Object {
//         "clenliness_rating": 4,
//         "likes": 0,
//         "overall_rating": 4,
//         "price_rating": 5,
//         "quality_rating": 3,
//         "review_body": "Service needs work, but always tastes alright",
//         "review_id": 12,
//       },
//     },
//     Object {
//       "location": Object {
//         "avg_clenliness_rating": 3.6667,
//         "avg_overall_rating": 3.6667,
//         "avg_price_rating": 4.3333,
//         "avg_quality_rating": 3,
//         "latitude": 80,
//         "location_id": 1,
//         "location_name": "Just Coffee",
//         "location_town": "London",
//         "longitude": 0,
//         "photo_path": "http://cdn.dummyphoto.com",
//       },
//       "review": Object {
//         "clenliness_rating": 4,
//         "likes": 0,
//         "overall_rating": 4,
//         "price_rating": 5,
//         "quality_rating": 3,
//         "review_body": "Great atomosphere, great coffee",
//         "review_id": 7,
//       },
//     },
//     Object {
//       "location": Object {
//         "avg_clenliness_rating": 2,
//         "avg_overall_rating": 2.5,
//         "avg_price_rating": 3,
//         "avg_quality_rating": 2,
//         "latitude": 80,
//         "location_id": 2,
//         "location_name": "Coffee",
//         "location_town": "Manchester",
//         "longitude": 0,
//         "photo_path": "http://cdn.dummyphoto.com",
//       },
//       "review": Object {
//         "clenliness_rating": 0,
//         "likes": 0,
//         "overall_rating": 1,
//         "price_rating": 1,
//         "quality_rating": 1,
//         "review_body": "Grim, and expensive",
//         "review_id": 8,
//       },
//     },
//   ],
//   "user_id": 13,
// }
