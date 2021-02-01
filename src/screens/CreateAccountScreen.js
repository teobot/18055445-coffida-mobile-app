import React, { useReducer, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Feather } from "@expo/vector-icons";

import ValidationHelper from "../helpers/ValidationHelper";

import coffida from "../api/coffida";

const reducer = (state, action) => {
  switch (action.type) {
    case "change_LastName":
      return { ...state, last_name: action.payload };
    case "change_FirstName":
      return { ...state, first_name: action.payload };
    case "change_Email":
      return { ...state, email: action.payload };
    case "change_Password":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const CreateAccountScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, {
    first_name: "theo",
    last_name: "clapperton",
    email: "theoclapperton@outlook.com",
    password: "hello1234",
  });
  const { first_name, last_name, email, password } = state;
  const [passwordVisible, setPasswordVisible] = useState(true);

  const createAccount = async (formData) => {
    if (ValidationHelper.ValidateCreateAccountForm(formData)) {
      // Something includes bad words
      // TODO: Bad words detected in the form data
      console.log("Bad words in the form data :(");
    } else {
      // Form data is clean so carry on with the submit.
      console.log("Submitting the data to Mudfoot");
      try {
        const form_submit = await coffida.post("/user", formData);
        const { email, password } = state;
        navigation.navigate("Login", {
          email,
          password,
        });
      } catch (error) {
        // TODO: something wrong with form submission
        console.log(error);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ margin: 5, padding: 5 }}>
        Welcome, To the Create Account Screen
      </Text>

      <TextInput
        value={first_name}
        onChangeText={(newTerm) =>
          dispatch({ type: "change_FirstName", payload: newTerm })
        }
        placeholder="First Name"
        style={styles.inputStyle}
      />

      <TextInput
        value={last_name}
        onChangeText={(newTerm) =>
          dispatch({ type: "change_LastName", payload: newTerm })
        }
        placeholder="Last Name"
        style={styles.inputStyle}
      />

      <TextInput
        value={email}
        onChangeText={(newTerm) =>
          dispatch({ type: "change_Email", payload: newTerm })
        }
        placeholder="Email"
        style={styles.inputStyle}
      />

      <View style={{ flexDirection: "row" }}>
        <TextInput
          value={password}
          secureTextEntry={passwordVisible}
          onChangeText={(newTerm) =>
            dispatch({ type: "change_Password", payload: newTerm })
          }
          placeholder="Password"
          style={{ ...styles.inputStyle, flex: 1 }}
        />
        <TouchableOpacity
          style={{ alignSelf: "center", margin: 7 }}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Feather
            style={{
              color: "black",
              fontSize: 36,
            }}
            name={passwordVisible ? "eye-off" : "eye"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.viewStyle}>
        <Button
          style={styles.buttonStyle}
          onPress={() => createAccount(state)}
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
