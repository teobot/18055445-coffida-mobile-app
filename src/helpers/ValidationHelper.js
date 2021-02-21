import Filter from "bad-words";
import { validate } from "validate.js";

export default class ValidationHelper {
  /**
   * This method returns TRUE if the given JSON object includes any bad words ELSE false
   * @static
   * @param {*} array
   * @returns TRUE if the given JSON object includes no bad words, else FALSE
   * @memberof ValidationHelper
   */
  static IsObjectProfane = (array) => {
    return filter.isProfane(JSON.stringify(array));
  };

  static RemoveBadWords = (payload) => {
    const filter = new Filter();
    return filter.clean(payload);
  };

  static validateInput = ({ type, payload }) => {
    switch (type) {
      case "validate_password":
        this.RemoveBadWords(payload).length > 5;
      default:
        return false;
    }
  };

  static validator = ({ type, payload }) => {
    const constraints = {
      email: {
        email: {
          message: "^Please enter a valid email address",
        },
      },
      password: {
        length: {
          minimum: 5,
          message: "^Your password must be at least 5 characters",
        },
      },
      first_name: {
        length: {
          minimum: 2,
          message: "^Your first name must be at least 2 characters",
        },
      },
      last_name: {
        length: {
          minimum: 2,
          message: "^Your last name must be at least 2 characters",
        },
      },
      review_body: {
        length: {
          minimum: 10,
          message: "^Your review must be at least 10 characters",
        },
      },
    };
    switch (type) {
      case "validate_email":
        return validate({ email: payload }, constraints);
      case "validate_password":
        return validate({ password: payload }, constraints);
      case "validate_first_name":
        return validate({ first_name: payload }, constraints);
      case "validate_last_name":
        return validate({ last_name: payload }, constraints);
      case "validate_review_body":
        return validate({ review_body: payload }, constraints);
      default:
        return undefined;
    }
  };
}
