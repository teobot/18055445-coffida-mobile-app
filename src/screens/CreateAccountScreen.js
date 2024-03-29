import React, { useReducer, useState, useContext } from "react";

// React elements imports
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Input, Text, Icon } from "react-native-elements";

// Navigation imports
import { withNavigation } from "react-navigation";

// Helper imports
import ValidationHelper from "../helpers/ValidationHelper";

// Context imports
import { ThemeContext } from "../context/ThemeContext";
import { ToastContext } from "../context/ToastContext";

// Api imports
import coffida from "../api/coffida";

// This is the reducer for the new account information
const reducer = (state, action) => {
  switch (action.type) {
    case "change_last_name":
      return { ...state, last_name: action.payload };
    case "change_first_name":
      return { ...state, first_name: action.payload };
    case "change_email":
      return { ...state, email: action.payload };
    case "change_password":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const CreateAccountScreen = ({ navigation }) => {
  // This is the account creation screen

  // state init
  const [state, dispatch] = useReducer(reducer, {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(true);

  // Context init
  const { Theme, ThemeTextColor } = useContext(ThemeContext);
  const { showToast, show404Toast, show500Toast } = useContext(ToastContext);

  const handleAccountCreation = async () => {
    // This handles the submission of the account information

    const { first_name, last_name, email, password } = state;

    // Validate the given information
    const errors = ValidationHelper.validator({
      first_name,
      last_name,
      email,
      password,
    });

    if (errors !== undefined) {
      // account information includes some errors, display them to the user
      let error_message = "";
      errors.forEach((error) => {
        error_message += error + "\n";
      });
      showToast({
        type: "error",
        position: "top",
        text1: "Error with credentials",
        text2: error_message,
        visibilityTime: 4000,
        autoHide: true,
      });
      return;
    }

    // all form information has returned with no errors
    try {
      // Post information to coffida
      const form_response = await coffida.post("/user", state);

      if (form_response.status === 201) {
        // If response is good
        showToast({
          type: "success",
          position: "top",
          text1: "Account creation success",
          text2: "You can now login 👋",
          visibilityTime: 4000,
          autoHide: true,
        });
      }
      const { email, password } = state;
      navigation.navigate("Login", {
        email,
        password,
      });
    } catch (error) {
      // Login request failed
      if (error.response.status === 400) {
        // : Bad login credentials
        show404Toast();
      } else {
        // : most likely networking issue
        show500Toast();
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1, padding: 40 }}>
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <Text h2 style={ThemeTextColor}>
          Create{"\n"}Account
        </Text>
      </View>
      <View
        style={{ flex: 3, justifyContent: "center", flexDirection: "column" }}
      >
        <View style={{ flex: 1 }}>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            value={state.first_name}
            onChangeText={(newVal) =>
              dispatch({ type: "change_first_name", payload: newVal })
            }
            placeholder="First name"
            inputStyle={ThemeTextColor}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            value={state.last_name}
            onChangeText={(newVal) =>
              dispatch({ type: "change_last_name", payload: newVal })
            }
            placeholder="Last name"
            inputStyle={ThemeTextColor}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            value={state.email}
            onChangeText={(newVal) =>
              dispatch({ type: "change_email", payload: newVal })
            }
            placeholder="Email"
            inputStyle={ThemeTextColor}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            value={state.password}
            secureTextEntry={passwordVisible}
            onChangeText={(newVal) =>
              dispatch({ type: "change_password", payload: newVal })
            }
            placeholder="Password"
            inputStyle={ThemeTextColor}
          />
          <Icon
            onPress={() => setPasswordVisible(!passwordVisible)}
            name={passwordVisible ? "eye-off" : "eye-outline"}
            type="ionicon"
            size={36}
            color="#517fa4"
          />
        </View>
      </View>
      <View style={styles.SignUpContainerStyle}>
        <View style={{ flex: 1 }}>
          <Text
            h4
            style={{
              alignSelf: "flex-start",
              ...ThemeTextColor,
            }}
          >
            Sign up
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Icon
            raised
            name="arrow-forward-outline"
            type="ionicon"
            reverse={Theme !== "dark"}
            size={35}
            containerStyle={{ alignSelf: "flex-end" }}
            onPress={handleAccountCreation}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  SignUpContainerStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
});

export default withNavigation(CreateAccountScreen);
