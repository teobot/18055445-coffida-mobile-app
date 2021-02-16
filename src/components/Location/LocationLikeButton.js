import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import coffida from "../../api/coffida";
import AuthenticationHelper from "../../helpers/AuthenticationHelper";

const LocationLikeButton = ({ id }) => {
  const [favourited, setfavorited] = useState(false);
  const [loadedIfFavourited, setLoadedIfFavourited] = useState(false);

  useEffect(() => {
    checkUserLikedLocation();
  }, [id]);

  const favoriteLocation = async () => {
    // This function sets the users favourite location
    const payload = !favourited;
    const url_location = `location/${id}/favourite`;
    let response = null;

    // Here I assume the request will succeed so preemptively set the display,
    // If the functions returns a error I will warn the user and revert the changes
    setfavorited(payload);

    if (payload) {
      // User wants to favourite the location
      try {
        // try to favourite the location
        response = await coffida.post(url_location);
      } catch (error) {
        // TODO: error setting the favourite on the location
        console.log(error);
      }
    } else {
      // User wants to remove the favourite on the location
      try {
        // Try to delete the favourite on location
        response = await coffida.delete(url_location);
      } catch (error) {
        // TODO: error deleting the location favourite
        console.log(error);
      }
    }

    if (response.status === 200) {
      // The post or deletion was successful
      console.log(`The user ${payload ? "favourited" : "deleted the favourite on"} location ${id}.`);
    } else {
      // TODO: Error on setting or deletion
      setfavorited(favourited);
    }
  };

  const checkUserLikedLocation = async () => {
    // This function checks if the user has favourited the location
    try {
      const user_id = await AuthenticationHelper.id_Reducer({ type: "get_id" });
      const user_information = await coffida.get("/user/" + user_id);
      const favourited_locations = user_information.data.favourite_locations;

      for (var i = 0; i < favourited_locations.length; ++i) {
        var location = favourited_locations[i];
        if (location.location_id === id) {
          setfavorited(true);
          break;
        }
      }
      setLoadedIfFavourited(true);
    } catch (error) {
      // TODO: Error when getting the user id or the user information
      console.log(error);
    }
  };

  if (loadedIfFavourited) {
    return (
      <TouchableOpacity
        onPress={() => favoriteLocation()}
        style={{ position: "absolute", top: 5, right: 5, zIndex: 5 }}
      >
        <AntDesign
          name={favourited ? "heart" : "hearto"}
          size={45}
          color="red"
        />
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({});

export default LocationLikeButton;
