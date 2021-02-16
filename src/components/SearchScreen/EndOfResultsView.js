import React from "react";
import { View, StyleSheet } from "react-native";

import { Divider, Text } from "react-native-elements";

const EndOfResultsView = () => {
  return (
    <View style={{padding: 2, margin: 2,}}>
      <Divider />
      <Text style={{ fontSize: 14, alignSelf: "center" }}>bottom of results :)</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EndOfResultsView;
