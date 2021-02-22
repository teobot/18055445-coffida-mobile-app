import React, { useState, useEffect, useContext } from "react";

// Element imports
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button, Input, Text, Icon, Image } from "react-native-elements";

// Navigation imports
import { withNavigation } from "react-navigation";

// Api import
import coffida from "../api/coffida";

// Helper imports
import AuthenticationHelper from "../helpers/AuthenticationHelper";
import ValidationHelper from "../helpers/ValidationHelper";

// Custom component imports
import LoadingScreen from "./LoadingScreen";

// Context imports
import { ThemeContext } from "../context/ThemeContext";
import { ToastContext } from "../context/ToastContext";

const LoginScreen = ({ navigation }) => {
  // Set useStates
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [showLoginLoader, setShowLoginLoader] = useState(true);

  // Context states
  const { Theme, ThemeTextColor } = useContext(ThemeContext);
  const { showToast, show404Toast, show500Toast, show200Toast } = useContext(
    ToastContext
  );

  useEffect(() => {
    // Redirect the user if they are already logged in
    redirectIfLoggedIn();
  }, []);

  useEffect(() => {
    // If the user has just created a account then auto insert the new information into the login screen
    if (navigation.getParam("email") && navigation.getParam("password")) {
      setEmail(navigation.getParam("email"));
      setPassword(navigation.getParam("password"));
    }
  }, [navigation.getParam("email"), navigation.getParam("password")]);

  const redirectIfLoggedIn = async () => {
    // This function tests the access token and redirects if its already valid
    const validAccessToken = await AuthenticationHelper.token_Reducer({
      type: "validate_token",
    });
    if (validAccessToken.valid) {
      navigation.navigate("Search");
    } else {
      // User does not have a valid token, so they need to login
    }
    setShowLoginLoader(false);
  };

  const handleLogin = async () => {
    // This function handles the user login

    // user wants to login, but validate credentials first
    const errors = ValidationHelper.validator({ email, password });

    if (errors !== undefined) {
      // Errors have returned from the validation
      // display them to the user
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

    // password and email have returned with no errors,
    try {
      // Post the information to login
      const response = await coffida.post("/user/login", {
        email: email,
        password: password,
      });
      // Login is successful
      if (response.status === 200) {
        // Show successful message to the user
        show200Toast("Logging you in now :)");
      }
      // Save the id and token in async storage
      const { id, token } = response.data;
      await AuthenticationHelper.token_Reducer({
        type: "set_token",
        payload: token,
      });
      await AuthenticationHelper.id_Reducer({
        type: "set_id",
        payload: id,
      });
      navigation.navigate("Search");
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

  if (showLoginLoader) {
    // If loading or checking if user is logged in then show a loading screen
    return <LoadingScreen message="Checking saved login credentials!" />;
  }

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.MainViewContainerStyle}
    >
      <View style={{ flex: 1 }}>
        <Text h3 style={ThemeTextColor}>
          Welcome to Coffida
        </Text>
        <Text style={ThemeTextColor}>
          Coffida is a coffee review and searching service
        </Text>
      </View>
      <View style={{ flex: 2, justifyContent: "flex-start" }}>
        <Image
          style={styles.ImageStyle}
          source={require("../images/coffeebackground.jpg")}
        />
      </View>
      <View
        style={{
          flex: 4,
          flexDirection: "column",
        }}
      >
        <View style={styles.InputContainerStyle}>
          <View style={{ flex: 1 }}>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
              placeholder="Email"
              inputStyle={ThemeTextColor}
            />
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              secureTextEntry={passwordVisible}
              onChangeText={(userPassword) => setPassword(userPassword)}
              placeholder="Password"
              inputStyle={ThemeTextColor}
              containerStyle={{ flex: 1 }}
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
        <View style={styles.SignInContainer}>
          <View style={{ flex: 1 }}>
            <Text
              h4
              style={{
                alignSelf: "flex-start",
                ...ThemeTextColor,
              }}
            >
              Sign in
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
              onPress={handleLogin}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            flexDirection: "row",
            padding: 2,
          }}
        >
          <View>
            <Button
              titleStyle={{
                ...styles.CreateAccountButtonStyle,
                ...ThemeTextColor,
              }}
              title="Sign up"
              type="clear"
              onPress={() => navigation.navigate("CreateAccount")}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  SignInContainer: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  CreateAccountButtonStyle: { fontSize: 16, textDecorationLine: "underline" },
  ImageStyle: { height: "100%", aspectRatio: 16 / 9 },
  MainViewContainerStyle: { flex: 1, padding: 40 },
  InputContainerStyle: {
    flex: 5,
    justifyContent: "center",
    marginVertical: 15,
  },
});

export default withNavigation(LoginScreen);
