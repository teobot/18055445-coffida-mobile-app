import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { withNavigation } from "react-navigation";

const AccountButton = ({ navigation }) => {
  const goToAccount = () => {
    navigation.navigate("Account");
  };

  return (
    <TouchableOpacity onPress={goToAccount}>
      <MaterialCommunityIcons
        style={{ fontSize: 28, padding: 5, margin: 5, color: "black" }}
        name="account"
      />
    </TouchableOpacity>
  );
};

export default withNavigation(AccountButton);
