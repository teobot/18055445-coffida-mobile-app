import React, { useContext } from "react";
import { Switch } from "react-native";
import { ListItem, Icon } from "react-native-elements";

import { ThemeContext } from "../../context/ThemeContext";

const ThemeController = () => {
  const { Theme, changeTheme } = useContext(ThemeContext);

  return (
    <ListItem bottomDivider>
      <Icon type="ionicon" name="moon-outline" />
      <ListItem.Content>
        <ListItem.Title>Dark mode</ListItem.Title>
      </ListItem.Content>
      <Switch value={Theme === "dark"} onValueChange={changeTheme} />
    </ListItem>
  );
};

export default ThemeController;
