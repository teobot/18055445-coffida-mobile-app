import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { withNavigation } from "react-navigation";

import AuthenticationHelper from "../helpers/AuthenticationHelper";

const LogoutButton = ({ navigation }) => {
  const logout = async () => {
    await AuthenticationHelper.removeAccessToken();
    navigation.navigate("Login");
  };

  return (
    <TouchableOpacity onPress={() => logout()}>
      <MaterialCommunityIcons
        style={{ fontSize: 28, padding: 5, margin: 5, color: "black" }}
        name="logout"
      />
    </TouchableOpacity>
  );
};

export default withNavigation(LogoutButton);