import { validate } from "validate.js";

const BANNED_CAKE_RELATED_TERMS = [
  "tea",
  "teas",
  "cake",
  "cakes",
  "pastries",
  "pastry",
];

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

export default class ValidationHelper {
  static validator = (payload) => {
    let arrayOfErrors = [];
    let validationErrors = validate(payload, constraints, {
      format: "flat",
    });
    if (validationErrors !== undefined) {
      // There are some validation errors, so combine them into the array
      arrayOfErrors = validationErrors;
    }
    if (payload["review_body"]) {
      // If validating the review need to remove banned words
      BANNED_CAKE_RELATED_TERMS.forEach((bannedWord) => {
        if (
          payload["review_body"]
            .toLowerCase()
            .split(" ")
            .includes(bannedWord.toLowerCase())
        ) {
          arrayOfErrors.push(`Remove "${bannedWord}" from the review 👿`);
        }
      });
    }

    if (arrayOfErrors.length === 0) {
      // If array empty return undefined
      return undefined;
    } else {
      // Array has errors,
      return arrayOfErrors;
    }
  };
}
