import { validate } from "validate.js";

// Add terms here that are banned from the review_body
// These are all converted to lowercase and compared against the review that is also lowercase
const BANNED_CAKE_RELATED_TERMS = [
  "tea",
  "teas",
  "cake",
  "cakes",
  "pastries",
  "pastry",
];

// Here I list the constraints that the input data has to follow,
// I use the validate.js library here for all validation
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
    // This function handles the validation of each of the given inputs
    let arrayOfErrors = [];

    // Validate all given payloads against the constraints
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
          arrayOfErrors.push(`Remove "${bannedWord}" from the review! 👿`);
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
