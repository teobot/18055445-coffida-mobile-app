import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
const LoadingScreen = ({ message }) => {
  const { Theme } = useContext(ThemeContext);
  return (
    <View
      style={{
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Theme === "light" ? "white" : "#222222",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        size={Dimensions.get("window").width * 0.5}
        color="#999999"
      />
      <Text style={{ color: Theme === "light" ? "#222222" : "white" }}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoadingScreen;
