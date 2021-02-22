import AuthenticationHelper from "../helpers/AuthenticationHelper";
import coffida from "../api/coffida";


export default class CoffidaHelper {
  static getUserInformation = async () => {
    try {
      const user_id = await AuthenticationHelper.id_Reducer({ type: "get_id" });
      const response = await coffida.get(`/user/${user_id}`);
      return response.data;
    } catch (error) {
      // : failed getting the user information, display error message here
      return null;
    }
  };
}
