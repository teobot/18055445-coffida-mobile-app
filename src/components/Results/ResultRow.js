import React, { useContext } from "react";

// React element imports
import { View, Text } from "react-native";
import { Divider } from "react-native-elements";

// Context import
import { ThemeContext } from "../../context/ThemeContext";

const ResultRow = ({
  title,
  children,
  style,
  containerPadding,
  containerMargin,
}) => {
  // This is a result row, for displaying reviews and favourite locations to the user
  const { ThemeTextColor } = useContext(ThemeContext);
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
            ...ThemeTextColor,
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
