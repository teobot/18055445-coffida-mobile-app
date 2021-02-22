import React, { useContext } from "react";

// React element imports
import { TouchableOpacity } from "react-native";

// Icon import
import { MaterialIcons } from "@expo/vector-icons";

// Navigation import
import { withNavigation } from "react-navigation";

// Context import
import { ThemeContext } from "../context/ThemeContext";

const SettingsButton = ({ navigation }) => {
  // This is the settings button and navigates the user to the settings screen onClick

  const goToSettings = async () => {
    // Navigate the user to the settings screen
    navigation.navigate("Settings");
  };

  // init the Theme context
  const { ThemeTextColor } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={goToSettings}>
      <MaterialIcons
        style={{
          fontSize: 28,
          padding: 5,
          margin: 5,
          ...ThemeTextColor,
        }}
        name="settings"
      />
    </TouchableOpacity>
  );
};

export default withNavigation(SettingsButton);
