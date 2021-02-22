import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Divider } from "react-native-elements";
import { ThemeContext } from "../context/ThemeContext";

const ResultRow = ({
  title,
  children,
  style,
  containerPadding,
  containerMargin,
}) => {
  const { Theme } = useContext(ThemeContext);
  return (
    <View
      style={{
        ...style,
        margin: containerMargin,
        padding: containerPadding,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          margin: containerMargin,
          padding: containerPadding,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            color: Theme === "dark" ? "whitesmoke" : "#222222",
          }}
        >
          {title}
        </Text>
        {children}
      </View>
      <Divider />
    </View>
  );
};

export default ResultRow;
