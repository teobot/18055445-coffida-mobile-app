import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { withNavigation } from "react-navigation";

import coffida from "../api/coffida";

import AuthenticationHelper from "../helpers/AuthenticationHelper";

const SearchScreen = ({ navigation }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResult();
  }, []);

  const logout = async () => {
    await AuthenticationHelper.removeAccessToken();
    navigation.navigate("Login");
  };

  const getResult = async () => {
    try {
      const response = await coffida.get("/find");
      setResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ padding: 5, margin: 5 }}>
      <View style={{ margin: 5 }}>
        <Text>Welcome, To the SearchScreen</Text>
      </View>
      <View style={{ margin: 5 }}>
        <Button title="Logout" onPress={() => logout()} />
      </View>
      <FlatList
        data={results}
        keyExtractor={(result) => `${result.location_id}`}
        renderItem={({ item }) => {
          return (
            <View
              style={{ padding: 5, margin: 5, backgroundColor: "lightgrey" }}
            >
              <Text>{item.location_name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default withNavigation(SearchScreen);
