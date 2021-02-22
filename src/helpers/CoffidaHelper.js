import AuthenticationHelper from "../helpers/AuthenticationHelper";
import coffida from "../api/coffida";


export default class CoffidaHelper {
  // This is the coffida helper class helper
  static getUserInformation = async () => {
    // This function returns the user information,
    // The reason this is in its own helper is to reduce duplicate code
    try {
      // Get the user_id from storage and request the user information
      const user_id = await AuthenticationHelper.id_Reducer({ type: "get_id" });
      const response = await coffida.get(`/user/${user_id}`);
      return response.data;
    } catch (error) {
      // : failed getting the user information, display error message here
      return null;
    }
  };
}
