import React from "react";
import { ListItem, Icon } from "react-native-elements";
import AuthenticationHelper from "../../helpers/AuthenticationHelper";
import coffida from "../../api/coffida";
import { withNavigation } from "react-navigation";

const LogoutController = ({ navigation }) => {
  const logout = async () => {
    try {
      // Try to reach the logout endpoint
      const response = await coffida.post("/user/logout");
      await AuthenticationHelper.id_Reducer({ type: "delete_id" });
      await AuthenticationHelper.token_Reducer({ type: "delete_token" });
      navigation.navigate("Login");
    } catch (error) {
      // TODO: failed logging out
    }
  };
  return (
    <ListItem bottomDivider onPress={logout}>
      <Icon type="ionicon" name="log-out-outline" />
      <ListItem.Content>
        <ListItem.Title>Logout</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export default withNavigation(LogoutController);
