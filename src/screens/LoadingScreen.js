import React, { useContext } from "react";

// React element imports
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";

// Context imports
import { ThemeContext } from "../context/ThemeContext";

const LoadingScreen = ({ message }) => {
  // This is the loading screen
  const { ThemeTextColor, ThemeBackgroundColor } = useContext(ThemeContext);
  return (
    <View
      style={{
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        ...ThemeBackgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        size={Dimensions.get("window").width * 0.5}
        color="#999999"
      />
      <Text style={ThemeTextColor}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoadingScreen;
