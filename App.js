import React from "react";


// Navigation imports
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Screen imports
import CreateAccountScreen from "./src/screens/CreateAccountScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SearchScreen from "./src/screens/SearchScreen";
import LocationScreen from "./src/screens/LocationScreen";
import AccountScreen from "./src/screens/AccountScreen";
import LocationReviewScreen from "./src/screens/LocationReviewScreen";
import UpdateUserInformationScreen from "./src/screens/UpdateUserInformationScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

// Custom component imports
import SettingsButton from "./src/components/SettingsButton";
import AccountButton from "./src/components/AccountButton";

// Context imports
import useThemeContext, { ThemeContext } from "./src/context/ThemeContext";
import useToastContext, { ToastContext } from "./src/context/ToastContext";
import useLocationContext, {
  LocationContext,
} from "./src/context/LocationContext";

// Navigation stack variable
// Add new screens and navigationOptions here
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

  // Context inits
  const [Theme, ThemeContextValue] = useThemeContext();
  const [ToastComponent, ToastContextValue] = useToastContext();
  const [location] = useLocationContext();

  // Return the screen components,
  // Each are wrapped in the context providers,
  // So each child can get access to the useContext values
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
