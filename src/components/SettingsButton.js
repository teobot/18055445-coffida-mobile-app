import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { withNavigation } from "react-navigation";

const SettingsScreen = ({ navigation }) => {
  const goToSettings = async () => {
    navigation.navigate("Settings");
  };

  return (
    <TouchableOpacity onPress={goToSettings}>
      <MaterialIcons
        style={{ fontSize: 28, padding: 5, margin: 5, color: "black" }}
        name="settings"
      />
    </TouchableOpacity>
  );
};

export default withNavigation(SettingsScreen);
