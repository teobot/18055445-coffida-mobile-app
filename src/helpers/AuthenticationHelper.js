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
      console.log("Saved item " + itemTitle + " successfully.");
    } catch (error) {
      // TODO: error setting the payload
      console.log("Error setting the payload of " + itemTitle);
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
    // This function validates the accessToken
    const token = await this.token_Reducer({ type: "get_token" });
    if (token === null) {
      // Token is not in storage
      return { valid: false, message: "Token is not in storage, login first." };
    } else {
      // Token is in storage but might not be valid
      // Check if the server is online before asking for data,
      try {
        await coffida.get("/", { timeout: 1000 });

        // server is up, but we need to check the token validity
        try {
          // try to retrieve some small data
          const d = await coffida.get("/find?limit=1", {
            headers: {
              "X-Authorization": token,
            },
          });
          if (d.status === 200) {
            // Token exists in storage and returned back data so its valid
            // Set the coffida axios instance to now always send the "X-Authorization" header with every request past here
            coffida.defaults.headers.common["X-Authorization"] = token;
            // Return back return meaning that token is valid
            return { valid: true, message: "Server is up and token is valid." };
          } else {
            // Server is up but token is not valid, delete the token and ask for login
            await this.token_Reducer({ type: "delete_token" });
            return {
              valid: false,
              message: "Token is not valid, please login again.",
            };
          }
        } catch (error) {
          // Error in the access token
          // Token is most likely not valid
          return {
            valid: false,
            message: "Token is not valid, please try again.",
          };
        }
      } catch (error) {
        // Server is down
        return {
          valid: false,
          message: "Server unavailable, please try again later.",
        };
      }
    }
  };
}
