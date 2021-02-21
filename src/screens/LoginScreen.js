import React, { useState, useEffect, useContext, createRef } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";

import coffida from "../api/coffida";

import AuthenticationHelper from "../helpers/AuthenticationHelper";
import ValidationHelper from "../helpers/ValidationHelper";

import LoadingScreen from "./LoadingScreen";

import { ThemeContext } from "../context/ThemeContext";
import { ToastContext } from "../context/ToastContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("bashley.williams@mmu.ac.uk");
  const [password, setPassword] = useState("hello123");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [showLoginLoader, setShowLoginLoader] = useState(true);
  const { Theme } = useContext(ThemeContext);
  const { showToast, show404Toast, show500Toast, show200Toast } = useContext(ToastContext);

  useEffect(() => {
    redirectIfLoggedIn();
  }, []);

  useEffect(() => {
    if (navigation.getParam("email") && navigation.getParam("password")) {
      setEmail(navigation.getParam("email"));
      setPassword(navigation.getParam("password"));
    }
  }, [navigation.getParam("email"), navigation.getParam("password")]);

  const redirectIfLoggedIn = async () => {
    const validAccessToken = await AuthenticationHelper.token_Reducer({
      type: "validate_token",
    });
    if (validAccessToken.valid) {
      console.log("Redirecting as the token is already valid.");
      navigation.navigate("Search");
    } else {
      // User does not have a valid token, ask them to login
      // : log the message on return to the user
      console.log(validAccessToken.message);
      console.log("Token is not valid.");
    }
    setShowLoginLoader(false);
  };

  const handleLogin = async () => {
    const email_errors = ValidationHelper.validator({
      type: "validate_email",
      payload: email,
    });
    const password_errors = ValidationHelper.validator({
      type: "validate_password",
      payload: password,
    });

    if (email_errors !== undefined && password_errors !== undefined) {
      // Password or email have return a error
      showToast({
        type: "error",
        position: "top",
        text1: "Error with credentials",
        text2: `${
          password_errors !== undefined
            ? password_errors.password[0] + "\n"
            : null
        }${email_errors !== undefined ? email_errors.email[0] : null}`,
        visibilityTime: 4000,
        autoHide: true,
      });
      return;
    }

    // password and email have returned with no errors,
    try {
      const response = await coffida.post("/user/login", {
        email: email,
        password: password,
      });
      // Login is successful
      if(response.status === 200) {
        // Show successful message to the user
        show200Toast("Logging you in now :)")
      }
      const { id, token } = response.data;
      await AuthenticationHelper.token_Reducer({
        type: "set_token",
        payload: token,
      });
      await AuthenticationHelper.id_Reducer({
        type: "set_id",
        payload: id,
      });
      console.log(id, token);
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
    return <LoadingScreen message="Checking saved login credentials!" />;
  }

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1, padding: 40 }}>
      <View style={{ flex: 1 }}>
        <Text h3 style={{ color: Theme === "dark" ? "whitesmoke" : "black" }}>
          Welcome to Coffida
        </Text>
        <Text style={{ color: Theme === "dark" ? "whitesmoke" : "black" }}>
          Coffida is a coffee review and searching service
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View style={{ flex: 5, justifyContent: "center" }}>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(userEmail) => setEmail(userEmail)}
            placeholder="Email"
          />
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
            placeholder="Password"
          />
        </View>
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              h4
              style={{
                alignSelf: "flex-start",
                color: Theme === "dark" ? "whitesmoke" : "#222222",
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
                fontSize: 16,
                textDecorationLine: "underline",
                color: Theme === "dark" ? "whitesmoke" : "#222222",
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
  inputStyle: {
    fontSize: 18,
    padding: 5,
    margin: 5,
    borderRadius: 25,
  },
  viewStyle: {
    margin: 5,
  },
});

export default withNavigation(LoginScreen);
