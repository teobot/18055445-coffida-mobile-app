import React from "react";

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

import useThemeContext, { ThemeContext } from "./src/context/ThemeContext";
import useToastContext, { ToastContext } from "./src/context/ToastContext";
import useLocationContext, {
  LocationContext,
} from "./src/context/LocationContext";
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
  const [Theme, ThemeContextValue] = useThemeContext();
  const [ToastComponent, ToastContextValue] = useToastContext();
  const [location] = useLocationContext();
  return (
    <ThemeContext.Provider value={ThemeContextValue}>
      <LocationContext.Provider value={location}>
        <ToastContext.Provider value={ToastContextValue}>
          <AppContainer theme={Theme} />
          {ToastComponent}
        </ToastContext.Provider>
      </LocationContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
