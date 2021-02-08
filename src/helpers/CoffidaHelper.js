import AuthenticationHelper from "../helpers/AuthenticationHelper"
import coffida from "../api/coffida"

export default class CoffidaHelper {
  static getUserInformation = async () => {
    console.log("Get user information fired!");
    try {
      const user_id = await AuthenticationHelper.id_Reducer({ type: "get_id" });
      const response = await coffida.get(`/user/${user_id}`);
      return response.data;
    } catch (error) {
      // TODO: failed getting the user information, display error message here
      console.log(error);
    }
  };
}
