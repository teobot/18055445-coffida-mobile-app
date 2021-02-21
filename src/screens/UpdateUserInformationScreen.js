import React, { useReducer, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";

import { ThemeContext } from "../context/ThemeContext";
import { ToastContext } from "../context/ToastContext";

import ValidationHelper from "../helpers/ValidationHelper";

import { withNavigation } from "react-navigation";
import coffida from "../api/coffida";

const reducer = (state, action) => {
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
  const {
    first_name,
    last_name,
    email,
    user_id,
  } = navigation.state.params.userInformation;
  const [state, dispatch] = useReducer(reducer, {
    first_name: navigation.state.params.userInformation.first_name,
    last_name: navigation.state.params.userInformation.last_name,
    email: navigation.state.params.userInformation.email,
    password: "",
  });

  const { Theme } = useContext(ThemeContext);
  const {
    showToast,
    show404Toast,
    show500Toast,
    show200Toast,
    showBadInputToast,
  } = useContext(ToastContext);

  const handleUpdate = async () => {
    // This function handles the updating of the account information
    let oldValues = { first_name, last_name, email, password: "" };
    let valuesChange = {
      first_name: oldValues.first_name !== state.first_name,
      last_name: oldValues.last_name !== state.last_name,
      email: oldValues.email !== state.email,
      password: oldValues.password !== state.password,
    };
    let errors = [];
    let valuesToSend = {};

    if (valuesChange.first_name) {
      // The first name has changed
      // Check if its allowed
      const first_name_err = ValidationHelper.validator({
        type: "validate_first_name",
        payload: state.first_name,
      });
      first_name_err !== undefined
        ? errors.push(first_name_err)
        : (valuesToSend["first_name"] = state.first_name);
    }
    if (valuesChange.last_name) {
      // The last name has changed
      // Check if its allowed
      const last_name_err = ValidationHelper.validator({
        type: "validate_last_name",
        payload: state.last_name,
      });
      last_name_err !== undefined
        ? errors.push(last_name_err)
        : (valuesToSend["last_name"] = state.last_name);
    }
    if (valuesChange.email) {
      // The email has changed
      // Check if its allowed
      const email_err = ValidationHelper.validator({
        type: "validate_email",
        payload: state.last_name,
      });
      email_err !== undefined
        ? errors.push(email_err)
        : (valuesToSend["email"] = state.email);
    }
    if (valuesChange.password) {
      // The password has changed
      // Check if its allowed
      const password_err = ValidationHelper.validator({
        type: "validate_password",
        payload: state.password,
      });
      password_err !== undefined
        ? errors.push(password_err)
        : (valuesToSend["password"] = state.password);
    }

    if (errors.length > 0) {
      // There are errors, display a error message
      let message = "";
      errors.forEach((error) => {
        if (error !== undefined) {
          message += error[Object.keys(error)[0]] + "\n";
        }
      });
      showBadInputToast({
        topMessage: "Error with information",
        bottomMessage: message,
      });
      return;
    } else {
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
    }
  };

  return (
    <View style={{ padding: 15, marginVertical: 15 }}>
      <View style={styles.inputContainer}>
        <Text>First name</Text>
        <Input
          value={state.first_name}
          onChangeText={(newValue) =>
            dispatch({ type: "change_first_name", payload: newValue })
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Last name</Text>
        <Input
          value={state.last_name}
          onChangeText={(newValue) =>
            dispatch({ type: "change_last_name", payload: newValue })
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <Input
          value={state.email}
          onChangeText={(newValue) =>
            dispatch({ type: "change_email", payload: newValue })
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <Input
          placeholder="Enter new password"
          value={state.password}
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
  headerTitle: "Account Management",
});

export default withNavigation(UpdateUserInformationScreen);
