import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button, Input, Text, Icon, Image } from "react-native-elements";
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
  const [passwordVisible, setPasswordVisible] = useState(true);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [showLoginLoader, setShowLoginLoader] = useState(true);
  const { Theme } = useContext(ThemeContext);
  const { showToast, show404Toast, show500Toast, show200Toast } = useContext(
    ToastContext
  );

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
    }
    setShowLoginLoader(false);
  };

  const handleLogin = async () => {
    // user wants to login, but validate credentials first
    const errors = ValidationHelper.validator({ email, password });

    if (errors !== undefined) {
      // Password or email have return a error
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
      const response = await coffida.post("/user/login", {
        email: email,
        password: password,
      });
      // Login is successful
      if (response.status === 200) {
        // Show successful message to the user
        show200Toast("Logging you in now :)");
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
      <View style={{ flex: 2, justifyContent: "flex-start" }}>
        <Image
          style={{ height: "100%", aspectRatio: 16 / 9 }}
          source={require("../images/coffeebackground.jpg")}
        />
      </View>
      <View
        style={{
          flex: 4,
          flexDirection: "column",
        }}
      >
        <View style={{ flex: 5, justifyContent: "center", marginVertical: 15 }}>
          <View style={{ flex: 1 }}>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
              placeholder="Email"
              inputStyle={{
                color: Theme === "dark" ? "whitesmoke" : "#222222",
              }}
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
              inputStyle={{
                color: Theme === "dark" ? "whitesmoke" : "#222222",
              }}
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
