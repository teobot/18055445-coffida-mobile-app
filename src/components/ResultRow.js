import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Divider } from "react-native-elements";

const ResultRow = ({
  title,
  data,
  keyExtractor,
  renderItem,
  style,
  flatListHorizontal,
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
        <FlatList
          horizontal={flatListHorizontal}
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
      <Divider />
    </View>
  );
};

export default ResultRow;
