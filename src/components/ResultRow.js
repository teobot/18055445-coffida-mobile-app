import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Divider } from "react-native-elements";

const ResultRow = ({
  title,
  children,
  style,
  containerPadding,
  containerMargin,
}) => {
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
        <Text style={{ fontSize: 26, fontWeight: "bold" }}>{title}</Text>
        {children}
      </View>
      <Divider />
    </View>
  );
};

export default ResultRow;
