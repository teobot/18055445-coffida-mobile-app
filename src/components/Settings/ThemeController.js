import React, { useContext } from "react";
import { Switch } from "react-native";
import { ListItem, Icon } from "react-native-elements";

import { ThemeContext } from "../../context/ThemeContext";

const ThemeController = () => {
  const { Theme, changeTheme } = useContext(ThemeContext);

  return (
    <ListItem
      bottomDivider
      containerStyle={{
        backgroundColor: Theme === "dark" ? "#222222" : "white",
      }}
    >
      <Icon
        color={Theme === "dark" ? "white" : "#222222"}
        type="ionicon"
        name={`${Theme === "dark" ? "sunny" : "moon"}-outline`}
      />
      <ListItem.Content>
        <ListItem.Title
          style={{ color: Theme === "dark" ? "white" : "#222222" }}
        >
          {Theme === "dark" ? "Light" : "Dark"} mode
        </ListItem.Title>
      </ListItem.Content>
      <Switch value={Theme === "dark"} onValueChange={changeTheme} />
    </ListItem>
  );
};

export default ThemeController;
