import Filter from "bad-words";

export default class ValidationHelper {
  /**
   *This method returns TRUE if the given JSON object includes any bad words ELSE false
   *
   * @static
   * @param {*} array
   * @returns TRUE if the given JSON object includes no bad words, else FALSE
   * @memberof ValidationHelper
   */
  static ValidateCreateAccountForm = (array) => {
    const filter = new Filter();
    return filter.isProfane(JSON.stringify(array));
  };
}
