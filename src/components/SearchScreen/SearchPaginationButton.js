import React from "react";

// React element imports
import { View } from "react-native";
import { Button } from "react-native-elements";

const SearchPaginationButton = ({ state, results, dispatcher }) => {
  // This is the search pagination component button to control gathering more or less results
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        margin: 10,
        padding: 10,
      }}
    >
      {
        // Offset is more than 0, so the user can go back to previous results
        state.offset > 0 ? (
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => dispatcher({ type: "decrease_offset" })}
              type="outline"
              title="go back"
            />
          </View>
        ) : null
      }
      {results.length === state.limit ? (
        // There are less results then the limit,
        // this means that there are no more results after the current
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => dispatcher({ type: "increase_offset" })}
            type="outline"
            title="Load more results"
          />
        </View>
      ) : null}
    </View>
  );
};

export default SearchPaginationButton;
