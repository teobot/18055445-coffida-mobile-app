import { createContext, useState } from "react";
import { DefaultTheme } from "@react-navigation/native";

// INITIAL_THEME = "light" || "dark"
// Using react navigation phone theme as the starting mode
const INITIAL_THEME = DefaultTheme.dark ? "dark" : "light";

// const { Theme, changeTheme } = useContext(ThemeContext);
export const ThemeContext = createContext();

export default () => {
  const [Theme, setTheme] = useState(INITIAL_THEME);

  const changeTheme = () => {
    if (Theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  // Create the changing colors for text and for backgrounds
  const ThemeTextColor = { color: Theme === "dark" ? "whitesmoke" : "#222222" };
  const ThemeBackgroundColor = {
    backgroundColor: Theme === "light" ? "#e4e4e4" : "#222222",
  };

  return [Theme, { Theme, changeTheme, ThemeTextColor, ThemeBackgroundColor }];
};
