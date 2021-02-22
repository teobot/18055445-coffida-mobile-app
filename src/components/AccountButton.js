import React, { useContext } from "react";

// React element imports
import { TouchableOpacity } from "react-native";

// Icon import
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Navigation import
import { withNavigation } from "react-navigation";

// Context import
import { ThemeContext } from "../context/ThemeContext";

const AccountButton = ({ navigation }) => {
  // This component handles the navigation to the account screen

  const goToAccount = () => {
    // This navigates the user to the account screen
    navigation.navigate("Account");
  };

  // Context init
  const { ThemeTextColor } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={goToAccount}>
      <MaterialCommunityIcons
        style={{ fontSize: 28, padding: 5, margin: 5, ...ThemeTextColor }}
        name="account"
      />
    </TouchableOpacity>
  );
};

export default withNavigation(AccountButton);
