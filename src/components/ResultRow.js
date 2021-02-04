import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Divider } from "react-native-elements";

const ResultRow = ({ title, data, keyExtractor, renderItem, style }) => {
  return (
    <View style={{ ...styles.containerStyle, ...style }}>
      <Divider />
      <View style={styles.resultRowContainer}>
        <Text style={{ fontSize: 26, fontWeight: "bold" }}>{title}</Text>
        <FlatList
          horizontal
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultRowContainer: {
    margin: 5,
    padding: 5,
    justifyContent: "center",
  },
  containerStyle: {
    margin: 10,
    padding: 10,
  },
});

export default ResultRow;
