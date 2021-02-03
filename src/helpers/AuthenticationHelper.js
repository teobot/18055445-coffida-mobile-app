import AsyncStorage from "@react-native-async-storage/async-storage";

import coffida from "../api/coffida";

const ACCESS_TOKEN_ITEM_NAME = "@MY_ACCESS_TOKEN";
const USER_ID_ITEM_NAME = "@ID";

export default class AuthenticationHelper {
  static token_Reducer = async (action) => {
    // This is a reducer that decides logic with the user token
    switch (action.type) {
      case "get_token":
        return await this.getAsyncStorageItem(ACCESS_TOKEN_ITEM_NAME);
      case "set_token":
        coffida.defaults.headers.common["X-Authorization"] = action.payload;
        return await this.setAsyncStorageItem({
          itemTitle: ACCESS_TOKEN_ITEM_NAME,
          itemPayload: action.payload,
        });
      case "delete_token":
        return await this.deleteAsyncStorageItem(ACCESS_TOKEN_ITEM_NAME);
      case "validate_token":
        return await this.validateAccessToken();
      default:
        return null;
    }
  };

  static id_Reducer = async (action) => {
    // This is a reducer that decides logic with the user ID
    switch (action.type) {
      case "get_id":
        return await this.getAsyncStorageItem(USER_ID_ITEM_NAME);
      case "set_id":
        return await this.setAsyncStorageItem({
          itemTitle: USER_ID_ITEM_NAME,
          itemPayload: action.payload,
        });
      case "delete_id":
        return await this.deleteAsyncStorageItem(USER_ID_ITEM_NAME);
      default:
        return null;
    }
  };

  static setAsyncStorageItem = async ({ itemTitle, itemPayload }) => {
    // Set the given item in async storage
    try {
      await AsyncStorage.setItem(itemTitle, "" + itemPayload);
    } catch (error) {
      // TODO: error setting the payload
    }
  };

  static getAsyncStorageItem = async (itemTitle) => {
    // Get the given item from async storage
    try {
      const value = await AsyncStorage.getItem(itemTitle);
      if (value !== null) {
        // We have data!!
        return value;
      }
    } catch (error) {
      // TODO: Error retrieving data
    }
    return null;
  };

  static deleteAsyncStorageItem = async (itemTitle) => {
    //   This removes the accessToken on logout
    try {
      await AsyncStorage.removeItem(itemTitle);
    } catch (e) {
      // TODO: error removing the given storage item
    }
  };

  static validateAccessToken = async () => {
    //   Returns TRUE if the accessToken is valid
    try {
      const r = await getAccessToken();
      try {
        // Value is being stored, Check if its valid
        const response = await coffida.get("/find?limit=1");
        return true;
      } catch (error) {
        // failed
        return false;
      }
    } catch (err) {
      return false;
    }
  };
}
