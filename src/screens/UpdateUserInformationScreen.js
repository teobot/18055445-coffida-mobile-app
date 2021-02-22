import React, { useReducer, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { withNavigation } from "react-navigation";

// Context imports
import { ThemeContext } from "../context/ThemeContext";
import { ToastContext } from "../context/ToastContext";

// Helper imports
import ValidationHelper from "../helpers/ValidationHelper";

// Api imports
import coffida from "../api/coffida";

// User information reducer
const reducer = (state, action) => {
  // Function is a react reducer, return state to be set
  switch (action.type) {
    case "change_first_name":
      return { ...state, first_name: action.payload };
    case "change_last_name":
      return { ...state, last_name: action.payload };
    case "change_email":
      return { ...state, email: action.payload };
    case "change_password":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const UpdateUserInformationScreen = ({ navigation }) => {
  // The UpdateUserInformationScreen is where the user updates there account information

  // Set states
  const { user_id } = navigation.state.params.userInformation;
  const [state, dispatch] = useReducer(reducer, {
    first_name: navigation.state.params.userInformation.first_name,
    last_name: navigation.state.params.userInformation.last_name,
    email: navigation.state.params.userInformation.email,
    password: "",
  });
  const { Theme, ThemeTextColor } = useContext(ThemeContext);
  const {
    show404Toast,
    show500Toast,
    show200Toast,
    showBadInputToast,
  } = useContext(ToastContext);

  const handleUpdate = async () => {
    // This function handles the updating of the account information

    // Check which values have changed before validating
    var oldValues = {
      first_name: navigation.state.params.userInformation.first_name,
      last_name: navigation.state.params.userInformation.last_name,
      email: navigation.state.params.userInformation.email,
      password: "",
    };
    var newValues = state;

    // Create a new object including the changed values
    let valuesToSend = Object.keys(newValues).reduce((difference, key) => {
      if (oldValues[key] === newValues[key]) return difference;
      return {
        ...difference,
        [key]: newValues[key],
      };
    }, {});

    // Validate the new array
    const errors = ValidationHelper.validator(valuesToSend);

    // If there are errors display a message
    if (errors !== undefined) {
      // There is more than one error, display to user
      let error_message = "";
      errors.forEach((error) => {
        error_message += error + "\n";
      });
      showBadInputToast({
        topMessage: "Error with information",
        bottomMessage: error_message,
      });
      return;
    }

    // I checked if the values have changed and validated them
    // Each of the validation and changed values are inside valuesToSend
    try {
      const response = await coffida.patch(`/user/${user_id}`, valuesToSend);
      if (response.status === 200) {
        // The patch was successful
        show200Toast("Account information has been updated");
        navigation.goBack();
      }
    } catch (error) {
      // : failed patching the user information
      if (error.response.status === 400) {
        // : Bad request
        show404Toast();
      } else if (error.response.status === 403) {
        // user has tried to update another user
        showBadInputToast({
          topMessage: "Forbidden",
          bottomMessage: "Please reload the app",
        });
      } else {
        // : most likely networking issue
        show500Toast();
      }
    }
  };

  const InputLabel = (labelTitle) => {
    // Small custom component since its used here 4 times but no where else.
    return (
      <Text style={{ color: Theme === "dark" ? "whitesmoke" : "#222222" }}>
        {labelTitle}
      </Text>
    );
  };

  return (
    <View style={{ padding: 15, marginVertical: 15 }}>
      <View style={styles.inputContainer}>
        {InputLabel("First Name")}
        <Input
          value={state.first_name}
          inputStyle={ThemeTextColor}
          onChangeText={(newValue) =>
            dispatch({ type: "change_first_name", payload: newValue })
          }
        />
      </View>

      <View style={styles.inputContainer}>
        {InputLabel("Last Name")}
        <Input
          value={state.last_name}
          inputStyle={ThemeTextColor}
          onChangeText={(newValue) =>
            dispatch({ type: "change_last_name", payload: newValue })
          }
        />
      </View>

      <View style={styles.inputContainer}>
        {InputLabel("Email")}
        <Input
          value={state.email}
          inputStyle={ThemeTextColor}
          onChangeText={(newValue) =>
            dispatch({ type: "change_email", payload: newValue })
          }
        />
      </View>

      <View style={styles.inputContainer}>
        {InputLabel("Password")}
        <Input
          placeholder="Enter new password"
          value={state.password}
          inputStyle={ThemeTextColor}
          onChangeText={(newValue) =>
            dispatch({ type: "change_password", payload: newValue })
          }
        />
      </View>

      <Button type="outline" title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
  },
});

UpdateUserInformationScreen.navigationOptions = (screenProps) => ({
  // Change the navigation title
  headerTitle: "Account Management",
});

export default withNavigation(UpdateUserInformationScreen);
