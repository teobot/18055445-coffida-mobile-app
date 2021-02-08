import Filter from "bad-words";

const filter = new Filter()

export default class ValidationHelper {

  /**
   *This method returns TRUE if the given JSON object includes any bad words ELSE false
   *
   * @static
   * @param {*} array
   * @returns TRUE if the given JSON object includes no bad words, else FALSE
   * @memberof ValidationHelper
   */
  static IsObjectProfane = (array) => {
    return filter.isProfane(JSON.stringify(array));
  };

  static RemoveBadWords = (payload) => {
    return filter.clean(payload);
  };
}
