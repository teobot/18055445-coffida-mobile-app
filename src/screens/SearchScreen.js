import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useContext,
} from "react";
import { StyleSheet, FlatList, View, Picker } from "react-native";
import { withNavigation } from "react-navigation";

import coffida from "../api/coffida";

import LocationCard from "../components/LocationCard";
import LoadingScreen from "../screens/LoadingScreen";

import { SearchBar, Button, Text, Divider, Badge } from "react-native-elements";

import SearchRatingInput from "../components/SearchScreen/SearchRatingInput";
import EndOfResultsView from "../components/SearchScreen/EndOfResultsView";
import SearchPaginationButton from "../components/SearchScreen/SearchPaginationButton";

const SearchParamsInitialState = {
  q: "",
  overall_rating: 0,
  price_rating: 0,
  quality_rating: 0,
  clenliness_rating: 0,
  search_in: "",
  limit: 20,
  offset: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "change_q":
      return { ...state, q: action.payload };
    case "change_overall_rating":
      return { ...state, overall_rating: action.payload };
    case "change_price_rating":
      return { ...state, price_rating: action.payload };
    case "change_quality_rating":
      return { ...state, quality_rating: action.payload };
    case "change_clenliness_rating":
      return { ...state, clenliness_rating: action.payload };
    case "change_search_in":
      return { ...state, search_in: action.payload };
    case "increase_offset":
      return { ...state, offset: state.offset + state.limit };
    case "decrease_offset":
      return { ...state, offset: state.offset - state.limit };
    case "clear_params":
      return SearchParamsInitialState;
    default:
      return state;
  }
};

import { Context as ThemeContext } from "../context/ThemeContext";

const SearchScreen = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [state, dispatch] = useReducer(reducer, SearchParamsInitialState);
  const [SearchOptionOpen, setSearchOptionOpen] = useState(false);
  const { state: ThemeState } = useContext(ThemeContext);

  const SearchableRatings = [
    {
      t: "Overall Rating",
      vt: "overall_rating",
      v: state.overall_rating,
    },
    {
      t: "Price Rating",
      vt: "price_rating",
      v: state.price_rating,
    },
    {
      t: "Quality Rating",
      vt: "quality_rating",
      v: state.quality_rating,
    },
    {
      t: "Clenliness Rating",
      vt: "clenliness_rating",
      v: state.clenliness_rating,
    },
  ];

  const useEffectLoaded = useRef(false);

  useEffect(() => {
    if (state === SearchParamsInitialState) {
      getResult();
    }
  }, [state]);

  useEffect(() => {
    if (useEffectLoaded.current) {
      getResult();
    } else {
      useEffectLoaded.current = true;
    }
  }, [state.offset]);

  const getResult = async () => {
    setLoadingResults(true);
    setSearchOptionOpen(false);
    let data = {};

    // user clicked clear
    for (const [key, value] of Object.entries(state)) {
      if (value) {
        data[key] = value;
      }
    }

    try {
      const response = await coffida.get("/find?", {
        params: data,
      });
      console.log(response.request.responseURL);
      setResults(response.data);
    } catch (error) {
      // console.log(error);
    }
    setLoadingResults(false);
  };

  const clearSearchParams = async () => {
    dispatch({ type: "clear_params" });
  };

  return (
    <>
      <SearchBar
        placeholder="Search..."
        onChangeText={(newValue) =>
          dispatch({ type: "change_q", payload: newValue })
        }
        value={state.q}
        showLoading={loadingResults}
        round={true}
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={getResult}
        onClear={() => dispatch({ type: "change_q", payload: "" })}
        onCancel={() => dispatch({ type: "change_q", payload: "" })}
        lightTheme={ThemeState.theme === "dark" ? false : true}
      />
      {SearchOptionOpen ? (
        <View style={{ backgroundColor: "white" }}>
          {SearchableRatings.map((item) => (
            <SearchRatingInput
              key={item.t}
              title={item.t}
              valueTitle={item.vt}
              value={item.v}
              dispatcher={dispatch}
              backgroundColor="white"
            />
          ))}

          <View
            style={{
              padding: 5,
              margin: 5,
              borderRadius: 5,
              borderColor: "black",
              justifyContent: "center",
            }}
          >
            <Picker
              selectedValue={state.search_in}
              onValueChange={(itemValue, itemIndex) =>
                dispatch({ type: "change_search_in", payload: itemValue })
              }
            >
              <Picker.Item
                label="Include both favourited and reviewed"
                value=""
              />
              <Picker.Item label="Only from my favorites" value="favourite" />
              <Picker.Item label="Only from my reviewed" value="reviewed" />
            </Picker>
          </View>

          <View style={{ padding: 5 }}>
            <Button
              containerStyle={{ margin: 5 }}
              type="outline"
              title="Search"
              onPress={getResult}
            />
            <Button
              containerStyle={{ margin: 5 }}
              type="outline"
              title="Clear"
              onPress={clearSearchParams}
            />
          </View>
          <Button
            titleStyle={{ fontSize: 12 }}
            type="clear"
            onPress={() => setSearchOptionOpen(!SearchOptionOpen)}
            title={"close search options"}
          />
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Button
            titleStyle={{ fontSize: 12 }}
            type="clear"
            onPress={() => setSearchOptionOpen(!SearchOptionOpen)}
            title={
              JSON.stringify(state) !== JSON.stringify(SearchParamsInitialState)
                ? "Edit Search Options"
                : "More Search Options"
            }
          />
          {JSON.stringify(state) !==
          JSON.stringify(SearchParamsInitialState) ? (
            <View
              style={{
                ...styles.optionSideContainer,
                right: 0,
              }}
            >
              <Text style={styles.optionSideText}>Custom Search Enabled</Text>
            </View>
          ) : null}

          {results !== null ? (
            // If the results have loaded, show how many the user has returned
            <View
              style={{
                ...styles.optionSideContainer,
                left: 0,
              }}
            >
              <Text style={styles.optionSideText}>
                {loadingResults
                  ? "Calculating"
                  : `Loaded ${state.offset} ... ${
                      state.offset + results.length
                    } results`}
              </Text>
            </View>
          ) : null}
        </View>
      )}
      <Divider />
      {loadingResults ? (
        <View style={{ flex: 1 }}>
          <LoadingScreen message="Loading results" />
        </View>
      ) : (
        <>
          <FlatList
            data={results}
            keyExtractor={(result) => `${result.location_id}`}
            ListFooterComponent={
              <>
                <EndOfResultsView />
                <SearchPaginationButton
                  state={state}
                  results={results}
                  dispatcher={dispatch}
                />
              </>
            }
            renderItem={({ item, index }) => {
              return <LocationCard item={item} />;
            }}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  optionSideContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  optionSideText: { fontSize: 10, marginHorizontal: 5, paddingHorizontal: 5 },
});

export default withNavigation(SearchScreen);
