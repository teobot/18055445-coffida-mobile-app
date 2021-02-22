import React, { useContext } from "react";

// React elements imports
import { View, StyleSheet } from "react-native";
import { Divider, Text } from "react-native-elements";

// Context imports
import { ThemeContext } from "../../context/ThemeContext";

const EndOfResultsView = ({ results }) => {
  // This component displays at the end of the list of results, returns "bottom of results" | "No results"

  const BOTTOM_OF_RESULTS_MESSAGE = "bottom of results";
  const NO_RESULTS_MESSAGE = "No results matched search";

  const { ThemeTextColor } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    ResultsText: {
      alignSelf: "center",
      ...ThemeTextColor,
    },
  });
  return (
    <View style={{ padding: 2, margin: 2 }}>
      <Divider />
      {results.length > 0 ? (
        <Text h4 style={styles.ResultsText}>
          {BOTTOM_OF_RESULTS_MESSAGE}
        </Text>
      ) : (
        <Text h4 style={styles.ResultsText}>
          {NO_RESULTS_MESSAGE}
        </Text>
      )}
    </View>
  );
};

export default EndOfResultsView;
