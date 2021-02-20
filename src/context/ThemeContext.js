import { createContext, useState } from "react";

// INITIAL_THEME = "light" || "dark"
const INITIAL_THEME = "light";

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

  return [Theme, { Theme, changeTheme }];
};
