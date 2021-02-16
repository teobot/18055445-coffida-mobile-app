import React, { useContext } from "react";
import { Switch } from "react-native";
import { ListItem, Icon } from "react-native-elements";

import { Context as ThemeContext } from "../../context/ThemeContext";

const ThemeController = () => {
  const { state, changeThemeMode } = useContext(ThemeContext);

  return (
    <ListItem bottomDivider>
      <Icon type="ionicon" name="moon-outline" />
      <ListItem.Content>
        <ListItem.Title>Dark mode</ListItem.Title>
      </ListItem.Content>
      <Switch value={state.theme === "dark"} onValueChange={changeThemeMode} />
    </ListItem>
  );
};

export default ThemeController;
