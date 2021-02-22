import React, { useContext } from "react";
import { ListItem, Icon } from "react-native-elements";
import AuthenticationHelper from "../../helpers/AuthenticationHelper";
import coffida from "../../api/coffida";
import { withNavigation } from "react-navigation";
import { ToastContext } from "../../context/ToastContext";
import { ThemeContext } from "../../context/ThemeContext";

const LogoutController = ({ navigation }) => {
  const { showBadInputToast } = useContext(ToastContext);
  const { Theme } = useContext(ThemeContext);
  const logout = async () => {
    try {
      // Try to reach the logout endpoint
      const response = await coffida.post("/user/logout");
      await AuthenticationHelper.id_Reducer({ type: "delete_id" });
      await AuthenticationHelper.token_Reducer({ type: "delete_token" });
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
      containerStyle={{
        backgroundColor: Theme === "dark" ? "#222222" : "white",
      }}
    >
      <Icon
        color={Theme === "dark" ? "white" : "#222222"}
        type="ionicon"
        name="log-out-outline"
      />
      <ListItem.Content>
        <ListItem.Title
          style={{ color: Theme === "dark" ? "white" : "#222222" }}
        >
          Logout
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export default withNavigation(LogoutController);
