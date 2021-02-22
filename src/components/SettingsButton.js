import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { withNavigation } from "react-navigation";
import { ThemeContext } from "../context/ThemeContext";

const SettingsScreen = ({ navigation }) => {
  const goToSettings = async () => {
    navigation.navigate("Settings");
  };
  const { Theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={goToSettings}>
      <MaterialIcons
        style={{
          fontSize: 28,
          padding: 5,
          margin: 5,
          color: Theme === "light" ? "#222222" : "whitesmoke",
        }}
        name="settings"
      />
    </TouchableOpacity>
  );
};

export default withNavigation(SettingsScreen);
