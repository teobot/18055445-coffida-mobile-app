import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useContext,
} from "react";

// Component imports
import { StyleSheet, FlatList, View, Picker } from "react-native";
import { SearchBar, Button, Text, Divider } from "react-native-elements";

// Api imports
import coffida from "../api/coffida";

// Custom components imports
import LocationCard from "../components/Location/LocationCard";
import LoadingScreen from "../screens/LoadingScreen";
import SearchRatingInput from "../components/SearchScreen/SearchRatingInput";
import EndOfResultsView from "../components/SearchScreen/EndOfResultsView";
import SearchPaginationButton from "../components/SearchScreen/SearchPaginationButton";

// Library imports
import { getDistance } from "geolib";

// Context imports
import { ThemeContext } from "../context/ThemeContext";
import { ToastContext } from "../context/ToastContext";
import { LocationContext } from "../context/LocationContext";

// Initial state of the search parameters
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

// This is the reducer for the seach parameters
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

const SearchScreen = () => {
  // This is the landing/home screen, the user can search for locations and review them

  // Set the initial states

  // initial useState
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [state, dispatch] = useReducer(reducer, SearchParamsInitialState);
  const [SearchOptionOpen, setSearchOptionOpen] = useState(false);

  // Sorting and filter array
  const [resultSort, setResultSort] = useState({
    sortBy: "location_name",
    sortReverse: false,
  });
  // Add new filters here
  const Filters = [
    { filterVar: "location_name", filterTitle: "Location Name" },
    { filterVar: "distance", filterTitle: "Distance" },
    { filterVar: "avg_overall_rating", filterTitle: "Overall Rating" },
  ];

  // Context variables
  const { userLocation } = useContext(LocationContext);
  const { show404Toast, show500Toast } = useContext(ToastContext);
  const { Theme, ThemeTextColor } = useContext(ThemeContext);

  // Searchable star ratings
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

  useEffect(() => {
    // This is the initial getResults function call,
    // Only update if the search params have changed
    if (state === SearchParamsInitialState) {
      getResult();
    }
  }, [state]);

  // useRef to only trigger the function after the initial render
  const useEffectLoaded = useRef(false);
  useEffect(() => {
    // If the offset has changed then re-render the results
    if (useEffectLoaded.current) {
      getResult();
    } else {
      useEffectLoaded.current = true;
    }
  }, [state.offset]);

  const SearchParamsHaveChanged = () => {
    // Function returns if the search parameters have changed
    // return : TRUE IF searchParams have changed ELSE FALSE
    return (
      JSON.stringify({ ...state, limit: 20, offset: 0 }) !==
      JSON.stringify(SearchParamsInitialState)
    );
  };

  const getResult = async () => {
    // This function handles the requesting and setting of the result data
    setLoadingResults(true);
    setSearchOptionOpen(false);
    let data = {};

    // this finds which parameters have changed
    // Map the changed values to a new object so we can add them to the params of the request
    for (const [key, value] of Object.entries(state)) {
      // Foreach key and value inside the SearchParams state
      // Check if the value is truthy, e.g. not empty || null || undefined
      // If so then map to the new request params object
      if (value) {
        data[key] = value;
      }
    }

    // Make the results request
    try {
      let response = await coffida.get("/find?", {
        params: data,
      });
      // We can give each location a distance to the user
      // If the user has accept location use
      response.data.forEach((location) => {
        if (userLocation !== null) {
          // add the location distance
          location["distance"] = getDistance(
            {
              latitude: location.latitude,
              longitude: location.longitude,
            },
            {
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }
          );
        } else {
          location["distance"] = null;
        }
      });
      setResults(response.data);
    } catch (error) {
      // Search request failed
      if (error.response.status === 400) {
        // : Bad Request
        show404Toast();
      } else {
        // : most likely networking issue
        show500Toast();
      }
    }
    setLoadingResults(false);
  };

  const clearSearchParams = async () => {
    // This calls the reducer to reset the SearchParameters
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
        onClear={() => dispatch({ type: "clear_params" })}
        onClear={() => dispatch({ type: "clear_params" })}
        lightTheme={Theme === "light"}
      />
      {SearchOptionOpen ? (
        <View>
          {SearchableRatings.map((item) => (
            <SearchRatingInput
              key={item.t}
              title={item.t}
              valueTitle={item.vt}
              value={item.v}
              dispatcher={dispatch}
            />
          ))}

          <View style={styles.PickerContainerStyle}>
            <Picker
              style={ThemeTextColor}
              selectedValue={state.search_in}
              onValueChange={(itemValue) =>
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
              containerStyle={styles.ButtonContainerStyle}
              type="outline"
              title="Search"
              onPress={getResult}
            />
            <Button
              containerStyle={styles.ButtonContainerStyle}
              type="outline"
              title="Clear"
              onPress={clearSearchParams}
            />
          </View>
          <Button
            titleStyle={styles.ButtonTitleText}
            type="clear"
            onPress={() => setSearchOptionOpen(!SearchOptionOpen)}
            title={"close search options"}
          />
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Button
            titleStyle={styles.ButtonTitleText}
            type="clear"
            onPress={() => setSearchOptionOpen(!SearchOptionOpen)}
            title={
              SearchParamsHaveChanged()
                ? "Edit Search Options"
                : "More Search Options"
            }
          />
          {SearchParamsHaveChanged() ? (
            <View
              style={{
                ...styles.optionSideContainer,
                right: 0,
              }}
            >
              <Text
                style={{
                  ...styles.optionSideText,
                  ...ThemeTextColor,
                }}
              >
                Custom Search Enabled
              </Text>
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
              <Text
                style={{
                  ...styles.optionSideText,
                  ...ThemeTextColor,
                }}
              >
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
      <View style={styles.FilterViewContainer}>
        <Text
          style={{
            ...styles.optionSideText,
            alignSelf: "center",
            ...ThemeTextColor,
          }}
        >
          Filter Results:
        </Text>
        <FlatList
          horizontal
          contentContainerStyle={styles.locationCardFlatlist}
          data={Filters}
          keyExtractor={(filter) => filter.filterVar}
          renderItem={({ item }) => {
            return (
              <Button
                onPress={() =>
                  setResultSort({
                    ...Filters,
                    sortBy: item.filterVar,
                    sortReverse: !resultSort.sortReverse,
                  })
                }
                titleStyle={{ fontSize: 8 }}
                title={`By ${item.filterTitle}`}
                type="outline"
                containerStyle={{ marginHorizontal: 2 }}
              />
            );
          }}
        />
      </View>
      <Divider />
      {loadingResults ? (
        <View style={{ flex: 1 }}>
          <LoadingScreen message="Loading results" />
        </View>
      ) : (
        <>
          <FlatList
            data={[...results].sort((a, b) => {
              if (resultSort.sortReverse) {
                return a[resultSort.sortBy] > b[resultSort.sortBy];
              } else {
                return a[resultSort.sortBy] < b[resultSort.sortBy];
              }
            })}
            keyExtractor={(result) => `${result.location_id}`}
            ListFooterComponent={
              <>
                <EndOfResultsView results={results} />
                <SearchPaginationButton
                  state={state}
                  results={results}
                  dispatcher={dispatch}
                />
              </>
            }
            renderItem={({ item, index }) => {
              return <LocationCard key={index} item={item} />;
            }}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  PickerContainerStyle: {
    padding: 5,
    margin: 5,
    borderRadius: 5,
    borderColor: "black",
    justifyContent: "center",
  },
  ButtonTitleText: { fontSize: 12 },
  ButtonContainerStyle: { margin: 5 },
  FilterViewContainer: {
    flexDirection: "row",
    paddingVertical: 2,
    marginVertical: 2,
  },
  locationCardFlatlist: { flex: 1, justifyContent: "flex-start" },
  optionSideContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  optionSideText: { fontSize: 10, marginHorizontal: 5, paddingHorizontal: 5 },
});

export default SearchScreen;
