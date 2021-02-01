import React from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { withNavigation } from "react-navigation";

const CreateAccountScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ margin: 5, padding: 5 }}>
        Welcome, To the Create Account Screen
      </Text>

      <TextInput placeholder="First_Name" style={styles.inputStyle} />
      <TextInput placeholder="Last_Name" style={styles.inputStyle} />
      <TextInput placeholder="Email" style={styles.inputStyle} />
      <TextInput placeholder="Password" style={styles.inputStyle} />

      <View style={styles.viewStyle}>
        <Button
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("LoginScreen")}
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

export default withNavigation(CreateAccountScreen);
