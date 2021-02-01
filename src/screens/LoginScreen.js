import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { withNavigation } from "react-navigation";

import coffida from "../api/coffida";

import AuthenticationHelper from "../helpers/AuthenticationHelper";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("bashley.williams@mmu.ac.uk");
  const [password, setPassword] = useState("hello123");

  useEffect(() => {
    redirectIfNotLoggedIn();
  }, []);

  const redirectIfNotLoggedIn = async () => {
    if (await AuthenticationHelper.validateAccessToken()) {
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
      await AuthenticationHelper.setAccessToken(token);
      navigation.navigate("Search");
    } catch (error) {
      // Login request failed
      if (error.response.status === "400") {
        // Bad login credentials
      } else {
        // most likely networking issue
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
