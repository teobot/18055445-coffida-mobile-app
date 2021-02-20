import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import { Divider, Text } from "react-native-elements";
import { ThemeContext } from "../../context/ThemeContext";

const EndOfResultsView = ({ results }) => {
  const { Theme } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    ThemeTextColor: {
      color: Theme === "dark" ? "white" : "black",
    },
    ResultsText: {
      alignSelf: "center",
      color: Theme === "dark" ? "white" : "black",
    },
  });
  return (
    <View style={{ padding: 2, margin: 2 }}>
      <Divider />
      {results.length > 0 ? (
        <Text h4 style={styles.ResultsText}>
          bottom of results :)
        </Text>
      ) : (
        <Text h4 style={styles.ResultsText}>
          No results matched search!
        </Text>
      )}
    </View>
  );
};

export default EndOfResultsView;
