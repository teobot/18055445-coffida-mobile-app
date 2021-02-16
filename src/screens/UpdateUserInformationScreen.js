import React, { useReducer } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

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

  const handleUpdate = async () => {
    let oldValues = { first_name, last_name, email, password: "" };
    let newValues = state;
    let valuesToSend = {};

    // check if any values have changed and if so add to the new object that gets sent
    oldValues.first_name !== newValues.first_name
      ? (valuesToSend.first_name = newValues.first_name)
      : null;
    oldValues.last_name !== newValues.last_name
      ? (valuesToSend.last_name = newValues.last_name)
      : null;
    oldValues.email !== newValues.email
      ? (valuesToSend.email = newValues.email)
      : null;
    oldValues.password !== newValues.password
      ? (valuesToSend.password = newValues.password)
      : null;

    // Only send if something has changed
    if (Object.keys(valuesToSend).length > 0) {
      // Something has changed
      try {
        const response = await coffida.patch(`/user/${user_id}`, valuesToSend);
        if (response.status === 200) {
          // The patch was successful
          navigation.goBack();
        }
      } catch (error) {
        // TODO: failed patching the user information
      }
    } else {
      // Nothing has changed
      // TODO: user clicked update information without sending anything, display message
    }

    console.log(valuesToSend);
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
