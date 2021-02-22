import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { withNavigation } from "react-navigation";
import { ThemeContext } from "../context/ThemeContext";

const AccountButton = ({ navigation }) => {
  const goToAccount = () => {
    navigation.navigate("Account");
  };
  const { Theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={goToAccount}>
      <MaterialCommunityIcons
        style={{ fontSize: 28, padding: 5, margin: 5, color: Theme === "light" ? "#222222" : "whitesmoke" }}
        name="account"
      />
    </TouchableOpacity>
  );
};

export default withNavigation(AccountButton);
