import React from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import CreateAccountScreen from "./src/screens/CreateAccountScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SearchScreen from "./src/screens/SearchScreen";
import LocationScreen from "./src/screens/LocationScreen";
import AccountScreen from "./src/screens/AccountScreen";

import LogoutButton from "./src/components/LogoutButton";
import AccountButton from "./src/components/AccountButton";

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
        title: null,
        headerLeft: () => <AccountButton />,
        headerRight: () => <LogoutButton />,
      },
    },
    Location: {
      screen: LocationScreen,
      navigationOptions: {
        headerRight: () => <LogoutButton />,
      },
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        title: "Account Management",
        headerRight: () => <LogoutButton />,
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
