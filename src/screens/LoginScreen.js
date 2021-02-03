import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { withNavigation } from "react-navigation";

import coffida from "../api/coffida";

import AuthenticationHelper from "../helpers/AuthenticationHelper";

const LoginScreen = ({ navigation }) => {
  console.log(navigation.getParam("email"), navigation.getParam("password"));

  const [email, setEmail] = useState("bashley.williams@mmu.ac.uk");
  const [password, setPassword] = useState("hello123");

  useEffect(() => {
    redirectIfNotLoggedIn();
  }, []);

  useEffect(() => {
    if (navigation.getParam("email") && navigation.getParam("password")) {
      setEmail(navigation.getParam("email"));
      setPassword(navigation.getParam("password"));
    }
  }, [navigation.getParam("email"), navigation.getParam("password")]);

  const redirectIfNotLoggedIn = async () => {
    const validAccessToken = await AuthenticationHelper.token_Reducer({
      type: "validate_token",
    });
    if (validAccessToken) {
      console.log("Redirecting as the token is already valid.");
      navigation.navigate("Search");
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await coffida.post("/user/login", {
        email: email,
        password: password,
      });
      // Login is successful
      const { id, token } = response.data;
      const token_set = await AuthenticationHelper.token_Reducer({
        type: "set_token",
        payload: token,
      });
      const id_set = await AuthenticationHelper.id_Reducer({
        type: "set_id",
        payload: `${id}`,
      });
      console.log(id, token);
      navigation.navigate("Search");
    } catch (error) {
      // Login request failed
      if (error.response.status === "400") {
        // TODO: Bad login credentials
      } else {
        // TODO: most likely networking issue
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ margin: 5, padding: 5 }}>Welcome, To the LoginScreen</Text>

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholder="Email"
        style={styles.inputStyle}
      />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholder="Password"
        style={styles.inputStyle}
      />

      <View style={styles.viewStyle}>
        <Button
          onPress={() => handleLogin(email, password)}
          style={styles.buttonStyle}
          title="Login"
        />
      </View>
      <View style={styles.viewStyle}>
        <Button
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("CreateAccount")}
          title="Create Account"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 18,
    borderColor: "black",
    borderWidth: 2,
    padding: 5,
    margin: 5,
  },
  viewStyle: {
    margin: 5,
  },
});

export default withNavigation(LoginScreen);
