import React from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import CreateAccountScreen from "./src/screens/CreateAccountScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SearchScreen from "./src/screens/SearchScreen";
import LocationScreen from "./src/screens/LocationScreen";

import LogoutButton from "./src/components/LogoutButton";

const navigator = createStackNavigator(
  {
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
        headerLeft: () => null,
        headerRight: () => <LogoutButton />,
      },
    },
    Location: {
      screen: LocationScreen,
      navigationOptions: {
        headerRight: () => <LogoutButton />,
        title: "Something new",
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

// Now AppContainer is the main component for React to render
export default AppContainer;
