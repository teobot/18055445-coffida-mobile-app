import AsyncStorage from "@react-native-async-storage/async-storage";

import coffida from "../api/coffida";

const ACCESS_TOKEN_ITEM_NAME = "@MY_ACCESS_TOKEN";
const USER_ID_ITEM_NAME = "@ID";

export default class AuthenticationHelper {
  /**
   *This is a reducer that handles the logic of the user token.
   *
   * @static
   * @param {*} action.type = {type: TYPE, payload: PAYLOAD}
   * @memberof AuthenticationHelper
   */
  static token_Reducer = async (action) => {
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

  /**
   *This is a reducer that handles the logic of the user id.
   *
   * @static
   * @param {*} action = {type: TYPE, payload: PAYLOAD}
   * @memberof AuthenticationHelper
   */
  static id_Reducer = async (action) => {
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
  /**
   *This method sets the given item into async storage along with the given title.
   *
   * @static
   * @param {*} { itemTitle, itemPayload }
   * @memberof AuthenticationHelper
   */
  static setAsyncStorageItem = async ({ itemTitle, itemPayload }) => {
    try {
      await AsyncStorage.setItem(itemTitle, "" + itemPayload);
    } catch (error) {
      // TODO: error setting the payload
    }
  };
  /**
   *This method retrieves the given item from async storage using the supplied item key
   *
   * @static
   * @param {*} itemTitle
   * @memberof AuthenticationHelper
   */
  static getAsyncStorageItem = async (itemTitle) => {
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
  /**
   *This method deletes the given item from async storage using the supplied item key
   *
   * @static
   * @param {*} itemTitle
   * @memberof AuthenticationHelper
   */
  static deleteAsyncStorageItem = async (itemTitle) => {
    try {
      await AsyncStorage.removeItem(itemTitle);
    } catch (e) {
      // TODO: error removing the given storage item
    }
  };
  /**
   *This method validates the token, it will return TRUE if the stored token is valid, else FALSE
   *
   * @static
   * @returns TRUE if token is valid else FALSE
   * @memberof AuthenticationHelper
   */
  static validateAccessToken = async () => {
    try {
      // Test is the token is saved
      const token = await this.token_Reducer({ type: "get_token" });
      try {
        // Token is in storage but we need to test if its valid
        const response = await coffida.get("/find?limit=1", {
          headers: {
            "X-Authorization": token,
          },
        });
        // Token exists in storage and returned back data so its valid
        // Set the coffida axios instance to now always send the "X-Authorization" header with every request past here
        coffida.defaults.headers.common["X-Authorization"] = token;
        // Return back return meaning that token is valid
        return {
          message: "Token is valid",
          valid: true,
        };
      } catch (error) {
        // Token is in storage but not valid, need to remove it and return false
        console.log(
          "Token is in storage but according to database it's not valid"
        );
        await this.token_Reducer({ type: "delete_token" });
        return {
          message: "Token has changed, Login to continue!",
          valid: false,
        };
      }
    } catch (error) {
      // Token is not in storage return false
      console.log("Token is not in storage");
      return {
        message: "Please login :)",
        valid: false,
      };
    }
  };
}
