import React, { useState, useEffect, useContext } from "react";

// React element imports
import { StyleSheet, TouchableOpacity } from "react-native";

// Icon import
import { AntDesign } from "@expo/vector-icons";

// Api import
import coffida from "../../api/coffida";

// Helper import
import AuthenticationHelper from "../../helpers/AuthenticationHelper";

// Context import
import { ToastContext } from "../../context/ToastContext";

const LocationLikeButton = ({ id }) => {
  // The is the location review button for liking a location

  // useState init
  const [favourited, setfavorited] = useState(false);
  const [loadedIfFavourited, setLoadedIfFavourited] = useState(false);

  // Context iit
  const { show500Toast, showBadInputToast } = useContext(ToastContext);

  useEffect(() => {
    // If the id of the location changes, check if the user has liked the new location
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
        // : error setting the favourite on the location
        showBadInputToast({
          topMessage: "Issue with Like",
          bottomMessage: "Liking location failed, try again later",
        });
      }
    } else {
      // User wants to remove the favourite on the location
      try {
        // Try to delete the favourite on location
        response = await coffida.delete(url_location);
      } catch (error) {
        // : error deleting the location favourite
        showBadInputToast({
          topMessage: "Issue with Like",
          bottomMessage: "Removing location like failed, try again later",
        });
      }
    }

    if (response.status === 200) {
      // The post or deletion was successful
    } else {
      // : Error on setting or deletion
      show500Toast("Like failed, please try again later");
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
      // : Error when getting the user id or the user information
      show500Toast("Network issue, please check internet connection");
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
