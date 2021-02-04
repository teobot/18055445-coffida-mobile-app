import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";

const LocationCard = ({ item, navigation }) => {
  const {
    location_name,
    avg_overall_rating,
    location_reviews,
    location_id,
    latitude,
  } = item;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Location", {
          location_id,
          title: location_name,
        })
      }
    >
      <View style={styles.container}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: `https://source.unsplash.com/250x120/?coffee,shop?sig=${location_id}${latitude}`,
          }}
        />
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
    width: "100%",
    minWidth: Dimensions.get("window").width * 0.5,
    height: 120,
    borderRadius: 5,
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    margin: 15,
  },
});

// const styles = StyleSheet.create({
//     imageStyle: {
//       width: 250,
//       height: 120,
//       borderRadius: 5,
//       marginBottom: 5,
//     },
//     name: {
//       fontWeight: "bold",
//       fontSize: 16,
//     },
//     container: {
//       marginHorizontal: 15,
//     },
//   });

export default withNavigation(LocationCard);

//   {
//     avg_clenliness_rating: 2.5,
//     avg_overall_rating: 3,
//     avg_price_rating: 3,
//     avg_quality_rating: 3,
//     latitude: 80,
//     location_id: 4,
//     location_name: "Ben's Diner",
//     location_reviews: [
//       {
//         likes: 3,
//         review_body: "Grim, and expensive",
//         review_clenlinessrating: 0,
//         review_id: 2,
//         review_location_id: 4,
//         review_overallrating: 1,
//         review_pricerating: 1,
//         review_qualityrating: 1,
//         review_user_id: 1,
//       },
//       {
//         likes: 0,
//         review_body: "Not sure what the problem is, I love it here",
//         review_clenlinessrating: 5,
//         review_id: 5,
//         review_location_id: 4,
//         review_overallrating: 5,
//         review_pricerating: 5,
//         review_qualityrating: 5,
//         review_user_id: 6,
//       },
//     ],
//     location_town: "London",
//     longitude: 0,
//     photo_path: "http://cdn.dummyphoto.com",
//   },
