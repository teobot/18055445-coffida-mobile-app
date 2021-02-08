import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { withNavigation } from "react-navigation";

import coffida from "../api/coffida";

import LocationCard from "../components/LocationCard";

const SearchScreen = ({ navigation }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResult();
  }, []);

  const getResult = async () => {
    try {
      const response = await coffida.get("/find");
      setResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FlatList
        data={results}
        keyExtractor={(result) => `${result.location_id}`}
        renderItem={({ item }) => {
          return <LocationCard item={item} />;
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default withNavigation(SearchScreen);
