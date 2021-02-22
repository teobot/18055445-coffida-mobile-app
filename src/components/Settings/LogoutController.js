import React, { useContext } from "react";

// React element imports
import { ListItem, Icon } from "react-native-elements";

// Helper imports
import AuthenticationHelper from "../../helpers/AuthenticationHelper";

// Api import
import coffida from "../../api/coffida";

// Navigation import
import { withNavigation } from "react-navigation";

// Context imports
import { ToastContext } from "../../context/ToastContext";
import { ThemeContext } from "../../context/ThemeContext";

const LogoutController = ({ navigation }) => {
  // This is the logout controller and handles the user wanting to logout of the account

  // Context inits
  const { showBadInputToast } = useContext(ToastContext);
  const { ThemeTextColor, ThemeBackgroundColor } = useContext(ThemeContext);

  const logout = async () => {
    // This handles the logging out of the user
    try {
      // Send a request to logout
      const response = await coffida.post("/user/logout");

      // Delete the id and token on request success
      await AuthenticationHelper.id_Reducer({ type: "delete_id" });
      await AuthenticationHelper.token_Reducer({ type: "delete_token" });

      // Navigate back to login
      navigation.navigate("Login");
    } catch (error) {
      // : failed logging out
      showBadInputToast({
        topMessage: "Could not logout",
        bottomMessage: "Please close the app and try again",
      });
    }
  };
  return (
    <ListItem
      bottomDivider
      onPress={logout}
      containerStyle={ThemeBackgroundColor}
    >
      <Icon color={ThemeTextColor["color"]} type="ionicon" name="log-out-outline" />
      <ListItem.Content>
        <ListItem.Title style={ThemeTextColor}>Logout</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export default withNavigation(LogoutController);
