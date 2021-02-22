import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Button, Overlay } from "react-native-elements";

import { ToastContext } from "../context/ToastContext";
import { ThemeContext } from "../context/ThemeContext";

import coffida from "../api/coffida";

const DeleteReview = ({ navigation }) => {
  const location_id = navigation.state.params.locationId;
  const review_id = navigation.state.params.userReview.review_id;
  const { show404Toast, show500Toast, show200Toast } = useContext(ToastContext);
  const [overlay, setOverlay] = useState(false);
  const { Theme } = useContext(ThemeContext);

  const handleReviewDelete = async () => {
    // Handle the deletion of the review
    try {
      const response = await coffida.delete(
        `/location/${location_id}/review/${review_id}`
      );
      if (response.status === 200) {
        // Deletion was successful
        show200Toast("Review has been deleted");
        navigation.navigate("Location", {
          location_id,
        });
      } else {
        // : Deletion of the review has failed
        show404Toast("Review could not be deleted");
      }
    } catch (error) {
      // : Deletion of the review networking has failed
      show500Toast("Review could not be deleted");
    }
  };
  return (
    <TouchableOpacity style={{ padding: 10 }} onPress={() => setOverlay(true)}>
      <Overlay isVisible={overlay}>
        <View style={{ padding: 5, margin: 5 }}>
          <View>
            <Text>Are you sure you want to delete your review?</Text>
          </View>
          <View style={{ padding: 5, margin: 5, flexDirection: "row" }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Button
                raised
                buttonStyle={styles.buttonStyle}
                type="outline"
                title="yes"
                onPress={handleReviewDelete}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Button
                buttonStyle={styles.buttonStyle}
                onPress={() => setOverlay(false)}
                type="outline"
                title="no"
                raised
              />
            </View>
          </View>
        </View>
      </Overlay>
      <MaterialCommunityIcons
        name="delete-forever"
        size={36}
        color={Theme === "light" ? "#222222" : "whitesmoke"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 18,
    borderColor: "black",
    borderWidth: 2,
    padding: 5,
    margin: 5,
  },
  buttonStyle: {
    padding: 5,
    width: 100,
    color: "red",
  },
});

export default DeleteReview;
