import React, { useContext } from "react";

// React element imports
import { View } from "react-native";
import { Text } from "react-native-elements";

// Context imports
import { ThemeContext } from "../../context/ThemeContext";

const NoResultsView = ({ message }) => {
  // This component displays no results to the user
  const { ThemeTextColor } = useContext(ThemeContext);
  return (
    <View style={{ paddingVertical: 5 }}>
      <Text style={ThemeTextColor}>No {message}</Text>
    </View>
  );
};

export default NoResultsView;
