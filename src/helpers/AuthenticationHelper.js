import AsyncStorage from "@react-native-async-storage/async-storage";

import coffida from "../api/coffida";

export default class AuthenticationHelper {
  static setAccessToken = async (accessToken) => {
    //   This sets the accessToken
    try {
      console.log(`Setting the access token.`);
      await AsyncStorage.setItem("@MY_ACCESS_TOKEN", accessToken);
      coffida.defaults.headers.common['X-Authorization'] = accessToken;
    } catch (error) {
      // Error saving data
    }
  };

  static getAccessToken = async () => {
    //   This returns the accessToken
    try {
      console.log("Reading the access token.");
      const value = await AsyncStorage.getItem("@MY_ACCESS_TOKEN");
      if (value !== null) {
        // We have data!!
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
    return null;
  };

  static removeAccessToken = async () => {
    //   This removes the accessToken on logout
    console.log("Removing AccessToken");
    try {
      await AsyncStorage.removeItem("@MY_ACCESS_TOKEN");
    } catch (e) {
      // remove error
    }
  };

  static validateAccessToken = async () => {
    //   Returns TRUE if the accessToken is valid
    console.log("Validating Access Token.");
    try {
      const r = await getAccessToken();
      try {
        // Value is being stored, Check if its valid
        const response = await coffida.get("/find?limit=1");
        console.log("valid access token");
        return true;
      } catch (error) {
        // failed
        console.log("invalid access token");
        return false;
      }
    } catch (err) {
      console.log("AccessToken isn't in storage.");
      return false;
    }
  };
}
