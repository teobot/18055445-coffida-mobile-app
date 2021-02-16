import React, { useContext, useState, useEffect } from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import CreateAccountScreen from "./src/screens/CreateAccountScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SearchScreen from "./src/screens/SearchScreen";
import LocationScreen from "./src/screens/LocationScreen";
import AccountScreen from "./src/screens/AccountScreen";
import LocationReviewScreen from "./src/screens/LocationReviewScreen";
import UpdateUserInformationScreen from "./src/screens/UpdateUserInformationScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

import SettingsButton from "./src/components/SettingsButton";
import AccountButton from "./src/components/AccountButton";

import { Provider as ThemeProvider } from "./src/context/ThemeContext";

const navigator = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: "Settings",
      },
    },
    UpdateUser: {
      screen: UpdateUserInformationScreen,
    },
    Review: {
      screen: LocationReviewScreen,
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: "Login",
      },
    },
    CreateAccount: CreateAccountScreen,
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: null,
        headerLeft: () => <AccountButton />,
        headerRight: () => <SettingsButton />,
      },
    },
    Location: {
      screen: LocationScreen,
      navigationOptions: {
        headerRight: () => <SettingsButton />,
      },
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        title: "Account Management",
        headerRight: () => <SettingsButton />,
      },
    },
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      title: "Coffida",
    },
  }
);
const AppContainer = createAppContainer(navigator);

const App = () => {
  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  );
};

export default App;
