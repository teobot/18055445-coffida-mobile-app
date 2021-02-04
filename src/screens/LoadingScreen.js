import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import ClipLoader from "react-spinners/ClipLoader";
const LoadingScreen = ({message}) => {
  return (
    <View
      style={{
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={Dimensions.get("window").width * .5} color="#999999" />
      <Text>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoadingScreen;
