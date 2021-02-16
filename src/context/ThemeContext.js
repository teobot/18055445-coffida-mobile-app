import createDataContext from "./createDataContext";

// import into any child
// import { Context as ThemeContext } from "../context/ThemeContext";
// const { state, changeThemeMode } = useContext(ThemeContext);

const reducer = (state, action) => {
  switch (action.type) {
    case "swap_theme":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
};

const changeThemeMode = (dispatch) => {
  return () => {
    dispatch({ type: "swap_theme" });
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { changeThemeMode },
  {
    theme: "light",
  }
);
