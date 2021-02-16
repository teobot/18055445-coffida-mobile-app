import React from "react";
import { View, StyleSheet } from "react-native";

import ThemeController from "../components/Settings/ThemeController";
import LogoutController from "../components/Settings/LogoutController";

const options = [<ThemeController key="ThemeController" />];

const actions = [<LogoutController key="LogoutController" />];

const SettingsScreen = () => {
  return (
    <View>
      <View style={styles.listContainerStyle}>
        {options.map((optionComponent) => optionComponent)}
      </View>

      <View style={styles.listContainerStyle}>
        {actions.map((actionComponent) => actionComponent)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainerStyle: {
    marginBottom: 20,
  },
});

export default SettingsScreen;
