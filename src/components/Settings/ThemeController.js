import React, { useContext } from "react";

// React element imports
import { Switch } from "react-native";
import { ListItem, Icon } from "react-native-elements";

// Context imports
import { ThemeContext } from "../../context/ThemeContext";

const ThemeController = () => {
  // This controller handles the changing of the Theme

  // Context imports
  const {
    ThemeTextColor,
    ThemeBackgroundColor,
    Theme,
    changeTheme,
  } = useContext(ThemeContext);

  return (
    <ListItem bottomDivider containerStyle={ThemeBackgroundColor}>
      <Icon
        color={ThemeTextColor["color"]}
        type="ionicon"
        name={`${Theme === "dark" ? "sunny" : "moon"}-outline`}
      />
      <ListItem.Content>
        <ListItem.Title style={ThemeTextColor}>
          {Theme === "dark" ? "Light" : "Dark"} mode
        </ListItem.Title>
      </ListItem.Content>
      <Switch value={Theme === "dark"} onValueChange={changeTheme} />
    </ListItem>
  );
};

export default ThemeController;
